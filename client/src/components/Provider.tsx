import { useState,createContext } from "react";
import type { ReactNode } from "react";

export interface Room {
    id:number | null ;
    name:string | null;
    manage:object | null;
    ChangeId:(id:number) => void;
    ChangeName:(name:string) => void;
    ChangeManage:(manage:Manage) => void
}

export interface Manage {
    id:number;
    name:string
}

// Contextを作成。初期値はnull
export const RoomCotext = createContext<Room | null>(null)

// Providerコンポーネント
export default function RoomProvider({children}:{children:ReactNode}){
    
    const [id,setId] = useState<number | null>(null)
    const [name,SetName] = useState<string | null>(null)
    const [manage,setManage] = useState<Manage | null>(null)



    const ChangeId = (id:number) => {
        setId(id)
    }

    const ChangeName = (name:string) => {
        SetName(name)
    }

    const ChangeManage = (manage:Manage) => {
        setManage(manage)
    }

  
    if(id == null || name == null || manage == null){
        console.error("エラーです")
        

    }

    const value:Room = {
        id,name,manage,ChangeId,ChangeName,ChangeManage 

    }


    return(
        <RoomCotext.Provider value={value}>
              {children}
        </RoomCotext.Provider>
    )
}

