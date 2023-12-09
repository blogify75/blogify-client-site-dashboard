/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

function Pdf({file, numPages,setNumPages, pageNumber, newArray}) {

  const [findPage, setFindPage] = useState();
  
  function onDocumentLoadSuccess({ numPages }) {
  setNumPages(numPages);
  }

  const filterArray = newArray?.filter(f => {
    return f === (findPage ? +findPage : f)  })

  return (
      
   <div style={{width:'700px',backgroundColor:'gray'}}>
      <div className='flex' style={{width:'613px', margin:'auto', height:'50px', backgroundColor:'gray'}}>
          <div style={{display:'flex', alignItems:'center'}}>
                <span style={{marginRight:'10px', backgroundColor:'lightgray', padding:'1px 5px'}}>TOTAL PAGES:{findPage ? findPage : pageNumber} of {numPages}</span>
                <input placeholder='find page'  onChange={(e) => setFindPage(e.target.value)} type="number" name="findPage" id="" />
          </div>
      </div>
      <div style={{height:'85vh', width:'613px', overflowX:'hidden', overflowY:'scroll',margin:'auto'}}>
  
        <Document
        file={file} 
        onLoadSuccess={onDocumentLoadSuccess}
        >
          <div>
            {
              filterArray?.map(page => {
                return (
                  <div 
                  key={page.id}
                  style={{marginBottom:'10px'}}
                  >
                    <Page
                    pageNumber={page} 
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    />
                  </div>
                )
              })
            }
          </div>
        </Document>
     <br />
     <br />
    </div>
   </div>
  );
}
export default Pdf;