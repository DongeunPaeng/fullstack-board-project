import { useState, useEffect } from "react";
import Posts from "components/Posts";
import axios from "axios";
import LoadingIcons from "react-loading-icons";
import { POST_TYPES } from "utils/constants";
import type { Post } from "types";

interface BodyProps {
    location: { pathname: string };
}

const Body: React.FunctionComponent<BodyProps> = ({
    location: { pathname },
}) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
    const [working, setWorking] = useState<boolean>(true);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        const query = e.target.value.toLowerCase();
        if (query === "") {
            setFilteredPosts(posts);
        } else {
            const newFilteredPosts = posts.filter(
                (post) =>
                    post.title.toLowerCase().includes(query) ||
                    post.post.toLowerCase().includes(query)
            );
            setFilteredPosts(newFilteredPosts);
        }
    };

    useEffect(() => {
        const getPosts = () => {
            axios
                .get("/api/post")
                .then((res) => {
                    const posts: Post[] = res.data.posts;
                    let key = pathname.toUpperCase().split("/")[1];
                    if (key === "") key = "BLOGPOSTS"; // FIXME: dongeun: no better way?
                    const type = POST_TYPES[key as keyof typeof POST_TYPES];
                    const typeMatchedPosts = posts.filter((post) => post.type === type);
                    setPosts(typeMatchedPosts);
                })
                .catch((err) => alert(err.response.data.message))
                .finally(() => {
                    setWorking(false);
                });
        };
        getPosts();
    }, [pathname]);

    return (
        <div>
            {working ? (
                <div className="flex justify-center items-center my-20">
                    <LoadingIcons.TailSpin stroke="black" fontSize={100} />
                </div>
            ) : (
                <>
                    <div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search"
                            className="my-4 md:w-1/2 w-full p-2 border border-gray-300 rounded-md"
                        // TODO: change width to half of the page when in large window.
                        />
                    </div>
                    <Posts posts={searchQuery ? filteredPosts : posts} />
                </>
            )}
        </div>
    );
};

export default Body;
