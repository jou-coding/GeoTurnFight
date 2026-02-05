import { Link } from "react-router-dom"

const HaibokuButton = ({ user, result }: { user: string|undefined; result: string }) => {

  

            return(
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="w-full max-w-md flex justify-center bg-blue-300 p-50 rounded-lg">
                    <div className="w-full max-w-sm space-y-5 m-3">
                        <div className="border-b text-center  pb-3  ">結果</div>
                        <div className="font-bold text-center text-lg">{user}の{result}</div>
                        <div className="flex flex-row gap-2 justify-center">
                            <Link to="/room" className="bg-blue-500 p-10 rounded-lg"  >終了</Link>
                            <Link to="/match" className="bg-blue-500 p-10 rounded-lg">もう一度</Link>
                        </div>
                    </div>
                </div>
            </div>
            )

        }

export default  HaibokuButton