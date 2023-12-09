import { useState } from "react";
import { pdfjs } from "react-pdf";
import Pdf from "./Pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();


const Test = () => {

    const [numPages, setNumPages] = useState();
  console.log(typeof numPages)
  // eslint-disable-next-line no-unused-vars
  const [pageNumber, setPageNumber] = useState(1)

  const myArray = [];

  for(let i = 1; i <= numPages; i++){
    myArray.push(i);
  }

  console.log(myArray);
    

    // eslint-disable-next-line no-unused-vars
    const [pdf,setPdf] = useState('');
    const [image, setImage] = useState("");
    console.log(image);

    const submitImage = () => {

        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "jrhlspur");
        data.append("cloud_name", "dynvzd41q" );

        fetch("https://api.cloudinary.com/v1_1/dynvzd41q/image/upload", {
            method: "post",
            body:data
        })
        .then(res => res.json())
        .then(res => {
            setPdf(res)
            console.log(res)
        })
        .catch((error) => console.log(error));
    }

   
    return (
        <div
        >
           <input type="file" name="" id=""
           onChange={(e) => setImage(e.target.files[0])}
           />
           <button onClick={submitImage}>upload</button>
            <Pdf 
            file={pdf}
            numPages={numPages}
            pageNumber={pageNumber}
            setNumPages={setNumPages}
            setPageNumber={setPageNumber}
            newArray={myArray}
            />  
        </div>
    );
};

export default Test;