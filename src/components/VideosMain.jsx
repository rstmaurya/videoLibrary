import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function RegisterLink(){
  return(
    <div>
      <Link to='/userregister' className='btn btn-light mt-3'> Account Not found -  Register</Link>
    </div>
  )
}

const VideosMain = () => {

  let navigate=useNavigate();

  const [userEmail, setEmail] = useState('');

  const[users,setUsers]=useState([{UserId:'', UserName:'', Password:'', Email:'', Mobile:''}]);
  const [userErorr, setUserError] = useState(''); 


  useEffect(()=>{
      axios.get('http://127.0.0.1:2300/users')
      .then(response=>{
        setUsers(response.data)
        console.log(response.data)
      })
  },[])

  function handleEmailChange(e){
    setEmail(e.target.value);
  }

  function handleGetStartedClick(){
    var user = users.find(item => item.Email== userEmail);
    if(user==undefined){
        setUserError(<RegisterLink />);
    }else{
        navigate('/userdashboard')
    }
}

  return (
    <div>
      <main className='d-flex justify-content-center mt-4'>
        <div>
          <h1>Watch Video Any where</h1>
          <p className='text-center mt-4 mb-4'>Please register for more technology videos</p>
          <div className='input-group'>
                        <input onChange={handleEmailChange} type="email" className='form-control' placeholder='Your email addess' />
                        <Button  onClick={handleGetStartedClick}  variant='contained' color='error'>Get Started</Button>
          </div>
          <p className='bg-danger'> {userErorr} </p>

        </div>
      </main>
    
    </div>
  )
}

export default VideosMain
