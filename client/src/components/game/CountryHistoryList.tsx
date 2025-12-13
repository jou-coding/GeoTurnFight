// src/features/game/components/CountryHistoryList.tsx
type CountryHistoryListProps = {
  countryHistory: string[];
};

const CountryHistoryList: React.FC<CountryHistoryListProps> = ({ countryHistory }) => {
  return (
    <>
      {countryHistory.map((countryName, index) => (
        <div key={index} className="text-center">
          {countryName}
        </div>
      ))}
    </>
  );
};

export default CountryHistoryList;
