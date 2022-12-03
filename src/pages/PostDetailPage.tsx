import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import { DateTime, Interval } from "luxon";
import Greetings from "../components/Greetings";
import axios from "axios";
import DOMPurify from "dompurify";
import type * as T from "types";
import { Helmet } from "react-helmet";
import Post from "../components/Post";

const PostDetailPage: React.FunctionComponent<T.PostDetailPageProps> = ({
    location: { pathname, history },
}) => {
    const { user, accessToken } = useUser();
    const [post, setPost] = useState<T.Post | undefined>();
    const [previousPost, setPreviousPost] = useState<T.Post | undefined>();
    const [working, setWorking] = useState(true);
    const postId = pathname.split("/")[2];

    const deletePost = () => {
        const isConfirmed = window.confirm("Are you sure to delete this post?");
        if (isConfirmed) {
            axios
                .post(
                    "/api/post/delete",
                    { postId },
                    { headers: { authorization: "bearer " + accessToken } }
                )
                .then((res) => {
                    if (res.status === 200) {
                        history.push("/");
                    }
                })
                .catch((err) => alert(err.response.data.message));
        }
    };

    useEffect(() => {
        const getPost = () => {
            axios
                .get(`/api/post/${postId}`)
                .then((res) => {
                    const post = res.data.post;
                    const previousPost = res.data.previousPost;
                    setPost(post);
                    setPreviousPost(previousPost);
                })
                .catch((err) => alert(err))
                .finally(() => {
                    setWorking(false);
                });
        };
        getPost();
    }, [postId]);

    const writtenDate: DateTime | undefined = post
        ? DateTime.fromISO(post.created_at)
        : undefined;
    const birthDate = DateTime.local(1989, 12, 23, 0, 0, 0);
    const i = writtenDate ? Interval.fromDateTimes(birthDate, writtenDate) : null;
    const age: number | null = i ? Math.floor(i.length("years")) : null;

    return (
        <>
            <Helmet>
                <title>{post?.title || "Dongeun Paeng"}</title>
            </Helmet>
            <div>
                <Greetings title="Here's my thought..." subtitle="What's yours?" />
                {working ? null : post ? (
                    <div className="flex justify-between items-center w-full my-4">
                        <div className="w-full pb-6">
                            <div className="flex justify-between">
                                <div>
                                    <h1 className="text-xl text-gray-800">{post.title}</h1>
                                    <div className="text-sm text-gray-400">
                                        <span>by</span> {post.author}
                                        {post.deleted ? "(deleted)" : ""}
                                    </div>
                                    <div className="mb-10 text-sm text-gray-400">
                                        {writtenDate ? writtenDate.toFormat("LLL dd, yyyy") : null}{" "}
                                        {age ? `· 만 ${age}세` : null}
                                    </div>
                                </div>
                                {post.author_id === user?.id ? (
                                    <div className="flex flex-col items-end ml-4 mb-2 text-sm text-gray-400">
                                        <Link className="text-gray-400" to={`/edit/${post.id}`}>
                                            EDIT
                                        </Link>
                                        <button onClick={deletePost}>DELETE</button>
                                    </div>
                                ) : null}
                            </div>
                            <div
                                className="mb-4 text-base text-gray-600"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(post.post),
                                }}
                            />
                            {previousPost ? (
                                <div id="recommended_post" className="mt-10 px-4">
                                    <p className="text-gray-400 text-sm py-1 border-gray-200 border-0 border-t">
                                        READ THIS NEXT
                                    </p>
                                    <Post
                                        key={previousPost.id}
                                        draft={false}
                                        post={previousPost}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                ) : (
                    <Redirect to="/" />
                )}
            </div>
        </>
    );
};

export default PostDetailPage;
