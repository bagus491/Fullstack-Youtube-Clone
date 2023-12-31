import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../AuthContext"
import { useNavigate } from "react-router-dom"
import { Container,Spinner } from "react-bootstrap"
import { CheckDasbord } from "../utils/UserFetch"
import { Navigation } from "../Components/reusable/Navigation"
import { CheckProfile } from "../utils/ProfileFetch"
import { Videolist } from "../Components/main-compo/VIdeoList"
export const SettingPage = () => {
    const {userInfo} = useContext(AuthContext)
    const Navigate = useNavigate()
    const [Check, setCheck] = useState(false)
    const [getSpinner, setgetSpinner] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setgetSpinner(true)
        },1000)
        if(!userInfo){
            Navigate('/login')
        }else{
            const Check = async () =>{
                try{
                    const respone = await CheckDasbord()
                    if(!respone.ok){
                        setTimeout(() => {
                            Navigate('/login')
                        },1000)
                    }

                    if(respone.status === 200){
                        setCheck(true)
                        const FetchProfile = async() =>{
                            try{
                                const responeProfile = await CheckProfile()
                                if(!responeProfile.ok){
                                    Navigate('/login')
                                }

                                if(responeProfile.status === 203){
                                    Navigate('/dasbord/add')
                                    return false
                                  }
                                
                            }catch(error){
                                console.error(error)
                            }
                        }
                        FetchProfile()
                    }
                }catch(error){
                    console.error(error)
                }
            }
            Check()
        }
    },[userInfo,Navigate])
    return(
        <>
        {
            getSpinner ?   
            <div>
                {
                    Check ? 
                    <div>
                        <Navigation  cheked={Check}/>
                        <Container>
                        <Videolist SettingCheck={Check}/>
                        </Container>
                    </div>
                    :

                    <div>
                        <h1>anda tidak punya akses</h1>
                    </div>
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