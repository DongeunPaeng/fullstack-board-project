import { FormEvent, useState } from "react";
import axios from "axios";
import { validateEmail } from "../utils/validators";

const FindPasswordPage = () => {
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [hint, setHint] = useState<string | undefined>(undefined);
  const [noEmail, setNoEmail] = useState<boolean>(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form: unknown = event.currentTarget.elements;
    const [email] = form as Array<HTMLInputElement>;

    const isValidEmail = validateEmail(email.value);

    if (!isValidEmail) {
      setInvalidEmail(true);
      email.value = "";
      return;
    }

    await axios
      .post("/api/login/find-password", { email })
      .then((res) => {
        if (res.status === 200) {
          const {
            data: { firstLetter, lastLetter, length },
          } = res;
          const hintString = firstLetter + "*".repeat(length - 2) + lastLetter;
          setHint(hintString);
        }
      })
      .catch((err) => {
        if (err.response.status === 406) {
          setNoEmail(true);
          return;
        }
        alert(err.reponse.data.message);
      });
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Find your password
        </h2>
        <div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div className="rounded-md -space-y-px">
              <div>
                <label className="sr-only">Email address</label>
                <input
                  required
                  className="mb-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  type="text"
                  name="email"
                />
                {noEmail ? (
                  <div className="mb-6 text-red-500 text-xs">
                    해당하는 이메일이 없어요.
                  </div>
                ) : invalidEmail ? (
                  <div className="mb-6 text-red-500 text-xs">
                    이메일 형식을 따라주세요.
                  </div>
                ) : (
                  <div className="mb-6"></div>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-gray-500 group-hover:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Find Password
                </button>
                {hint ? (
                  <>
                    <p className="mt-4 text-center text-lg text-gray-600">
                      Your password looks like...
                    </p>
                    <div className="mb-6 text-center text-blue-500 font-extrabold text-xl">
                      {hint}
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <p className="mt-4 text-center text-sm text-gray-600">
                  Did you find your password? :){" "}
                  <a
                    href="/login"
                    className="font-medium text-gray-600 hover:text-gray-500"
                  >
                    Log In
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindPasswordPage;
