import { Link, Outlet,  useNavigate } from 'react-router-dom';
import dash from './Dashboard.module.css';
import blogify from '../../images/blogify.png';
import { useEffect } from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const [signOut] = useSignOut(auth);
    console.log(user?.email);

    
   useEffect(() => {
    if(!user?.email || user?.emailVerified === false){
        if(user?.email !==  import.meta.env.VITE_ADMIN_EMAIL){
            navigate('/');
        }
    }
   },[user?.email, user?.emailVerified, navigate])


    return (
        <div className={`${dash.main}`}>
            <div className={`${dash.title} flex`}>
                <p>DASHBOARD</p>
            </div>
            <div  className={`${dash.container} `}>
                <div  className={`${dash.left} `}>
                    <div  className={`${dash.left_title} flex`}>
                        <img style={{width:'50%'}} src={blogify} alt="" />
                    </div>
                    <ul>
                        <li>
                        <i 
                        style={{
                            fontSize:'20px', marginRight:'5px',   
                            color:`${(location?.pathname === '/dashboard/addBlog' || location?.pathname === '/dashboard' || location?.pathname?.slice(0,21) === '/dashboard/updateBlog' || location?.pathname?.slice(0,21) === '/dashboard/detailBlog')  ? 'orange' : 'black'}`,}}  
                        className="uil uil-document-layout-right"></i>
                        <Link 
                        style={{
                            textDecoration:'none', 
                            color:`${(location?.pathname === '/dashboard/addBlog' || location?.pathname === '/dashboard' || location?.pathname?.slice(0,21) === '/dashboard/updateBlog' || location?.pathname?.slice(0,21) === '/dashboard/detailBlog' )  ? 'orange' : 'black'}`,}} 
                        to='/dashboard'>BLOGS</Link>
                        </li>
                        <li>
                        <i style={{
                            fontSize:'20px', 
                            marginRight:'5px',
                            color:`${(location?.pathname === '/dashboard/addProduct' || location?.pathname === '/dashboard/product' || location?.pathname?.slice(0,24) === '/dashboard/updateProduct' || location?.pathname?.slice(0,24) === '/dashboard/detailProduct')  ? 'orange' : 'black'}`,
                            }} className="uil uil-package"></i> 
                        <Link
                         style={{
                            textDecoration:'none', 
                            color:`${(location?.pathname === '/dashboard/addProduct' || location?.pathname === '/dashboard/product' || location?.pathname?.slice(0,24) === '/dashboard/updateProduct' || location?.pathname?.slice(0,24) === '/dashboard/detailProduct' )  ? 'orange' : 'black'}`,}} 
                            to='/dashboard/product'
                        >PRODUCTS</Link>
                        </li>
                        <li>
                        <i style={{
                            fontSize:'20px', 
                            marginRight:'5px',
                            color:`${(location?.pathname === '/dashboard/addVideo' || location?.pathname === '/dashboard/video' || location?.pathname?.slice(0,22) === '/dashboard/updateVideo' || location?.pathname?.slice(0,22) === '/dashboard/detailVideo')  ? 'orange' : 'black'}`,
                            }} className="uil uil-social-distancing"></i> 
                        <Link
                         style={{
                            textDecoration:'none', 
                            color:`${(location?.pathname === '/dashboard/addVideo' || location?.pathname === '/dashboard/video' || location?.pathname?.slice(0,22) === '/dashboard/updateVideo' || location?.pathname?.slice(0,22) === '/dashboard/detailVideo' )  ? 'orange' : 'black'}`,}} 
                            to='/dashboard/video'
                        >SOCIAL</Link>
                        <hr />
                        </li>
                        <li>
                        <i style={{
                            fontSize:'20px', 
                            marginRight:'5px',
                            color:'red',
                            }} className="uil uil-signout"></i> 
                        <span
                       onClick={async () => {
                        const success = await signOut();
                        if (success) {
                          alert('You are sign out');
                        }
                      }}
                         style={{
                            textDecoration:'none', 
                            color: 'red'}} 
                            to=''
                        >LOGOUT</span>
                        </li>
                        
                    </ul>
                </div>
                <div  className={`${dash.right}`}>
                    <div  className={`${dash.detail} m_auto`}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;