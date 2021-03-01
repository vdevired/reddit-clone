// The sub icon and title shown on a post along with tooltip

import React from "react";

import { Link } from "react-router-dom";

const PostSub = () => {
    return (
        <div className="post-sub">
            <img
                className="post-sub__img"
                src="https://b.thumbs.redditmedia.com/ea6geuS5pIeDjJdtVdbcgfQYX-RwGYwsbHB02tCJmMs.png"
                alt="sub-profile-pic"
            />
            <Link className="post-sub__title" to="/">
                r/Jokes
            </Link>
        </div>
    );
};

export default PostSub;
