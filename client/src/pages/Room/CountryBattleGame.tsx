// src/features/game/components/CountryBattleGamePage.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import HaibokuButton from "../../components/button/HaibokuButton";
import { useCountryBattleGame } from "../../hooks/useCountryBattleGame";
import TurnInfo from "../../components/game/TurnInfo";
import CountryHistoryList from "../../components/game/CountryHistoryList";
import CountryInputForm from "../../components/game/CountryInputForm";

const CountryBattleGamePage: React.FC = () => {
  const locationState = useLocation();
  const { user01: player1Name, user02: player2Name } = (locationState.state || {}) as {
    user01: string;
    user02: string;
  };

  const currentUserName = localStorage.getItem("username") ?? "no-name";

  const {
    inputCountryName,
    countryHistory,
    isPlayer1Turn,
    isSurrenderModalOpen,
    setInputCountryName,
    handleSubmitCountry,
    openSurrenderModal,
    // closeSurrenderModal, // 必要なら HaibokuButton 側で使う
  } = useCountryBattleGame({
    player1Name,
    player2Name,
    currentUserName,
  });

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center flex-col">
      <TurnInfo
        player1Name={player1Name}
        player2Name={player2Name}
        isPlayer1Turn={isPlayer1Turn}
      />
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 space-y-4">
          <CountryInputForm
            inputCountryName={inputCountryName}
            onChangeCountryName={setInputCountryName}
            onSubmitCountry={handleSubmitCountry}
            onOpenSurrenderModal={openSurrenderModal}
          />
          <div className="border">
            <h2 className="font-bold text-center">履歴</h2>
            <CountryHistoryList countryHistory={countryHistory} />
          </div>
        </div>
      </div>
      {isSurrenderModalOpen && (
        <HaibokuButton
          user01={player1Name}
          user02={player2Name}
          turn={isPlayer1Turn}
        />
      )}
    </div>
  );
};

export default CountryBattleGamePage;
