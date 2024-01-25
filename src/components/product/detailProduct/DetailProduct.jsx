import { useParams } from 'react-router-dom';
import productDetail from './DetailProduct.module.css';
import useProductData from '../../../customHooks/customProductHook';

const DetailProduct = () => {
    const {id} = useParams();

    const [productData] = useProductData();
    const allProducts =productData?.data?.data?.data;

    const findProduct = allProducts?.find(f => {
        return f._id === id
    })

    console.log(findProduct)

    return (
        <div className={`${productDetail.main}`}>
            <div className={`${productDetail.container}`}>
                <div>
                    <div className='flex' style={{width:'100%', backgroundColor:'lightblue', padding:'20px 0'}}>
                        <img style={{width:'70%', height:'600px'}} src={findProduct?.img} alt="" />
                    </div>
                    <div style={{padding:'20px'}}>
                        <h2>{findProduct?.title}</h2>
                        <h3 style={{color:'red'}}>Price: {findProduct?.price}$</h3>
                        <h3 style={{color:'orange'}}>Total Cliked by Customer: {findProduct?.clickPerCount}</h3>
                        <h3 style={{color:'lightblue'}}>Post Publishing Date: {findProduct?.date}</h3>
                        <h3 >Category: {findProduct?.categories}</h3>
                        <h3 >Publisher Name: {findProduct?.name}</h3>
                        <hr />
                        <h3 style={{color:'blue'}}>Description:</h3>
                        <p dangerouslySetInnerHTML={{__html: findProduct?.description}}></p>
                    </div>
                </div>
            </div>
            <br />
        </div>
    );
};

export default DetailProduct;