import React from "react";
import { useUser } from "../providers/UserProvider";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Greetings from "../components/Greetings";

const MyPagePage = () => {
  const history = useHistory();
  const {
    user: { id, email },
    accessToken,
    setAccessToken,
    setUser,
  } = useUser();

  const deleteAccount = () => {
    const isConfirmed = window.confirm("Are you sure to delete your account?");
    if (isConfirmed) {
      axios
        .post(
          "/api/delete",
          { id },
          { headers: { authorization: "bearer " + accessToken } }
        )
        .then((res) => {
          if (res.status === 200) {
            setAccessToken(null);
            setUser(null);
            history.push("/");
          } else {
            alert("something went wrong...");
          }
        })
        .catch((err) => alert(err.response.data.message));
    }
  };

  return (
    <div>
      <Greetings
        title="About you"
        subtitle="We want to know more about you :)"
      />
      <div className="my-4">
        <div className="font-bold text-gray-900">Email</div>
        <div className="text-sm text-gray-600">{email}</div>
      </div>
      <div className="my-4">
        <button className="font-bold text-red-500" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default MyPagePage;
