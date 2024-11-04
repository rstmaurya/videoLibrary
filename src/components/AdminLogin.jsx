import React from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AdminLogin = () => {

  let navigate = useNavigate();
  const [users, setUsers] = useState([{UserId:'', Password:''}]);
  const [userError, setUserError] = useState('');

  const [cookies, setCookie, removeCookie] = useCookies('adminName');

  const formik = useFormik({
      initialValues : {
          UserId: '',
          Password:''
      },
      onSubmit: (values)=>{
          var user = users.find(item=> item.UserId===values.UserId);
          if(user.Password===values.Password){
              setCookie("adminName", user.UserId);
              navigate("/admindashboard");
          } else {
              setUserError("Invalid Credentials");
          }
      }
  })

  useEffect(()=>{
      axios.get('http://127.0.0.1:2300/admin')
      .then((response)=>{
          setUsers(response.data);
      })
  },[]);
  return (
    <div className='mt-3'>

    <form onSubmit={formik.handleSubmit} className='rounded rounded-2 p-3' style={{width:'250px',boxShadow:'4px 5px 15px white'}}>
    <h2 className='bi bi-person-fill'>Admin Login</h2>

        <dl>
            <dt className='form-label'>Admin Id</dt>
            <dd><input className='form-control' type="text" onChange={formik.handleChange} name="UserId"/></dd>
            <dt className='form-label'>Password</dt>
            <dd><input className='form-control' type="password" onChange={formik.handleChange} name="Password" /></dd>
        </dl>
        <button className="btn btn-primary form-control">Login</button>
        <p className="h3 text-danger">{userError}</p>
    </form>
</div>
  )
}

export default AdminLogin
