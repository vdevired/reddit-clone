import React from "react";
import { Link } from "react-router-dom";

const AuthHeader = () => {
    return (
        <div className="header header--auth">
            <div className="header__section">
                <Link to="/" className="header__logo"></Link>
            </div>

            <div className="header__section">
                <button className="btn btn--header btn--header-dropdown">
                    <i className="fas fa-ufo"></i>
                    <p>Home</p>
                    <i className="fa fa-sort-down"></i>
                </button>
            </div>

            <div className="header__section">
                <div className="header__search">
                    <i className="fa fa-search"></i>
                    <input placeholder="Search" />
                </div>
            </div>

            <ul className="header__section header__section--list">
                <li>
                    <button className="btn btn--tertiary" title="Popular">
                        <svg
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <polygon points="12.5 3.5 20 3.5 20 11 17.5 8.5 11.25 14.75 7.5 11 2.5 16 0 13.5 7.5 6 11.25 9.75 15 6"></polygon>
                        </svg>
                    </button>
                </li>

                <li>
                    <button className="btn btn--tertiary" title="All">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M1.25,17.5V7.5h5v10Zm11.25,0h-5V5H5l5-5,5,5H12.5Zm1.25,0v-5h5v5Z"></path>
                        </svg>
                    </button>
                </li>
                <li>
                    <button className="btn btn--tertiary" title="Chat">
                        <svg
                            class="ra_3TRn5G7dbrfbhx8kYi "
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10,0A10,10,0,0,0,1.64,15.51L.57,18.73c-.16.52.19.86.7.7l3.22-1.08A10,10,0,1,0,10,0ZM5.54,11.41A1.39,1.39,0,1,1,6.93,10,1.39,1.39,0,0,1,5.54,11.41Zm4.46,0A1.39,1.39,0,1,1,11.39,10,1.39,1.39,0,0,1,10,11.41Zm4.44,0A1.39,1.39,0,1,1,15.83,10,1.39,1.39,0,0,1,14.44,11.41Z"></path>
                        </svg>
                    </button>
                </li>
                <li>
                    <button className="btn btn--tertiary" title="Messages">
                        <svg
                            class="_1V77mEI1g_5ZlCh_c2-Yab "
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M7.79,9.16,2.48,3.85A2.49,2.49,0,0,1,3.75,3.5h12.5a2.49,2.49,0,0,1,1.27.35L12.21,9.16A3.13,3.13,0,0,1,7.79,9.16Z"></path>
                            <path d="M13.09,10.31,18.4,5a2.47,2.47,0,0,1,.35,1.27v7.5a2.5,2.5,0,0,1-2.5,2.5H3.75a2.5,2.5,0,0,1-2.5-2.5V6.27A2.47,2.47,0,0,1,1.6,5l5.31,5.31a4.37,4.37,0,0,0,6.18,0Z"></path>
                        </svg>
                    </button>
                </li>
                <li>
                    <button className="btn btn--tertiary">
                        <svg
                            class="_1aj2BqXAeeo2bHwArcJ5AT"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M5,15a1,1,0,0,1-1-1V11.17a1,1,0,0,1,.29-.7l8.09-8.09a1,1,0,0,1,1.41,0l2.83,2.83a1,1,0,0,1,0,1.41L8.54,14.71a1,1,0,0,1-.71.29Zm12,1a1,1,0,0,1,0,2H3a1,1,0,0,1,0-2Z"></path>
                        </svg>
                    </button>
                </li>
            </ul>

            <div className="header__section">
                <button className="btn btn--header btn--header-user">
                    <img
                        src="https://styles.redditmedia.com/t5_2qo4s/styles/communityIcon_1podsfdai4301.png"
                        alt="profile-pic"
                        className="header__profile-pic"
                    />
                    <div className="header__user-info">
                        <p>vikhyat</p>
                        <p>
                            <svg
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M3.37,2.75a5.9,5.9,0,0,1,5.49,3.7.62.62,0,0,1-.29.79A3.16,3.16,0,0,0,7.24,8.57a.63.63,0,0,1-.79.29,5.89,5.89,0,0,1-3.7-5.49A.62.62,0,0,1,3.37,2.75Zm8.06,4.49a.63.63,0,0,1-.29-.79,5.89,5.89,0,0,1,5.49-3.7.61.61,0,0,1,.62.6v0a5.89,5.89,0,0,1-3.7,5.49.62.62,0,0,1-.79-.29A3.16,3.16,0,0,0,11.43,7.24Zm2.12,3.9a5.89,5.89,0,0,1,3.7,5.49.62.62,0,0,1-.62.62h0a5.89,5.89,0,0,1-5.49-3.7.63.63,0,0,1,.29-.79,3.16,3.16,0,0,0,1.33-1.33A.62.62,0,0,1,13.55,11.14Zm-5,1.62a.62.62,0,0,1,.29.79,5.89,5.89,0,0,1-5.49,3.7.62.62,0,0,1-.62-.62h0a5.9,5.9,0,0,1,3.7-5.49.62.62,0,0,1,.79.29,3.1,3.1,0,0,0,1.35,1.33ZM10,5.93A7.23,7.23,0,0,0,7.51,2.82,5,5,0,0,1,9.68.09a.61.61,0,0,1,.64,0,5,5,0,0,1,2.17,2.73A7.23,7.23,0,0,0,10,5.93Zm9.91,3.75a.61.61,0,0,1,0,.64,5,5,0,0,1-2.73,2.17A7.23,7.23,0,0,0,14.07,10a7.36,7.36,0,0,0,3.11-2.49A5,5,0,0,1,19.91,9.68ZM10,14.07a7.18,7.18,0,0,0,2.5,3.11,5,5,0,0,1-2.18,2.73.61.61,0,0,1-.64,0,5,5,0,0,1-2.17-2.73A7.23,7.23,0,0,0,10,14.07ZM5.93,10a7.23,7.23,0,0,0-3.11,2.49A5,5,0,0,1,.09,10.32a.61.61,0,0,1,0-.64A5,5,0,0,1,2.82,7.51,7.23,7.23,0,0,0,5.93,10Z"></path>
                            </svg>
                            1.3k karma
                        </p>
                    </div>
                    <i className="fa fa-sort-down"></i>
                </button>
            </div>
        </div>
    );
};

export default AuthHeader;
