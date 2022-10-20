import axios from "axios";
import { useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";
import Greetings from "../components/Greetings";

interface Book {
  [index: string]: string;
}

const BooksShelfPage = () => {
  const [books, setBooks] = useState<Book[] | undefined>(undefined);
  const [working, setWorking] = useState<boolean>(true);

  useEffect(() => {
    const getBooks = () => {
      axios
        .get("/api/book")
        .then((res) => {
          const books: Book[] = res.data.books;
          setBooks(books);
        })
        .catch((err) => alert(err.response.data.message))
        .finally(() => {
          setWorking(false);
        });
    };
    getBooks();
  }, []);

  return (
    <>
      <Greetings title="그동안 읽은 책" subtitle="꾸준히 읽기" />
      {working ? (
        <div className="flex justify-center items-center my-20">
          <LoadingIcons.TailSpin stroke="black" fontSize={100} />
        </div>
      ) : (
        <ul className="ml-4 px-2 list-disc list-outside">
          {!books || books.length === 0
            ? "책을 불러오지 못했어요"
            : books.map((book) => (
                <li
                  key={book["번호"]}
                  className="my-2 text-sm leading-none text-gray-600 dark:text-gray-50"
                >
                  <span>{book["완료연도"]}</span> <span>{book["책 제목"]}</span>{" "}
                  {book["내 평점"] === "1" ? (
                    <span className="text-gray-400">(비추천)</span>
                  ) : null}
                </li>
              ))}
        </ul>
      )}
    </>
  );
};

export default BooksShelfPage;
