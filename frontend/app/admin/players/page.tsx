"use client";

import PlayerCard from "@/components/players/PlayerCard";

import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentType,
  type KeyboardEvent,
  type PointerEvent,
  type SVGProps,
} from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import {
  Search,
  Upload,
  UserPlus,
  Pencil,
  Trash2,
  ImagePlus,
  X,
  Save,
  Grid3X3,
  List,
  ChevronRight,
  Check,
} from "lucide-react";
import * as FlagIcons from "country-flag-icons/react/3x2";
import { countries as flagCountryCodes } from "country-flag-icons";

type PlayerStatus = "active" | "free_agent" | "unavailable";
type ContractWindow = "pre_season" | "mid_season" | "pre_knockout";
type TransactionType = "signing" | "renewal";
type ContractPoint = { season: number; window: ContractWindow };

type PlayerHistoryEntry = {
  id: string;
  season: number;
  type: "signing" | "transfer" | "renewal" | "release" | "loan" | "return";
  club: string | null;
  fromClub?: string | null;
  toClub?: string | null;
  amount?: number | null;
  matches?: number | null;
  description: string;
  window?: ContractWindow | null;
};

type Player = {
  id: string;
  name: string;
  country: string | null;
  countryCode: string | null;
  positions: string[];
  image: string;
  imageCrop?: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
  club: string | null;
  assignedPosition: string | null;
  contractStart: ContractPoint | null;
  contractEnd: ContractPoint | null;
  signingValue: number | null;
  history: PlayerHistoryEntry[];
  status: PlayerStatus;
};

type FlagComponent = ComponentType<SVGProps<SVGSVGElement>>;

const positions = [
  "GK",
  "CB",
  "LB",
  "RB",
  "DMF",
  "CMF",
  "LMF",
  "RMF",
  "AMF",
  "LWF",
  "RWF",
  "SS",
  "CF",
];

const contractWindows: { value: ContractWindow; label: string }[] = [
  { value: "pre_season", label: "Pre-Season Transfer Window" },
  { value: "mid_season", label: "Mid-Season Transfer Window" },
  { value: "pre_knockout", label: "Pre-Knockout Transfer Window" },
];

const FLAG_MAP = FlagIcons as unknown as Record<string, FlagComponent>;

function getCountryName(code: string) {
  try {
    const displayNames = new Intl.DisplayNames(["en"], {
      type: "region",
    });
    return displayNames.of(code) ?? code;
  } catch {
    return code;
  }
}

const countryOptions = flagCountryCodes
  .map((code) => ({
    code,
    name: getCountryName(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[Øø]/g, "o")
    .replace(/[Ðð]/g, "d")
    .replace(/[Þþ]/g, "th")
    .replace(/[Łł]/g, "l")
    .replace(/[Đđ]/g, "d")
    .replace(/[Ææ]/g, "ae")
    .replace(/[Œœ]/g, "oe")
    .replace(/ß/g, "ss")
    .toLowerCase()
    .trim();
}

function findCountry(value?: string | null) {
  if (!value) return undefined;

  const normalized = normalizeSearchText(value);

  return countryOptions.find(
    (country) =>
      country.code.toUpperCase() === value.toUpperCase() ||
      normalizeSearchText(country.name) === normalized,
  );
}

function CountryFlag({
  code,
  title,
  className = "h-4 w-auto",
}: {
  code?: string | null;
  title?: string;
  className?: string;
}) {
  const normalized = code?.toUpperCase() ?? "";
  const Flag = FLAG_MAP[normalized];

  if (!Flag) {
    return (
      <span
        aria-label={title ?? "Unknown country"}
        title={title ?? "Unknown country"}
        className="inline-flex h-4 min-w-6 items-center justify-center rounded border border-white/10 bg-white/[0.04] px-1 text-[8px] text-white/35"
      >
        {normalized || "—"}
      </span>
    );
  }

  return (
    <span
      aria-label={title ?? "Unknown country"}
      title={title ?? "Unknown country"}
      className="inline-flex items-center"
    >
      <Flag
        aria-hidden="true"
        className={`${className} inline-block shrink-0 overflow-hidden rounded-[2px]`}
      />
    </span>
  );
}
function getWindowLabel(window: ContractWindow | null | undefined) {
  if (!window) return "—";
  return contractWindows.find((item) => item.value === window)?.label ?? window;
}

function formatContractPoint(point: ContractPoint | null) {
  if (!point) return "—";
  return `Season ${point.season} — ${getWindowLabel(point.window)}`;
}

function getStatusLabel(status: PlayerStatus) {
  switch (status) {
    case "active":
      return "Active";
    case "unavailable":
      return "Unavailable";
    case "free_agent":
      return "Free Agent";
  }
}

function getStatusDot(status: PlayerStatus) {
  switch (status) {
    case "active":
      return "bg-green-500";
    case "unavailable":
      return "bg-red-500";
    case "free_agent":
      return "bg-white/35";
  }
}

function createHistoryId() {
  return `H-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const initialPlayers: Player[] = [
  {
    id: "TFA-P001",
    name: "Lionel Messi",
    country: "Argentina",
    countryCode: "AR",
    positions: ["CF", "SS", "AMF", "LWF", "RWF"],
    image: "",
    imageCrop: {
      x: 25,
      y: 16.6667,
      width: 50,
      height: 66.6667,
    },
    club: null,
    assignedPosition: "AMF",
    contractStart: { season: 1, window: "pre_season" },
    contractEnd: { season: 1, window: "pre_season" },
    signingValue: 60,
    history: [
      {
        id: "H-MESSI-S1",
        season: 1,
        type: "signing",
        club: "Java",
        fromClub: null,
        toClub: "Java",
        amount: 60,
        description: "Signed by Java for 60 TCP.",
        window: "pre_season",
      },
    ],
    status: "active",
  },
  {
    id: "TFA-P002",
    name: "Cristiano Ronaldo",
    country: "Portugal",
    countryCode: "PT",
    positions: ["CF", "SS", "LWF"],
    image: "",
    imageCrop: {
      x: 25,
      y: 16.6667,
      width: 50,
      height: 66.6667,
    },
    club: null,
    assignedPosition: null,
    contractStart: null,
    contractEnd: null,
    signingValue: null,
    history: [],
    status: "free_agent",
  },
  {
    id: "TFA-P003",
    name: "Kylian Mbappé",
    country: "France",
    countryCode: "FR",
    positions: ["CF", "LWF", "RWF"],
    image: "",
    imageCrop: {
      x: 25,
      y: 16.6667,
      width: 50,
      height: 66.6667,
    },
    club: null,
    assignedPosition: null,
    contractStart: null,
    contractEnd: null,
    signingValue: null,
    history: [],
    status: "free_agent",
  },
  {
    id: "TFA-P004",
    name: "Martin Ødegaard",
    country: "Norway",
    countryCode: "NO",
    positions: ["AMF", "CMF"],
    image: "",
    imageCrop: {
      x: 25,
      y: 16.6667,
      width: 50,
      height: 66.6667,
    },
    club: null,
    assignedPosition: null,
    contractStart: null,
    contractEnd: null,
    signingValue: null,
    history: [],
    status: "free_agent",
  },
];

const DEFAULT_CROP: Crop = {
  unit: "%",
  x: 25,
  y: 16.6667,
  width: 50,
  height: 66.6667,
};

function cropToPercentCrop(crop: Player["imageCrop"]): Crop {
  if (!crop) return DEFAULT_CROP;
  return {
    unit: "%",
    x: crop.x * 100,
    y: crop.y * 100,
    width: crop.width * 100,
    height: crop.height * 100,
  };
}

function getCropStyle(crop: Player["imageCrop"]) {
  if (!crop || crop.width <= 0 || crop.height <= 0) {
    return {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
    };
  }

  // Calculate percentage zoom and offsets based on stored 0-100 values
  const scaleX = 100 / crop.width;
  const scaleY = 100 / crop.height;
  const leftPercent = -crop.x * scaleX;
  const topPercent = -crop.y * scaleY;

  return {
    position: "absolute" as const,
    left: `${leftPercent}%`,
    top: `${topPercent}%`,
    width: `${scaleX * 100}%`,
    height: `${scaleY * 100}%`,
    maxWidth: "none",
    maxHeight: "none",
    objectFit: "fill" as const,
  };
}
function getCropObjectPosition(crop: Player["imageCrop"]) {
  if (!crop || crop.width <= 0 || crop.height <= 0) return "50% 50%";
  return `${((crop.x + crop.width / 2) / crop.width) * 100}% ${((crop.y + crop.height / 2) / crop.height) * 100}%`;
}

export default function AdminPlayersPage() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [search, setSearch] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [view, setView] = useState<"list" | "grid">("grid");

  const [showBulkImport, setShowBulkImport] = useState(false);
  const [bulkText, setBulkText] = useState("");

  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [viewingPlayer, setViewingPlayer] = useState<Player | null>(null);

  const [editName, setEditName] = useState("");
  const [editCountry, setEditCountry] = useState<string | null>(null);
  const [editPositions, setEditPositions] = useState<string[]>([]);
  const [editClub, setEditClub] = useState("");
  const [editAssignedPosition, setEditAssignedPosition] = useState("");

  const [editContractStartSeason, setEditContractStartSeason] = useState("");
  const [editContractStartWindow, setEditContractStartWindow] =
    useState<ContractWindow>("pre_season");
  const [editContractEndSeason, setEditContractEndSeason] = useState("");
  const [editContractEndWindow, setEditContractEndWindow] =
    useState<ContractWindow>("pre_season");

  const [editSigningValue, setEditSigningValue] = useState("");
  const [editTransactionType, setEditTransactionType] =
    useState<TransactionType>("signing");

  const [editImage, setEditImage] = useState("");

  const [editCrop, setEditCrop] = useState<Crop>({
    unit: "%",
    x: 25,
    y: 16.6667,
    width: 50,
    height: 66.6667,
  });

  const editImageRef = useRef<HTMLImageElement | null>(null);

  const [editStatus, setEditStatus] = useState<PlayerStatus>("free_agent");

  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [countrySearch, setCountrySearch] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredCountries = useMemo(() => {
    const query = normalizeSearchText(countrySearch);

    if (!query) return countryOptions;

    return countryOptions.filter((country) =>
      normalizeSearchText(country.name).includes(query),
    );
  }, [countrySearch]);

  const filteredPlayers = useMemo(() => {
    const query = normalizeSearchText(search);

    return players.filter((player) => {
      const matchesSearch =
        !query ||
        normalizeSearchText(player.name).includes(query) ||
        normalizeSearchText(player.country ?? "").includes(query) ||
        player.positions.some((position) =>
          normalizeSearchText(position).includes(query),
        );

      const matchesPosition =
        selectedPosition === "All" ||
        player.positions.includes(selectedPosition);

      const matchesCountry =
        selectedCountry === "All" || player.countryCode === selectedCountry;

      const matchesStatus =
        selectedStatus === "All" || player.status === selectedStatus;

      return (
        matchesSearch && matchesPosition && matchesCountry && matchesStatus
      );
    });
  }, [players, search, selectedPosition, selectedCountry, selectedStatus]);

  function createPlayerId() {
    const numbers = players
      .map((player) => Number(player.id.replace("TFA-P", "")))
      .filter((number) => !Number.isNaN(number));

    const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;

    return `TFA-P${String(nextNumber).padStart(3, "0")}`;
  }

  function addPlayer() {
    const newPlayer: Player = {
      id: createPlayerId(),
      name: "",
      country: null,
      countryCode: null,
      positions: [],
      image: "",
      imageCrop: null,
      club: null,
      assignedPosition: null,
      contractStart: null,
      contractEnd: null,
      signingValue: null,
      history: [],
      status: "free_agent",
    };

    openEditor(newPlayer);
  }

  function openEditor(player: Player) {
    setEditingPlayer(player);

    setEditName(player.name);
    setEditCountry(player.country);
    setEditPositions([...player.positions]);
    setEditClub(player.club ?? "");
    setEditAssignedPosition(player.assignedPosition ?? "");

    setEditContractStartSeason(
      player.contractStart ? String(player.contractStart.season) : "",
    );
    setEditContractStartWindow(player.contractStart?.window ?? "pre_season");

    setEditContractEndSeason(
      player.contractEnd ? String(player.contractEnd.season) : "",
    );
    setEditContractEndWindow(player.contractEnd?.window ?? "pre_season");

    setEditSigningValue(
      player.signingValue !== null ? String(player.signingValue) : "",
    );

    const lastContractEvent = [...player.history]
      .reverse()
      .find((entry) => entry.type === "signing" || entry.type === "renewal");

    setEditTransactionType(
      lastContractEvent?.type === "renewal" ? "renewal" : "signing",
    );

  setEditImage(player.image);

    if (player.imageCrop) {
      // Restore previous crop as percentage
      setEditCrop({
        unit: "%",
        x: player.imageCrop.x,
        y: player.imageCrop.y,
        width: player.imageCrop.width,
        height: player.imageCrop.height,
      });
    } else {
      setEditCrop(DEFAULT_CROP);
    }

    setEditStatus(player.status);

    setCountrySearch("");
    setCountryDropdownOpen(false);
    setImageMode("url");
  }

  function closeEditor() {
    setEditingPlayer(null);
    setEditName("");
    setEditCountry(null);
    setEditPositions([]);
    setEditClub("");
    setEditAssignedPosition("");
    setEditContractStartSeason("");
    setEditContractStartWindow("pre_season");
    setEditContractEndSeason("");
    setEditContractEndWindow("pre_season");
    setEditSigningValue("");
    setEditTransactionType("signing");
    setEditImage("");
    setEditStatus("free_agent");
    setCountrySearch("");
    setCountryDropdownOpen(false);
  }

  function togglePosition(position: string) {
    setEditPositions((current) => {
      if (current.includes(position)) {
        const updated = current.filter((item) => item !== position);

        if (editAssignedPosition === position) {
          setEditAssignedPosition("");
        }

        return updated;
      }

      return [...current, position];
    });
  }

  function selectCountry(country: { code: string; name: string }) {
    setEditCountry(country.name);
    setCountrySearch("");
    setCountryDropdownOpen(false);
  }

  function handleCountryKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setCountryDropdownOpen(false);
      return;
    }

    if (event.key === "Enter" && filteredCountries.length > 0) {
      event.preventDefault();
      selectCountry(filteredCountries[0]);
    }

    if (event.key === "ArrowDown") {
      setCountryDropdownOpen(true);
    }
  }

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      window.alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      window.alert("Image must be smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setEditImage(reader.result);
      }
    };

    reader.readAsDataURL(file);
  }

  function savePlayer() {
    if (!editingPlayer) return;

    if (!editName.trim()) {
      window.alert("Player name cannot be empty.");
      return;
    }

    const playerId = editingPlayer.id;

    const selectedCountryData = findCountry(editCountry);

    const startSeason = editContractStartSeason
      ? Number(editContractStartSeason)
      : null;

    const endSeason = editContractEndSeason
      ? Number(editContractEndSeason)
      : null;

    const signingValue =
      editSigningValue.trim() !== "" ? Number(editSigningValue) : null;

    /*
     * IMPORTANT:
     * Unavailable is NOT Free Agent.
     *
     * Only the explicit Free Agent status clears the club.
     */
    const finalStatus = editStatus;

    const finalClub =
      editStatus === "free_agent" ? null : editClub.trim() || null;

    const finalContractStart =
      finalClub && startSeason !== null
        ? {
            season: startSeason,
            window: editContractStartWindow,
          }
        : null;

    const finalContractEnd =
      finalClub && endSeason !== null
        ? {
            season: endSeason,
            window: editContractEndWindow,
          }
        : null;

    let savedCrop = null;

    if (editCrop && editCrop.width > 0) {
      if (editCrop.unit === "%") {
        savedCrop = {
          x: editCrop.x,
          y: editCrop.y,
          width: editCrop.width,
          height: editCrop.height,
        };
      } else if (editImageRef.current) {
        const img = editImageRef.current;
        const w = img.clientWidth || img.naturalWidth || 1;
        const h = img.clientHeight || img.naturalHeight || 1;

        savedCrop = {
          x: (editCrop.x / w) * 100,
          y: (editCrop.y / h) * 100,
          width: (editCrop.width / w) * 100,
          height: (editCrop.height / h) * 100,
        };
      }
    }

    setPlayers((current) => {
      const exists = current.some((p) => p.id === playerId);

      const updatedPlayerPayload: Player = {
        id: playerId,
        name: editName.trim(),
        country: selectedCountryData?.name ?? editCountry,
        countryCode: selectedCountryData?.code ?? null,
        positions: editPositions,
        image: editImage,
        imageCrop: savedCrop,
        club: finalClub,
        assignedPosition:
          finalClub && editAssignedPosition ? editAssignedPosition : null,
        contractStart: finalContractStart,
        contractEnd: finalContractEnd,
        signingValue,
        history: editingPlayer.history,
        status: finalStatus,
      };

      // Handle brand-new player additions
      if (!exists) {
        return [...current, updatedPlayerPayload];
      }

      // Handle updates for existing players
      return current.map((player) => {
        if (player.id !== playerId) {
          return player;
        }

        let history = player.history;
        const clubChanged = player.club !== finalClub;
        const signingChanged = player.signingValue !== signingValue;

        if (finalClub && !player.club && finalStatus === "active") {
          history = [
            ...history,
            {
              id: createHistoryId(),
              season: finalContractStart?.season ?? 1,
              type: editTransactionType,
              club: finalClub,
              fromClub: null,
              toClub: finalClub,
              amount: signingValue,
              description:
                editTransactionType === "renewal"
                  ? `Renewed by ${finalClub}${
                      signingValue !== null ? ` for ${signingValue} TCP` : ""
                    }.`
                  : `Signed by ${finalClub}${
                      signingValue !== null ? ` for ${signingValue} TCP` : ""
                    }.`,
              window: finalContractStart?.window ?? null,
            },
          ];
        } else if (clubChanged && finalClub && player.club) {
          history = [
            ...history,
            {
              id: createHistoryId(),
              season: finalContractStart?.season ?? 1,
              type: "transfer",
              club: finalClub,
              fromClub: player.club,
              toClub: finalClub,
              amount: signingValue,
              description: `Transferred from ${player.club} to ${finalClub}${
                signingValue !== null ? ` for ${signingValue} TCP` : ""
              }.`,
              window: finalContractStart?.window ?? null,
            },
          ];
        } else if (
          editTransactionType === "renewal" &&
          finalClub &&
          (signingChanged ||
            finalContractEnd?.season !== player.contractEnd?.season ||
            finalContractEnd?.window !== player.contractEnd?.window)
        ) {
          history = [
            ...history,
            {
              id: createHistoryId(),
              season:
                finalContractStart?.season ?? finalContractEnd?.season ?? 1,
              type: "renewal",
              club: finalClub,
              fromClub: finalClub,
              toClub: finalClub,
              amount: signingValue,
              description: `Renewed by ${finalClub}${
                signingValue !== null ? ` for ${signingValue} TCP` : ""
              }.`,
              window: finalContractStart?.window ?? null,
            },
          ];
        } else if (signingChanged && finalClub && signingValue !== null) {
          history = [
            ...history,
            {
              id: createHistoryId(),
              season: finalContractStart?.season ?? 1,
              type: "signing",
              club: finalClub,
              fromClub: null,
              toClub: finalClub,
              amount: signingValue,
              description: `Signing value updated to ${signingValue} TCP.`,
              window: finalContractStart?.window ?? null,
            },
          ];
        }

        return {
          ...updatedPlayerPayload,
          history,
        };
      });
    });

    closeEditor();
  }

  function importPlayers() {
    const lines = bulkText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      window.alert("No players were detected.");
      return;
    }

    let nextIdNumber =
      players
        .map((player) => Number(player.id.replace("TFA-P", "")))
        .filter((number) => !Number.isNaN(number))
        .reduce((max, number) => Math.max(max, number), 0) + 1;

    const newPlayers: Player[] = [];

    for (const line of lines) {
      const parts = line.split("|").map((part) => part.trim());

      const name = parts[0] ?? "";
      if (!name) continue;

      const countryInput = parts[1] ?? "";
      const positionsInput = parts[2] ?? "";

      const matchedCountry = countryOptions.find(
        (country) =>
          normalizeSearchText(country.name) ===
          normalizeSearchText(countryInput),
      );

      const importedPositions = positionsInput
        .split(",")
        .map((position) => position.trim().toUpperCase())
        .filter((position) => positions.includes(position));

      newPlayers.push({
        id: `TFA-P${String(nextIdNumber).padStart(3, "0")}`,
        name,
        country: matchedCountry?.name ?? (countryInput || null),
        countryCode: matchedCountry?.code ?? null,
        positions: importedPositions,
        image: "",
        imageCrop: {
          x: 25,
          y: 16.6667,
          width: 50,
          height: 66.6667,
        },
        club: null,
        assignedPosition: null,
        contractStart: null,
        contractEnd: null,
        signingValue: null,
        history: [],
        status: "free_agent",
      });

      nextIdNumber++;
    }

    if (newPlayers.length === 0) {
      window.alert("No valid players could be imported.");
      return;
    }

    setPlayers((current) => [...current, ...newPlayers]);

    setBulkText("");
    setShowBulkImport(false);
  }

  function deletePlayer(id: string) {
    if (!window.confirm("Are you sure you want to delete this player?")) {
      return;
    }

    setPlayers((current) => current.filter((player) => player.id !== id));

    if (viewingPlayer?.id === id) {
      setViewingPlayer(null);
    }

    if (editingPlayer?.id === id) {
      closeEditor();
    }
  }

  function getContractText(player: Player) {
    if (!player.contractStart || !player.contractEnd) {
      return "No contract";
    }

    return `S${player.contractStart.season}–S${player.contractEnd.season}`;
  }

  function getHistoryTitle(entry: PlayerHistoryEntry) {
    switch (entry.type) {
      case "signing":
        return "Signing";
      case "transfer":
        return "Transfer";
      case "renewal":
        return "Renewed";
      case "release":
        return "Released";
      case "loan":
        return "Loan";
      case "return":
        return "Loan Return";
    }
  }

  function renderPlayerFlag(player: Player) {
    return (
      <CountryFlag
        code={player.countryCode}
        title={player.country ?? undefined}
        className="h-4 w-auto"
      />
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-white/25">
              TFA Management
            </div>
            <h1 className="mt-2 text-2xl font-semibold text-white">
              Player Pool
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/35">
              Manage the official TFA player database, nationality, positions,
              images, contracts and player availability.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowBulkImport((value) => !value)}
              className="flex items-center gap-2 rounded-md border border-white/10 px-4 py-2.5 text-xs text-white/60 transition hover:bg-white/[0.05] hover:text-white"
            >
              <Upload size={15} />
              Bulk Import
            </button>

            <button
              type="button"
              onClick={addPlayer}
              className="flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-xs font-medium text-black transition hover:bg-white/90"
            >
              <UserPlus size={15} />
              Add Player
            </button>
          </div>
        </div>

        {showBulkImport && (
          <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-start justify-between gap-5">
              <div>
                <div className="text-sm font-medium text-white">
                  Bulk Player Import
                </div>
                <p className="mt-2 text-xs text-white/35">
                  One player per line:
                </p>
                <code className="mt-2 block rounded-md border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/60">
                  Player Name | Country | Positions
                </code>
              </div>

              <button
                type="button"
                onClick={() => setShowBulkImport(false)}
                className="text-white/25 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <textarea
              value={bulkText}
              onChange={(event) => setBulkText(event.target.value)}
              placeholder={
                "Lionel Messi | Argentina | CF, SS, AMF, LWF, RWF\nCristiano Ronaldo | Portugal | CF, SS, LWF\nKylian Mbappé | France | CF, LWF, RWF"
              }
              className="mt-4 min-h-48 w-full resize-y rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
            />

            <div className="mt-3 flex justify-between">
              <span className="text-[10px] text-white/25">
                {bulkText.split(/\r?\n/).filter((line) => line.trim()).length}{" "}
                players detected
              </span>

              <button
                type="button"
                onClick={importPlayers}
                className="rounded-md bg-white px-4 py-2 text-xs font-medium text-black"
              >
                Import Players
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <div className="flex flex-col gap-3 xl:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-md border border-white/10 bg-white/[0.02] px-3 py-2">
              <Search size={15} className="text-white/25" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search player, country or position..."
                className="w-full bg-transparent text-xs text-white outline-none placeholder:text-white/25"
              />
            </div>

            <select
              value={selectedPosition}
              onChange={(event) => setSelectedPosition(event.target.value)}
              className="rounded-md border border-white/10 bg-[#111] px-3 py-2 text-xs text-white/60 outline-none"
            >
              <option value="All">All Positions</option>
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>

            <select
              value={selectedCountry}
              onChange={(event) => setSelectedCountry(event.target.value)}
              className="rounded-md border border-white/10 bg-[#111] px-3 py-2 text-xs text-white/60 outline-none"
            >
              <option value="All">All Countries</option>
              {countryOptions.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="rounded-md border border-white/10 bg-[#111] px-3 py-2 text-xs text-white/60 outline-none"
            >
              <option value="All">All Players</option>
              <option value="active">Active</option>
              <option value="free_agent">Free Agent</option>
              <option value="unavailable">Unavailable</option>
            </select>

            <div className="flex rounded-md border border-white/10 bg-white/[0.02] p-1">
              <button
                type="button"
                onClick={() => setView("list")}
                className={`flex items-center gap-2 rounded px-3 py-1.5 text-[10px] ${
                  view === "list"
                    ? "bg-white text-black"
                    : "text-white/35 hover:text-white"
                }`}
              >
                <List size={13} />
                List
              </button>

              <button
                type="button"
                onClick={() => setView("grid")}
                className={`flex items-center gap-2 rounded px-3 py-1.5 text-[10px] ${
                  view === "grid"
                    ? "bg-white text-black"
                    : "text-white/35 hover:text-white"
                }`}
              >
                <Grid3X3 size={13} />
                Grid
              </button>
            </div>
          </div>

          <div className="text-[10px] uppercase tracking-[0.12em] text-white/25">
            {filteredPlayers.length} of {players.length} Players
          </div>
        </div>

        {view === "list" && (
          <div className="mt-4 overflow-hidden rounded-lg border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03] text-left">
                    <th className="px-5 py-4 text-[9px] uppercase tracking-[0.15em] text-white/25">
                      Player
                    </th>
                    <th className="px-4 py-4 text-[9px] uppercase tracking-[0.15em] text-white/25">
                      Country
                    </th>
                    <th className="px-4 py-4 text-[9px] uppercase tracking-[0.15em] text-white/25">
                      Positions
                    </th>
                    <th className="px-4 py-4 text-[9px] uppercase tracking-[0.15em] text-white/25">
                      Club
                    </th>
                    <th className="px-4 py-4 text-[9px] uppercase tracking-[0.15em] text-white/25">
                      Signing
                    </th>
                    <th className="px-4 py-4 text-[9px] uppercase tracking-[0.15em] text-white/25">
                      Contract
                    </th>
                    <th className="px-4 py-4 text-right text-[9px] uppercase tracking-[0.15em] text-white/25">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPlayers.map((player) => (
                    <tr
                      key={player.id}
                      onClick={() => setViewingPlayer(player)}
                      className="cursor-pointer border-b border-white/10 last:border-0 hover:bg-white/[0.025]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
                            {player.image ? (
                              player.imageCrop ? (
                                <img
                                  src={player.image}
                                  alt={player.name}
                                  className="h-full w-full object-cover"
                                  style={{
                                    objectPosition: getCropObjectPosition(
                                      player.imageCrop,
                                    ),
                                  }}
                                />
                              ) : (
                                <img
                                  src={player.image}
                                  alt={player.name}
                                  className="h-full w-full object-cover"
                                />
                              )
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <span className="text-[10px] font-semibold text-white/25">
                                  {player.name.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-white">
                              {renderPlayerFlag(player)}
                              {player.name}
                            </div>

                            <div className="mt-1 text-[9px] text-white/25">
                              {player.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="flex items-center gap-2 text-xs text-white/50">
                          {renderPlayerFlag(player)}
                          {player.country ?? "Not assigned"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="grid grid-cols-6 gap-1">
                          {player.positions.map((position) => (
                            <span
                              key={position}
                              className="rounded-md border border-white/10 px-1.5 py-1 text-center text-[8px] text-white/50"
                            >
                              {position}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${getStatusDot(
                              player.status,
                            )}`}
                          />
                          <span className="text-sm font-semibold text-white/70">
                            {player.club ?? getStatusLabel(player.status)}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-sm font-semibold text-white/70">
                          {player.signingValue !== null
                            ? `${player.signingValue} TCP`
                            : "—"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-[10px] text-white/40">
                          {getContractText(player)}
                        </span>
                      </td>

                      <td
                        className="px-4 py-4"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditor(player)}
                            className="flex h-8 items-center gap-2 rounded-md border border-white/10 px-3 text-[10px] text-white/40 hover:bg-white/[0.05] hover:text-white"
                          >
                            <Pencil size={13} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => deletePlayer(player.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/35 hover:text-red-400"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === "grid" && (
  <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {filteredPlayers.map((player) => (
      <PlayerCard
        key={player.id}
        player={player}
        onView={setViewingPlayer}
        onEdit={openEditor}
        onDelete={deletePlayer}
        renderPlayerFlag={renderPlayerFlag}
        getStatusDot={getStatusDot}
      />
    ))}
  </div>
)}

        {filteredPlayers.length === 0 && (
          <div className="mt-4 rounded-lg border border-white/10 py-16 text-center">
            <div className="text-sm text-white/30">No players found.</div>
            <div className="mt-2 text-[10px] text-white/20">
              Try changing the search or filters.
            </div>
          </div>
        )}
      </div>

      {viewingPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-white/10 bg-[#111] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <div className="text-[9px] uppercase tracking-[0.15em] text-white/25">
                  TFA Player Profile
                </div>
                <div className="mt-1 text-[10px] text-white/20">
                  {viewingPlayer.id}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewingPlayer(null)}
                className="text-white/25 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="relative flex h-64 w-44 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                  {viewingPlayer.image ? (
                    <img
                      src={viewingPlayer.image}
                      alt={viewingPlayer.name}
                      className="absolute object-cover"
                      style={getCropStyle(viewingPlayer.imageCrop)}
                    />
                  ) : (
                    <ImagePlus size={32} className="text-white/10" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold text-white">
                      {viewingPlayer.name}
                    </h2>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-xs text-white/35">
                    {renderPlayerFlag(viewingPlayer)}
                    <span>
                      {viewingPlayer.country ?? "Country not assigned"}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-6 gap-2">
                    {viewingPlayer.positions.map((position) => (
                      <span
                        key={position}
                        className="rounded-md border border-white/10 px-2 py-1.5 text-center text-[9px] text-white/50"
                      >
                        {position}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6">
                    <div className="text-[9px] uppercase tracking-[0.15em] text-white/25">
                      Availability
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`h-3 w-3 rounded-full ${getStatusDot(
                          viewingPlayer.status,
                        )}`}
                      />
                      <span className="text-sm font-semibold text-white/70">
                        {viewingPlayer.status === "active"
                          ? (viewingPlayer.club ?? "Active")
                          : getStatusLabel(viewingPlayer.status)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="text-[9px] uppercase tracking-[0.15em] text-white/25">
                      Assigned Position
                    </div>

                    <div className="mt-2 text-sm text-white/60">
                      {viewingPlayer.assignedPosition ?? "Not assigned"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.02] p-5">
                <div className="text-[9px] uppercase tracking-[0.15em] text-white/25">
                  Contract
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-3">
                  <div>
                    <div className="text-[9px] text-white/20">Start</div>
                    <div className="mt-1 text-sm leading-6 text-white/60">
                      {formatContractPoint(viewingPlayer.contractStart)}
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] text-white/20">End</div>
                    <div className="mt-1 text-sm leading-6 text-white/60">
                      {formatContractPoint(viewingPlayer.contractEnd)}
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] text-white/20">
                      Signing Value
                    </div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      {viewingPlayer.signingValue !== null
                        ? `${viewingPlayer.signingValue} TCP`
                        : "—"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.02] p-5">
                <div className="text-[9px] uppercase tracking-[0.15em] text-white/25">
                  Player History
                </div>

                {viewingPlayer.history.length > 0 ? (
                  <div className="relative mt-6 space-y-4">
                    <div className="absolute bottom-3 left-[7px] top-3 w-px bg-white/10" />

                    {[...viewingPlayer.history].reverse().map((entry) => (
                      <div key={entry.id} className="relative flex gap-4">
                        <div className="relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[#111] bg-white/40" />

                        <div className="min-w-0 flex-1 rounded-md border border-white/10 bg-black/20 p-4">
                          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                            <div>
                              <div className="text-xs font-medium text-white/70">
                                {getHistoryTitle(entry)}
                              </div>

                              <div className="mt-1 text-[10px] text-white/30">
                                Season {entry.season}
                                {entry.window
                                  ? ` — ${getWindowLabel(entry.window)}`
                                  : ""}
                              </div>
                            </div>

                            {entry.amount !== null &&
                              entry.amount !== undefined && (
                                <div className="text-xs font-semibold text-white">
                                  {entry.amount} TCP
                                </div>
                              )}
                          </div>

                          <div className="mt-3 text-xs leading-5 text-white/45">
                            {entry.description}
                          </div>

                          {entry.type === "loan" &&
                            entry.matches !== null &&
                            entry.matches !== undefined && (
                              <div className="mt-2 text-[10px] text-white/25">
                                {entry.matches} matches
                              </div>
                            )}

                          {entry.fromClub && (
                            <div className="mt-3 flex items-center gap-2 text-[10px] text-white/30">
                              {entry.fromClub}
                              <ChevronRight size={12} />
                              {entry.toClub ?? entry.club}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 text-xs text-white/25">
                    No player history recorded.
                  </div>
                )}
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const player = viewingPlayer;
                    setViewingPlayer(null);
                    openEditor(player);
                  }}
                  className="flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-xs text-white/50 hover:bg-white/[0.05] hover:text-white"
                >
                  <Pencil size={14} />
                  Edit Player
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingPlayer && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg border border-white/10 bg-[#111] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <div className="text-[9px] uppercase tracking-[0.15em] text-white/25">
                  Player Management
                </div>
                <h2 className="mt-1 text-lg font-semibold text-white">
                  Edit Player
                </h2>
              </div>

              <button
                type="button"
                onClick={closeEditor}
                className="text-white/25 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6 px-6 py-6">
              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                  Player Name
                </label>

                <input
                  value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                  className="mt-2 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-white/25"
                />
              </div>

              <div className="relative">
                <label className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                  Country
                </label>

                <div className="relative mt-2">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25"
                  />

                  <input
                    value={
                      countryDropdownOpen
                        ? countrySearch
                        : editCountry
                          ? (findCountry(editCountry)?.name ?? editCountry)
                          : ""
                    }
                    onFocus={() => {
                      setCountryDropdownOpen(true);
                      setCountrySearch("");
                    }}
                    onChange={(event) => {
                      setCountrySearch(event.target.value);
                      setCountryDropdownOpen(true);
                    }}
                    onKeyDown={handleCountryKeyDown}
                    placeholder="Search country..."
                    className="w-full rounded-md border border-white/10 bg-black/30 py-2.5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
                  />
                </div>

                {editCountry && !countryDropdownOpen && (
                  <button
                    type="button"
                    onClick={() => setEditCountry(null)}
                    className="mt-2 text-[9px] text-white/25 hover:text-white"
                  >
                    Clear country
                  </button>
                )}

                {countryDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-60 overflow-y-auto rounded-md border border-white/10 bg-[#151515] shadow-xl">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => selectCountry(country)}
                          className="flex w-full items-center justify-between px-3 py-2.5 text-left hover:bg-white/[0.06]"
                        >
                          <span className="flex items-center gap-3">
                            <CountryFlag
                              code={country.code}
                              title={country.name}
                              className="h-5 w-auto"
                            />

                            <span className="text-xs text-white/60">
                              {country.name}
                            </span>
                          </span>

                          {editCountry === country.name && (
                            <Check size={14} className="text-green-400" />
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-xs text-white/25">
                        No countries found.
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                  Natural Positions
                </label>

                <div className="mt-3 grid grid-cols-6 gap-2">
                  {positions.map((position) => {
                    const selected = editPositions.includes(position);

                    return (
                      <button
                        key={position}
                        type="button"
                        onClick={() => togglePosition(position)}
                        className={`rounded-md border px-2 py-2 text-center text-[10px] transition ${
                          selected
                            ? "border-white/30 bg-white text-black"
                            : "border-white/10 bg-white/[0.02] text-white/40 hover:bg-white/[0.05] hover:text-white"
                        }`}
                      >
                        {position}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                  Club
                </label>

                <input
                  value={editClub}
                  onChange={(event) => setEditClub(event.target.value)}
                  placeholder="Leave empty for Free Agent"
                  className="mt-2 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                  Transaction Type
                </label>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditTransactionType("signing")}
                    className={`rounded-md border px-3 py-2.5 text-[10px] ${
                      editTransactionType === "signing"
                        ? "border-white/30 bg-white text-black"
                        : "border-white/10 text-white/35"
                    }`}
                  >
                    Signing
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditTransactionType("renewal")}
                    className={`rounded-md border px-3 py-2.5 text-[10px] ${
                      editTransactionType === "renewal"
                        ? "border-white/30 bg-white text-black"
                        : "border-white/10 text-white/35"
                    }`}
                  >
                    Renewed
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                  Signing / Renewal Value
                </label>

                <div className="relative mt-2">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={editSigningValue}
                    onChange={(event) =>
                      setEditSigningValue(event.target.value)
                    }
                    placeholder="e.g. 60"
                    className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2.5 pr-14 text-sm text-white outline-none placeholder:text-white/20"
                  />

                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/30">
                    TCP
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                  Availability Status
                </label>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditStatus("active")}
                    className={`flex items-center justify-center gap-2 rounded-md border px-3 py-2.5 text-[10px] ${
                      editStatus === "active"
                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                        : "border-white/10 text-white/35"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Active
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditStatus("free_agent")}
                    className={`flex items-center justify-center gap-2 rounded-md border px-3 py-2.5 text-[10px] ${
                      editStatus === "free_agent"
                        ? "border-white/20 bg-white/[0.06] text-white/70"
                        : "border-white/10 text-white/35"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-white/30" />
                    Free Agent
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditStatus("unavailable")}
                    className={`flex items-center justify-center gap-2 rounded-md border px-3 py-2.5 text-[10px] ${
                      editStatus === "unavailable"
                        ? "border-red-500/30 bg-red-500/10 text-red-400"
                        : "border-white/10 text-white/35"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    Unavailable
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                  Assigned Position
                </label>

                <select
                  value={editAssignedPosition}
                  onChange={(event) =>
                    setEditAssignedPosition(event.target.value)
                  }
                  className="mt-2 w-full rounded-md border border-white/10 bg-[#111] px-3 py-2.5 text-xs text-white/60 outline-none"
                >
                  <option value="">Not assigned</option>

                  {editPositions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                  Contract Start
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <input
                    type="number"
                    min="1"
                    value={editContractStartSeason}
                    onChange={(event) =>
                      setEditContractStartSeason(event.target.value)
                    }
                    placeholder="Season"
                    className="rounded-md border border-white/10 bg-black/30 px-3 py-2.5 text-xs text-white outline-none placeholder:text-white/20"
                  />

                  <select
                    value={editContractStartWindow}
                    onChange={(event) =>
                      setEditContractStartWindow(
                        event.target.value as ContractWindow,
                      )
                    }
                    className="rounded-md border border-white/10 bg-[#111] px-3 py-2.5 text-xs text-white/60 outline-none"
                  >
                    {contractWindows.map((window) => (
                      <option key={window.value} value={window.value}>
                        {window.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                  Contract End
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <input
                    type="number"
                    min="1"
                    value={editContractEndSeason}
                    onChange={(event) =>
                      setEditContractEndSeason(event.target.value)
                    }
                    placeholder="Season"
                    className="rounded-md border border-white/10 bg-black/30 px-3 py-2.5 text-xs text-white outline-none placeholder:text-white/20"
                  />

                  <select
                    value={editContractEndWindow}
                    onChange={(event) =>
                      setEditContractEndWindow(
                        event.target.value as ContractWindow,
                      )
                    }
                    className="rounded-md border border-white/10 bg-[#111] px-3 py-2.5 text-xs text-white/60 outline-none"
                  >
                    {contractWindows.map((window) => (
                      <option key={window.value} value={window.value}>
                        {window.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                  Player Image
                </label>

                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setImageMode("url")}
                    className={`rounded-md border px-3 py-2 text-[10px] ${
                      imageMode === "url"
                        ? "border-white/30 bg-white text-black"
                        : "border-white/10 text-white/40"
                    }`}
                  >
                    Image URL
                  </button>

                  <button
                    type="button"
                    onClick={() => setImageMode("upload")}
                    className={`rounded-md border px-3 py-2 text-[10px] ${
                      imageMode === "upload"
                        ? "border-white/30 bg-white text-black"
                        : "border-white/10 text-white/40"
                    }`}
                  >
                    Upload From PC
                  </button>
                </div>

                {imageMode === "url" && (
                  <input
                    value={editImage}
                    onChange={(event) => {
                      setEditImage(event.target.value);

                      setEditCrop({
                        unit: "%",
                        x: 25,
                        y: 16.6667,
                        width: 50,
                        height: 66.6667,
                      });
                    }}
                    placeholder="Paste direct image URL..."
                    className="mt-3 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
                  />
                )}

                {imageMode === "upload" && (
                  <div className="mt-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full flex-col items-center justify-center rounded-md border border-dashed border-white/10 bg-white/[0.02] px-4 py-8 text-white/30 hover:bg-white/[0.04] hover:text-white/60"
                    >
                      <Upload size={20} />

                      <span className="mt-3 text-xs">
                        Choose image from your computer
                      </span>

                      <span className="mt-1 text-[9px] text-white/20">
                        PNG, JPG or WEBP · Maximum 5 MB
                      </span>
                    </button>
                  </div>
                )}
              </div>

              <div className="rounded-md border border-white/10 bg-black/20 p-4">
                <div className="text-[9px] uppercase tracking-[0.15em] text-white/25">
                  Crop Preview
                </div>

                <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                  <div className="min-w-0 flex-1">
                    <div className="flex min-h-[360px] items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-black/40 p-3">
                      {editImage ? (
                        <ReactCrop
                          crop={editCrop}
                          onChange={(nextCrop) => {
                            setEditCrop(nextCrop);
                          }}
                          aspect={3 / 4}
                          keepSelection
                          ruleOfThirds
                          className="max-h-[500px] max-w-full"
                        >
                          <img
                            ref={editImageRef}
                            src={editImage}
                            alt={editName || "Player"}
                            draggable={false}
                            onLoad={(event) => {
  if (editCrop && editCrop.width > 0 && editCrop.x !== 25) return;

  const { width, height } = event.currentTarget;

  const crop = centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 75,
      },
      3 / 4,
      width,
      height,
    ),
    width,
    height,
  );

  setEditCrop(crop);
}}
                            className="block max-h-[500px] max-w-full select-none object-contain"
                          />
                        </ReactCrop>
                      ) : (
                        <div className="flex h-[360px] w-full items-center justify-center">
                          <span className="text-4xl font-semibold text-white/10">
                            {editName.charAt(0) || "?"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="min-w-0 sm:w-[190px]">
                    <div className="flex items-center gap-2 text-sm font-medium text-white">
                      <CountryFlag
                        code={findCountry(editCountry)?.code}
                        title={editCountry ?? undefined}
                        className="h-4 w-auto"
                      />

                      {editName || "Player Name"}
                    </div>

                    <div className="mt-2 grid w-full grid-cols-6 gap-1">
                      {editPositions.map((position) => (
                        <div
                          key={position}
                          className="flex h-6 min-w-0 items-center justify-center overflow-hidden rounded-[3px] border border-white/10 bg-black/20"
                        >
                          <span className="whitespace-nowrap px-1 text-center text-[8px] font-medium leading-none text-white/55">
                            {position}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <span
                        className={`h-3 w-3 rounded-full ${getStatusDot(
                          editStatus,
                        )}`}
                      />

                      <span className="text-sm font-semibold text-white/70">
                        {editClub.trim()
                          ? editClub
                          : getStatusLabel(editStatus)}
                      </span>
                    </div>

                    <div className="mt-2 text-sm font-semibold text-white/70">
                      {editSigningValue
                        ? `${editSigningValue} TCP`
                        : "No value"}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditCrop({
                          unit: "%",
                          x: 25,
                          y: 16.6667,
                          width: 50,
                          height: 66.6667,
                        });
                      }}
                      disabled={!editImage}
                      className="mt-4 rounded-md border border-white/10 px-3 py-2 text-[10px] text-white/40 hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Reset Crop
                    </button>

                    <p className="mt-3 text-[9px] leading-4 text-white/20">
                      Drag the 3:4 frame over the image to choose the exact part
                      that will appear on the player card.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-white/10 px-6 py-4">
              <button
                type="button"
                onClick={closeEditor}
                className="rounded-md border border-white/10 px-4 py-2 text-xs text-white/40 hover:bg-white/[0.05] hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={savePlayer}
                className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-xs font-medium text-black hover:bg-white/90"
              >
                <Save size={14} />
                Save Player
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
