import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import controller, { getOne } from '../../API'
import { BASE_URL, endpoints } from '../../API/constant'
import "./style.css"
import { useSelector } from 'react-redux'
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

const currentlanguage = useSelector(
  (state) => state.languages.currentLanguage
);

  return (
   <div className="activities_detail">
    <div className="container">
        
     <div className='activities_title'>
      <div className='activities_img'>
        <img src={BASE_URL+getData.image} alt="" />
      </div>
      <div className='activities_right'>
      <h1> {getData[`name_${currentlanguage}`]}</h1>
      <p className='activitis_text'> {getData[`text_${currentlanguage}`]}</p>
      </div>
    </div>
   </div>
   </div>
  )
}

export default ActivitiesDetail
