export type PlayerStatus = "active" | "free_agent" | "unavailable";

export type ContractWindow =
  | "pre_season"
  | "mid_season"
  | "pre_knockout";

export type TransactionType = "signing" | "renewal";

export type ContractPoint = {
  season: number;
  window: ContractWindow;
};

export type PlayerImageCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PlayerHistoryEntry = {
  id: string;
  season: number;
  type:
    | "signing"
    | "transfer"
    | "renewal"
    | "release"
    | "loan"
    | "return";
  club: string | null;
  fromClub?: string | null;
  toClub?: string | null;
  amount?: number | null;
  matches?: number | null;
  description: string;
  window?: ContractWindow | null;
};

export type Player = {
  id: string;
  name: string;
  country: string | null;
  countryCode: string | null;
  positions: string[];
  image: string;
  imageCrop?: PlayerImageCrop | null;
  club: string | null;
  assignedPosition: string | null;
  contractStart: ContractPoint | null;
  contractEnd: ContractPoint | null;
  signingValue: number | null;
  history: PlayerHistoryEntry[];
  status: PlayerStatus;
};