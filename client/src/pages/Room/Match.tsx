import Card from "../../components/Card";
import RoomButton from "../../components/room/RoomButton";
import { useMatch } from "../../hooks/useMatch"; 

const Match = () => {

  const useMatchData = useMatch();

  const roomName = useMatchData.roomName
  const user1 = useMatchData.user1
  const user2 = useMatchData.user2
  const card = useMatchData.card
  const playerId = useMatchData.playerId
  const checktoGame  = useMatchData.checktoGame
  const currentPlayerId = useMatchData.currentPlayerId
  const setCard = useMatchData.setCard
  
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
          playerId={playerId}
          checkToGame={checktoGame}
          roomName={roomName}
          currentPlayerId={currentPlayerId}
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
