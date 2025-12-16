import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../lib/socket";

type UseMatchReturn = {
  roomName: string;
  user1: string;
  user2: string;
  card: boolean;
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

  useEffect(() => {
    if (!roomName) return;

     const onMatchUpdate = (data: any) => {
      setUser1(data.player1);
      setUser2(data.player2);
     };

    socket.emit("joinGame", { roomName, userName: name });

    socket.on("matchUpdate",onMatchUpdate)

    return () => {
        socket.off("matchUpdate",onMatchUpdate)
    };
  }, [roomName,name ]);

  return { roomName, user1, user2, card, setCard };
}
