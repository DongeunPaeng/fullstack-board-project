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
  const [working, setWorking] = useState<boolean>(true);

  useEffect(() => {
    const getPosts = () => {
      axios
        .get("/api/post")
        .then((res) => {
          const posts: Post[] = res.data.posts;
          let key = pathname.toUpperCase().split("/")[1];
          if (key === "") key = key + "BLOGPOSTS"; // FIXME: dongeun: no better way?
          const type = POST_TYPES[key as keyof typeof POST_TYPES];
          const filteredPosts = posts.filter((post) => post.type === type);
          setPosts(filteredPosts);
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
        <Posts posts={posts} />
      )}
    </div>
  );
};

export default Body;
