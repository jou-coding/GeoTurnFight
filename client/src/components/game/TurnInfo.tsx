import type { PlayerId } from "../../hooks/useCountryBattleGame";

// src/features/game/components/TurnInfo.tsx
type TurnInfoProps = {
  player1Name: string;
  player2Name: string;
  currentPlayerId?:PlayerId
  initialCurrentPlayerId?:PlayerId
};

const TurnInfo: React.FC<TurnInfoProps> = ({
  player1Name,
  player2Name,
  currentPlayerId,
  initialCurrentPlayerId
}) => {
  let turnInfomation = ""
  // 初期値のif文
  if(currentPlayerId === undefined){
    if(initialCurrentPlayerId === "player1"){
    turnInfomation = `${player1Name} のターン`
  }else if(initialCurrentPlayerId === "player2"){
    turnInfomation = `${player2Name} のターン`
  }
  }
  // 二回目からのcurrentPlayerId
  if(currentPlayerId === "player1"){
    turnInfomation = `${player1Name} のターン`
  }else if(currentPlayerId === "player2"){
    turnInfomation = `${player2Name} のターン`
  }

  return (
    <div className="text-center">
      現在のターン: {turnInfomation}
    </div>
  );
};

export default TurnInfo;
