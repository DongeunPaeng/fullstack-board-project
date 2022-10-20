import { FormEvent, useState } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import { useUser } from "../providers/UserProvider";

interface LoginPageProps extends RouteComponentProps<any> {}

const LoginPage: React.FunctionComponent<LoginPageProps> = ({ history }) => {
  console.log("running loginpage...");
  const [wrongInput, setWrongInput] = useState(false);
  const { accessToken, setAccessToken, setUser } = useUser();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form: unknown = event.currentTarget.elements;
    const [email, password] = form as Array<HTMLInputElement>;

    await axios
      .post("/api/login", { email: email.value, password: password.value })
      .then((res) => {
        if (res.status === 200) {
          setAccessToken(res.data.accessToken);
          setUser(res.data.user);
          history.push("/");
        }
      })
      .catch(() => {
        setWrongInput(true);
        email.value = "";
        password.value = "";
      });
  };

  if (accessToken) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div className="rounded-md -space-y-px">
              <div>
                <label className="sr-only">Email address</label>
                <input
                  required
                  className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  type="text"
                  name="email"
                />
              </div>
              <div>
                <label className="sr-only">Password</label>
                <input
                  required
                  className="mb-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  type="password"
                  name="password"
                />
                {wrongInput ? (
                  <div className="mb-6 text-red-500 text-xs">
                    입력하신 정보가 올바르지 않아요.
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
                  Sign In
                </button>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Forgot your password?{" "}
                  <a
                    href="/find-password"
                    className="font-medium text-gray-600 hover:text-gray-500"
                  >
                    Find Password
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

export default LoginPage;
