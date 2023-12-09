import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Blog from './components/blog/Blog'
import AddBlog from './components/blog/addBlog/AddBlog'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import UpdateBlog from './components/blog/updateBlog/updateBlog'
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

function App() {
  return (
    <>
      <ToastContainer style={{ marginTop: '50px' }} />
      <Routes>
         
          <Route path='/' element={<Dashboard/>}>
              <Route path='' element={<Blog/>} />
              <Route path='dashboard/addBlog' element={<AddBlog/>} />
              {/* <Route path='dashboard/updateBlog/:id' element={<UpdateBlog/>} /> */}
              <Route path='dashboard/detailBlog/:id' element={<DetailBlog/>} />

              <Route path='dashboard/product' element={<Product/>} />
              <Route path='dashboard/addProduct' element={<AddProduct/>} />
              <Route path='dashboard/updateProduct/:id' element={<UpdateProduct/>} />
              <Route path='dashboard/detailProduct/:id' element={<DetailProduct/>} />

              <Route path='dashboard/video' element={<Video/>} />
              <Route path='dashboard/addVideo' element={<AddVideo/>} />
              <Route path='dashboard/updateVideo/:id' element={<UpdateVideo/>} />
              <Route path='dashboard/detailVideo/:id' element={<DetailVideo/>} />

              <Route path='dashboard/test' element={<Test/>} />

          </Route>
      </Routes>
    </>
  )
}

export default App
