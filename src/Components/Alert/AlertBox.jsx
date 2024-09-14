import React, { useContext, useEffect } from "react";
import DataContext from "../Helpers/DataContext";
import { CloseOutlined } from "@mui/icons-material";
import './AlertBox.css'

const AlertBox = ()=>{
    const {alertList, setAlertList} = useContext(DataContext)   
    useEffect(()=>{
        if(alertList.length === 2){

            setAlertList((prevList)=>{
                let updatedList = [...prevList];
                updatedList.pop();
                return updatedList
            })
        }
    }, [alertList])
    return (
        <div className="flex flex-col fixed z-30 w-3/12 bottom-2 left-10">
            {
                alertList.map((alert, idx)=>(
                    <div key = {idx} className="Box text-white m-1 p-2 rounded-lg flex justify-between">
                        <h3 className="inline-block w-full">{alert}</h3>
                        <button className="rounded-full px-1 py-0.5 transition ease-in-out delay-100 hover:bg-gray-600"><CloseOutlined/></button>
                        
                    </div>
                     
                ))
            }
        </div>
    )  

}

export default AlertBox