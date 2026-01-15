import type { PlayerId, RoomState,Room } from "./types.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let validCountrySet: Set<string> | null = null;

initCountryCache()

export async function initCountryCache() {
  validCountrySet = new Set(
    (await prisma.country.findMany()).map((c:Room) => c.nameJa)
  );
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


export function isValidCountryName(country: string): boolean {
  if (!validCountrySet) {
    throw new Error("Country cache not initialized");
  }
  return validCountrySet.has(country);
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
