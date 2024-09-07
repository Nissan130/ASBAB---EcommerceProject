import React from 'react'
import './CSS/SignUp.css'
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  return (
    <div className='signup-container'>
        {/* <h2>SIGN UP</h2> */}
        <div className="signup-google">
                <button><FcGoogle />Sign Up By Google</button>
            </div>
            <div className='or'>
               OR
            </div>
        <form action="" className='form'>
            <input className='input-box'  type="text" placeholder='Enter Your Fullname' required/>
            <input className='input-box' type="email" placeholder='Enter Your Email' required />
            <input className='input-box' type="text" placeholder='Enter Your Mobile Number' required />
            <input className='input-box' type="password" placeholder='Enter Password' required />
            <p>Already have an account? <span className='signInLink'>Sign In</span></p> 
            <div className="checkbox">
                <input type="checkbox"/>
                <p>By continuing, I agree with the <span className='termsCondition'>terms & conditions</span></p>
            </div>
            <input type="submit" value="Continue" className='submit-btn' />
            
        </form>
        
    </div>
  )
}

export default SignUp
