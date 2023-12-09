import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchGetBlogData } from '../fetchData/fetchBlogData';

const useBlogData = () => {
    const [blogData, setBlogData] = useState([]);
    const { data: getBlogData, refetch, isLoading } = useQuery("getBlogData", () => fetchGetBlogData());

    useEffect(() => {
        setBlogData(getBlogData)
    }, [getBlogData])

    return [blogData, refetch, isLoading]
};

export default useBlogData;