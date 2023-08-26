import { Container,Spinner } from "react-bootstrap"
import { LoginCard } from "../Components/main-compo/LoginCard"
import '../Assets/scss/main.css'
import {  useEffect, useState } from "react"
import { CheckLogin } from "../utils/UserFetch"
import { useNavigate } from "react-router-dom"


export const LoginPage = () => {
    const [getSpinner ,setgetSpinner] = useState(false)
    const Navigate = useNavigate()
  
    useEffect(() => {
                const Check = async () => {
                    try{
                        const respone = await CheckLogin()
                        if(!respone.ok){
                            setTimeout(() => {
                                setgetSpinner(true)
                                return false
                            },1000)
                        }
                        
                        
                            if(respone.status === 200){
                                    Navigate('/dasbord')
                            }
                    
                    }catch(error){
                        console.error(error)
                    }
                }
                Check()
        
    },[Navigate,])

    return(
        <>
         <Container className="CnLogin">
         {
                getSpinner ?      <LoginCard />    :  <div> <Spinner animation="grow" variant="info" /></div>
            }
        </Container>
        </>
    )
}