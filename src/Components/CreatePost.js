import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useImmerReducer } from "use-immer";
import Axios from "axios"

function CreatePost() {

  const formState = {
    title: {
      value: "",
      hasError: false,
      message: ""
    },

    excerpt: {
      value: "",
      hasError: false
    },

    body: {
      value: "",
      hasError: false,
      message: ""
    },

    isLoading: true
  };

  const [state, dispatch] = useImmerReducer(appReducer, formState);



  function appReducer(draft, action) {
    switch (action.type) {
        case "setTitle":
            draft.title.value = action.value;
            return;

        case "titleRules":
            if (!action.value.trim()) {
              draft.title.hasError = true;
              draft.title.message = "Title cannot be empty";
            }else{
              draft.title.hasError = false;
              draft.title.message = ""
            }
            return;

        case "setExcerpt":
            draft.excerpt.value = action.value;
            return;
        
        case "setBody":
            draft.body.value = action.value;
            return
        
        case "bodyRules":
            if(!action.value){
                draft.body.hasError = true;
                draft.body.message = "The post content cannot be empty"
              }else{
                draft.body.hasError = false;
                draft.body.message = ""
              }
            return
    }
  }



  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if(!state.title.hasError && !state.title.hasError){
        const response = await Axios.post("/posts", {title: state.title.value, content: state.body.value, excerpt: state.excerpt.value})
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <>
      <header
        className="masthead"
        style={{ backgroundImage: `url('assets/img/contact-bg.jpg')` }}
      >
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="page-heading">
                <h1>Create Post</h1>
                <span className="subheading">
                  Make a guest post to be approved by the admin
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="my-5">
                {/* <!-- * * * * * * * * * * * * * * *-->
                            <!-- * * SB Forms Contact Form * *-->
                            <!-- * * * * * * * * * * * * * * *-->
                            <!-- This form is pre-integrated with SB Forms.-->
                            <!-- To make this form functional, sign up at-->
                            <!-- https://startbootstrap.com/solution/contact-forms-->
                            <!-- to get an API token!--> */}
                <form
                  onSubmit={handleSubmit}
                  id="contactForm"
                  data-sb-form-api-token="API_TOKEN"
                >
                  <div className="form-floating">
                    <input
                      className="form-control"
                      onBlur={e => {
                        dispatch({ type: "titleRules", value: e.target.value });
                      }}
                      onChange={e => {
                        dispatch({ type: "setTitle", value: e.target.value });
                      }}
                      id="title"
                      type="text"
                      placeholder="Post title..."
                      data-sb-validations="required"
                    />
                    <label htmlFor="name">Title</label>
                    {state.title.hasError ? (
                      <small className="text-danger">
                        {state.title.message}
                      </small>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      id="excerpt"
                      placeholder="Excerpt"
                      style={{ height: `12rem` }}
                      data-sb-validations="required"
                    ></textarea>
                    <label htmlFor="message">Excerpt</label>
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="excerpt:required"
                    >
                      Excerpt
                    </div>
                  </div>

                  <ReactQuill
                    theme="snow"
                    onChange={html => {dispatch({type: "setBody", value: html})}}
                    onBlur={(html) => {dispatch({type: "bodyRules", value: html.index})}}
                  />

                    {state.body.hasError ? (
                      <small className="text-danger">
                        {state.body.message}
                      </small>
                    ) : (
                      ""
                    )}
                  <br />
                  <div className="d-none" id="submitSuccessMessage">
                    <div className="text-center mb-3">
                      <div className="fw-bolder">
                        Post submission successful!
                      </div>
                    </div>
                  </div>

                  <div className="d-none" id="submitErrorMessage">
                    <div className="text-center text-danger mb-3">
                      Error sending message!
                    </div>
                  </div>

                  <button
                    className="btn btn-primary text-uppercase"
                    type="submit"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CreatePost;
