import { useRef, useState } from 'react';
import addProduct from './AddProduct.module.css'
import { fetchPostProductData } from '../../../fetchData/fetchProductData';
import { toast } from 'react-toastify';
import { updloadImage } from '../../../uploadImages/uploadImage';
import JoditEditor from 'jodit-react';

const AddProduct = () => {
    const editor = useRef(null);
	const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [imgHolder, setImgHolder] = useState('');
  
    const date = new Date();

    
    const handleSubmit = async(e) => {

        e.preventDefault();

        const postData = {
            img:imgHolder,
            title: e.target.title.value,
            price:e.target.price.value,
            description: description,
            email: 'demo@gmail.com',
            name: e.target.name.value,
            affiliateLink:e.target.affiliateLink.value,
            date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
        };


        if(imgHolder){  
                if(description){
                    await fetchPostProductData(postData).then(res => {
                        if( res?.data?.statusCode === 200 ){
                            toast.success('product posted successfully');
                            console.log(res?.data?.statusCode);                          
                        }
                    })
                }else{
                    toast.error('you did not added description')
                }
           
        }else{
            toast.error('image not added')
        }

    }
    return (
        <div className={addProduct.main}>
          <div className={`${addProduct.container}`}>
               <form onSubmit={handleSubmit}>
                <div className={`${addProduct.title} flex `}>
                            <p>Submit for review will become available after you add a title, price, plus a featured image, video, and content.</p>
                    </div>
                    <br />
                    <div className={`${addProduct.blog_title} m_auto`}>
                        <input placeholder='Title' type="text" name="title" id="" required />
                    </div>
                    <div className={`${addProduct.blogger_sub_title} m_auto`}>
                        <input placeholder='price' name='price' type="number" required/>
                        
                    </div>
                    <div className={`${addProduct.blogger_name} m_auto`}>
                        <input placeholder='your name' name='name' type="text" required />
                        <input style={{marginLeft:'20px'}} placeholder='affiliate-link' name='affiliateLink' type="text" required />
                    </div>
                    <div className={`${addProduct.blog_image}`}>
                        <div className={`${addProduct.blog_image_title}`}>
                            <div className={`${addProduct.blog_image_title_container}  m_auto`}>
                                <div style={{borderBottom:'3px solid gray', height:'96%', display:'flex', alignItems:'baseline'}}>
                                    <p>Upload Image</p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className={`${addProduct.blog_image_Button}  m_auto`}>
                            <div className={`${addProduct.blog_image_Button_container} flex_start`}>
                                <input type="file" className="custom-file-input"
                                onChange={(e) => {
                                    const imgFile = e.target.files[0];
                                    updloadImage(imgFile, setImgHolder)
                                    
                                }}
                                required
                                />
                                {imgHolder && <p style={{marginLeft:'20px', color:'green', fontSize:'13px', fontStyle:'italic'}}>Image Added</p> }
                            </div>
                           
                        </div>
                    </div>
                    <br />
                    <div className={`${addProduct.blog_description}`}>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                tabIndex={1} 
                                onBlur={newContent => setContent(newContent)}
                                onChange={newContent => {setDescription(newContent)}}
                                />
                    </div>
                    <br />
                    <div className={`${addProduct.blog_footer} flex_end`}>
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

export default AddProduct;