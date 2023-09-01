import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {Container, Spinner} from 'react-bootstrap';

import { CheckDasbord } from "../utils/UserFetch";
import { Navigation } from "../Components/reusable/Navigation";
import { CardVideo } from "../Components/reusable/CardVideo";
import '../Assets/scss/main.css'

export const DasbordPage = () => {
    const Navigate = useNavigate()
    const [Check, setCheck] = useState(false)
    const [getSpinner ,setgetSpinner] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setgetSpinner(true)
        },1000)
            const Check = async () => {
                const respone  = await CheckDasbord()
                if(respone.status === 401){
                    console.error({msg : 'Not Authorization'})
                    setCheck(false)
                  }
                
                    if(respone.status === 200){
                           setCheck(true)
                           //edited(2)
                    }
            }
            Check()
     
    },[Navigate])
    return(
        <>
        {
            getSpinner ?  
            <div>
                <Navigation cheked={Check}/> 
                <Container>
                <CardVideo />                      
                </Container>
            </div>
            :
            <Container style={{display: 'flex', height: '50vh', justifyContent: 'center',alignItems: 'flex-end'}}>
            <Spinner animation="grow" variant="info" />
            </Container> 
        }
        </>
    )
}