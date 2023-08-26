import { Form,Button} from "react-bootstrap"
import {BsFillWalletFill as Username,BsFillShieldLockFill as Password} from 'react-icons/bs'

import ProfilePict from '../../Assets/Images/user-profile-icon-front-side-with-white-background_187299-40010-removebg-preview.png'
import { useNavigate } from "react-router-dom";

import { doLogin } from "../../utils/UserFetch";
import {  useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";

export const LoginCard = () => {
    const Navigate = useNavigate()
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const {handleInfo} = useContext(AuthContext)

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            const respone = await doLogin(username,password)
            const json = await respone.json()
            if(!respone.ok){
                return alert('check Username or Password')
            }

            alert(json.msg)
            handleInfo(json.token)
            Navigate('/dasbord')
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
                        <span className="signup"><a href="/register">don't have account? Sign Up</a></span>
                    </div>
                    <form className="form-horizontal" onSubmit={handleLogin}>
                        <h3 className="title">Member Login</h3>
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
                        <button className="btn signin" type="submit">Login</button>
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