import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchGetProductData } from '../fetchData/fetchProductData';


const useProductData = () => {
    const [productData, setProductData] = useState([]);
    const { data: getProductData, refetch, isLoading } = useQuery("getProductData", () => fetchGetProductData());

    useEffect(() => {
        setProductData(getProductData)
    }, [getProductData])

    return [productData, refetch, isLoading]
};

export default useProductData;