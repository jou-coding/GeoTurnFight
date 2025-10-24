import React from "react"
import useHandleNavigate from "../hooks/useHandleNavigate"

type ButtonProps = {
  name: string;
  buttonName:string;
  func?:() => Promise<Response> |void
};

const  Button:React.FC<ButtonProps> =(props) => {
  
const goto = useHandleNavigate()

  const handleClick = async () => {
    if (props.func) {
      const res = await props.func(); // async対応
      const data = await res?.json()
      if (res && res.ok ) { // 成功したら遷移
        if(data.room){
          goto(props.name);
        }else{
          alert("この部屋はありません")
        }
      } else {
        console.error("登録に失敗しました:", res);
      }
    } else {
      goto(props.name); // 関数がない場合はそのまま遷移
    }
  };

    return(
         <button type="button" 
                        onClick={() => handleClick()}
                        className="w-full  bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">{props.buttonName}</button>
    )
}

export default  Button


