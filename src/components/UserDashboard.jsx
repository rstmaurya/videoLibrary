import React from 'react'
import { useCookies } from "react-cookie"
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addToLibrary,removeFromLibrary } from "../slicers/likes-slicer";
 import store from "../store/store";
import { useDispatch, useSelector } from "react-redux";


const UserDashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userName']);
  const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Comments:'', Likes:0,DisLikes:0, Category_Id:0}]);
  let navigate = useNavigate();

  const dispatch = useDispatch();
   const  MyVideoLibrary =useSelector((state)=>state.store.MyVideoLibrary)
   const  videosCount =useSelector((state)=>state.store.videosCount)

  function LoadVideos(){
    axios.get('http://127.0.0.1:2300/videos')
    .then(response=>{ 
        setVideos(response.data);
    })
}

useEffect(()=>{
        
  if(cookies['userName']===undefined){
      navigate('/userlogin')
  } else {
      LoadVideos();
  }
},[videosCount]);

function handleSaveClick(video){
  alert('Video Saved');
  dispatch(addToLibrary(video));
  console.log(MyVideoLibrary)

}
function handledelClick(video){
    alert('Video removed..');
    dispatch(removeFromLibrary(video));

    
  
  }

  return (
    <div className=' bg-info bg-opacity-50 mt-2' style={{minHeight:'90vh'}}>
        <h3> {cookies['userName']} - Dashboard - <button data-bs-target="#library" data-bs-toggle="modal" className="btn btn-warning position-relative bi bi-camera-video"> <span className="badge bg-danger position-absolute rounded rounded-circle"> [{videosCount}] </span> </button> </h3>
            <div className="modal fade" id="library">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="text-primary">Your Saved Videos</h2>
                            <button className="btn btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body text-danger">
                            {
                                MyVideoLibrary.map(video=>
                                    <div className='d-flex justify-content-between m-2'>
                                       <p> Title:{video.Title}</p>
                                       
                                         <iframe src={video.Url} width="50%" height="90"/>
                                         <button  onClick={()=>handledelClick(video)} className='bi bi-trash-fill fs-2 btn btn-danger'></button>
                                            
                                        </div>
                                    
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <section className=" container-fluid mt-2 d-flex flex-wrap">
                {
                    videos.map(video=>
                        <div key={video.VideoId} className='card p-2 m-2 shadow-lg' style={{width:'350px'}}>
                            <div className="card-header" style={{height:'60px'}}>
                                <h3>{video.Title}</h3>
                            </div>
                            <div className="card-body">
                                <iframe src={video.Url} width="100%" height="200">

                                </iframe>
                            </div>
                            <div className="card-footer">
                                <button onClick={()=> handleSaveClick(video)} className="btn btn-primary"> Save </button>
                                <span className="bi bi-hand-thumbs-up ms-2"></span> {video.Likes} Likes
                                <span className="bi bi-hand-thumbs-down ms-2 "></span> {video.DisLikes} 
                                <div>
                                    <label className="form-label fw-bold">Comments:</label>
                                    <div>
                                        {video.Comments}
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                }
            </section>
    </div>
  )
}

export default UserDashboard
