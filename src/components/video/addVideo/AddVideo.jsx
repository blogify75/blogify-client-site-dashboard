import { toast } from 'react-toastify';
import { fetchPostVideoData } from '../../../fetchData/fetchVideoData';
import addVideo from './AddVideo.module.css';
import { useRef, useState } from 'react';

import JoditEditor from 'jodit-react';

const AddVideo = () => {
    const editor = useRef(null);
	const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
   
  
    const date = new Date();

    
    const handleSubmit = async(e) => {

        e.preventDefault();

        const link = e.target.videoLink.value;
        const customizedLink = link?.slice(17)
       

        const postData = {
            title: e.target.title.value,
            videoLink: customizedLink,
            description: description,
            email: 'demo@gmail.com',
            name: e.target.name.value,
            affiliateLink:"optional yet",
            date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
        };


        
                if(description){
                    await fetchPostVideoData(postData).then(res => {
                        if( res?.data?.statusCode === 200 ){
                            toast.success('video posted successfully');
                            console.log(res?.data?.statusCode);                          
                        }
                    })
                }else{
                    toast.error('you did not added description')
                }
           
      

    }
    return (
        <div className={addVideo.main}>
        <div className={`${addVideo.container}`}>
             <form onSubmit={handleSubmit}>
              <div className={`${addVideo.title} flex `}>
                          <p>Submit for review will become available after you add a title, price, plus a featured image, video, and content.</p>
                  </div>
                  <br />
                  <div className={`${addVideo.blog_title} m_auto`}>
                      <input placeholder='Title' type="text" name="title" id="" required />
                  </div>
                  <div className={`${addVideo.blogger_sub_title} m_auto`}>
                      <input placeholder='video-link' name='videoLink' type="text" required/>
                      
                  </div>
                  <div className={`${addVideo.blogger_name} m_auto`}>
                      <input placeholder='your name' name='name' type="text" required />
                     
                  </div>
                 
                  <br />
                  <div className={`${addVideo.blog_description}`}>
                          <JoditEditor
                              ref={editor}
                              value={content}
                              tabIndex={1} 
                              onBlur={newContent => setContent(newContent)}
                              onChange={newContent => {setDescription(newContent)}}
                              />
                  </div>
                  <br />
                  <div className={`${addVideo.blog_footer} flex_end`}>
                  <button
                      type='submit'
                      style={{cursor:'pointer'}}
                      className='flex'
                      >
                      <i  style={{fontSize:'24px', marginRight:'5px', marginBottom:'5px'}} className="uil uil-postcard"></i> <p>POST</p>
                  </button>
                  </div>
             </form>
              
        </div>
         
      </div>
    );
};

export default AddVideo;