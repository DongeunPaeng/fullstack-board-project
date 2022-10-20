import React, { useState, useEffect } from "react";
import Posts from "../components/Posts";
import axios from "axios";
import { POST_TYPES } from "../utils/constants";
import { useUser } from "../providers/UserProvider";
import { DraftPageProps, Post } from "types";

const DraftPage: React.FunctionComponent<DraftPageProps> = ({
  location: { pathname },
}) => {
  const { user, accessToken } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [working, setWorking] = useState<boolean>(true);

  useEffect(() => {
    const getDrafts = () => {
      axios
        .post("/api/post/draft", null, {
          headers: { authorization: "bearer " + accessToken },
        })
        .then((res) => {
          const posts = res.data.posts;
          if (pathname !== "/") {
            const filteredPosts = posts.filter(
              (post: Post) =>
                post.status ===
                POST_TYPES[pathname.split("/")[1] as keyof typeof POST_TYPES]
            );
            setPosts(filteredPosts);
            return;
          }
          setPosts(posts);
        })
        .catch((err) => alert(err.response.data.message))
        .finally(() => {
          setWorking(false);
        });
    };
    getDrafts();
  }, [pathname, accessToken]);

  return <div>{working ? null : <Posts id={user.id} posts={posts} />}</div>;
};

export default DraftPage;
