import { Button, Form,Alert} from "react-bootstrap";
import {BsEnvelopeAt as Email ,BsFillWalletFill as Username,BsFillShieldLockFill as Password} from 'react-icons/bs';

import ProfilePict from '../../Assets/Images/user-profile-icon-front-side-with-white-background_187299-40010-removebg-preview.png';
import {useNavigate} from 'react-router-dom';

import { doRegister } from "../../utils/UserFetch";
import { useState } from "react";

export const RegisterCard = () => {
    const Navigate = useNavigate()
    const [username ,setusername] = useState('')
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('')
    const [message , setmessage] = useState()

    const handleRegister = async (e) => {
        e.preventDefault()
        try{
            const respone = await doRegister(username,password,email)
            const json = await respone.json()

            if(!respone.ok){
                return console.error({msg : 'Error'})
            }
            
            if(respone.status === 203){
                return setmessage(json)
            }

            alert(json.msg)
            Navigate('/login')
        }catch(error){
            console.error(error)
        }
    }

    return(
        <>
     <div className="form-bg">
    <div className="container">
        <div className="row">
            <div className="col-lg-offset-3 col-lg-6 col-md-offset-2 col-md-8">
                <div className="form-container">
                    <div className="form-icon">
                        <div className="for-profile">
                        <img src={ProfilePict} alt="foto"></img>
                        </div>
                        <span className="signup"><a href="/login">have account? Sign In</a></span>
                        <ul style={{listStyle: 'none'}}>
                            {
                                message ?
                                <Alert key='danger' variant='danger'>
                                {
                                    message.map((e) => (
                                        <li key={e.msg}>{e.msg}</li>
                                        ))
                                }
                                </Alert>
                                : <p></p>
                                }
                            </ul>
                    </div>

                    <form className="form-horizontal" onSubmit={handleRegister}>
                        <h3 className="title">Member Register</h3>

                        <div className="form-group">
                            <span className="input-icon"><Username /></span>
                            <Form.Control
                          required
                          type="text"
                          placeholder="Username"
                          name="username"
                          onChange={(e) => setusername(e.target.value)}
                         />
                        </div>
                        <div className="form-group">
                            <span className="input-icon"><Password /></span>
                            <Form.Control
                            required
                          type="password"
                          placeholder="Password"
                          name="password"
                          onChange={(e) => setpassword(e.target.value)}
                         />
                        </div>
                        <div className="form-group">
                            <span className="input-icon"><Email /></span>
                            <Form.Control
                            required
                          type="email"
                          placeholder="Email"
                          name="email"
                          onChange={(e) => setemail(e.target.value)}
                         />
                        </div>
                        <button className="btn signin" type="submit">Register</button>
                        <Button onClick={() => Navigate('/')}>Home</Button>
                    </form>

                </div>
            </div>
        </div>
    </div>
    </div>
        </>
    )
}