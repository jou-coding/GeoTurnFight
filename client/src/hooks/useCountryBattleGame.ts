// src/features/game/hooks/useCountryBattleGame.ts
import { useEffect, useState } from "react";
import { useSocket } from "../pages/AppProvider";

export type PlayerId = "player1" | "player2" | undefined;

type UseCountryBattleGameParams = {
  player1Name: string;
  player2Name: string;
  currentUserName: string;
};

export function useCountryBattleGame({
  player1Name,
  player2Name,
  currentUserName,
}: UseCountryBattleGameParams) {
  const socket = useSocket();

  const [inputCountryName, setInputCountryName] = useState("");
  const [countryHistory, setCountryHistory] = useState<string[]>([]);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [myPlayerId, setMyPlayerId] = useState<PlayerId | null>(null);
  const [isSurrenderModalOpen, setIsSurrenderModalOpen] = useState(false);

  useEffect(() => {
    // 部屋に参加したことをサーバーに伝える
    socket.emit("joinGame", {
      roomName: "room1",
      userName: currentUserName,
    });

    // サーバー「あなたは player1 / player2 です」
    const handleAssignPlayer = (playerId: PlayerId) => {
      setMyPlayerId(playerId);
    };

    // 今の手番（player1 / player2）
    const handleTurnPlayerIdUpdate = (turnPlayerId: PlayerId) => {
      console.log("current turn playerId:", turnPlayerId);
      // 必要ならここで PlayerId ベースの状態も持てる
    };

    const handleSocketConnect = () => {
      console.log("socket connected");
    };

    const handleSocketConnectError = (err: unknown) => {
      console.log("接続エラー", err);
    };

    const handleSocketDisconnect = (reason: unknown) => {
      console.log("切断", reason);
    };

    const handleErrorMessage = (err: unknown) => {
      console.log("エラーメッセージ", err);
      alert(err);
    };

    // サーバーから送られてくる boolean ターン
    const handleTurnFlagUpdate = (nextIsPlayer1Turn: boolean) => {
      setIsPlayer1Turn(nextIsPlayer1Turn);
    };

    // 履歴更新イベント
    const handleCountryHistoryUpdate = (payload: { countryNames: string[] }) => {
      setCountryHistory(payload.countryNames);
    };

    socket.on("connect", handleSocketConnect);
    socket.on("connect_error", handleSocketConnectError);
    socket.on("disconnect", handleSocketDisconnect);
    socket.on("errorMessage", handleErrorMessage);
    socket.on("assignPlayer", handleAssignPlayer);
    socket.on("turnUpdate", handleTurnPlayerIdUpdate);
    socket.on("turn", handleTurnFlagUpdate);
    socket.on("historyUpdate", handleCountryHistoryUpdate);

    return () => {
      socket.off("connect", handleSocketConnect);
      socket.off("connect_error", handleSocketConnectError);
      socket.off("disconnect", handleSocketDisconnect);
      socket.off("errorMessage", handleErrorMessage);
      socket.off("assignPlayer", handleAssignPlayer);
      socket.off("turnUpdate", handleTurnPlayerIdUpdate);
      socket.off("turn", handleTurnFlagUpdate);
      socket.off("historyUpdate", handleCountryHistoryUpdate);
      console.log("cleanup: socket イベント解除");
    };
  }, [socket, currentUserName, player1Name, player2Name]);

  // 国名をサーバーに送信してチェックしてもらう
  const handleSubmitCountry = () => {
    console.log("inputCountryName:", inputCountryName);
    console.log("myPlayerId:", myPlayerId);

    socket.emit("checkCountry", {
      player: myPlayerId,
      country: inputCountryName,
    });

    setInputCountryName("");
  };

  const openSurrenderModal = () => setIsSurrenderModalOpen(true);
  const closeSurrenderModal = () => setIsSurrenderModalOpen(false);

  return {
    // 状態
    inputCountryName,
    countryHistory,
    isPlayer1Turn,
    isSurrenderModalOpen,
    player1Name,
    player2Name,
    // setter / handler
    setInputCountryName,
    handleSubmitCountry,
    openSurrenderModal,
    closeSurrenderModal,
  };
}
