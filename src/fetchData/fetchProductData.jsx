import axios from "axios";

const apiLink = `https://blogify-server.vercel.app/api/v1`

export const fetchGetProductData = async () => {
    try {
        const response = await axios.get(`${apiLink}/product`);
        const productData = response;
        // refetch();
        console.log(productData)

        return productData;
    } catch (error) {
        console.log(error);
     }
}


export const fetchPostProductData = async (productDataContainer) => {
    try {
        const response = await axios.post(`${apiLink}/product/create-product`, productDataContainer);
        const productData = response;
        // refetch();
        console.log(productData)

        return productData;
    } catch (error) {
        console.log(error);
     }
}

export const fetchUpdateProductData = async (productDataContainer, id, refetch) => {
    try {
        const response = await axios.patch(`${apiLink}/product/${id}`, productDataContainer);
        const productData = response;
        refetch();
        console.log(productData)

        return productData;
    } catch (error) {
        console.log(error);
     }
}


export const fetchDeleteProductData = async ( id, refetch) => {
    try {
        const response = await axios.delete(`${apiLink}/product/${id}`);
        const productData = response;
        refetch();
        console.log(productData)

        return productData;
    } catch (error) {
        console.log(error);
     }
}


