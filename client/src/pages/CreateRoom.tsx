import Button from "../components/Button"

const CreateRoom = () => {
 return(
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4  py-8">
        <div className="w-full max-w-md transform -translate-y-6  sm:-translate-y-8 bg-blue-500">
            <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-center mb-6">部屋のID入力</h2>
                <form className="space-y-4">
                    <input type="text"  placeholder="部屋のID入力" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"/>
                    <Button name="/battle" buttonName="決定"></Button>
                </form>
            </div>
            
        </div>
    </div>
 )
}

export default CreateRoom