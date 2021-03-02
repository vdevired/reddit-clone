// Today's Top Growing Communities
// Banner can be image or solid color

import React from "react";

const TodaysCommunities = () => {
    return (
        <div className="todays-comm">
            {/* Image is Optional */}
            <img
                src="https://images.unsplash.com/photo-1614442042855-e17d53875286?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80"
                className="todays-comm__banner"
            />
            <p className="todays-comm__title">
                Today's Top Growing Communities
            </p>
            <ul className="todays-comm__list">
                <li>
                    1 <i class="fa fa-sort-up"></i>
                    <img src="https://a.thumbs.redditmedia.com/KZESzgF91cP3KEAR29JhCFmX0zxsPgY1sYhv7XCtiW0.png" />
                    r/Music
                </li>
                <li>
                    1 <i class="fa fa-sort-up"></i>
                    <img src="https://a.thumbs.redditmedia.com/KZESzgF91cP3KEAR29JhCFmX0zxsPgY1sYhv7XCtiW0.png" />
                    r/Music
                </li>
                <li>
                    1 <i class="fa fa-sort-up"></i>
                    <img src="https://a.thumbs.redditmedia.com/KZESzgF91cP3KEAR29JhCFmX0zxsPgY1sYhv7XCtiW0.png" />
                    r/Music
                </li>
                <li>
                    1 <i class="fa fa-sort-up"></i>
                    <img src="https://a.thumbs.redditmedia.com/KZESzgF91cP3KEAR29JhCFmX0zxsPgY1sYhv7XCtiW0.png" />
                    r/Music
                </li>
            </ul>
            <button className="btn btn--primary">View All</button>
            <ul className="todays-comm__more-list">
                <li>
                    <button className="btn btn--sort btn--sort-blue btn--sort-active btn--todays-comms">
                        Near You
                    </button>
                </li>
                <li>
                    <button className="btn btn--sort btn--sort-blue btn--sort-active btn--todays-comms">
                        Near You
                    </button>
                </li>
                <li>
                    <button className="btn btn--sort btn--sort-blue btn--sort-active btn--todays-comms">
                        Near You
                    </button>
                </li>
                <li>
                    <button className="btn btn--sort btn--sort-blue btn--sort-active btn--todays-comms">
                        Near You
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default TodaysCommunities;
