import Greetings from "../components/Greetings";

const principles = [
    "인생은 우주와의 조용한 대화이다.",
    "좋은 책을 끊임없이 읽어라.",
    "남의 인생으로부터 감정 변화가 생기지 않게 해라.",
    "우주가 준 것에 감사하고, 주지 않은 것을 욕심내지 마라.",
    "옳은 생각은 외롭다.",
    "죽는 날이 반드시 오고, 나는 완전히 사라진다.",
    "가장 가까운 사람들의 행복이 나의 행복이다.",
    "세상은 단기적으로 불합리하고, 장기적으로 단조롭다.",
    "걱정을 하느니 명상과 기도를 해라.",
    "가장 좋은 때에, 가장 좋은 방법으로 이루실 주님을 믿어라.",
    "최고의 기업가가 되고 싶은가? 최고가 무엇이며 왜 최고여야 하는가?",
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
            <div className="text-sm text-gray-400 mb-2">last updated: 2022-11-12</div>
        </div>
    );
};

export default PrinciplesPage;
