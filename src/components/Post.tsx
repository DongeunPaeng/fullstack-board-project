import { Link } from "react-router-dom";
import { DateTime, Interval } from "luxon";
import { PostProps } from "types";

const Post: React.FunctionComponent<PostProps> = ({ post, draft }) => {
  const htmlObj = document.createElement("div");
  htmlObj.innerHTML = post.post;

  const paragraphs = htmlObj.getElementsByTagName("p");
  const firstParagraph = paragraphs[0]?.innerText?.slice(0, 80) ?? "";

  const writtenDate = DateTime.fromISO(post?.created_at);
  const birthDate = DateTime.local(1989, 12, 23, 0, 0, 0);
  const i = Interval.fromDateTimes(birthDate, writtenDate);
  const age = Math.floor(i.length("years"));

  const route = draft ? "edit" : "posts";

  return (
    <div className="w-full my-4">
      <Link to={`/${route}/${post.id}`} className="text-gray-800">
        {post.title}
      </Link>
      <div className="mb-2 text-sm text-gray-400">
        {/*<span>by</span> {post.author}*/}
        {writtenDate.toFormat("LLL dd, yyyy")} · 만 {age}세
      </div>
      <p className="text-sm text-gray-600">
        {firstParagraph}
        <Link
          to={`/${route}/${post.id}`}
          className="ml-2 text-sm text-gray-400 hover:text-gray-800 underline"
        >
          더 보기
        </Link>
      </p>
    </div>
  );
};

export default Post;
