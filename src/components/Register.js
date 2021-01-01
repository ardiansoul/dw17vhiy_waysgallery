import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import { AppContext } from "../context/AppContext";
import { API, setAuthToken } from "../utils/API";

function Register({ showModalLogin, showModalRegister }) {
  const [mutate, { isError, error }] = useMutation((form) =>
    API.post(`/register`, form)
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [state, dispatch] = useContext(AppContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutate(form, {
        onSuccess: (data) => {
          dispatch({
            type: "LOGIN",
            payload: data.data.data,
          });
          setAuthToken(data.data.data.token);
          showModalRegister();
        },
        onError: (error) => {
          console.error(error.response.data.message);
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-screen h-screen bg-transparent absolute">
      <div
        className="bg-white absolute z-50 border-2 rounded-md flex flex-col justify-between p-6"
        style={{
          width: "300px",
          height: "500px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1 className="fontFamily-freight font-bold text-3xl text-base">
          Register
        </h1>
        {/* {state.error && <div>{error}</div>} */}
        <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
          {isError && (
            <span className="w-full h-10 text-xs text-center mb-2 leading-10 text-white bg-base rounded-md">
              {error.response.data.message}
            </span>
          )}
          <label className="text-base mb-2">Email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={form.email}
            className="w-full h-10 border-2 border-base mb-4 p-2 rounded-md"
          />
          <label className="text-base mb-2">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
            className="w-full h-10 border-2 border-base mb-4 p-2 rounded-md"
          />
          <label className="text-base mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            onChange={handleChange}
            value={form.fullName}
            className="w-full h-10 border-2 border-base mb-4 p-2 rounded-md"
          />
          <button
            className="w-24 h-8 bg-base border-2 mt-4 border-base rounded-md text-white self-center"
            type="submit"
          >
            Register
          </button>
        </form>
        <span className="text-sm mt-2 self-center">
          Already have an account ? Click{" "}
          <button onClick={showModalLogin}>Here</button>
        </span>
      </div>
    </div>
  );
}

export default Register;
