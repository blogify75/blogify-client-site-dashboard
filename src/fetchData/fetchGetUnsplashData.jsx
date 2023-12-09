import axios from "axios";
const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const fetchGetUnsplashData = async (search) => {
    console.log(search)
    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${search}&page=1&per_page=${30}&client_id=${apiKey}`);
        const imageData = response;
        // refetch();
        console.log(imageData)

        return imageData;   
    } catch (error) {
        console.log(error);
     }
}