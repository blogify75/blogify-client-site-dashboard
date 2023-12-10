import { useEffect, useState } from "react";
import Pagination from "../../pagination/Pagination";
import blog from "./blog.module.css";
import { useNavigate } from "react-router-dom";
import useBlogData from "../../customHooks/customBlogHook";
import Modal from "../../modal/Modal";
import { fetchDeleteBlogData } from "../../fetchData/fetchBlogData";
import { toast } from "react-toastify";
import useUnsplashData from "../../customHooks/customUnsplashHook";
const Blog = () => {

  const [unsplashData] = useUnsplashData();
  const allUnsplashData = unsplashData?.data?.results;
  console.log(allUnsplashData)
  
  const [paginatedData, setPaginatedData] = useState();
  // eslint-disable-next-line no-unused-vars
  const [pageNumber, setPageNumber] = useState();

  // modal
  const [open, setOpen] = useState(false);
  const [idContainer, setIdContainer] = useState('');
  const [title,setTitle] = useState('');

  const navigate = useNavigate();

  const [blogData, refetch, isLoading] = useBlogData();
  const allBlogs = blogData?.data?.data?.data;
  

  const handleRoute = (id) => {
   navigate(`/dashboard/updateBlog/${id}`)
  }

  const deleteBlog = async (e) => {

    e.preventDefault();
  
      await fetchDeleteBlogData(idContainer, refetch).then(res => {
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
    <div className={`${blog.main}`}>
      <div className={`${blog.title} flex_end`}>
        <button
          style={{ cursor: "pointer" }}
          className="flex"
          onClick={() => navigate("/dashboard/addBlog")}
        >
          <i
            style={{ fontSize: "20px", marginRight: "5px" }}
            className="uil uil-create-dashboard"
          ></i>{" "}
          CREATE
        </button>
      </div>
      <div className={`${blog.container}`}>
        <div className={`${blog.detail}`}>
          <div className={`${blog.allBlogs} `}>
            <div className={`${blog.allBlogs_title} `}>
              <p>All Blogs : {pageNumber}</p>
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
                        className={`${blog.allBlogs_container} `}
                      >
                        <div className={``}>
                          <img
                            style={{ width: "100%", height: "35vh" }}
                            src={data?.img}
                            alt=""
                          />
                        </div>
                        <div style={{ paddingLeft: "20px" }} className={`${blog.allBlogs_detail}`}>
                          <div className={`${blog.allBlogs_Detail_title} flex_between `}>
                            <p> {data?.title}</p>
                            <div className={blog.allBlogs_modifications} style={{marginRight:'30px'}}>
                              <span style={{cursor:'pointer'}} onClick={() => handleRoute(data?._id)}><i className="uil uil-pen"></i></span>
                              <span style={{cursor:'pointer', marginLeft:'10px'}}><i onClick={() => {
                                setOpen(true);
                                setIdContainer(data?._id);
                                setTitle(data?.title)
                              }} className="uil uil-trash"></i></span>
                            </div>
                          </div>
                          <div className={`${blog.allBlogs_Detail_notifier}`}>
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
                            className={`${blog.allBlogs_Detail_Detail} `}>
                               {data?.sub_title?.slice(0,299)} 
                               <p onClick={() => navigate(`/dashboard/detailBlog/${data?._id}`)} style={{fontSize:'12px', color:'skyblue',cursor:'pointer'}}>view detail</p>
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
      <div className={`${blog.footer} flex`}>
        <Modal 
        turn={open}
        btn={setOpen}
        title={title}
        action={deleteBlog}
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

export default Blog;
