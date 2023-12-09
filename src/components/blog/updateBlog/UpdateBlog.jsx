/* eslint-disable no-unused-vars */
import { useState, useRef } from 'react';
import { updloadImage } from '../../../uploadImages/uploadImage';
import updateBlog from './updateBlog.module.css';
import JoditEditor from 'jodit-react';
import { useParams } from 'react-router-dom';
import useBlogData from '../../../customHooks/customBlogHook';
import { useEffect } from 'react';
import { fetchUpdateBlogData } from '../../../fetchData/fetchBlogData';
import { toast } from 'react-toastify';

const UpdateBlog = () => {

   const [blogData, refetch] = useBlogData();
   const allData = blogData?.data?.data?.data;

    const {id} = useParams();
   
    const editor = useRef(null);
	const [content, setContent] = useState('');
  
    const [description, setDescription] = useState('');
    const [updatedDes, setUpdatedDes] = useState();
   
    const [img, setImg] = useState('');
    const [imgHolder, setImgHolder] = useState('');
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [name,setName] = useState('')
  

    const findBlog = allData?.find(f => {
        return f?._id === id;
    })

   useEffect(() => {
    setTitle(findBlog?.title);
    setSubTitle(findBlog?.sub_title)
    setImg(findBlog?.img);
    setDescription(findBlog?.description);
    setName(findBlog?.name)
   },[findBlog])

   const handleUpdate = async(e) => {
        e.preventDefault();

        const updateImg = imgHolder ? imgHolder : img;
        const updatedData = {
            title,
            sub_title: subTitle,
            img: updateImg,
            name,
            description: updatedDes
        };

        await fetchUpdateBlogData(updatedData, id, refetch).then(res => {
            if(res?.data?.statusCode === 200){
                toast.success("successfully updated")
            }
        })

   }
   



    return (
        <div className={updateBlog.main}>
        <div className={`${updateBlog.container}`}>
             <form onSubmit={handleUpdate}>
              <div className={`${updateBlog.title} flex `}>
                          <p>Submit for review will become available after you add a title, subtitle, plus a featured image, video, and content.</p>
                  </div>
                  <br />
                  <div className={`${updateBlog.blog_title} m_auto`}>
                      <input placeholder='Title' type="text" name="title" id="" required value={title}
                      onChange={(e) => setTitle(e.target.value)}
                       />
                  </div>
                  <div className={`${updateBlog.blogger_sub_title} m_auto`}>
                      <input placeholder='sub-title' name='subTitle' type="text" required value={subTitle} 
                      onChange={(e) => setSubTitle(e.target.value)}
                      />
                  </div>
                  <div className={`${updateBlog.blogger_name} m_auto`}>
                      <input placeholder='your name' name='name' type="text" required value={name}
                      onChange={(e) => setName(e.target.value)}
                      />
                  </div>
                  <div className={`${updateBlog.blog_image}`}>
                      <div className={`${updateBlog.blog_image_title}`}>
                          <div className={`${updateBlog.blog_image_title_container}  m_auto`}>
                              <div style={{borderBottom:'3px solid gray', height:'96%', display:'flex', alignItems:'baseline'}}>
                                  <p>Upload Image</p>
                              </div>
                          </div>
                      </div>
                      <br />
                      <div className={`${updateBlog.blog_image_Button}  m_auto`}>
                          <div className={`${updateBlog.blog_image_Button_container} flex_start`}>
                              <input type="file" className="custom-file-input"
                              onChange={(e) => {
                                  const imgFile = e.target.files[0];
                                  updloadImage(imgFile, setImgHolder)
                                  
                              }}
                             
                              />
                              {imgHolder && <p style={{marginLeft:'20px', color:'green', fontSize:'13px', fontStyle:'italic'}}>Image Added</p> }
                          </div>
                         
                      </div>
                  </div>
                  <br />
                  <div className={`${updateBlog.blog_description}`}>
                          <JoditEditor
                              ref={editor}
                              value={description}
                              tabIndex={1} 
                              onBlur={newContent => setContent(newContent)}
                              onChange={newContent => {setUpdatedDes(newContent)}}
                              />
                  </div>
                  <br />
                  <div className={`${updateBlog.blog_footer} flex_end`}>
                  <button
                      type='submit'
                      style={{cursor:'pointer'}}
                      className='flex'
                      //  onClick={() => navigate('/dashboard/addBlog')}
                      >
                      <i  style={{fontSize:'24px', marginRight:'5px', marginBottom:'5px'}} className="uil uil-postcard"></i> <p>UPDATE</p>
                  </button>
                  </div>
             </form>
              
        </div>
         
      </div>
    );
};

export default UpdateBlog;