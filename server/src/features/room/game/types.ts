export type PlayerId = "player1" | "player2";

export type PlayerInfo = {
  socketId: string;
  userName: string;
};

export type GameState = {
  turnPlayerId: PlayerId;
  submittedCountryNames: string[];
};

export type RoomState = {
  players: Partial<Record<PlayerId, PlayerInfo>>;
  userNames: string[];
  game: GameState;
};
