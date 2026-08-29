$ErrorActionPreference = "Stop"

$project = Split-Path -Parent $MyInvocation.MyCommand.Path
$page = Join-Path $project "frontend\app\admin\players\page.tsx"
$backup = Join-Path $project "frontend\app\admin\players\page.tsx.backup"

if (!(Test-Path $page)) {
    throw "Could not find page.tsx at $page"
}

Write-Host ""
Write-Host "TFA Player Pool updater" -ForegroundColor Cyan
Write-Host "=======================" -ForegroundColor Cyan
Write-Host ""

# ------------------------------------------------------------
# BACKUP
# ------------------------------------------------------------

Copy-Item $page $backup -Force

Write-Host "Backup created:" -ForegroundColor Green
Write-Host $backup
Write-Host ""

$content = Get-Content $page -Raw

# ------------------------------------------------------------
# 1. CONNECT COUNTRY FLAGS LIBRARY
# ------------------------------------------------------------

if ($content -notmatch 'countryCodeToFlag') {


    if ($content -match 'import \{[\s\S]*?\} from "lucide-react";') {

        $lucideImport = [regex]::Match(
            $content,
            'import \{[\s\S]*?\} from "lucide-react";'
        ).Value

        $replacement = $lucideImport + "`r`nimport { countryCodeToFlag, getCountry } from ""@/lib/countryFlags"";"

        $content = $content.Replace(
            $lucideImport,
            $replacement
        )
    }
}

# ------------------------------------------------------------
# 2. REMOVE THE OLD COUNTRY LIST
# ------------------------------------------------------------

# The old page contains:
# type Country = {...}
# const countries: Country[] = [...]
#
# We remove the duplicate local list and use lib/countryFlags.ts.

$oldCountryPattern = '(?s)type Country\s*=\s*\{.*?\};\s*const countries\s*:\s*Country\[\]\s*=\s*\[.*?\];'

if ($content -match $oldCountryPattern) {

    $content = [regex]::Replace(
        $content,
        $oldCountryPattern,
        ''
    )

    Write-Host "Removed duplicate country database." -ForegroundColor Green
}
else {
    Write-Host "Old country database was not found; leaving it untouched." -ForegroundColor Yellow
}

# ------------------------------------------------------------
# 3. COUNTRY FLAG HELPER
# ------------------------------------------------------------

# Add a local helper only if the page doesn't already have one.

if ($content -notmatch 'function getPlayerFlag') {

    $marker = 'type Player ='

    if ($content.Contains($marker)) {

        $helper = @'

function getPlayerFlag(country?: string | null, countryCode?: string | null) {
  return countryCodeToFlag(countryCode || country || undefined);
}

'@

        $content = $content.Replace(
            $marker,
            $helper + $marker
        )
    }
}

# ------------------------------------------------------------
# 4. DARKER PLAYER CARD GRADIENT
# ------------------------------------------------------------

$content = $content.Replace(
    'bg-gradient-to-t from-black via-black/80 to-transparent',
    'bg-gradient-to-t from-black via-black/95 via-55% to-black/35 to-transparent'
)

$content = $content.Replace(
    'from-black via-black/80',
    'from-black via-black/95'
)

# ------------------------------------------------------------
# 5. MAKE PLAYER CARD TEXT MORE VISIBLE
# ------------------------------------------------------------

$content = $content.Replace(
    'text-white/70',
    'text-white/85'
)

$content = $content.Replace(
    'text-white/55',
    'text-white/75'
)

# ------------------------------------------------------------
# 6. ADD CONTRACT WINDOW TYPES
# ------------------------------------------------------------

if ($content -notmatch 'ContractWindow') {

    $marker = 'type PlayerHistory ='

    if ($content.Contains($marker)) {

        $contractTypes = @'

type ContractWindow =
  | "season_start"
  | "mid_season"
  | "season_end";

type ContractDetails = {
  startSeason: number | null;
  startWindow: ContractWindow | null;
  endSeason: number | null;
  endWindow: ContractWindow | null;
  signingValue: number | null;
};

'@

        $content = $content.Replace(
            $marker,
            $contractTypes + $marker
        )
    }
}

# ------------------------------------------------------------
# 7. ADD CONTRACT FIELDS TO PLAYER TYPE
# ------------------------------------------------------------

if ($content -match 'contractStart:\s*number \| null;') {

    $content = $content.Replace(
        'contractStart: number | null;',
        @'
contractStart: number | null;
  contractStartWindow?: ContractWindow | null;
  contractEndWindow?: ContractWindow | null;
  signingValue?: number | null;
'@
    )
}

# ------------------------------------------------------------
# 8. NORMALIZE COUNTRY FLAG DISPLAY
# ------------------------------------------------------------

# Replace common patterns where country codes are printed directly.

$content = $content.Replace(
    '{player.countryCode}',
    '{getPlayerFlag(player.country, player.countryCode)}'
)

$content = $content.Replace(
    '{player.country}',
    '{getPlayerFlag(player.country, player.countryCode)}'
)

# ------------------------------------------------------------
# 9. ADD CONTRACT FORMATTER
# ------------------------------------------------------------

if ($content -notmatch 'formatContractWindow') {

    $marker = 'function getPlayerFlag'

    if ($content.Contains($marker)) {

        $formatter = @'

function formatContractWindow(
  season: number | null | undefined,
  window: ContractWindow | null | undefined
) {
  if (!season) return "Not assigned";

  const labels: Record<ContractWindow, string> = {
    season_start: "Season Start Transfer Window",
    mid_season: "Mid-Season Transfer Window",
    season_end: "End-of-Season Transfer Window",
  };

  return `Season ${season}${window ? ` — ${labels[window]}` : ""}`;
}

function formatSigningValue(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "Not assigned";
  }

  return `${value} TCP`;
}

'@

        $content = $content.Replace(
            $marker,
            $marker + $formatter
        )
    }
}

# ------------------------------------------------------------
# 10. SAVE
# ------------------------------------------------------------

Set-Content `
    -Path $page `
    -Value $content `
    -Encoding UTF8

Write-Host ""
Write-Host "Player pool update applied." -ForegroundColor Green
Write-Host ""
Write-Host "Backup:" -ForegroundColor Cyan
Write-Host $backup
Write-Host ""
Write-Host "Updated:" -ForegroundColor Cyan
Write-Host $page
Write-Host ""
Write-Host "IMPORTANT: This script intentionally does NOT delete your original file." -ForegroundColor Yellow
Write-Host ""
Write-Host "Now run:" -ForegroundColor Cyan
Write-Host "  cd frontend"
Write-Host "  npm run dev"
Write-Host ""
Write-Host "If the page compiles, inspect the player pool." -ForegroundColor Green
Write-Host ""