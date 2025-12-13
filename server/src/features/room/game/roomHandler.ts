import type { DefaultEventsMap, Server, Socket } from "socket.io";
import { getOrCreateRoom, findAssignedPlayerId, hasEmptySlot, assignPlayer } from "./roomStore.js";
import type { PlayerId } from "./types.js";

export function registerRoomHandler(
  socket: Socket,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  socket.on("joinGame", ({ roomName, userName }: { roomName: string; userName: string }) => {
    const room = getOrCreateRoom(roomName);

    // すでに割り当て済みか？
    let assignedPlayerId: PlayerId | null = findAssignedPlayerId(room, userName);

    // 空きがあれば割り当て
    if (!assignedPlayerId) {
      const empty = hasEmptySlot(room);
      if (!empty) {
        socket.emit("errorMessage", "この部屋は満員です");
        return;
      }
      assignPlayer(room, empty, socket.id, userName);
      assignedPlayerId = empty;
    }

    socket.join(roomName);

    // 本人に通知
    socket.emit("assignPlayer", assignedPlayerId);

    // 部屋全体に「現在の手番」を通知（join時に同期）
    io.to(roomName).emit("turnUpdate", room.game.turnPlayerId);

    // 履歴も同期しておくと親切
    io.to(roomName).emit("historyUpdate", { countryNames: room.game.submittedCountryNames });
  });
}
