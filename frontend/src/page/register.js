import React, { useState } from "react";
import { auth } from "../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created:", user);
      //   TODO: clear form
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  //   TODO: input validation
  return (
    <form onSubmit={handleRegister}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        autoComplete="currrent-password"
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br />
      <label htmlFor="confirm-password">Confirm Password:</label>
      <input
        autoComplete="off"
        id="confirm-password"
        name="confirm-password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassowrd(e.target.value)}
        placeholder="Password"
      />
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
