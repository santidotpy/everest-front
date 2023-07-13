"use client";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import "./styles.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import api from "../../../api";

// import logo from "./logo.svg";

// const usernames = ["joe", "joe1", "joe2"];

// const useDebounce = (value: string, delay: number) => {
//   const [debouncedValue, setDebouncedValue] = useState<string>(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// };

// type UsernameProps = {
//   isValid: boolean;
//   isLoading: boolean;
//   handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
// };

// const Username: FC<UsernameProps> = ({ isValid, isLoading, handleChange }) => {
//   return (
//     <>
//       <div className="username">
//         <input
//           onChange={handleChange}
//           autoComplete="off"
//           spellCheck="false"
//           className="control"
//           type="email"
//           placeholder="Username"
//         />
//         <div className={`spinner ${isLoading ? "loading" : ""}`}></div>
//       </div>
//       <div className={`validation ${!isValid ? "invalid" : ""}`}>
//         Username already taken
//       </div>
//     </>
//   );
// };

export default function Login() {
  const { LOGIN_ROUTE } = process.env;
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // const debouncedUsername = useDebounce(credentials.email, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const wea = await api.post('/api/session/login', 
    {
      email: credentials.email,
      password: credentials.password,
    }
    );
    console.log(wea);
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 2000);
  };



  // useEffect(() => {
  //   setIsValid(!usernames.some((u) => u === debouncedUsername));
  //   setIsLoading(false);
  // }, [debouncedUsername]);

  return (

    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >

      <Card
        sx={{ minWidth: 275 }}
        className=" mx-auto mt-20 bg-[#243c63] text-white border-2 border-[#1f2530] rounded-xl"

      >
        <CardContent >
          <Typography variant="h5" component="div" className="text-center">
            Login
          </Typography>

          <div className="
      flex flex-col
      ">
            <TextField
              required
              id="outlined-required"
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              onChange={handleChange}
            />

          </div>
        </CardContent>
        <CardActions className="flex justify-center">
          <Button
            variant="contained"
            color="primary"
            // disabled={!isValid}
            className="bg-blue-600 font-bold mb-3"
            size="large"
            type="submit"
          >
            Log In
          </Button>
        </CardActions>
      </Card>
    </Box>

  );
}
