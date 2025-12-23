import { useNavigate } from "react-router-dom";
import type { PlayerId } from "../../hooks/useCountryBattleGame";

type Props = {
  name: string;
  buttonName: string;
  user01?: string;
  user02?: string;
  playerId?:PlayerId;
  checkToGame?:string
  currentPlayerId:PlayerId
  roomName:string
};

// ボタンコンポーネント
    const  RoomButton = ({ name, buttonName, user01, user02,playerId,roomName ,checkToGame,currentPlayerId}: Props) => {
    const navigate = useNavigate();

        console.log(checkToGame)

    const handleClick = async () => {

        // 対戦相手が入っていないことを教える
        if(checkToGame === null){
            alert("対戦相手がルームに入っていません!!")
            return
        }
        const response = await fetch(`http://localhost:3000/api/room/getRoomId?name=${roomName}`)

        const data = await response.json();
        navigate(`${name}?roomId=${data.id}`, {
        state: {
            user01,
            user02,
            playerId,
            roomName,
            currentPlayerId
        },
        });
    };

    return (
        <button
        onClick={handleClick}
        className="px-4 py-2 rounded-md bg-blue-500 text-white"
        >
        {buttonName}
        </button>
        );
    };

export default RoomButton;