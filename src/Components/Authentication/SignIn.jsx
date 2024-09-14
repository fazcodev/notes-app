import {useState, useRef, useContext} from "react";
import { Link, useNavigate} from "react-router-dom";
import googlelogo from '../../Images/google-icon.svg'
import AuthContext from "./AuthContext";
import { Alert } from "@mui/material";
const SignIn = ()=>{

    const emailRef = useRef(); const passwordRef = useRef();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    const {login, googleSignIn} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
            
        } catch(er) {
            setError('Failed to Login! Please verify the credentials')
        }
        setLoading(false)

        
    }
    const handleGoogleSignIn = async(e)=>{
        e.preventDefault()
        try {
            await googleSignIn()
            navigate('/')
        } catch (err) {
            setError(err.message)
        }
    }
    return (
        <div className="container text-center flex flex-col justify-center rounded-lg shadow-[0px_3px_6px_6px_rgba(0,_0,_0,_0.16)] p-4 fixed w-2/3 md:w-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-3xl">Log In</h1>
            {error && <Alert severity="error">{error}</Alert>}
            <button onClick={handleGoogleSignIn} className="border inline-block mx-auto w-fit border-blue-300 bg-gray-200 hover:bg-gray-300 my-3 px-3 py-1 text-sm font-semibold"><img className="w-5 inline-block mr-2" src={googlelogo} alt='Sign in with google' />Log in with google</button>
            <div><div className="inline-block w-1/6 h-0.5 border-b border-black"/><span className="relative top-1 text-xs"> or continue with email/username </span><div className="inline-block w-1/6 h-0.5 border-b border-black"/></div>
            <form className="text-left my-5" onSubmit={handleSubmit}>
                <label htmlFor="email"><b>Email</b></label>
                <input ref = {emailRef} id = 'email' className="inline-block mb-3 w-full px-2 py-1 border-solid border" name = 'email' placeholder="Email" type='email' required></input>
                <label  htmlFor="password"><b>Password</b></label>
                <input ref = {passwordRef} id = 'password' className="inline-block mb-4 w-full px-2 py-1 border-solid border" name = 'password' placeholder="Password" type='password' required></input>
                <div className="text-center">
                    <button disabled={loading} className="inline-block mx-auto text-white bg-blue-600 hover:bg-blue-700 shadow-[0px_2px_2px_1px_rgba(0,_0,_0,_0.16)] rounded-md py-1 px-2.5" type="submit">Log In</button>
                </div>
            </form>
            <button className="font-bold text-blue-600 cursor-pointer hover:text-blue-800"><Link to='/signup'>Create an account</Link></button>
        </div>
        
    )
}

export default SignIn