import { Container } from "react-bootstrap"
import { RegisterCard } from "../Components/main-compo/RegisterCard"
import '../Assets/scss/main.css'

export const RegisterPage = () => {
    return(
        <>
        <Container className="cnReg">
            <RegisterCard />
        </Container>
        </>
    )
}