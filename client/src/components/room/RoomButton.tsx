import { useNavigate } from "react-router-dom";

type Props = {
  name: string;
  buttonName: string;
  user01?: string;
  user02?: string;
  roomName:string
};

// ボタンコンポーネント
    const  RoomButton = ({ name, buttonName, user01, user02,roomName }: Props) => {
    const navigate = useNavigate();

    const handleClick = async () => {

        
        
        const response = await fetch(`http://localhost:3000/api/room/getRoomId?name=${roomName}`)

        const data = await response.json();
        navigate(`${name}?roomId=${data.id}`, {
        state: {
            user01,
            user02,
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