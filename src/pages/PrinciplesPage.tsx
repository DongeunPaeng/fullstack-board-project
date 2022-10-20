import Greetings from "../components/Greetings";

const principles = [
  "인생은 나와 우주가 둘이 맺는 관계이다.",
  "남의 인생으로부터 감정 변화가 생기지 않게 해라.",
  "좋은 책을 끊임없이 읽어라.",
  "우주가 내게 준 것을 소중히 여기고, 주지 않은 것을 욕심내지 마라.",
  "옳은 생각은 외롭다.",
  "노인들을 보며 나도 그들처럼 늙어 죽음을 기다릴 것임을 기억해라.",
  "2000년 후 우리 세대의 위인들을 기억하는 사람은 아무도 없을 것이다.",
  "시기심의 원인을 파악해라.",
  "단 한 번의 실수가 천 번의 성공보다 강력하다.",
  "가장 가까운 사람들의 행복이 나의 행복이다.",
  "세상은 단기적으로는 늘 불합리하고, 내가 할 수 있는 것은 이치에 맞게 살며 기다리는 것뿐이다.",
  "내가 가진 것들을 대부분 잃는 끔찍한 상상을 해보라. 그리고 그렇게 되지 않았음에 감사하라.",
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
      <div className="text-sm text-gray-400 mb-2">last updated: 2022-09-12</div>
    </div>
  );
};

export default PrinciplesPage;
