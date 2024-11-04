import React from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const UserLogin = () => {
  let navigate = useNavigate();
  const [users, setUsers] = useState([{UserId:'', UserName:'', Password:'', Email:'', Mobile:''}]);
  const [userError, setUserError] = useState('');

  const [cookies, setCookie, removeCookie] = useCookies('userName');

  const formik = useFormik({
      initialValues : {
          UserId: '',
          Password:''
      },
      onSubmit: (values)=>{
          var user = users.find(item=> item.UserId===values.UserId);
          if(user.Password===values.Password){
              setCookie("userName", user.UserName);
              navigate("/userdashboard");
          } else {
              setUserError("Invalid Credentials");
          }
      }
  })

  useEffect(()=>{
      axios.get('http://127.0.0.1:2300/users')
      .then((response)=>{
          setUsers(response.data);
      })
  },[]);
  return (
    <div className='mt-3'>
      <form onSubmit={formik.handleSubmit}  className='rounded rounded-2 p-3' style={{width:'250px',boxShadow:'4px 5px 15px white'}}>
      <h2 className='bi bi-person-fill'>User Login</h2>

                <dl>
                    <dt className='form-label'>User Id</dt>
                    <dd><input className='form-control' type="text" name="UserId" onChange={formik.handleChange} /></dd>
                    <dt className='form-label'>Password</dt>
                    <dd><input className='form-control' type="password" name="Password" onChange={formik.handleChange} /></dd>
                </dl>
                <button className="btn btn-warning fw-bold form-control mb-1">Login</button>
                <Link to="/userregister" className='btn btn-link w-100' >New User ? Register </Link>
                <p className="h4 text-danger">{userError}</p>
            </form>
    </div>
  )
}

export default UserLogin
