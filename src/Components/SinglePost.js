import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import parse from "html-react-parser"
import {Oval} from "react-loader-spinner"



function SinglePost() {

  const {id} = useParams()
  const [post, setPost] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const appRequest = Axios.CancelToken.source();

  useEffect(()=>{
    async function getPost(){
      try {
        const response = await Axios.get(`posts/${id}`, {cancelToken: appRequest.token});
        setPost(response.data)
        setIsLoading(false)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getPost()

    return () => {
      appRequest.cancel()
    }
  
  }, [id])


  return (
    <>
      <header
        className="masthead"
        style={{ backgroundImage: `url('assets/img/post-bg.jpg')` }}
      >

        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>
                  {post.title.rendered}
                </h1>
                <h2 className="subheading">
                  
                </h2>
                <span className="meta">
                  Posted by
                  <a href="#!">Start Bootstrap</a>
                  on August 24, 2022
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isLoading ?   
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
          /> : <article className="mb-4">
              <div className="container px-4 px-lg-5">
                  <div className="row gx-4 gx-lg-5 justify-content-center">
                      <div className="col-md-10 col-lg-8 col-xl-7">
                          {parse(post.content.rendered)}
                      </div>
                  </div>
              </div>
          </article>
        }
      
    </>
  );
}

export default SinglePost;
