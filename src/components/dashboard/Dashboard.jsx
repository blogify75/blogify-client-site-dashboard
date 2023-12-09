import { Link, Outlet, useLocation } from 'react-router-dom';
import dash from './Dashboard.module.css';
import blogify from '../../images/blogify.png';
const Dashboard = () => {
    const location = useLocation();
    console.log(location)
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
                            color:`${(location?.pathname === '/dashboard/addBlog' || location?.pathname === '/' || location?.pathname?.slice(0,21) === '/dashboard/updateBlog' || location?.pathname?.slice(0,21) === '/dashboard/detailBlog')  ? 'orange' : 'black'}`,}}  
                        className="uil uil-document-layout-right"></i>
                        <Link 
                        style={{
                            textDecoration:'none', 
                            color:`${(location?.pathname === '/dashboard/addBlog' || location?.pathname === '/' || location?.pathname?.slice(0,21) === '/dashboard/updateBlog' || location?.pathname?.slice(0,21) === '/dashboard/detailBlog' )  ? 'orange' : 'black'}`,}} 
                        to='/'>BLOGS</Link>
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