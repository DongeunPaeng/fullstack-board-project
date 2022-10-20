import { useState, useEffect } from "react";
import Posts from "../components/Posts";
import axios from "axios";
import { Post } from "types";

const LandingPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [working, setWorking] = useState(true);

  useEffect(() => {
    const getPosts = () => {
      axios
        .get("/api/post")
        .then((res) => {
          const posts = res.data.posts;
          setPosts(posts);
        })
        .catch((err) => alert(err.response.data.message))
        .finally(() => {
          setWorking(false);
        });
    };
    getPosts();
  }, []);

  return <div>{working ? null : <Posts posts={posts} />}</div>;
};

export default LandingPage;
