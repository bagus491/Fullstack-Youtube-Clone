import { Navigation } from "../Components/reusable/Navigation";
import '../Assets/scss/main.css';
import { Container,Spinner } from "react-bootstrap";

import { CardVideo } from "../Components/reusable/CardVideo";
import { useEffect, useState } from "react"

export const HomeWeb = () => {
    const [getSpinner ,setgetSpinner] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setgetSpinner(true)
        }, 1000);
    },[])
    return(
        <>
        {
            getSpinner ?  
             <div>
            <Navigation />
            
            <Container>
            <CardVideo />
           </Container>
            </div> 
             : 
              <Container style={{height: '50vh', display:'flex', justifyContent:'center', alignItems: 'flex-end'}}><Spinner animation="grow" variant="info" /></Container>
        }
         
                 
                
            
          
        </>
    )
}