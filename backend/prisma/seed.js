const fs = require('fs');
const path = require('path');
const argon2 = require('argon2');
const { PrismaClient, UserRole, UserStatus, ClubStatus, ManagerClubStatus, TCPAccountType } = require('@prisma/client');

const prisma = new PrismaClient();
const accountsPath = path.join(__dirname, 'seed-accounts.json');

function loadAccounts() {
  if (!fs.existsSync(accountsPath)) throw new Error('Missing backend/prisma/seed-accounts.json. Copy backend/prisma/seed-accounts.example.json to seed-accounts.json, fill in the development credentials, and run the seed again.');
  const accounts = JSON.parse(fs.readFileSync(accountsPath, 'utf8'));
  if (!accounts.admin || !accounts.admin.email || !accounts.admin.password) throw new Error('The seed admin account must include email and password.');
  if (!Array.isArray(accounts.users) || accounts.users.length !== 16) throw new Error('The development seed must contain exactly 16 registered users.');
  const managers = accounts.users.filter((user) => user.clubName);
  if (managers.length !== 12) throw new Error('Exactly 12 of the 16 registered users must have a clubName.');
  const emails = [accounts.admin.email, ...accounts.users.map((user) => user.email)].map((email) => email.trim().toLowerCase());
  if (new Set(emails).size !== emails.length) throw new Error('Development seed account emails must be unique.');
  const clubNames = managers.map((user) => user.clubName.trim());
  if (new Set(clubNames).size !== clubNames.length) throw new Error('Development seed club names must be unique.');
  return accounts;
}

async function upsertUser({ email, password, displayName, role }) {
  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await argon2.hash(password);
  return prisma.user.upsert({
    where: { email: normalizedEmail },
    update: { passwordHash, displayName: displayName.trim(), role, status: UserStatus.ACTIVE, emailVerifiedAt: new Date() },
    create: { email: normalizedEmail, passwordHash, displayName: displayName.trim(), role, status: UserStatus.ACTIVE, emailVerifiedAt: new Date() },
  });
}

async function main() {
  const accounts = loadAccounts();
  const admin = await upsertUser({ ...accounts.admin, role: UserRole.ADMIN });

  for (const account of accounts.users) {
    const user = await upsertUser({ ...account, role: account.clubName ? UserRole.MANAGER : UserRole.USER });
    if (!account.clubName) continue;

    const club = await prisma.club.upsert({ where: { name: account.clubName.trim() }, update: { status: ClubStatus.ACTIVE }, create: { name: account.clubName.trim(), status: ClubStatus.ACTIVE } });
    const manager = await prisma.manager.upsert({ where: { userId: user.id }, update: { endedAt: null }, create: { userId: user.id } });

    const existingActiveLinks = await prisma.clubManager.findMany({ where: { managerId: manager.id, status: ManagerClubStatus.ACTIVE }, select: { id: true, clubId: true } });
    for (const link of existingActiveLinks) {
      if (link.clubId !== club.id) await prisma.clubManager.update({ where: { id: link.id }, data: { status: ManagerClubStatus.ENDED, endedAt: new Date() } });
    }

    const existingLink = await prisma.clubManager.findFirst({ where: { clubId: club.id, managerId: manager.id }, select: { id: true } });
    if (existingLink) {
      await prisma.clubManager.update({ where: { id: existingLink.id }, data: { status: ManagerClubStatus.ACTIVE, endedAt: null } });
    } else {
      await prisma.clubManager.create({ data: { clubId: club.id, managerId: manager.id, status: ManagerClubStatus.ACTIVE } });
    }

    await prisma.tCPAccount.upsert({ where: { clubId: club.id }, update: {}, create: { type: TCPAccountType.CLUB, clubId: club.id, name: `${club.name} TCP Account` } });
  }

  console.log(`Development seed complete: ${admin.email} + 16 registered users + 12 manager clubs.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(async () => { await prisma.$disconnect(); });
