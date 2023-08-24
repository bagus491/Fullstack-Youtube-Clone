import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../AuthContext"
import { useNavigate } from "react-router-dom"

export const ProfilePage = () => {
    const {userInfo} = useContext(AuthContext)
    const Navigate = useNavigate()
    const [Check, setCheck] = useState(false)
    useEffect(() => {
        if(typeof userInfo !== 'undefined'){
            setCheck(true)
        }
    },[userInfo,Navigate])
    return(
        <>
        {
            Check ?  <h1>Hello ProfilePage</h1>:<h1>Anda Tidak Punya akses</h1>
        }
       
        </>
    )
}