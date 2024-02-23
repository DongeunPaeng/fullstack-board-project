import Greetings from "../components/Greetings";

const principles = [
  "공수래공수거",
  "양서 다독",
  "남이사",
  "운칠기삼",
  "진인사대천명",
  "전화위복",
  "명상, 기도",
  "소식, 단식",
  "장기적 사고",
];

const PrinciplesPage = () => {
  return (
    <div>
      <Greetings title="삶의 규칙들" subtitle="매일 명상하기" />
      <ul className="my-4 ml-4 px-2 list-disc list-outside">
        {principles.map((principle, index) => (
          <li
            key={index}
            className="my-2 text-sm leading-none text-gray-600 dark:text-gray-50"
          >
            {principle}
          </li>
        ))}
      </ul>
      <div className="text-sm text-gray-400 mb-2">last updated: 2024-02-23</div>
    </div>
  );
};

export default PrinciplesPage;
