import React from "react";
import banner from "../static/img/create-community.png";

const CreateCommunity = () => {
    return (
        <div className="create-comm">
            <img src={banner} alt="Banner" className="create-comm__banner" />
            <div className="create-comm__main">
                <p className="create-comm__title">Create a community</p>
                <form className="create-comm__form">
                    <p className="create-comm__input-heading">Name</p>
                    <p className="create-comm__input-subheading">
                        Community names including capitalization cannot be
                        changed.
                    </p>
                    <input name="name" className="create-comm__input" />

                    <p className="create-comm__input-heading">Topics</p>
                    <p className="create-comm__input-subheading">
                        This will help relevant users find your community. 0/25
                    </p>
                    <input name="topics" className="create-comm__input" />

                    <p className="create-comm__input-heading">Description</p>
                    <p className="create-comm__input-subheading">
                        This is how new members come to understand your
                        community.
                    </p>
                    <textarea
                        name="description"
                        className="create-comm__textarea"
                    ></textarea>

                    <p
                        className="create-comm__input-heading"
                        style={{ marginBottom: "0.5em" }}
                    >
                        Community Type
                    </p>
                    <div className="create-comm__radio">
                        <input
                            type="radio"
                            id="communityType1"
                            name="communityType"
                            value="public"
                        />
                        <i className="fas fa-user"></i>
                        <p>Public</p>
                        <p>
                            Anyone can view, post, and comment to this community
                        </p>
                    </div>

                    <div className="create-comm__radio">
                        <input
                            type="radio"
                            id="communityType2"
                            name="communityType"
                            value="restricted"
                        />
                        <i className="far fa-eye"></i>
                        <p>Restricted</p>
                        <p>
                            Anyone can view this community, but only approved
                            users can post
                        </p>
                    </div>

                    <div className="create-comm__radio">
                        <input
                            type="radio"
                            id="communityType3"
                            name="communityType"
                            value="private"
                        />
                        <i className="fas fa-lock"></i>
                        <p>Private</p>
                        <p>
                            Only approved users can view and submit to this
                            community
                        </p>
                    </div>

                    <p
                        className="create-comm__input-heading"
                        style={{ marginBottom: "0.5em" }}
                    >
                        Adult Content
                    </p>

                    <div className="create-comm__checkbox">
                        <input type="checkbox" name="nsfw" value="true" />
                        <p>NSFW</p>
                        <p>18+ year old community</p>
                    </div>
                </form>

                <div className="create-comm__footer">
                    <button className="btn btn--secondary">Cancel</button>
                    <button className="btn btn--primary">
                        Create Community
                    </button>
                </div>
            </div>
            <button className="close" onClick={null}>
                <i className="far fa-times"></i>
            </button>
        </div>
    );
};

export default CreateCommunity;
