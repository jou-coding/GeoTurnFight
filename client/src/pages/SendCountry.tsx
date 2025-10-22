import Button from "../components/Button"

const  SendCountry:React.FC = () => {
    return(
        <div className="min-h-screen bg-gray-50 flex justify-center item-center flex-col">
            <div className=" flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 space-y-4">
                    <h2 className="text-2xl font-bold text-center">国名入力</h2>
                    <input type="text"  placeholder="国名を入力" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"/>
                    <Button name="/battle" buttonName="決定"></Button>
                    <div className="border">
                        <h2 className="font-bold text-center">履歴</h2>
                        <div className="text-center">###</div>
                           <div className="text-center">###</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendCountry