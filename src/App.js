import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Link, Route, Routes, useNavigate } from 'react-router-dom';
import VideosMain from './components/VideosMain';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import UserDashboard from './components/UserDashboard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AddVideo from './components/AddVideo';
import EditVideo from './components/EditVideo';
import DeleteVideo from './components/DeleteVideo';
import { useCookies } from 'react-cookie';

function SignoutComponent(){
  const [cookies, setCookie, removeCookie] = useCookies('userName');
  let navigate = useNavigate();
  function handleSignout(){
     removeCookie('userName');
     navigate('/userlogin');
    }
  return(
     <button onClick={handleSignout} className='btn btn-light me-2'>Signout</button>
  )
}

function App() {
  const [cookies, setCookie, removeCookie] = useCookies('userName');

  return (
    <div className='container-fluid bg-dark text-light' style={{height:'100vh'}} >
      <BrowserRouter>
      <header>
      {/* <h2>Video library...</h2> */}
      <div>
               <span className='h3'> <Link  style={{color:'white', textDecoration:'none'}} to='/'>Video Library</Link> </span>
            </div>
            <div>
               {
                  (cookies['userName']===undefined) ? <Link className='btn btn-light me-2' to='/userlogin'>User Signin</Link> : <SignoutComponent/>
               }
               <Link to="/adminlogin" className='btn btn-light'> <span className='bi bi-person-fill'></span> Admin Dashboard </Link>
            </div>

      </header>
      <section>
       <Routes>
        <Route path='/' element={<VideosMain/>}/>
        <Route path='userregister' element={<UserRegister/>}/>
        <Route path='userlogin' element={<UserLogin/>}/>
        <Route path='userdashboard' element={<UserDashboard/>}/>
        <Route path='adminlogin' element={<AdminLogin/>}/>
        <Route path='admindashboard' element={<AdminDashboard/>}/>
        <Route path='addvideo' element={<AddVideo/>} />
        <Route path='editvideo/:id' element={<EditVideo/>} />
        <Route path='deletevideo/:id' element={<DeleteVideo/>} />
       </Routes>
      </section>
      </BrowserRouter>
    </div> 
  );
}

export default App;
