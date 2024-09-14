import {useContext} from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";


const PrivateRoute = ()=>{
    const {currentUser} = useContext(AuthContext)
    return(
        <>
            {currentUser ? <Outlet/> : <Navigate to='/signin'/>}
        </>
        
    )
}
export default PrivateRoute