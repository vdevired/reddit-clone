import React from "react";
import snoo from "../../static/img/home-box-snoo.png";

const HomeBox = () => {
    return (
        <div className="home-box">
            <div className="home-box__banner"></div>
            <div className="home-box__title">
                <img src={snoo} />
                <p>Home</p>
            </div>
            <p className="home-box__body">
                Your personal Reddit frontpage. Come here to check in with your
                favorite communities.
            </p>
            <button className="btn btn--secondary">Create Post</button>
            <button className="btn btn--primary">Create Community</button>
        </div>
    );
};

export default HomeBox;
