
import {Container,Spinner} from 'react-bootstrap'
import {Navigation} from '../Components/reusable/Navigation'
import { useEffect, useState } from "react"
import { CheckDasbord } from "../utils/UserFetch"
import { CardWatch } from "../Components/main-compo/CardWatch"
import '../Assets/scss/main.css';
import {  useParams } from 'react-router-dom'


export const WatchVideo = () => {
    const [getSpinner , setgetSpinner] = useState(false)
    const [Check , setCheck] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        const Fetch = async () =>{
            try{
                const respone = await CheckDasbord()
                if(!respone.ok){
                    console.error({msg : 'Not Authorization'})
                    setCheck(false)
                }

                if(respone.status === 200){
                    setCheck(true)
                }
                setgetSpinner(true)
            }catch(error){
                console.error(error)
            }
        }
     
        Fetch()
    },[id])
    return(
        <>
        {
            getSpinner ?   
            <div>
              <Navigation  cheked={Check}/>
              <Container>
              <CardWatch />
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