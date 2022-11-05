import { PostsProps } from "types";
import Post from "./Post";

const Posts: React.FunctionComponent<PostsProps> = ({ id, posts }) => {
    const postsByEmail = posts?.filter((post) => post.author_id === id);

    return (
        <div className="flex-col items-start justify-center">
            {id ? (
                postsByEmail.length > 0 ? (
                    postsByEmail.map((post) => (
                        <Post key={post.id} draft={true} post={post} />
                    ))
                ) : (
                    <>
                        <div className="mx-auto mt-20 mb-5 text-gray-800">
                            You'll be a great writer 🔥
                        </div>
                        <a
                            className="mx-auto mb-20 text-gray-800 hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-sm"
                            href="/write"
                        >
                            There are no drafts yet.
                        </a>
                    </>
                )
            ) : (
                <div>
                    {!posts || posts.length === 0
                        ? null
                        : posts.map((post) => <Post key={post.id} post={post} />)}
                </div>
            )}
        </div>
    );
};

export default Posts;
