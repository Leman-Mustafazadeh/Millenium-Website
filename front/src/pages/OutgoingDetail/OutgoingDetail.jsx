import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOne } from '../../API'
import { endpoints } from '../../API/constant'

const OutgoingDetail = () => {
    const {id} = useParams()
const[getData,setGetdata] = useState({
    name:"",
    title:""
})
// useEffect(()=>{
//     getOne(endpoints.)
// },[])
  return (
    <div>
        <h1></h1>
      <div>
        <img src="" alt="" />
      </div>
      <p></p>
    </div>
  )
}

export default OutgoingDetail
