import Button from "../components/Button"

const ResultScreen = () => {
    return(
        <div className="min-h-screen flex justify-center">
            <div className="w-full max-w-sm space-y-5 m-3">
                <div className="border-b text-center  pb-3  ">結果</div>
                <div className="font-bold text-center text-3xl">勝利</div>
                <div className="flex flex-row gap-2">
                    <Button name="/Room" buttonName="終了"/>
                        <Button name="/Match" buttonName="もう一度" /> 
                </div>
            </div>
        </div>
    )
}

export default ResultScreen
