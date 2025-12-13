// src/features/game/components/TurnInfo.tsx
type TurnInfoProps = {
  player1Name: string;
  player2Name: string;
  isPlayer1Turn: boolean;
};

const TurnInfo: React.FC<TurnInfoProps> = ({
  player1Name,
  player2Name,
  isPlayer1Turn,
}) => {
  return (
    <div className="text-center">
      {isPlayer1Turn ? `${player1Name} のターン` : `${player2Name} のターン`}
    </div>
  );
};

export default TurnInfo;
