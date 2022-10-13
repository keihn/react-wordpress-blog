import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Oval } from "react-loader-spinner";
import { useImmerReducer } from "use-immer";
import Post from "./Post";

function Home() {
  const initialState = {
    page: {
      next: 1,
      totalPages: 0
    },

    post: {
      total: 0
    },

    isLoading: false
  };

  function appReducer(draft, action) {
    switch (action.type) {
      case "setNextPage":
        draft.page.next++;
        return;

      case "setIsLoading":
        draft.isLoading = !draft.isLoading;
        return;
    }
  }

  const [posts, setPosts] = useState([]);
  const [state, dispatch] = useImmerReducer(appReducer, initialState);

  const appRequest = Axios.CancelToken.source()

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await Axios.get(
          "/posts?per_page=5&_fields=id,title,excerpt,date,author", {cancelToken: appRequest.token}
        );
        setPosts(response.data);
        dispatch({ type: "setIsLoading" });
      } catch (error) {
        console.log(error);
      }
    }

	return () => {
		appRequest.cancel();
	}
    getPosts();
  }, []);

  useEffect(() => {
      async function getNextPosts() {
        try {
          const response = await Axios.get(
            `/posts?per_page=5&_fields=id,title,excerpt,date,author&page=${state.page.next}`
          );
          setPosts(response.data);
          dispatch({ type: "setIsLoading" });
        } catch (error) {
          console.log(error);
        }
      }
	  dispatch({ type: "setIsLoading" });
      getNextPosts();
  }, [state.page.next]);

  function nextPagehandler(e) {
	e.preventDefault()
    dispatch({ type: "setNextPage" });
  }

  console.log(state.page.next)

  return (
    <>
      <header
        className="masthead"
        style={{ backgroundImage: `url('./assets/img/home-bg.jpg')` }}
      >
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="site-heading">
                <h1>Clean Blog</h1>
                <span className="subheading">
                  A Blog Theme by Start Bootstrap
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            {state.isLoading ? (
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
              />
            ) : (
              posts.map(post => {
                return <Post post={post} key={post.id} />;
              })
            )}

            <hr className="my-4" />

            <div className="d-flex justify-content-end mb-4">
              <Link
                onClick={nextPagehandler}
                className="btn btn-primary text-uppercase"
                to="#!"
              >
                Older Posts →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
