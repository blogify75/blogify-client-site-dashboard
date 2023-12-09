import { useRef, useState } from 'react';
import addBlog from './AddBlogs.module.css';
import JoditEditor from 'jodit-react';
import { updloadImage } from '../../../uploadImages/uploadImage';
import { toast } from 'react-toastify';
import { fetchPostBlogData } from '../../../fetchData/fetchBlogData';
import { useEffect } from 'react';

import ImageModal from '../../../modal/ImageModal';
import { fetchGetUnsplashData } from '../../../fetchData/fetchGetUnsplashData';

const AddBlog = () => {

    // modal
    const [imgData, setImgData] = useState([]);
    const [open, setOpen] = useState(false);
   
    const editor = useRef(null);
    const [trackSubTitle, setTrackSubTitle] = useState('')
	const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [imgHolder, setImgHolder] = useState('');
    console.log(imgHolder);
  
    const date = new Date();

    
    const handleSubmit = async(e) => {

        e.preventDefault();

        const postData = {
            img:imgHolder,
            title: e.target.title.value,
            sub_title:e.target.subTitle.value,
            description: description,
            email: 'demo@gmail.com',
            name: e.target.name.value,
            date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
        };


        if(imgHolder){
            if(postData.sub_title?.length <= 298){
                console.log(postData.sub_title?.length)
                if(description){
                    await fetchPostBlogData(postData).then(res => {
                        if( res?.data?.statusCode === 200 ){
                            toast.success('Blog posted successfully');
                            console.log(res?.data?.statusCode);
                            
                        }
                    })
                }else{
                    toast.error('you did not added description')
                }
            }else{
                toast.error('max sub-title length 298 character')
            }
        }else{
            toast.error('image not added')
        }

    }

    useEffect(() => {
        if(imgHolder){
            toast.dark('image added successfully');
            setOpen(false);
        }

        

       

    },[imgHolder])


    const searchImg = async (e) => {
        e.preventDefault();

        const search = e.target.search.value;
        
        await fetchGetUnsplashData(search)
        .then(res => setImgData(res?.data?.results))
    }

    


    return (
        <div className={addBlog.main}>
          <div className={`${addBlog.container}`}>
               <form onSubmit={handleSubmit}>
                <div className={`${addBlog.title} flex `}>
                            <p>Submit for review will become available after you add a title, subtitle, plus a featured image, video, and content.</p>
                    </div>
                    <br />
                    <div className={`${addBlog.blog_title} m_auto`}>
                        <input placeholder='Title' type="text" name="title" id="" required />
                    </div>
                    <div className={`${addBlog.blogger_sub_title} m_auto`}>
                        <input placeholder='sub-title' name='subTitle' type="text" required
                        onChange={(e) => setTrackSubTitle(e.target.value)}
                        />
                        <span 
                        style={{
                            marginLeft:'20px', 
                            color:'gray', 
                            fontStyle:'italic', 
                            fontSize:'12px'
                            }}>
                                {trackSubTitle?.length > 298 ? <span style={{ color:'red', fontStyle:'italic', fontSize:'13px' }}>you can not cross maximum title length</span> : <span>{trackSubTitle?.length > 0 && (298 - trackSubTitle?.length)}</span> }
                            </span>
                    </div>
                    <div className={`${addBlog.blogger_name} m_auto`}>
                        <input placeholder='your name' name='name' type="text" required />
                    </div>
                    <div className={`${addBlog.blog_image}`}>
                        <div className={`${addBlog.blog_image_title}`}>
                            <div className={`${addBlog.blog_image_title_container}  m_auto`}>
                                <div style={{borderBottom:'3px solid gray', height:'96%', display:'flex', alignItems:'baseline',}}>
                                    <p>Upload Image</p>
                                </div>
                                
                            </div>
                        </div>
                        <br />
                        <div className={`${addBlog.blog_image_Button}  m_auto only_flex`}>
                            <div className={`${addBlog.blog_image_Button_container} flex_start `}>
                                <input type="file" className="custom-file-input"
                                onChange={(e) => {
                                    const imgFile = e.target.files[0];
                                    updloadImage(imgFile, setImgHolder)   
                                }}
                                />
                              
                            </div>  
                            <div className={`${addBlog.blog_image_Button_container} flex_start`}>
                                <div onClick={() => setOpen(true)} className='flex' style={{backgroundColor:'black', width:'50%', height:'30px', padding:'2px 0', cursor:'pointer'}}>
                                    <p  style={{color:'white'}}>unsplash photo</p>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <br />
                    <div className={`${addBlog.blog_description}`}>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                tabIndex={1} 
                                onBlur={newContent => setContent(newContent)}
                                onChange={newContent => {setDescription(newContent)}}
                                />
                    </div>
                    <br />
                    <div className={`${addBlog.blog_footer} flex_end`}>
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
            <ImageModal
                data={imgData}
                turn={open}
                btn={setOpen}
                search={searchImg}
                action={setImgHolder}
            />
        </div>
    );
};

export default AddBlog;

