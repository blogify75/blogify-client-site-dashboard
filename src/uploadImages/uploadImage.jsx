export const updloadImage = (imgFile, setImgHolder) => {
    const imgStorageKey = `222da4d6a2a020cf59bf4c018422d29c`;
    const formData = new FormData();
    formData.append('image', imgFile);
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(result => {
            setImgHolder(result?.data?.url);
        })
}