"use client";
import { ChangeEvent, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, CircularProgress } from "@mui/material";
import {SERVER_URL} from "@/utils/utils";


export default function Register() {
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //setIsLoading(true);
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };

  //const SERVER_URL = "http://localhost:3000";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    fetch(`${SERVER_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        email: credentials.email,
        password: credentials.password,
        age: credentials.age,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.status == "success") {
          toast.success("User successfully registered!", {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          // go to /login
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        } else {
          console.log(data);
          toast.warn("Please check your credentials.", {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
        setErrors(true);
        toast.warn("Email already exists!", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        //console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form
        className="flex flex-col items-center justify-center w-full px-20"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center justify-center w-full px-20">
          <h1
            className="
            text-3xl font-bold text-center text-[#3678e3]
            "
          >
            Register
          </h1>
          <div className="flex flex-col items-center justify-center w-full px-20">
            <TextField
              required
              // id="outlined-required"
              label="First Name"
              type="text"
              name="first_name"
              className="w-full mt-5 bg-[#fff] border-2 border-[#1f2530] rounded-xl"
              onChange={handleChange}
            />

            <TextField
              required
              // id="outlined-required"
              label="Last Name"
              type="text"
              name="last_name"
              className="w-full mt-5 bg-[#fff] border-2 border-[#1f2530] rounded-xl"
              onChange={handleChange}
            />

            <TextField
              required
              // id="outlined-required"
              label="Age"
              type="number"
              name="age"
              className="w-full mt-5 bg-[#fff] border-2 border-[#1f2530] rounded-xl"
              onChange={handleChange}
            />

            <TextField
              required
              id="outlined-required"
              label="Email"
              type="email"
              name="email"
              className="w-full mt-5 bg-[#fff] border-2 border-[#1f2530] rounded-xl"
              onChange={handleChange}
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              name="password"
              className="w-full mt-5 bg-[#fff] border-2 border-[#1f2530] rounded-xl"
              //autoComplete="current-password"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full px-20">
            {isLoading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress className="mt-2" />
              </Box>
            ) : (
              <Button
                variant="contained"
                type="submit"
                className="w-full mt-5 bg-[#3678e3] text-white border-2 border-[#1f2530] rounded-xl"
              >
                Register
              </Button>
            )}
          </div>
        </div>
      </form>

      {errors && (
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          limit={2}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      )}
    </div>
  );
}
