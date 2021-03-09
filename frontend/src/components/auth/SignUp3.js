import React, { useContext } from "react";
import globalContext from "../../context/globalContext";

const SignUp3 = () => {
    const { hideSignUpFunc } = useContext(globalContext);

    return (
        <div className="sign-up-3">
            <div className="sign-up-3__header">
                <p className="sign-up-3__title">
                    Find communities by topics you're interested in.
                </p>
                <p className="sign-up-3__subtitle">
                    Reddit is filled with internet based communities, offering
                    something for everyone.
                </p>
                <p className="sign-up-3__subtitle">
                    Reddit works best when you have joined at least 5
                    communities.
                </p>
            </div>
            <div className="sign-up-3__main">
                <TopicsList />
                <SubsList />
            </div>
            <div className="sign-up-3__footer">
                <button className="btn btn--primary">Finish</button>
            </div>
            <button className="close" onClick={hideSignUpFunc}>
                <i className="far fa-times"></i>
            </button>
        </div>
    );
};

const TopicsList = () => {
    return (
        <ul className="su-topics-list">
            <li className="topic topic--selected">
                <i className="fab fa-reddit-alien"></i>
                <div className="topic__text">
                    <p>Recommended</p>
                    <p>5 selected</p>
                </div>
            </li>
        </ul>
    );
};

const SubsList = () => {
    return (
        <ul className="su-subs-list">
            <li className="sub">
                <img
                    className="sub__image"
                    src="https://a.thumbs.redditmedia.com/KZESzgF91cP3KEAR29JhCFmX0zxsPgY1sYhv7XCtiW0.png"
                    alt="sub-img"
                />
                <div className="sub__text">
                    <div className="sub__header">
                        <a className="sub__title link link--secondary">r/USC</a>
                        <p className="sub__members">17.8k members</p>
                    </div>
                    <div className="sub__desc">
                        A collection of news about the greatest university in
                        the world.
                    </div>
                </div>
                <button className="btn btn--primary">Join</button>
            </li>
        </ul>
    );
};

export default SignUp3;
