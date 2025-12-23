import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../lib/socket";
import type { PlayerId } from "./useCountryBattleGame";

type UseMatchReturn = {
  roomName: string;
  user1: string;
  user2: string;
  card: boolean;
  playerId?:PlayerId;
  currentPlayerId?:PlayerId
  checktoGame?:string
  setCard: (v: boolean) => void;
};

export function useMatch(): UseMatchReturn {
  const location = useLocation();

  // URLクエリから roomName を取得
  const roomName = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("roomName") ?? "";
  }, [location.search]);

  // localStorage の username を取得（getItemは string|null なのでこれで十分）
  const name = useMemo(() => {
    return localStorage.getItem("username") ?? "名無し";
  }, []);

  const [card, setCard] = useState(false);
  const [user1,setUser1] = useState("")
  const [user2, setUser2] = useState("");
  const [playerId,setPlayerId] = useState<PlayerId>(undefined)
  const [currentPlayerId,setCurrentPlayerId] = useState<PlayerId>(undefined)
  const [checktoGame,setChecktoGame]= useState<string>("")

  useEffect(() => {
    if (!roomName) return;

     const onMatchUpdate = (data: any) => {
      setUser1(data.player1);
      setUser2(data.player2);
     };
     
     const onAssignPlayer = (assignPlayerData:PlayerId) => {
        setPlayerId(assignPlayerData)
     }

     const onturnUpdate = (updateCurrentPlayerId:PlayerId) =>  {
      setCurrentPlayerId(updateCurrentPlayerId)
     }

     const ontoGameButton = (checkplayer2:{player2:string}) => {
      let checkPlayerUsername = checkplayer2.player2
      setChecktoGame(checkPlayerUsername)
     }

    socket.emit("joinGame", { roomName, userName: name });
    socket.on("assignPlayer",onAssignPlayer)
    socket.on("matchUpdate",onMatchUpdate)
    socket.on("turnUpdate",onturnUpdate)
    socket.on("toGameButton",ontoGameButton)

    return () => {
        socket.off("matchUpdate",onMatchUpdate)
        socket.off("assignPlayer",onAssignPlayer)
        socket.off("turnUpdate",onturnUpdate)
        socket.off("toGameButton",ontoGameButton)
    };
  }, [roomName,name ]);

  const useMatchData:UseMatchReturn = { roomName, user1, user2, card,playerId,currentPlayerId,checktoGame,setCard }
  
  return useMatchData
}
