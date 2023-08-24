import { Container } from "react-bootstrap"
import { LoginCard } from "../Components/main-compo/LoginCard"
import '../Assets/scss/main.css'


export const LoginPage = () => {
    return(
        <>
         <Container className="CnLogin">
            <LoginCard />
        </Container>
        </>
    )
}