import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';

const ROLE_LEVEL: Record<UserRole, number> = {
  USER: 1,
  MANAGER: 2,
  ADMIN: 3,
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest<{
      user?: { role?: UserRole };
    }>();
    const currentRole = request.user?.role;

    if (!currentRole) {
      throw new ForbiddenException('Authentication is required.');
    }

    const currentLevel = ROLE_LEVEL[currentRole];
    const allowed = requiredRoles.some(
      (requiredRole) => currentLevel >= ROLE_LEVEL[requiredRole],
    );

    if (!allowed) {
      throw new ForbiddenException('You do not have permission to perform this action.');
    }

    return true;
  }
}
