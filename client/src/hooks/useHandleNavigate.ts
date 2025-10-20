import { useNavigate } from "react-router-dom";


const useHandleNavigate = () => {
    const navigate = useNavigate()
        return  (page:string) => navigate(page)

}

export default useHandleNavigate