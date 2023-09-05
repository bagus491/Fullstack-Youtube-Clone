import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getVideos } from "../../utils/VideoFetch"
import {Card,Button,Spinner,Container} from 'react-bootstrap'
import { doSearch } from "../../utils/UserFetch"

export const CardVideo = () => {
    const [getSpinner, setgetSpinner] = useState(false)
    const [Datas , setDatas] = useState() 
    const Navigate = useNavigate()
    const {PrName} = useParams()
    const {search} = useLocation()


    useEffect(() => {
        if(search){
            const handleSearch = async () => {
                try{
                  //split
                  const splitsearch = search.split('=')
                  const Word = splitsearch[splitsearch.length - 1];
                  const respone = await doSearch(Word)
                  const json = await respone.json()     
                  setDatas(json.Datas)
                  setgetSpinner(true)
                }catch(error){
                  console.error(error)
                }
              }
          handleSearch()
        }else{
            const Fetch = async () => {
                try{
                    const respone = await getVideos()
                    if(!respone.ok){
                       console.error({msg : 'Not Authorization'});
                    }
    
                    if(respone.status === 401){
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
      
    },[Navigate,PrName,search])
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
                                        <br></br>
                                      <img src={e.ProfilePath} alt="profile" style={{width: '40x', height:'40px', borderRadius:'20px'}}></img>
                                      <Button onClick={() => Navigate(`/profile/${e.PrName}`)} style={{marginRight: '5px',background:'none', border:'none',color:'black'}}>{e.PrName}</Button>
            
                                      <Card.Title style={{marginTop:'10px'}}>Views: {e.Views}</Card.Title>
                        
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