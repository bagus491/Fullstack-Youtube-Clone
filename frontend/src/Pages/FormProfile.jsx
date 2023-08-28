import { Container,Spinner } from "react-bootstrap"
import {AddProfile} from '../Components/main-compo/AddProfile'
import { AuthContext } from "../AuthContext"
import { CheckDasbord } from "../utils/UserFetch"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const ProfileAdd = () => {
    const {userInfo} = useContext(AuthContext)
    const [getSpinner, setgetSpinner] = useState(false)
    const [Check, setCheck] = useState(false)
    const Navigate = useNavigate()


    
    useEffect(() => {
        setTimeout(() => {
            setgetSpinner(true)
        },1000)

        if(!userInfo){
            Navigate('/login')
        }else{
            //fetch
            const Check = async () => {
                try{
                    const respone = await CheckDasbord()
                    if(!respone.ok){
                        setTimeout(() => {
                            Navigate('/login')
                        },1000)
                    }

                    if(respone.status === 200){
                        setCheck(true)
                    }
                }catch(error){
                    console.error(error)
                }
            }
            Check()
        }
    },[userInfo,Navigate])

    //sampe sini
    return(
        <>
      
        {
            getSpinner ?   
            <div>
                {
                    Check ?    
                    <Container style={{height: '80vh',display:'flex', justifyContent:'center',alignItems:'flex-end'}}>
                    <AddProfile />
                     </Container>
                    :
                    <h1>anda tidak punya akses</h1>
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