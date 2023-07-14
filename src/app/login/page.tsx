"use client";
import { ChangeEvent, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./styles.css";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import axios from "axios";
// import api from "../../../api";
// import {
//   Alert,
//   FormControl,
//   FormHelperText,
//   Input,
//   InputLabel,
//   Snackbar,
// } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    fetch("http://localhost:3000/api/session/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem("token", data.token);
          //document.cookie = `token=${data.token}`;
          //localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          alert(data.message);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors(true);
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
        //console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form
        className="flex flex-col items-center justify-center w-full px-20"
        onSubmit={handleSubmit2}
      >
        <div className="flex flex-col items-center justify-center w-full px-20">
          <h1
            className="text-5x
          l font-bold text-center text-[#243c63]"
          >
            Login
          </h1>
          <div className="flex flex-col items-center justify-center w-full px-20">
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
            <Button
              variant="contained"
              type="submit"
              className="w-full mt-5 bg-[#243c63] text-white border-2 border-[#1f2530] rounded-xl"
            >
              Login
            </Button>
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
