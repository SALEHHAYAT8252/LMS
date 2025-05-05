import React, { useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch , useSelector} from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { register } from "../store/slices/authSlice";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { initialState,
    loading,
    error,
    message,
    user,
    isAuthenticated,} = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const handleRegister = (e) => {
      e.preventDefault();
      const data = new FormData();
      date.append("name", name);
      date.append("email", email);
      date.append("password", password);
      dispatch(register(register(data)));
    };
  return <></>;
};

export default Register;
