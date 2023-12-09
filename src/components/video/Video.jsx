import { useEffect, useState } from 'react';
import video from './Video.module.css'
import useVideoData from '../../customHooks/customVideoHook';
import { useNavigate } from 'react-router-dom';
import { fetchDeleteVideoData } from '../../fetchData/fetchVideoData';
import { toast } from 'react-toastify';
import Modal from '../../modal/Modal';
import Pagination from '../../pagination/Pagination';
import YoutubeEmbed from './YoutubeEmbed';

const Video = () => {
    const [paginatedData, setPaginatedData] = useState();
    // eslint-disable-next-line no-unused-vars
    const [pageNumber, setPageNumber] = useState();
  
    // modal
    const [open, setOpen] = useState(false);
    const [idContainer, setIdContainer] = useState('');
    const [title,setTitle] = useState('');
  
    const navigate = useNavigate();
  
    const [productData, refetch, isLoading] = useVideoData();
    const allBlogs =productData?.data?.data?.data;
    
    console.log(allBlogs)
  
  
    const handleRoute = (id) => {
     navigate(`/dashboard/updateVideo/${id}`)
    }
  
    const deleteVideo = async (e) => {
  
      e.preventDefault();
    
        await fetchDeleteVideoData(idContainer, refetch).then(res => {
          if(res?.data?.statusCode === 200){
            console.log(res);
            toast.success('successfully deleted this item')
            setOpen(false)
          }
        })
    }
  
    
  
    useEffect(() => {
      refetch();
    }, [refetch]);
    return (
        <div className={`${video.main}`}>
        <div className={`${video.title} flex_end`}>
          <button
            style={{ cursor: "pointer" }}
            className="flex"
            onClick={() => navigate("/dashboard/addVideo")}
          >
            <i
              style={{ fontSize: "20px", marginRight: "5px" }}
              className="uil uil-create-dashboard"
            ></i>{" "}
            CREATE
          </button>
        </div>
        <div className={`${video.container}`}>
          <div className={`${video.detail}`}>
            <div className={`${video.allBlogs} `}>
              <div className={`${video.allBlogs_title} `}>
                <p>All Videos : {pageNumber}</p>
              </div>
              <div>
                {isLoading ? (
                  <p>...loading</p>
                ) : (
                  <div>
                    {paginatedData?.map((data) => {
                      return (
                        <div
                          key={data?.id}
                          className={`${video.allBlogs_container} `}
                        >
                          <div className={``}>
                            <YoutubeEmbed embedId={data?.videoLink}/>
                          </div>
                          <div style={{ paddingLeft: "20px" }} className={`${video.allBlogs_detail}`}>
                            <div className={`${video.allBlogs_Detail_title} flex_between  `}>
                              <p> {data?.title}</p>
                              <div className={video.allBlogs_modifications} style={{marginRight:'30px'}}>
                                <span style={{cursor:'pointer'}} onClick={() => handleRoute(data?._id)}><i className="uil uil-pen"></i></span>
                                <span style={{cursor:'pointer', marginLeft:'10px'}}><i onClick={() => {
                                  setOpen(true);
                                  setIdContainer(data?._id);
                                  setTitle(data?.title)
                                }} className="uil uil-trash"></i></span>
                              </div>
                            </div>
                            <div className={`${video.allBlogs_Detail_notifier}`}>
                              <p
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "0",
                                  margin: "0",
                                }}
                              >
                                <p
                                  style={{
                                    backgroundColor: "lightgray",
                                    borderRadius: "50%",
                                    height: "40px",
                                    width: "40px",
                                    padding: "0",
                                    margin: "0",
                                  }}
                                  className="flex"
                                >
                                  {data?.name?.slice(0, 1)?.toUpperCase()}
                                </p>
                                <p style={{ marginLeft: "10px" }}>{data?.name}</p>
                                <p style={{ marginLeft: "40px", color: "gray" }}>
                                  {data?.date}
                                </p>
                              </p>
                            </div>
                            <div
                              className={`${video.allBlogs_Detail_Detail} `}>
                                  {/* <h4 style={{color:'red', margin:'0', padding:'0'}}>price: $ {data?.price}</h4> */}
                                  {/* <p style={{ marginTop:'10px', padding:'0'}}>total-clicked : {data?.clickPerCount}</p> */}
  
                                 <p  onClick={() => navigate(`/dashboard/detailProduct/${data?._id}`)} dangerouslySetInnerHTML={{__html: data?.description?.slice(0,50)}}></p>
                                 <span>{data?.description?.length > 50 && <span style={{color:'skyblue', cursor:'pointer'}} onClick={() => navigate(`/dashboard/detailProduct/${data?._id}`)} >...see more</span> }</span>
                                
                           </div>
                           
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={`${video.footer} flex`}>
          <Modal
          turn={open}
          btn={setOpen}
          title={title}
          action={deleteVideo}
          ></Modal>
          <Pagination
            data={allBlogs}
            container={setPaginatedData}
            pageNumber={setPageNumber}
            isBorder={true}
            perPageNo={10}
            border="green"
            background={false}
          />
        </div>
      </div>
    );
};

export default Video;