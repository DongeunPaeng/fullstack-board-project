import Greetings from "../components/Greetings";

const BooksPage = () => {
  return (
    <div>
      <Greetings title="매년 읽는 책" subtitle="다시 읽기" />
      <ul className="my-4 ml-4 px-2 list-disc list-outside">
        <li className="my-2 text-sm leading-none text-gray-600 dark:text-gray-50">
          마르쿠스 아우렐리우스 - 명상록
        </li>
        <li className="my-2 text-sm leading-none text-gray-600 dark:text-gray-50">
          데일 카네기 - 인간관계론
        </li>
      </ul>
      <div className="text-sm text-gray-400 mb-2">last updated: 2021-11-30</div>
    </div>
  );
};

export default BooksPage;
