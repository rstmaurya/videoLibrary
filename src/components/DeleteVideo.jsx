import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";

const DeleteVideo = () => {
  const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Likes:0, Comments:'', Category_Id:0}]);
    
  let navigate = useNavigate();
  
  let params = useParams();

  useEffect(()=>{
      axios.get(`http://127.0.0.1:2300/video/${params.id}`)
      .then(response=>{
          setVideos(response.data);
      })
  },[]);

  function handleDeleteClick(){
      axios.delete(`http://127.0.0.1:2300/deletevideo/${params.id}`);
      alert('Video Deleted');
      navigate('/admindashboard');
  }


  return (
    <div>
    <h3>Delete Video</h3>
    <div>

        <h3>{videos[0].Title}</h3>
        <iframe src={videos[0].Url} width="400" height="300"></iframe>
    </div>
    <div className="mt-3">
        <button onClick={handleDeleteClick} className="btn btn-danger me-2">Delete</button>
        <Link to="/admindashboard" className="btn btn-warning">Cancel</Link>
    </div>
</div>
  )
}

export default DeleteVideo
