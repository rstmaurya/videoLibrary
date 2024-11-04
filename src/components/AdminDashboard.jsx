import React from 'react'
import { useCookies } from "react-cookie"
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies('adminName');
  const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Comments:'', Likes:0,CategoryName:'',Category_Id:0}]);
  let navigate = useNavigate();

  function LoadVideos(){
      axios.get('http://127.0.0.1:2300/videos')
      .then(response=>{
          setVideos(response.data);
      })
  }

  useEffect(()=>{
      
      if(cookies['adminName']===undefined){
          navigate('/adminlogin')
      } else {
          LoadVideos();
      }
  },[]);
  return (
    <div className='container-fluid'>
       <h3> {cookies['adminName']} - Dashboard</h3>
            <div className="mb-4">
                <Link to="/addvideo" className="btn btn-primary"> Add New Video</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videos.map(video=>
                            <tr key={video.VideoId}>
                                <th width="200">{video.Title}</th>
                                <td>
                                    <iframe src={video.Url} width="300" height="100"></iframe>
                                </td>
                                <td>{video.CategoryName}</td>
                                <td>
                                    <Link to={`/editvideo/${video.VideoId}`} className="btn btn-warning bi bi-pen-fill me-2"></Link>
                                    <Link to={`/deletevideo/${video.VideoId}`} className="btn btn-danger bi bi-trash-fill"></Link>
                                </td>
                            </tr>
                            )
                    }
                </tbody>
            </table>
    </div>
  )
}

export default AdminDashboard
