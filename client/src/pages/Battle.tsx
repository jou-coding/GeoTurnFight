import Button from "../components/Button"
import Card from "../components/Card"

const hoge = {
    title:"hoge"
}

const hoi = {
    title:"hoge"
}

const Battle = () => {
    return(
        <div className="min-h-screen bg-gray-50 flex justify-center  items-center flex-col">
            <div className="w-full max-w-md space-y-4">
                <Card title={hoge.title}/>
                <Card title={hoi.title} />
            </div>
            <Button name="/sendcountry" buttonName="決定"/>
        </div>

    )
}

export default Battle