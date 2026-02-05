// src/features/game/hooks/useCountryBattleGame.ts
import { useEffect, useState } from "react";
import { useSocket } from "../pages/AppProvider";

// 型定義
export type PlayerId = "player1" | "player2" | undefined;

type UseCountryBattleGameParams = {
  player1Name: string;
  player2Name: string;
  playerId:PlayerId
  roomName:string
  currentUserName: string;
};

// カスタムフック本体
export function useCountryBattleGame(useCountryBattleGameParamsData: UseCountryBattleGameParams) {

  // 引数の分解
  const {
  player1Name,
  player2Name,
  playerId,
  roomName,
  currentUserName,
} = useCountryBattleGameParamsData

// Socket インスタンス取得
  const socket = useSocket();
  // 自分のプレイヤーID
  const myPlayerId = playerId

  // state管理
  const [inputCountryName, setInputCountryName] = useState("");
  const [countryHistory, setCountryHistory] = useState<string[]>([]);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [isSurrenderModalOpen, setIsSurrenderModalOpen] = useState(false);
  const [currentPlayerId,setCurrentPlayerId] = useState<PlayerId>(undefined)
  // result state
  const [result,setResult] = useState<string>("引き分け")

  // Socketイベント登録
  useEffect(() => {

    // 現在の手番（player1 / player2）
    const handleTurnPlayerIdUpdate = (turnPlayerId: PlayerId) => {
      console.log("current turn playerId:", turnPlayerId);
      // 必要ならここで PlayerId ベースの状態も持てる
      setCurrentPlayerId(turnPlayerId)
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

    // 結果の送信
    const handleResult = (result:string) => {
      setResult(result)
      setIsSurrenderModalOpen(true)
    }

    socket.on("connect", handleSocketConnect);
    socket.on("connect_error", handleSocketConnectError);
    socket.on("disconnect", handleSocketDisconnect);
    socket.on("errorMessage", handleErrorMessage);
    socket.on("turnUpdate", handleTurnPlayerIdUpdate);
    socket.on("turn", handleTurnFlagUpdate);
    socket.on("historyUpdate", handleCountryHistoryUpdate);
    socket.on("result",handleResult)

    // クリーンアップ（イベント解除）
    return () => {
      socket.off("connect", handleSocketConnect);
      socket.off("connect_error", handleSocketConnectError);
      socket.off("disconnect", handleSocketDisconnect);
      socket.off("errorMessage", handleErrorMessage);
      socket.off("turnUpdate", handleTurnPlayerIdUpdate);
      socket.off("turn", handleTurnFlagUpdate);
      socket.off("historyUpdate", handleCountryHistoryUpdate);
      socket.off("result",handleResult)
      console.log("cleanup: socket イベント解除");
    };
  }, [socket, currentUserName, player1Name, player2Name]);

  // 国名送信処理
  const handleSubmitCountry = () => {
    console.log("inputCountryName:", inputCountryName);
    console.log("myPlayerId:", myPlayerId);
    
    socket.emit("checkCountry", {
      roomName:roomName,
      player: myPlayerId,
      country: inputCountryName,
    });
    // 入力欄リセット
    setInputCountryName("");
  };

  // モーダル制御
  const closeSurrenderModal = () => setIsSurrenderModalOpen(false);

  // 改造モーダル制御
  const openSurrenderModal = () =>{
    socket.emit("loseGame",{roomName,playerId,player1Name,
  player2Name,currentUserName})

  } ;
  

  // 返却データまとめ
 const matchGameData = {
  // 状態
  inputCountryName,
  countryHistory,
  isPlayer1Turn,
  isSurrenderModalOpen,
  player1Name,
  player2Name,
  currentPlayerId,
  result,

  // setter / handler
  setInputCountryName,
  handleSubmitCountry,
  openSurrenderModal,
  closeSurrenderModal,
};

return matchGameData;

}
