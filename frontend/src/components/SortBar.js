// The component where your sort by best, hot, new, top, others (rising) and change post type (card and classic)

import React from "react";

const SortBar = () => {
    return (
        <ul className="sort-bar">
            <li>
                <button className="btn btn--sort btn--sort-blue btn--sort-active">
                    <i className="fas fa-rocket"></i>
                    Best
                </button>
            </li>
            <li>
                <button className="btn btn--sort">
                    <i className="fas fa-fire"></i>
                    Hot
                </button>
            </li>
            <li>
                <button className="btn btn--sort">
                    <i className="fas fa-sparkles"></i>
                    New
                </button>
            </li>
            <li>
                <button className="btn btn--sort">
                    <i className="fas fa-trophy"></i>
                    Top
                </button>
            </li>
            <li>
                <button className="btn btn--sort">
                    <i
                        className="fas fa-ellipsis-h"
                        style={{ marginRight: 0 }}
                    ></i>
                </button>
            </li>
            <li>
                <button className="btn btn--sort btn--sort-blue">
                    <svg
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        class="_2ONLRjLuDplXKbcaS8dGe_"
                    >
                        <path d="M1.75,9.38V1.75h16.5V9.38Zm0,8.87V10.62h16.5v7.63Z"></path>
                    </svg>
                    <i class="fa fa-sort-down" style={{ marginRight: 0 }}></i>
                </button>
            </li>
        </ul>
    );
};

export default SortBar;
