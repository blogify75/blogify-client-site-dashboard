import { useEffect, useRef, useState } from 'react';
import updateProduct from './UpdateProduct.module.css';
import { toast } from 'react-toastify';
import useProductData from '../../../customHooks/customProductHook';
import { useParams } from 'react-router-dom';
import { updloadImage } from '../../../uploadImages/uploadImage';
import JoditEditor from 'jodit-react';
import { fetchUpdateProductData } from '../../../fetchData/fetchProductData';

const UpdateProduct = () => {
    const [productData, refetch] = useProductData();
    const allData = productData?.data?.data?.data;
 
     const {id} = useParams();
    
     const editor = useRef(null);
     // eslint-disable-next-line no-unused-vars
     const [content, setContent] = useState('');
   
     const [description, setDescription] = useState('');
     const [updatedDes, setUpdatedDes] = useState();
    
     const [img, setImg] = useState('');
     const [imgHolder, setImgHolder] = useState('');
     const [title, setTitle] = useState('')
     const [price, setPrice] = useState('')
     const [name,setName] = useState('')
     const [affiliateLink, setAffiliateLink] = useState('');

     console.log(imgHolder)
   
 
     const findProduct = allData?.find(f => {
         return f?._id === id;
     })
 
    useEffect(() => {
     setTitle(findProduct?.title);
     setPrice(findProduct?.price)
     setImg(findProduct?.img);
     setDescription(findProduct?.description);
     setName(findProduct?.name);
     setAffiliateLink(findProduct?.affiliateLink);
    },[findProduct])
 
    const handleUpdate = async(e) => {
         e.preventDefault();
 
         const updateImg = imgHolder ? imgHolder : img;
         const updatedData = {
             title,
             price,
             img: updateImg,
             name,
             description: updatedDes,
             affiliateLink,
         };
 
         await fetchUpdateProductData(updatedData, id, refetch).then(res => {
             if(res?.data?.statusCode === 200){
                 toast.success("successfully updated")
             }
         })
 
    }
    return (
        <div className={updateProduct.main}>
        <div className={`${updateProduct.container}`}>
             <form onSubmit={handleUpdate}>
              <div className={`${updateProduct.title} flex `}>
                          <p>Submit for review will become available after you add a title, subtitle, plus a featured image, video, and content.</p>
                  </div>
                  <br />
                  <div className={`${updateProduct.blog_title} m_auto`}>
                      <input placeholder='Title' type="text" name="title" id="" required value={title}
                      onChange={(e) => setTitle(e.target.value)}
                       />
                  </div>
                  <div className={`${updateProduct.blogger_sub_title} m_auto`}>
                      <input placeholder='price' name='price' type="text" required value={price} 
                      onChange={(e) => setPrice(e.target.value)}
                      />
                     
                  </div>
                  <div className={`${updateProduct.blogger_name} m_auto`}>
                      <input placeholder='your name' name='name' type="text" required value={name}
                      onChange={(e) => setName(e.target.value)}
                      />
                       <input style={{marginLeft:'20px'}} placeholder='affiliate-link' name='price' type="text" required value={affiliateLink} 
                      onChange={(e) => setAffiliateLink(e.target.value)}
                      />
                  </div>
                  <div className={`${updateProduct.blog_image}`}>
                      <div className={`${updateProduct.blog_image_title}`}>
                          <div className={`${updateProduct.blog_image_title_container}  m_auto`}>
                              <div style={{borderBottom:'3px solid gray', height:'96%', display:'flex', alignItems:'baseline'}}>
                                  <p>Upload Image</p>
                              </div>
                          </div>
                      </div>
                      <br />
                      <div className={`${updateProduct.blog_image_Button}  m_auto`}>
                          <div className={`${updateProduct.blog_image_Button_container} flex_start`}>
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
                  <div className={`${updateProduct.blog_description}`}>
                          <JoditEditor
                              ref={editor}
                              value={description}
                              tabIndex={1} 
                              onBlur={newContent => setContent(newContent)}
                              onChange={newContent => {setUpdatedDes(newContent)}}
                              />
                  </div>
                  <br />
                  <div className={`${updateProduct.blog_footer} flex_end`}>
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

export default UpdateProduct;