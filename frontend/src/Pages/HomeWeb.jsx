import { Navigation } from "../Components/reusable/Navigation";
import '../Assets/scss/main.css';
import { Container } from "react-bootstrap";

import { CardVideo } from "../Components/reusable/CardVideo";
export const HomeWeb = () => {
    return(
        <>
           <Navigation />
           <Container>
            <CardVideo />
           </Container>
        </>
    )
}