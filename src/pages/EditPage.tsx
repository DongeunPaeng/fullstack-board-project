import { useEffect, useState } from "react";
import TextEditor from "../components/TextEditor";
import axios from "axios";
import { useUser } from "../providers/UserProvider";
import { Redirect } from "react-router-dom";
import { Post } from "types";

interface EditPageProps {
  location: { pathname: string };
}

const EditPage: React.FunctionComponent<EditPageProps> = ({
  location: { pathname },
}) => {
  const {
    user: { email },
  } = useUser();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [working, setWorking] = useState(true);
  const postId = pathname.split("/")[2];

  useEffect(() => {
    const getDraft = () => {
      axios
        .get(`/api/post/draft/${postId}`)
        .then((res) => {
          const post = res.data.post;
          setPost(post);
        })
        .catch((err) => alert(err))
        .finally(() => {
          setWorking(false);
        });
    };
    getDraft();
  }, [postId]);

  if (!working && post && post.author !== email) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex flex-col items-center justify-center h-16">
          <div className="text-3xl font-extrabold text-gray-900">
            Edit your article
          </div>
          <div className="text-base text-gray-400">더 낫게 고쳐보세요.</div>
        </div>
      </div>
      {working ? null : !post ? null : <TextEditor post={post} />}
    </>
  );
};

export default EditPage;
