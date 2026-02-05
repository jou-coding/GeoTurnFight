// src/features/game/components/CountryInputForm.tsx
type CountryInputFormProps = {
  inputCountryName: string;
  onChangeCountryName: (value: string) => void;
  onSubmitCountry: () => void;
  onOpenSurrenderModal: () => void;
};

const CountryInputForm: React.FC<CountryInputFormProps> = ({
  inputCountryName,
  onChangeCountryName,
  onSubmitCountry,
  onOpenSurrenderModal,
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-center">国名入力</h2>
      <input
        type="text"
        placeholder="国名を入力"
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 "
        value={inputCountryName}
        onChange={(e) => onChangeCountryName(e.target.value)}
      />
      <div className="flex gap-4">
        <button
        className="flex-1 p-3 bg-gray-500 rounded-lg hover:bg-gray-700 text-white"
        onClick={onSubmitCountry}
      >
        決定
      </button>
      <button
        className="flex-1 p-3 bg-blue-300 rounded-lg"
        onClick={onOpenSurrenderModal}
      >
        降参
      </button>
      </div>
      
    </>
  );
};

export default CountryInputForm;
