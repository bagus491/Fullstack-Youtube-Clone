import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../AuthContext"
import { useNavigate } from "react-router-dom"
import {Spinner} from 'react-bootstrap';

import { CheckDasbord } from "../utils/UserFetch";
import { Navigation } from "../Components/reusable/Navigation";

export const DasbordPage = () => {
    const {userInfo,handleInfo} = useContext(AuthContext)
    const Navigate = useNavigate()
    const [Check, setCheck] = useState(false)

    useEffect(() => {
        if(!userInfo){
            Navigate('/login')
        }else {
            const Check = async () => {
                const respone  = await CheckDasbord()
                if(!respone.ok){
                    setTimeout(() => {
                        Navigate('/login')
                    },1000)
                }
                
                
                    if(respone.status === 200){
                           setCheck(true)

                    }
            }
            Check()
        }
    },[userInfo,Navigate,handleInfo])
    return(
        <>
        {
            Check ?  
            <div>
                <Navigation cheked={Check}/>
            </div>
            : 
             <div> <Spinner animation="grow" variant="info" /></div>
        }
       
        </>
    )
}