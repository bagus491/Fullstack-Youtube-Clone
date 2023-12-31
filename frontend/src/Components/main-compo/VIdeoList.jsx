import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getVideoUpload,doDeleteVideo,VideoSetting } from "../../utils/VideoFetch"
import {Card,Button,Spinner,Container} from 'react-bootstrap'

export const Videolist = ({SettingCheck = false}) => {
    const [getSpinner, setgetSpinner] = useState(false)
    const [Datas , setDatas] = useState() 
    const Navigate = useNavigate()
    const {PrName} = useParams()

    const handleDelete = async(id) => {
        const ConfrimDelete = window.confirm('really?')
        if(ConfrimDelete){
            try{
                const respone = await doDeleteVideo(id)
                if(!respone.ok){
                    Navigate('*')
                }
    
                const json = await respone.json()
                alert(json.msg)
                window.location.reload()
            }catch(error){
                console.error(error)
            }
        }else{
            console.warn({msg : 'Unpecxted'})
        }
    }

    useEffect(() => {
        if(SettingCheck){
            const GetSettingVideo = async () =>{
                try{
                    const responeSetting = await VideoSetting()
                    if(!responeSetting.ok){
                        Navigate('/login')
                    }
    
                    if(responeSetting.status === 404){
                        setDatas(false)
                        return false
                    }
    
                    const jsonSetting = await responeSetting.json()
                    setDatas(jsonSetting.data)
                    setgetSpinner(true)
                }catch(error){
                    console.error(error)
                }
            }
            GetSettingVideo()
        }else{
            const Fetch = async () => {
                try{
                    const respone = await getVideoUpload(PrName)
                    if(!respone.ok){
                       console.error({msg : 'Not Authorization'});
                    }
    
                    if(respone.status === 404){
                        setDatas(false)
                        return false
                    }
    
                    const json = await respone.json()
                    setDatas(json.data)
                    setgetSpinner(true)
                }catch(error){
                    console.error(error)
                }
            }
            Fetch()
        }
    },[Navigate,PrName,SettingCheck])
    return(
        <>
            {
                getSpinner ? 
                <div>
                    {
                        Datas ?   
                        <div className="videobox">
                            {
                                Datas.map((e) => (
                                    <Card style={{ width: '18rem' }} key={e._id} className="card-video">
                                        <div className="content-card">
                                    <Card.Img variant="top" src={e.ImgPath}  className="imgCN"/>
                                    <figure className="videoCN">
                                        <video autoPlay muted width={'100%'} height={'100%'}>
                                            <source src={e.videoPath} type="video/mp4"></source>
                                        </video>
                                    </figure>
                                        </div>
                                    <Card.Body className="bodycard">
                                        <div className="body-flex">
                                      <Button onClick={() => Navigate(`/watch/${e._id}`)} style={{marginRight: '5px',background:'none', border:'none',color:'black', fontWeight: 'bold'}}>{e.Title}</Button>
                                      <Card.Title>Views: {e.Views}</Card.Title>
                                      {
                                        SettingCheck ?    
                                        <Button variant="danger" onClick={()=> handleDelete(e._id)}>Delete</Button>
                                        :

                                        <p></p>
                                      }
                                        </div>
                                    </Card.Body>
                                  </Card>
                                ))
                            }
                        </div>
                        :

                        <h1>Video Empty</h1>
                    }
                </div>
                : 
                <Container style={{display: 'flex', height: '2vh', justifyContent: 'center',alignItems: 'flex-end'}}>
                <Spinner animation="grow" variant="info" />
                </Container>
                
            }
        </>
    )
}