import { Container,Spinner } from "react-bootstrap"
import { RegisterCard } from "../Components/main-compo/RegisterCard"
import '../Assets/scss/main.css'
import { useEffect, useState } from "react"

export const RegisterPage = () => {
    const [getSpinner ,setgetSpinner] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setgetSpinner(true)
        }, 1000);
    },[])
    return(
        <>
        <Container className="cnReg">
            {
                getSpinner ?     <RegisterCard />     :  <div> <Spinner animation="grow" variant="info" /></div>
            }
        </Container>
        </>
    )
}