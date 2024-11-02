import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import controller, { getOne } from '../../API'
import { endpoints } from '../../API/constant'
import "./style.css"
const ActivitiesDetail = () => {
    const {id} = useParams()
const[getData,setGetdata] = useState({
    name:"",
    image:"",
    title:""
})
useEffect(()=>{
    controller.getOne(endpoints.getOneactivity, id).then((res)=>{
        setGetdata(res)
    })
},[id])
console.log(getData);


  return (
   <div className="activities_detail">
    <div className="container">
        
     <div className='activities_title'>
      <div className='activities_img'>
        <img src={getData.image} alt="" />
      </div>
      <div className='activities_right'>
      <h1>{getData.name_EN}</h1>
      <p className='activitis_text'>{getData.text_EN}</p>
      </div>
    </div>
   </div>
   </div>
  )
}

export default ActivitiesDetail
