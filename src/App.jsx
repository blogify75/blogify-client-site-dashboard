import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Blog from './components/blog/Blog'
import AddBlog from './components/blog/addBlog/AddBlog'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateBlog from './components/blog/updateBlog/UpdateBlog'
import DetailBlog from './components/blog/detailBlog/DetailBlog'
import Product from './components/product/Product'
import AddProduct from './components/product/addProduct/AddProduct'
import UpdateProduct from './components/product/updateProduct/UpdateProduct'
import DetailProduct from './components/product/detailProduct/DetailProduct'
import Video from './components/video/Video'
import AddVideo from './components/video/addVideo/AddVideo'
import UpdateVideo from './components/video/updateVideo/UpdateVideo'
import DetailVideo from './components/video/detailVideo/DetailVideo'
import Test from './components/test/Test'
import Ragistration from './components/login/registration/Ragistration'
import Login from './components/login/registration/Login'


function App() {
  return (
    <>
      <ToastContainer style={{ marginTop: '50px' }} />
      <div className="view_dashboard">
        <Routes>
          <Route path='/signup' element={<Ragistration/>}/>
          <Route path='/' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}>
                <Route path='' element={<Blog/>} />
                <Route path='/dashboard/addBlog' element={<AddBlog/>} />
                <Route path='/dashboard/updateBlog/:id' element={<UpdateBlog/>} />
                <Route path='/dashboard/detailBlog/:id' element={<DetailBlog/>} />

                <Route path='/dashboard/product' element={<Product/>} />
                <Route path='/dashboard/addProduct' element={<AddProduct/>} />
                <Route path='/dashboard/updateProduct/:id' element={<UpdateProduct/>} />
                <Route path='/dashboard/detailProduct/:id' element={<DetailProduct/>} />

                <Route path='/dashboard/video' element={<Video/>} />
                <Route path='/dashboard/addVideo' element={<AddVideo/>} />
                <Route path='/dashboard/updateVideo/:id' element={<UpdateVideo/>} />
                <Route path='/dashboard/detailVideo/:id' element={<DetailVideo/>} />

                <Route path='/dashboard/test' element={<Test/>} />

            </Route>
        </Routes>
      </div>
      <div className="dashboard_notifier">
            <p style={{color: "red", margin:"0", padding:"0"}}>This Dashboard Application is build only for Desktop operation</p>
      </div>
    </>
  )
}

export default App
