export const updloadImage = (imgFile, setImgHolder) => {
   
    const data = new FormData();
    data.append("file", imgFile);
    data.append("upload_preset", "fbh5hf29");
    data.append("cloud_name", "dvb7k40g4" );

    fetch("https://api.cloudinary.com/v1_1/dvb7k40g4/image/upload", {
        method: "post",
        body:data
    })
    .then(res => res.json())
    .then(res => {
        setImgHolder(res?.url)
       
    })
    .catch((error) => console.log(error));
}