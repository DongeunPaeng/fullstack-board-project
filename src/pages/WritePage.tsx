import TextEditor from "../components/TextEditor";
import Greetings from "../components/Greetings";

const WritePage = () => {
  return (
    <>
      <Greetings title="Write your article" subtitle="Show your genius here" />
      <TextEditor />
    </>
  );
};

export default WritePage;
