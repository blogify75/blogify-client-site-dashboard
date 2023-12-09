import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchGetVideoData } from "../fetchData/fetchVideoData";

const useVideoData = () => {
    const [videoData, setVideoData] = useState([]);
    const { data: getVideoData, refetch, isLoading } = useQuery("getVideoData", () => fetchGetVideoData());

    useEffect(() => {
        setVideoData(getVideoData)
    }, [getVideoData])

    return [videoData, refetch, isLoading]
};

export default useVideoData;