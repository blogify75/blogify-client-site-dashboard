import axios from "axios";

export const fetchGetBlogData = async () => {
    try {
        const response = await axios.get(`https://blogify-server.vercel.app/api/v1/blog`);
        const blogData = response;
        // refetch();
        console.log(blogData)

        return blogData;
    } catch (error) {
        console.log(error);
     }
}


export const fetchPostBlogData = async (blogDataContainer) => {
    try {
        const response = await axios.post(`https://blogify-server.vercel.app/api/v1/blog/create-blog`, blogDataContainer);
        const blogData = response;
        // refetch();
        console.log(blogData)

        return blogData;
    } catch (error) {
        console.log(error);
     }
}

export const fetchUpdateBlogData = async (blogDataContainer, id, refetch) => {
    try {
        const response = await axios.patch(`https://blogify-server.vercel.app/api/v1/blog/${id}`, blogDataContainer);
        const blogData = response;
        refetch();
        console.log(blogData)

        return blogData;
    } catch (error) {
        console.log(error);
     }
}


export const fetchDeleteBlogData = async ( id, refetch) => {
    try {
        const response = await axios.delete(`https://blogify-server.vercel.app/api/v1/blog/${id}`);
        const blogData = response;
        refetch();
        console.log(blogData)

        return blogData;
    } catch (error) {
        console.log(error);
     }
}


