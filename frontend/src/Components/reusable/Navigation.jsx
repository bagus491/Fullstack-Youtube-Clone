import { useEffect, useState } from "react"

import {BsFillGrid3X2GapFill as ForButton ,BsCameraVideoFill as Logo, BsFillCapslockFill as Upload , BsFillChatDotsFill as Notif , BsFillPersonFill as Profile
,BsHouseDoor as Beranda
} from 'react-icons/bs'

import {Button,Form} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {Container,Spinner} from 'react-bootstrap'
import { doLogout } from "../../utils/UserFetch"

import { CheckProfile } from "../../utils/ProfileFetch"

export const Navigation = ({cheked}) => {
    const [Check, setCheck] = useState(false)
    const [sidebar,setsidebar] = useState(false)
    const [openProfile, setopenProfile] = useState(false)
    const [openNotif,setopenNotif] = useState(false)
    const [SpinnerP , setSpinnerP] = useState(false)
    const [dataProfile, setdataProfile] = useState()
    const Navigate = useNavigate()
    const CheckNavbar = cheked
    useEffect(() => {
        if(CheckNavbar){
            setCheck(true)
        }else {
          setCheck(false)
        }

        const FetchProfile = async() => {
          try{
            const respone = await CheckProfile()
            if(!respone.ok){
             console.error({msg : 'Error'})
            }

            if(respone.status === 203){
              setdataProfile(false)
              return false
            }

            const json = await respone.json()
            //map
           setdataProfile(json.Data)
          }catch(error){
            console.error(error)
          }
        }
       FetchProfile()
    },[CheckNavbar])

    const getSidebar = () => {
       if(sidebar === false){
        setsidebar(true)
       }else {
        setsidebar(false)
       }
    }

    const handleOpen = () => {
      if(openProfile === false){
        setopenProfile(true)
        setopenNotif(false)
        setTimeout(() => {
          setSpinnerP(true)
        },2000)
      }else{
        setopenProfile(false)
        setSpinnerP(false)
      }
    }

    const handleNotif  = () => {
      if(openNotif === false){
        setopenNotif(true)
        setopenProfile(false)
        setTimeout(() => {
          setSpinnerP(true)
        },2000)
      }else{
        setopenNotif(false)
        setSpinnerP(false)
      }
    }

    //handleLogout
    const handleLogout = async () => {
      try{
        const respone = await doLogout()
        if(!respone.ok){
          Navigate('/login')
        }

        const json = await respone.json()
        alert(json.msg)
        Navigate('/login')
      }catch(error){
        console.error(error)
      }
    }


    return(
        <>
            <div className={sidebar ? 'side-navbar-active'  :  'side-navbar'}>
            <div className="logo">
            <div className="Open">
                    <Button className="button" onClick={() => getSidebar()}><ForButton style={{color: 'black'}}/></Button>
            </div>
                <div className="logo-tittle">
                {
                    Check  ?     
                    <Button className="logo-btn"  onClick={() => Navigate('/dasbord')}>
                    <div className="logo-pict">
                      <Logo />
                    </div>
                    <div className="logo-text">
                       <p>YouDo</p>
                    </div>
                    </Button>
                    :
                    <Button className="logo-btn"  onClick={() => Navigate('/')}>
                    <div className="logo-pict">
                      <Logo />
                    </div>
                    <div className="logo-text">
                       <p>YouDo</p>
                    </div>
                    </Button>
                  }
                    
                </div>
            </div>

            {/* beranda */}
            <div className="beranda">
              {
                Check  ?   
                <Button className="button" onClick={() => Navigate('/')}>
                <Beranda style={{width: '30px',height: '20px'}}/>
                <h6 style={{marginLeft: '20px'}}>Beranda</h6>
                </Button>
                :
                <Button className="button" onClick={() => Navigate('/')}>
                <Beranda style={{width: '30px',height: '20px'}}/>
                <h6 style={{marginLeft: '20px'}}>Beranda</h6>
                </Button>
              }
            </div>

            {/* search */}
              <div className="search-side">

            <Form className="d-flex" style={{marginTop: '10px', flexDirection: 'column'}}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <br></br>
            <Button variant="outline-primary">Search</Button>
          </Form>
               </div>
            </div>


            <div className='top-navbar'>
               <div className="logo">
                <div className="Open">
                    <Button className="button" onClick={() => getSidebar()}><ForButton style={{color: 'black'}}/></Button>
                </div>
                <div className="logo-tittle">
                  {
                    Check  ?     
                    <Button className="logo-btn"  onClick={() => Navigate('/')}>
                    <div className="logo-pict">
                      <Logo />
                    </div>
                    <div className="logo-text">
                       <p>YouDo</p>
                    </div>
                    </Button>
                    :
                    <Button className="logo-btn"  onClick={() => Navigate('/')}>
                    <div className="logo-pict">
                      <Logo />
                    </div>
                    <div className="logo-text">
                       <p>YouDo</p>
                    </div>
                    </Button>
                  }
                  
                    
                </div>
               </div>

               <div className="search">

            <Form className="d-flex" style={{marginTop: '10px'}}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary">Search</Button>
          </Form>
               </div>
               {
                Check ?
                <div>
                  {
                    dataProfile ?   
                      <div className="after-login">
                      <div className="last">
                          <Button  className="last-upload" onClick={() => Navigate('/dasbord/upload')}><Upload/></Button>
                          <Button  className="last-Notif" onClick={() => handleNotif()}><Notif /></Button>
  
                          <div className={openNotif ? "notif-box-active" : "notif-box"  }>
                            {
                              SpinnerP ?     
                              <div>
                                <h1>Notif</h1>
                              </div>
                              :
                              <Container style={{display: 'flex', height: '20vh', justifyContent: 'center',alignItems: 'flex-end'}}>
                              <Spinner animation="grow" variant="info" />
                              </Container>
                            }
                          </div>
  
                          <Button className="last-Profile" onClick={() => handleOpen()}>
                            <Profile />
                          </Button>
                          <div className={openProfile ? 'profile-box-active'  :'profile-box ' }>
                            {
                              SpinnerP ?     
                              <div className="profile-box-list">
                                <div className="profile-box-flex">
                                <div className="name">
                                <img src={dataProfile.ImagePath} alt="foto"></img>
                                <h6>{dataProfile.PrName}</h6>
                                </div>
                                <div className="list">
                                <Button className="button" onClick={() => Navigate(`/profile/${dataProfile.PrName}`)}>Profile</Button>
                                <Button className="button" onClick={() => Navigate('/dasbord/setting')}>Setting</Button>
                                <Button className="button" onClick={() => handleLogout()}>Logout</Button>
                                </div>
                                </div>
                              </div>
                              :
                              <Container style={{display: 'flex', height: '20vh', justifyContent: 'center',alignItems: 'flex-end'}}>
                              <Spinner animation="grow" variant="info" />
                              </Container>
                            }
                          </div>
                      </div>
                      </div>
                    : 
                 <div className="after-login">
                    <div className="last">
                        <Button  className="last-upload" onClick={() => Navigate('/dasbord/upload')}><Upload/></Button>
                        <Button  className="last-Notif" onClick={() => handleNotif()}><Notif /></Button>

                        <div className={openNotif ? "notif-box-active" : "notif-box"  }>
                          {
                            SpinnerP ?     
                            <div>
                              <h1>Notif</h1>
                            </div>
                            :
                            <Container style={{display: 'flex', height: '20vh', justifyContent: 'center',alignItems: 'flex-end'}}>
                            <Spinner animation="grow" variant="info" />
                            </Container>
                          }
                        </div>

                        <Button className="last-Profile" onClick={() => handleOpen()}><Profile /></Button>
                        <div className={openProfile ? 'profile-box-active'  :'profile-box ' }>
                          {
                            SpinnerP ?     
                            <div className="profile-box-list">
                              <div className="profile-box-flex">
                              <div className="name">

                              </div>
                              <div className="list">
                              <Button className="button" onClick={() => Navigate('/dasbord/profile')}>Profile</Button>
                              <Button className="button" onClick={() => Navigate('/dasbord/setting')}>Setting</Button>
                              <Button className="button" onClick={() => handleLogout()}>Logout</Button>
                              </div>
                              </div>
                            </div>
                            :
                            <Container style={{display: 'flex', height: '20vh', justifyContent: 'center',alignItems: 'flex-end'}}>
                            <Spinner animation="grow" variant="info" />
                            </Container>
                          }
                        </div>
                    </div>
                 </div>
                  }
                </div>
                  : 
                <div className="before-login">
                    <div className="last">
                    <Button style={{marginRight: '5px', background: '#F2594B',border: 'none'}} onClick={() => Navigate('/login')}>Login</Button>
                    <Button onClick={() => Navigate('/register')}>Create Account</Button>
                    </div>
                </div>
               }
            </div>
        </>
    )
}