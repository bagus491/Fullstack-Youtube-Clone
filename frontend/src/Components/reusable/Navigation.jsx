import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../AuthContext"
import {BsFillGrid3X2GapFill as ForButton ,BsCameraVideoFill as Logo, BsFillCapslockFill as Upload , BsFillChatDotsFill as Notif , BsFillPersonFill as Profile
,BsHouseDoor as Beranda
} from 'react-icons/bs'

import {Button,Form} from 'react-bootstrap'

export const Navigation = () => {
    const {userInfo} = useContext(AuthContext)
    const [Check, setCheck] = useState(false)
    const [sidebar,setsidebar] = useState(false)
    useEffect(() => {
        if(typeof userInfo !== 'undefined'){
            setCheck(true)
        }
    },[userInfo])


    const getSidebar = () => {
       if(sidebar === false){
        setsidebar(true)
       }else {
        setsidebar(false)
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
                    <Button className="logo-btn">
                    <div className="logo-pict">
                      <Logo />
                    </div>
                    <div className="logo-text">
                       <p>YouDo</p>
                    </div>
                    </Button>
                    
                </div>
            </div>

            {/* beranda */}
            <div className="beranda">
                <Button className="button">
                <Beranda style={{width: '30px',height: '20px'}}/>
                <h6 style={{marginLeft: '20px'}}>Beranda</h6>
                </Button>
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
                    <Button className="logo-btn">
                    <div className="logo-pict">
                      <Logo />
                    </div>
                    <div className="logo-text">
                       <p>YouDo</p>
                    </div>
                    </Button>
                    
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
                 <div className="after-login">
                    <div className="last">
                        <Button  className="last-upload"><Upload/></Button>
                        <Button  className="last-Notif"><Notif /></Button>
                        <Button className="last-Profile"><Profile /></Button>
                    </div>
                 </div>
                  : 
                <div className="before-login">
                    <div className="last">
                    <Button style={{marginRight: '5px', background: '#F2594B',border: 'none'}}>Login</Button>
                    <Button>Create Account</Button>
                    </div>
                </div>
               }
            </div>
        </>
    )
}