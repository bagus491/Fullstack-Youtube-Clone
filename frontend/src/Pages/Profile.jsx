import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container,Spinner } from "react-bootstrap"
import { CheckDasbord } from "../utils/UserFetch"
import { Navigation } from "../Components/reusable/Navigation"
import { ProfileCompo } from "../Components/main-compo/ProfileCompo"
import { CheckProfile } from "../utils/ProfileFetch"
import { Videolist } from "../Components/main-compo/VIdeoList"

export const ProfilePage = () => {
    const Navigate = useNavigate()
    const [Check, setCheck] = useState(true)
    const [getSpinner ,setgetSpinner] = useState(false)
    const {PrName} = useParams()

    useEffect(() => {
        setTimeout(() => {
            setgetSpinner(true)
        },1000)
            const Check = async () => {
                try{
                    const respone = await CheckDasbord()
                  if(respone.status === 401){
                    console.error({msg : 'Not Authorization'})
                    setCheck(false)
                  }


                    if(respone.status === 200){
                          //jika true
                          setCheck(true);
                        const FetchProfile = async() => {
                            try{
                              const respone = await CheckProfile()
                              if(respone.status === 404){
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
        
    },[Navigate,PrName])
    return(
        <>
       {
        getSpinner ?   
        <div>
                <div>
                    <Navigation cheked={Check}/>
                    <Container>
                    <div className="Profile">
                    <ProfileCompo />
                    </div>
                    <div className="List-Upload">
                       <Videolist  checkbutton={Check}/>
                    </div>
                    </Container>
                </div>
        </div>
        :

        <Container style={{display: 'flex', height: '50vh', justifyContent: 'center',alignItems: 'flex-end'}}>
        <Spinner animation="grow" variant="info" />
        </Container>
       }
       
        </>
    )
}