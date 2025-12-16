import Card from "../../components/Card";
import RoomButton from "../../components/room/RoomButton";
import { useMatch } from "../../hooks/useMatch"; 

const Match = () => {
  const { roomName, user1, user2, card, setCard } = useMatch();

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center flex-col">
      <div className="w-full max-w-md space-y-4">
        <Card title={user1} />
        <Card title={user2} />
      </div>

      {card ? (
        <RoomButton
          name="/CountryBattleGame"
          buttonName="決定"
          user01={user1}
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
