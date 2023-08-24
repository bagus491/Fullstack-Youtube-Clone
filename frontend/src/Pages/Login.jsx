import { Container,Spinner } from "react-bootstrap"
import { LoginCard } from "../Components/main-compo/LoginCard"
import '../Assets/scss/main.css'
import { useEffect, useState } from "react"

export const LoginPage = () => {
    const [getSpinner ,setgetSpinner] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setgetSpinner(true)
        }, 1000);
    },[])

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