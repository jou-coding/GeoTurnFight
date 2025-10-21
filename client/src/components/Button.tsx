import React from "react"
import useHandleNavigate from "../hooks/useHandleNavigate"


type ButtonProps = {
  name: string;
  buttonName:string;
};

const  Button:React.FC<ButtonProps> =(props) => {

const goto = useHandleNavigate()
    return(
         <button type="button" 
                        onClick={() => goto(props.name)}
                        className="w-full  bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">{props.buttonName}</button>
    )
}

export default  Button


