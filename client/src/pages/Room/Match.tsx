import Card from "../../components/Card";
import RoomButton from "../../components/room/RoomButton";
import { useMatch } from "../../hooks/useMatch"; 

const Match = () => {
  const { roomName, name, user2, card, setCard } = useMatch();

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center flex-col">
      <div className="w-full max-w-md space-y-4">
        <Card title={name} />
        <Card title={user2} />
      </div>

      {card ? (
        <RoomButton
          name="/CountryBattleGame"
          buttonName="決定"
          user01={name}
          user02={user2}
          roomName={roomName}
        />
      ) : (
        <div
          id="btn"
          onClick={() => setCard(true)}
          className="bg-white rounded-lg p-3 hover:shadow-lg"
        >
          準備OK
        </div>
      )}
    </div>
  );
};

export default Match;
