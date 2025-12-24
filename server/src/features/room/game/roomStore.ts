import type { PlayerId, RoomState } from "./types.js";

const VALID_COUNTRY_NAMES = ["二ホン", "カンコク", "アメリカ"] as const;
const validCountrySet = new Set(VALID_COUNTRY_NAMES);

export function isValidCountryName(country: string) {
  return validCountrySet.has(country as any);
}


const roomsByName: Record<string, RoomState> = {};

export function getOrCreateRoom(roomName: string): RoomState {
  if (!roomsByName[roomName]) {
    roomsByName[roomName] = {
      players: {},
      userNames: [],
      game: {
        turnPlayerId: "player1",
        submittedCountryNames: [],
      },
    };
  }
  return roomsByName[roomName];
}

export function findAssignedPlayerId(room: RoomState, userName: string): PlayerId | null {
  if (room.players.player1?.userName === userName) return "player1";
  if (room.players.player2?.userName === userName) return "player2";
  return null;
}

export function assignPlayer(room: RoomState, playerId: PlayerId, socketId: string, userName: string) {
  room.players[playerId] = { socketId, userName };
}

export function hasEmptySlot(room: RoomState): PlayerId | null {
  if (!room.players.player1) return "player1";
  if (!room.players.player2) return "player2";
  return null;
}

export function addUserName(room: RoomState, userName: string) {
  if (!room.userNames.includes(userName)) room.userNames.push(userName);
}



export function canAcceptCountry(room: RoomState, country: string) {
  const isValid = isValidCountryName(country);
  const isUnused = !room.game.submittedCountryNames.includes(country);
  return { isValid, isUnused };
}

export function pushCountryAndSwitchTurn(room: RoomState, country: string) {
  room.game.submittedCountryNames.push(country);
  room.game.turnPlayerId = room.game.turnPlayerId === "player1" ? "player2" : "player1";
}
