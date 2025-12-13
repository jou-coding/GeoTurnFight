import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSocket } from "../AppProvider";
import HaibokuButton from "../../components/button/HaibokuButton";
import TurnInfo from "../../components/game/TurnInfo";

type PlayerId = "player1" | "player2" | undefined;

const CountryBattleGame: React.FC = () => {
  // ルーティングから受け取るプレイヤー名
  const locationState = useLocation();
  const { user01: player1Name, user02: player2Name } = (locationState.state || {}) as {
    user01: string;
    user02: string;
  };

  // 自分のユーザー名
  const currentUserName = localStorage.getItem("username") ?? "no-name";

  // 自分がどちらのプレイヤーか（player1 / player2）
  let initialPlayerId: PlayerId | null = null;
  if (currentUserName === player1Name) initialPlayerId = "player1";
  if (currentUserName === player2Name) initialPlayerId = "player2";

  // 入力中の国名
  const [inputCountryName, setInputCountryName] = useState("");

  // これまでに正解した国名の履歴
  const [countryHistory, setCountryHistory] = useState<string[]>([]);

  // true のとき player1 のターン（＝ player1Name のターン）
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);

  // 自分がどちらのプレイヤーか（フロント管理）
  const [myPlayerId, setMyPlayerId] = useState<PlayerId | null>(initialPlayerId);

  // 敗北（降参）モーダル表示管理
  const [isSurrenderModalOpen, setIsSurrenderModalOpen] = useState(false);

  const socket = useSocket();

  // socket.io の連携
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
      // 必要なら、ここで PlayerId ベースのStateにしてもOK
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
      const updatedCountryHistory = payload.countryNames;
      setCountryHistory(updatedCountryHistory);
    };

    socket.on("connect", handleSocketConnect);
    socket.on("connect_error", handleSocketConnectError);
    socket.on("disconnect", handleSocketDisconnect);
    socket.on("errorMessage", handleErrorMessage);
    socket.on("assignPlayer", handleAssignPlayer);
    socket.on("turnUpdate", handleTurnPlayerIdUpdate);
    socket.on("turn", handleTurnFlagUpdate);
    socket.on("historyUpdate", handleCountryHistoryUpdate);

    // クリーンアップ関数（イベントだけ解除）
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

  // 履歴表示部分
  const renderCountryHistory = () => {
    return (
      <>
        {countryHistory.map((countryName, index) => (
          <div key={index} className="text-center">
            {countryName}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center flex-col">
      <TurnInfo player1Name={player1Name} player2Name={player2Name} isPlayer1Turn={false} />
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-center">国名入力</h2>
          <input
            type="text"
            placeholder="国名を入力"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            value={inputCountryName}
            onChange={(e) => setInputCountryName(e.target.value)}
          />
          <button
            className="p-3 bg-gray-500 rounded-lg hover:bg-gray-700 text-white"
            onClick={handleSubmitCountry}
          >
            決定
          </button>
          <button
            className="p-3 bg-blue-300 rounded-lg"
            onClick={() => setIsSurrenderModalOpen(true)}
          >
            降参
          </button>
          <div className="border">
            <h2 className="font-bold text-center">履歴</h2>
            {renderCountryHistory()}
          </div>
        </div>
      </div>
      {isSurrenderModalOpen && (
        <HaibokuButton user01={player1Name} user02={player2Name} turn={isPlayer1Turn} />
      )}
    </div>
  );
};

export default CountryBattleGame;
