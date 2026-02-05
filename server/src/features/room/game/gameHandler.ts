import type { DefaultEventsMap, Server, Socket } from "socket.io";
import { getOrCreateRoom, canAcceptCountry, pushCountryAndSwitchTurn } from "./roomStore.js";
import type { PlayerId } from "./types.js";

export function registerGameHandler(
  socket: Socket,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {

  

  socket.on("checkCountry", ({ roomName, player, country }: { roomName: string; player: PlayerId; country: string }) => {
    const room = getOrCreateRoom(roomName);

    if(!roomName || !player || !country){
      console.error("Error",console.error("❌ Missing required values", {
          roomName,
          player,
          country,
       }))
    }
    // 手番チェック
    if (player !== room.game.turnPlayerId) {
      socket.emit("errorMessage", "今はあなたの番じゃないよ");
      return;
    }

    const { isValid, isUnused } = canAcceptCountry(room, country);

    if (!isValid) {
      socket.emit("errorMessage", "その国名は正解リストにありません");
      return;
    }
    if (!isUnused) {
      socket.emit("errorMessage", "その国名は既に使われています");
      return;
    }

    pushCountryAndSwitchTurn(room, country);
    


    // ✅ 通知は room に対して行う（全員同期）
    io.to(roomName).emit("turnUpdate", room.game.turnPlayerId);
    io.to(roomName).emit("historyUpdate", { countryNames: room.game.submittedCountryNames });
  });

  // result logic
  socket.on("loseGame",({ roomName, player,player1Name,
  player2Name,currentUserName }: { roomName: string; player: PlayerId,player1Name:string,
  player2Name:string,currentUserName:string}) => {

    const winnerPlayerName = currentUserName === player1Name ? player2Name :player1Name
    // lose logic
    // const winnerPlayer = player === "player1" ? "player2" : "player1"

    // 勝者:winnerPlayer

        // test soon delete
    io.to(roomName).emit("result",winnerPlayerName)

  })
}
