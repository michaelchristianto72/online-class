import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const details = {
      email: email,
      password: pass,
    };
    var formBody = [];
    for (var prop in details) {
      var encodedKey = encodeURIComponent(prop);
      var encodedValue = encodeURIComponent(details[prop]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log(email, pass);
    axios
      .post("https://staging.komunitasmea.com/api/login", formBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        const user_id = response.data.data.user_id;
        navigate(`/user/${user_id}/courses/active`, {
          state: {
            user_id: user_id
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const showPass = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  return (
    <div className="login">
      <div className="photo">
        <div className="text">
          <h2>Komunitas MEA</h2>
          <p>Komunitas Jago Jualan Online</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <h3>Email</h3>
        <input
          className="input"
          type="email"
          value={email}
          required
          placeholder="Masukkan email anda"
          onChange={(e) => setEmail(e.target.value)}
        />
        <h3>Password</h3>
        <input
          className="input"
          type={passwordType}
          value={pass}
          required
          placeholder="Masukkan password anda"
          onChange={(e) => setPass(e.target.value)}
        />
        <div className="show-pass">
          <input type="checkbox" className="show-pass" onClick={showPass} />
          <label>Show Password</label>
        </div>
        <button className="button" type="submit">
          Masuk
        </button>
      </form>
    </div>
  );
}
