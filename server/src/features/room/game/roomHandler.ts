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
    const p1 = room.players.player1?.userName ?? null;
    const p2 = room.players.player2?.userName ?? null;

    //Gameページ遷移のための確認
    io.to(roomName).emit("toGameButton",{
      player2:room.players.player2?.userName ?? null
    })
    // 本人に通知
    socket.emit("assignPlayer", assignedPlayerId);

    // その部屋にいる全員に配信（片方だけ居る時も配る）
    io.to(roomName).emit("matchUpdate", {
      player1: p1,
      player2: p2,
    });

    // 部屋全体に「現在の手番」を通知（join時に同期）
    io.to(roomName).emit("turnUpdate", room.game.turnPlayerId);

    // 履歴も同期しておくと親切
    io.to(roomName).emit("historyUpdate", { countryNames: room.game.submittedCountryNames });
  });
}
