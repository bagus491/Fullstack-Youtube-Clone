import { useEffect, useState } from "react"
import { Spinner,Container } from "react-bootstrap"
import { CheckProfile } from "../../utils/ProfileFetch"
import { useNavigate, useParams } from "react-router-dom"

export const ProfileCompo = () => {
    const [getSpinner , setgetSpinner] = useState(false)
    const [dataProfile, setdataProfile] = useState()
    const Navigate = useNavigate()
    const {PrName} = useParams()

    useEffect(() => {
        setTimeout(() => {
            setgetSpinner(true)
        },1000) 
        const FetchProfile = async () => {
            try{
                const respone = await CheckProfile()
                if(!respone.ok){
                    Navigate('/login')
                }

                if(respone.status === 203){
                    Navigate('/dasbord/add')
                    return false
                }

                const json = await respone.json()
                setdataProfile(json.Data)
            }catch(error){
                console.error(error)
            }
        }
        FetchProfile()
    },[Navigate,PrName])
    return(
        <>
    	{
            getSpinner ?    
    		<div className="col-md-4">
    		    <div className="card profile-card-3">
    		        <div className="background-block">
    		            <img src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="profile-sample1" className="background"/>
    		        </div>
    		        <div className="profile-thumb-block">
    		            <img src={dataProfile.ImagePath} alt="profile" className="profile"/>
    		        </div>
    		        <div className="card-content">
                    <h6>{dataProfile.PrName}</h6>
                    <p>Subs:{dataProfile.Subs}</p>
                    <p>{dataProfile.Desc}</p>
                    </div>
                </div>
    		</div>
    		
            :
            <Container style={{display: 'flex', height: '10vh', justifyContent: 'center',alignItems: 'flex-end'}}>
            <Spinner animation="grow" variant="info" />
            </Container>
            
        }
        </>
    )
}