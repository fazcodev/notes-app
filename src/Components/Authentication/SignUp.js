import React, {useContext, useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import AuthContext from "./AuthContext";
const SignUp = ()=>{

    const emailRef = useRef(); const passwordRef = useRef(); const passwordConfirmRef = useRef()
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    const {signup, currentUser} = useContext(AuthContext)
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            setError('Passwords do not match')
            return
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/')
            
        } catch(er) {
            console.log(er)
            setError('Failed to create an account')
        }
        setLoading(false)

        
    }
    return (
        <div className="container text-center flex flex-col justify-center rounded-lg shadow-[0px_3px_6px_6px_rgba(0,_0,_0,_0.16)] p-4 absolute w-2/3 md:w-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-3xl">SignUp</h1>
            <form className="text-left my-5" onSubmit={handleSubmit}>
                {error && <Alert severity="error">{error}</Alert>}
                <label htmlFor="username"><b>Email</b></label>
                <input ref={emailRef} className="inline-block mb-3 w-full px-2 py-1 border-solid border" name = 'username' placeholder="Username" type='email' required></input>
                <label  htmlFor="password"><b>Password</b></label>
                <input ref = {passwordRef}className="inline-block mb-4 w-full px-2 py-1 border-solid border" name = 'password' placeholder="Password" type='password' required></input>
                <label htmlFor="confirm-password"><b>Confirm Password</b></label>
                <input ref = {passwordConfirmRef}className="inline-block mb-4 w-full px-2 py-1 border-solid border" name = 'confirm-password' placeholder="Retype-Password" type='password' required></input>
                <div className="text-center">
                    <button disabled={loading} className="inline-block mx-auto text-white bg-blue-600 hover:bg-blue-700 shadow-[0px_2px_2px_1px_rgba(0,_0,_0,_0.16)] rounded-md py-1 px-2.5" type="submit">Sign Up</button>
                </div>
            </form>
            <div className="text-blue-600">Already have an account ? <Link to='/signin' className="font-bold hover:text-blue-700">Login</Link></div>
        </div>
    )
}

export default SignUp