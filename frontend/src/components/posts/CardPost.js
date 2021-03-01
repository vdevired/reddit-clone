import React from "react";
import PostAuthor from "./PostAuthor";
import PostSub from "./PostSub";

/* Types of posts
- Short Body (Done) (Default styling is for this)
- Title Only (Done) (Drop margin-bottom of title to 0.55em)
- Long Body (Done)
- Image (Done)
- URL
*/

const CardPost = () => {
    const titleOnly = true;
    return (
        <div className="card-post">
            <div className="card-post__score-area">
                <div className="card-post__vote-arrows">
                    <button className="btn btn--post btn--upvote">
                        <i className="fas fa-arrow-alt-up"></i>
                    </button>
                    <p className="card-post__score">3.7k</p>
                    <button className="btn btn--post btn--downvote">
                        <i className="fas fa-arrow-alt-down"></i>
                    </button>
                </div>
            </div>
            <div className="card-post__content">
                <div className="card-post__header">
                    <PostSub />
                    <p className="card-post__meta"> • Posted by </p>
                    <PostAuthor />
                    <p className="card-post__meta">8 hours ago</p>
                </div>
                <p
                    className="card-post__title"
                    {...(titleOnly && { style: { marginBottom: "0.55em" } })}
                >
                    I was blessed with a 9 inch penis
                </p>
                {/* <p className="card-post__body">
                    I've always been a low-energy dude. Laid-back, hard to get
                    stressed out, and it's near impossible to get me seriously
                    upset about anything. Add to that working 12-14 hour shifts
                    at my warehousing job, and I just don't have that much
                    energy to spare in my free time. My girlfriend, on the other
                    hand, is always practically leaping for joy when we get to
                    spend time together. She'll twirl around, and hang off my
                    neck as she lets me in the door. She's always just as
                    excited to see me as she was on the night of our first date.
                    Every time she plans a surprise for me or is thinking about
                    our future together she's bursting at the seams with
                    excitement and anticipation. I just can't help but feel that
                    my inability to match her energy is disappointing her
                    somehow. I've spoken to her about it and she always tells me
                    that she doesn't expect
                </p> */}
                <img
                    className="card-post__image"
                    src="https://preview.redd.it/nmtbu8lfvbk61.jpg?width=640&height=387&crop=smart&auto=webp&s=784a06d0ad1f92b991a5dd0ad6edf5c623c5ec2b"
                />
                <ul className="card-post__footer">
                    <li>
                        <button className="btn btn--post btn--footer">
                            <i className="fas fa-comment-alt"></i> 272 Comments
                        </button>
                    </li>

                    <li>
                        <button className="btn btn--post btn--footer">
                            <i className="fas fa-share-alt"></i> Share
                        </button>
                    </li>

                    <li>
                        <button className="btn btn--post btn--footer">
                            <i className="fas fa-bookmark"></i> Save
                        </button>
                    </li>

                    <li>
                        <button className="btn btn--post btn--footer">
                            <i className="fas fa-ellipsis-h"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CardPost;
