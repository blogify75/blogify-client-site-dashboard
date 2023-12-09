import { useState } from 'react';
import Pagination from '../pagination/Pagination';
import imageModal from './ImageModal.module.css';



// eslint-disable-next-line react/prop-types
const ImageModal = ({turn = false, btn, search, data, action}) => {

  

    const [paginatedData, setPaginatedData] = useState([]);
    const [pageNumber, setPageNumber] = useState();
    console.log(pageNumber);
    return (
        <div className={`${imageModal.main} ${turn ? imageModal.block : imageModal.none}`}
        >
            <div className={`${imageModal.container} flex`}>
                <div className={`${imageModal.modal} `}>
                    <div className={`${imageModal.modalBtn} flex_end`}>
                        <i style={{cursor:'pointer'}} onClick={() => btn(false)} className="uil uil-times"></i>
                    </div>
                      <form onSubmit={search} action="">
                        <div  className={`${imageModal.modalSearch} flex_between`}>
                            <input className={imageModal.modalSearchInput} type="text" name='search' placeholder='search image'/>
                            <input className={imageModal.modalSearchBtn}  type="submit" value="search" />
                        </div>
                      </form>
                    {
                        paginatedData?.length > 0 
                        ?
                            <div className={`${imageModal.modal_detail} `}>
                            {
                                paginatedData?.map(datas => {
                                    return <img onClick={() =>action(datas?.urls?.raw)} style={{width:'100%', height:'28vh', cursor:'pointer'}} key={datas?.id} src={datas?.urls?.small} loading='lazy' alt="" />
                                })
                            }
                            </div>
                      
                        :
                        <div className={`${imageModal.modal_detail_alt} flex `}>
                            <p>No Result Found</p>
                        </div>

                    }
                    
                    <div  className={`${imageModal.modalBottom} flex`}>
                    <Pagination
                        data={data}
                        container={setPaginatedData}
                        pageNumber={setPageNumber}
                        isBorder={true}
                        perPageNo={10}
                        border="green"
                        background={false}
                    />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ImageModal;