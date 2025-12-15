import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../lib/socket"; // ←プロジェクトに合わせてパス調整

type UseMatchReturn = {
  roomName: string;
  name: string;
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
  const [user2, setUser2] = useState("");

  useEffect(() => {
    if (!roomName) return;

    // ① 受信イベント（相手ユーザー名を更新）
    const handleRoomUsers = (users: string[]) => {
      console.log("roomUsers received:", users);
      const other = users.find((u) => u !== name) ?? "";
      setUser2(other);
    };

    socket.on("roomUsers", handleRoomUsers);

    // ② 部屋参加（※ここは今のあなたのまま joinRoom）
    socket.emit("joinRoom", { roomName, userName: name });

    return () => {
      socket.off("roomUsers", handleRoomUsers);
    };
  }, [roomName, name]);

  return { roomName, name, user2, card, setCard };
}
