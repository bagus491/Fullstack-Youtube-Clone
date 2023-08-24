import { Form,Button} from "react-bootstrap"
import {BsFillWalletFill as Username,BsFillShieldLockFill as Password} from 'react-icons/bs'

import ProfilePict from '../../Assets/Images/user-profile-icon-front-side-with-white-background_187299-40010-removebg-preview.png'
import { useNavigate } from "react-router-dom"

export const LoginCard = () => {
    const Navigate = useNavigate()
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
                    <form className="form-horizontal">
                        <h3 className="title">Member Login</h3>
                        <div className="form-group">
                            <span className="input-icon"><Username /></span>
                            <Form.Control
                          required
                          type="text"
                          placeholder="Username"
                        
                         />
                        </div>
                        <div className="form-group">
                            <span className="input-icon"><Password /></span>
                            <Form.Control
                            required
                          type="password"
                          placeholder="Password"
                        
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