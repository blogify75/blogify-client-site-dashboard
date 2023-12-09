import { useParams } from 'react-router-dom';
import useVideoData from '../../../customHooks/customVideoHook';
import updateVideo from './UpdateVideo.module.css'
import { useEffect, useRef, useState } from 'react';
import { fetchUpdateVideoData } from '../../../fetchData/fetchVideoData';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';

const UpdateVideo = () => {

    const [productData, refetch] = useVideoData();
    const allData = productData?.data?.data?.data;
 
     const {id} = useParams();
    
     const editor = useRef(null);
     // eslint-disable-next-line no-unused-vars
     const [content, setContent] = useState('');
   
     const [description, setDescription] = useState('');
     const [updatedDes, setUpdatedDes] = useState();
    
     const [videoLink, setVideoLink] = useState('');
    
     const [title, setTitle] = useState('')
    
     const [name,setName] = useState('')
   
 
     const findVideo = allData?.find(f => {
         return f?._id === id;
     })
 
    useEffect(() => {
     setTitle(findVideo?.title);
     setDescription(findVideo?.description);
     setName(findVideo?.name);
     setVideoLink(findVideo?.videoLink);
    },[findVideo])
 
    const handleUpdate = async(e) => {
         e.preventDefault();

         const customLink = videoLink?.slice(17);
       
         const updatedData = {
             title,
             videoLink: customLink,
             name,
             description: updatedDes,
         };
 
         await fetchUpdateVideoData(updatedData, id, refetch).then(res => {
             if(res?.data?.statusCode === 200){
                 toast.success("successfully updated")
             }
         })
 
    }
    
    return (
        <div className={updateVideo.main}>
        <div className={`${updateVideo.container}`}>
             <form onSubmit={handleUpdate}>
              <div className={`${updateVideo.title} flex `}>
                          <p>Submit for review will become available after you add a title, subtitle, plus a featured image, video, and content.</p>
                  </div>
                  <br />
                  <div className={`${updateVideo.blog_title} m_auto`}>
                      <input placeholder='Title' type="text" name="title" id="" required value={title}
                      onChange={(e) => setTitle(e.target.value)}
                       />
                  </div>
                  <div className={`${updateVideo.blogger_sub_title} m_auto`}>
                      <input placeholder='video-link' name='price' type="text" required  
                      onChange={(e) => setVideoLink(e.target.value)}
                      />
                  </div>
                  <div className={`${updateVideo.blogger_name} m_auto`}>
                      <input placeholder='your name' name='name' type="text" required value={name}
                      onChange={(e) => setName(e.target.value)}
                      />
                  </div>
                 
                  <br />
                  <div className={`${updateVideo.blog_description}`}>
                          <JoditEditor
                              ref={editor}
                              value={description}
                              tabIndex={1} 
                              onBlur={newContent => setContent(newContent)}
                              onChange={newContent => {setUpdatedDes(newContent)}}
                              />
                  </div>
                  <br />
                  <div className={`${updateVideo.blog_footer} flex_end`}>
                  <button
                      type='submit'
                      style={{cursor:'pointer'}}
                      className='flex'
                      >
                      <i  style={{fontSize:'24px', marginRight:'5px', marginBottom:'5px'}} className="uil uil-postcard"></i> <p>UPDATE</p>
                  </button>
                  </div>
             </form>
              
        </div>
         
        </div>
    );
};

export default UpdateVideo;