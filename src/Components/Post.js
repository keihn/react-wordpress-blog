import React, { useEffect } from "react";
import {Link} from "react-router-dom"

function Post(props) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const date = new Date(props.post.date);
  const formattedDate = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

  return (
    <>
      <div className="post-preview">
        <Link to={`/post/${props.post.id}`}>
          <h2 className="post-title">{props.post.title.rendered}</h2>
        </Link>
        <p className="post-meta">
          Post by <Link to={`/post/${props.post.id}`}>Start Bootstrap</Link> on{" "}
          {formattedDate}
        </p>
      </div>
    </>
  );
}

export default Post;
