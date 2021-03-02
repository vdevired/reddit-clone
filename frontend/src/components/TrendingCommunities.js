import React from "react";

const TrendingCommunities = () => {
    return (
        <div className="trending-comm">
            <p className="trending-comm__title">Trending Communities</p>
            <ul className="trending-comm__list">
                <li>
                    <img src="https://b.thumbs.redditmedia.com/m4VATXAjdBvSPLWoqRD9pGfyr-SteJVdSlLICi6tc-s.png" />
                    <div>
                        <a href="#">r/Awwducational</a>
                        <p>2,548,861 members</p>
                    </div>
                    <button className="btn btn--primary">Join</button>
                    {/* Only show if not already in community */}
                </li>
                <li>
                    <img src="https://b.thumbs.redditmedia.com/m4VATXAjdBvSPLWoqRD9pGfyr-SteJVdSlLICi6tc-s.png" />
                    <div>
                        <a href="#">r/Awwducational</a>
                        <p>2,548,861 members</p>
                    </div>
                    <button className="btn btn--primary">Join</button>
                    {/* Only show if not already in community */}
                </li>
                <li>
                    <img src="https://b.thumbs.redditmedia.com/m4VATXAjdBvSPLWoqRD9pGfyr-SteJVdSlLICi6tc-s.png" />
                    <div>
                        <a href="#">r/Awwducational</a>
                        <p>2,548,861 members</p>
                    </div>
                    <button className="btn btn--primary">Join</button>
                    {/* Only show if not already in community */}
                </li>
            </ul>
        </div>
    );
};

export default TrendingCommunities;
