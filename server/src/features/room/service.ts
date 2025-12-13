import type { DefaultEventsMap, Server, Socket } from "socket.io";
import type { PlayerId, PlayerInfo } from "./game/types.js";


// 部屋ごとのユーザー名一覧
const roomUserNames: Record<string, string[]> = {};

// 国名の正解データ
const validCountryNames = ["二ホン", "カンコク", "アメリカ"];

// これまでに言われた国名のリスト
const submittedCountryNames: string[] = [];

// true のとき player1 のターン
let isPlayer1TurnFlag: boolean = true;

// boolean のターンを反転させる
const toggleIsPlayer1TurnFlag = () => {
  isPlayer1TurnFlag = !isPlayer1TurnFlag;
};



// 部屋ごとのプレイヤー情報（サーバー管理）
const roomsByName: Record<
  string,
  {
    player1?: PlayerInfo;
    player2?: PlayerInfo;
  }
> = {};

export function registerRoomHandler(
  socket: Socket,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  // クライアントから[ゲームに参加したい]とき
  socket.on(
    "joinGame",
    ({ roomName, userName }: { roomName: string; userName: string }) => {
      // 部屋の箱がなければ作る
      if (!roomsByName[roomName]) {
        roomsByName[roomName] = {};
      }

      const roomInfo = roomsByName[roomName];

      let assignedPlayerId: PlayerId | null = null;

      // ① すでにこのユーザーが player1 の場合（StrictMode 2回目など）
      if (roomInfo.player1?.userName === userName) {
        assignedPlayerId = "player1";
        console.log("既に player1 として割り当て済み:", userName);
      }
      // ② すでにこのユーザーが player2 の場合
      else if (roomInfo.player2?.userName === userName) {
        assignedPlayerId = "player2";
        console.log("既に player2 として割り当て済み:", userName);
      }
      // まだ player1 がいないなら、あなたが player1
      else if (!roomInfo.player1) {
        roomInfo.player1 = { socketId: socket.id, userName };
        assignedPlayerId = "player1";
      }
      // 次に来た人は player2
      else if (!roomInfo.player2) {
        roomInfo.player2 = { socketId: socket.id, userName };
        assignedPlayerId = "player2";
      }
      // それ以上は満員
      else {
        socket.emit("errorMessage", "この部屋は満員です");
        return;
      }

      // 部屋に参加させる
      socket.join(roomName);

      // 本人にだけ[あなたは player1 / player2] と教える
      socket.emit("assignPlayer", assignedPlayerId);
      console.log(
        `room=${roomName} user=${userName} を ${assignedPlayerId} に割り当てます。`
      );
    }
  );

  // 現在の手番 (PlayerId)
  let currentTurnPlayerId: PlayerId = "player1";

  // 今の手番を接続してきたクライアントに教える
  socket.emit("turnUpdate", currentTurnPlayerId);

  // クライアントからの参加要求（ルーム一覧用）
  socket.on("joinRoom", (payload) => {
    // エラー回避（後で型をしっかり定義してもOK）
    if (payload == null) return;

    const { roomName, userName } = payload;

    if (!roomName || !userName) return;

    socket.join(roomName);

    // ユーザー一覧を更新
    const existingUserNames = roomUserNames[roomName] ?? [];
    if (!existingUserNames.includes(userName)) {
      roomUserNames[roomName] = [...existingUserNames, userName];
    }

    // その部屋にいる全員へ最新メンバーを配信
    io.to(roomName).emit("roomUsers", roomUserNames[roomName]);
  });

  // 国名のチェック関数
  socket.on("checkCountry", (payload) => {
    console.log("送ったデータ:", payload);

    // データの取り出し
    const submittedCountry = payload.country as string;
    const submittedPlayerId = payload.player as PlayerId;

    // 手番チェック（不正防止）
    if (submittedPlayerId !== currentTurnPlayerId) {
      socket.emit("errorMessage", "今はあなたの番じゃないよ");
      return;
    }

    validCountryNames.forEach((validCountryName) => {
      // 正解データか確認
      const isCorrect = validCountryName === submittedCountry;

      // すでに同じ回答があるか確認
      const isAlreadyUsed = submittedCountryNames.some(
        (existingCountryName) => existingCountryName === submittedCountry
      );

      if (isCorrect && !isAlreadyUsed) {
        // 新しい正解を追加
        submittedCountryNames.push(submittedCountry);

        // 手番交代
        currentTurnPlayerId = currentTurnPlayerId === "player1" ? "player2" : "player1";

        // 全クライアントに現在の手番(PlayerId)を通知
        io.emit("turnUpdate", currentTurnPlayerId);

        // boolean フラグのほうも更新
        toggleIsPlayer1TurnFlag();
        io.emit("turn", isPlayer1TurnFlag);

        // 履歴を配信
        io.emit("historyUpdate", { countryNames: submittedCountryNames });

        console.log(submittedCountryNames);
      }
    });
  });
}
