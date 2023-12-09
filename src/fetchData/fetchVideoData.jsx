import axios from "axios";

const apiLink = `https://blogify-server.vercel.app/api/v1`

export const fetchGetVideoData = async () => {
    try {
        const response = await axios.get(`${apiLink}/video`);
        const videoData = response;
        // refetch();
        console.log(videoData)

        return videoData;   
    } catch (error) {
        console.log(error);
     }
}


export const fetchPostVideoData = async (productDataContainer) => {
    try {
        const response = await axios.post(`${apiLink}/video/create-video`, productDataContainer);
        const videoData = response;
        // refetch();
        console.log(videoData)

        return videoData;
    } catch (error) {
        console.log(error);
     }
}

export const fetchUpdateVideoData = async (productDataContainer, id, refetch) => {
    try {
        const response = await axios.patch(`${apiLink}/video/${id}`, productDataContainer);
        const videoData = response;
        refetch();
        console.log(videoData)

        return videoData;
    } catch (error) {
        console.log(error);
     }
}


export const fetchDeleteVideoData = async ( id, refetch) => {
    try {
        const response = await axios.delete(`${apiLink}/video/${id}`);
        const videoData = response;
        refetch();
        console.log(videoData)

        return videoData;
    } catch (error) {
        console.log(error);
     }
}


