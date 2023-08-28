import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../AuthContext"
import { useNavigate } from "react-router-dom"
import {Container, Spinner} from 'react-bootstrap';

import { CheckDasbord } from "../utils/UserFetch";
import { Navigation } from "../Components/reusable/Navigation";
import { CheckProfile } from "../utils/ProfileFetch";
import { AddProfile } from "../Components/main-compo/AddProfile";

export const DasbordPage = () => {
    const {userInfo,handleInfo} = useContext(AuthContext)
    const Navigate = useNavigate()
    const [Check, setCheck] = useState(false)
    const [getSpinner ,setgetSpinner] = useState(false)
    const [dataProfile,setdataProfile] = useState()
    useEffect(() => {
        setTimeout(() => {
            setgetSpinner(true)
        },1000)
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
                        //    const FetchProfile = async() => {
                        //     try{
                        //       const respone = await CheckProfile()
                        //       if(!respone.ok){
                        //         Navigate('*')
                        //       }
                  
                        //       if(respone.status === 203){
                        //         setdataProfile(false)
                        //         return false
                        //       }
                  
                        //       setdataProfile(true)
                        //     }catch(error){
                        //       console.error(error)
                        //     }
                        //   }
                        //   FetchProfile()
                    }
            }
            Check()
        }
    },[userInfo,Navigate,handleInfo])
    return(
        <>
        {
            getSpinner ?  
            <div>
                {
                    Check ?    
                    <div>
                        {
                            dataProfile ?    
                            <div>
                                <Navigation cheked={Check}/>
                            </div>
                            :
                            <Container style={{height: '80vh',display:'flex', justifyContent:'center',alignItems:'flex-end'}}>
                                <AddProfile />
                            </Container>
                        }
                    </div>
                    :
                    <div><h1>ANDA TIDAK PUNYA AKSES</h1></div>
                }
            </div>
            :
            <Container style={{display: 'flex', height: '50vh', justifyContent: 'center',alignItems: 'flex-end'}}>
            <Spinner animation="grow" variant="info" />
            </Container> 
        }
        </>
    )
}