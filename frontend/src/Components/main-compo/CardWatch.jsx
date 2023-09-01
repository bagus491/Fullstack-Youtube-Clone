import { useEffect, useState } from "react"
import {useNavigate, useParams} from 'react-router-dom'
import { watchVideo } from "../../utils/VideoFetch"
import { Spinner,Container,Card, Button } from "react-bootstrap"

export const CardWatch = () => {
    const [getSpinner, setgetSpinner] = useState(false)
    const [Data , setData] = useState()
    const [Datas , setDatas] = useState(false)
    const [DataProfile, setDataProfile] = useState(false)
    const Navigate = useNavigate()
    const {id} = useParams()

    const HandleChange  = (id) => {
        Navigate(`/watch/${id}`)
        document.location.reload()
    }

    useEffect(() => {
    const Fetch = async () => {
        try{
            const respone = await watchVideo(id)
            if(!respone.ok){
                Navigate('*')
            }

            if(respone.status === 203){
              Navigate('*')
              return false;
            }


                const json = await respone.json()

                setDatas(json.datas)
                setData(json.data)
                setDataProfile(json.DataProfile)
                setgetSpinner(true)
        }catch(error){
            console.error(error)
        }
    }
    Fetch()
    },[id,Navigate])
    return(
        <>
       {
        getSpinner ? 
        <div>
                <div className="main-watch">
                    {
                        Data ?    
                <div className="watch-video">
                   <div className="flex-watch">
                 <div className="content-video">  
                       <figure key={Data.VideoPath}>
                       <video controls autoPlay width={'100%'}>
                        <source src={Data.VideoPath} type="video/mp4"></source>
                       </video>
                       </figure>                 

                 </div>
                 <div className="content-profile">
                   <h1>{Data.Title}</h1>
                   {/* PICT CONTENT */}
                   <div className="profile-content">
                       <div className="profile-flex">
       
                           {/* borwn */}
                           <div className="profile-pict">
       
                               {/* pict */}
                              <div className="pict-box">
                               <img src={DataProfile.ImagePath} alt="foto"></img>
                              </div>
                           </div>
       
                           {/* profilse-sub name  */}
                           <div className="profile-sub">
                           <Button onClick={() => Navigate(`/profile/${DataProfile.PrName}`)} style={{marginRight: '5px',background:'none', border:'none',color:'black'}}>{DataProfile.PrName}</Button>
                              <p>{DataProfile.Subs}<span style={{fontSize: '13px', marginLeft: '5px'}}>Subscriber</span></p>
                           </div>
       
       
                       </div>
                   </div>
                   {/* done */}
       
                   {/* Desc */}
                   <div className="Profile-Desc">
                   <h6>Views : {Data.Views}</h6>
                   <p>{Data.Desc}</p>
                   <h6>{Data.Date}</h6>
                   </div>
                   {/* done */}
       
                 </div>
                   </div>
                </div>              
                        :
                        <h1>Kosong</h1>
                    }
       
       
                
                <div className="watch-side">
                 {
                   Datas ?   
                       Datas.map((e) => (
                           <Card style={{ width: '18rem' }} key={e._id} className="card-video">
                               <div className="card-content">
                                   <div className="card-img">
                                       <img src={e.ImgPath} alt="foto"></img>
                                   </div>
                               </div>
                           <Card.Body>
                           <Button style={{border: 'none', background:'none', color: 'black'}} onClick={() => HandleChange(e._id)}>{e.Title}</Button>
                             <Card.Subtitle className="mb-2 text-muted">Views : {e.Views}</Card.Subtitle>
                             <p>{e.username}</p>
                           </Card.Body>
                         </Card>
                       ))
                   :
       
                   <p>No Content</p>
                 }
                </div>
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