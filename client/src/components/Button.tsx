import React from "react"
import useHandleNavigate from "../hooks/useHandleNavigate"


type ButtonProps = {
  name: string;
  buttonName:string;
  func?:() => Promise<Response> |void
};

const  RegisterButton:React.FC<ButtonProps> =(props) => {
  
const goto = useHandleNavigate()

  const handleClick = async () => {
    if (props.func) {
      const res = await props.func(); // async対応
      if (res && res.ok ) { // 成功したら遷移
          console.log("通っている")
          goto(props.name);
      } else {
        console.error("登録に失敗しました:", res);
      }
    } 
  };

    return(
         <button type="button" 
                        onClick={() => handleClick()}
                        className="w-full  bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">{props.buttonName}</button>
    )
}

export default  RegisterButton


