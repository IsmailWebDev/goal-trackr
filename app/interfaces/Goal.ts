export interface Goal {
  id: number;
  playerId: number;
  goal: number;
  season: string;
  competition: string;
  date: Date;
  venue: string;
  team: string;
  logo: string;
  opponent: string;
  position?: string;
  minute: string;
  type_of_goal?: string;
  goal_assist?: string;
  winning_goal: boolean;
}
