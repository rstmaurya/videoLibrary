import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const AddVideo = () => {
  const [categories, setCategories] = useState([{Category_Id:0, CategoryName:''}]);
    
  let navigate = useNavigate();

  const formik = useFormik({
      initialValues: {
          VideoId: 0,
          Title: '',
          Url: '',
          Likes: 0,
          DisLikes:0,
          Comments:'',
          Category_Id:0,
          CategoryName:''
      },
      onSubmit : (values)=>{
        //alert(JSON.stringify(values));
          axios.post('http://127.0.0.1:2300/addvideo', values);
          alert('Video Added Successfully..');
          navigate('/admindashboard');
       }
  })

  function LoadCategories(){
      axios.get('http://127.0.0.1:2300/categories')
      .then(response=>{
          response.data.unshift({Category_Id:-1, CategoryName:'Select Category'});
          setCategories(response.data);
      })
  }

  useEffect(()=>{
      LoadCategories();
  },[]);
  return (
    <div>
            <h4>New Video</h4>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="number" onChange={formik.handleChange} name="VideoId"/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Title" /></dd>
                    <dt>Url</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Url" /></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" onChange={formik.handleChange}  name="Likes"/></dd>
                    <dt>DisLikes</dt>
                    <dd><input type="number" onChange={formik.handleChange}  name="DisLikes"/></dd>
                    <dt>Comments</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Comments"/></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="CategoryName" onChange={formik.handleChange} >
                            {
                                categories.map(category=>
                                    <option value={category.CategoryName} key={category.Category_Id}>
                                        {category.CategoryName.toUpperCase()}
                                    </option>
                                    )
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-primary">Add</button>
            </form>
        </div>
  )
}

export default AddVideo
