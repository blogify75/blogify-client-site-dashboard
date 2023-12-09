import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchGetUnsplashData } from "../fetchData/fetchGetUnsplashData";



const useUnsplashData = () => {
    const [unsplashData, setUnsplashData] = useState([]);
    const { data: getUnsplashData, refetch, isLoading } = useQuery("getUnsplashData", () => fetchGetUnsplashData());

    useEffect(() => {
        setUnsplashData(getUnsplashData)
    }, [getUnsplashData])

    return [unsplashData, refetch, isLoading]
};

export default useUnsplashData;