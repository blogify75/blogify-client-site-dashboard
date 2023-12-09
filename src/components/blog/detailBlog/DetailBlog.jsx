import { useParams } from 'react-router-dom';
import useBlogData from '../../../customHooks/customBlogHook';
import blogDetail from './DetailBlog.module.css';

const DetailBlog = () => {
    const [blogData] = useBlogData();
    const {id} = useParams();

    const detailBlog = blogData?.data?.data?.data?.find(f => {
        return f?._id === id
    });

    console.log(detailBlog);

    return (
        <div className={`${blogDetail.main}`}>
            <div className={`${blogDetail.container}`}>
                <div>
                    <div className='flex' style={{width:'100%', backgroundColor:'lightblue', padding:'20px 0'}}>
                        <img style={{width:'70%'}} src={detailBlog?.img} alt="" />
                    </div>
                    <div style={{padding:'20px'}}>
                        <h2>{detailBlog?.title}</h2>
                        <h4>{detailBlog?.sub_title}</h4>
                        <p dangerouslySetInnerHTML={{__html: detailBlog?.description}}></p>
                    </div>
                </div>
            </div>
            <br />
        </div>
    );
};

export default DetailBlog;