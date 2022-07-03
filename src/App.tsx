import React from "react";
import validator from "validator";
const logo = require("./logo.svg");
import Card from "./components/Card";

function App() {
  const [signUpInput, setSignUpInput] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpInput({
      ...signUpInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validator.isEmail(signUpInput.email)) {
      return setError("the email is invalid");
    } else if (!validator.isLength(signUpInput.password, { min: 5 })) {
      return setError("password should be at least 5 characters");
    } else if (signUpInput.password !== signUpInput.confirmPassword) {
      return setError("passwords do not match");
    }
  };

  return (
    <div className="App">
      <Card
        name="cat name"
        phone="1111"
        email="tester@mailer.com"
        image={{ src: logo, alt: "logo" }}
        favoured={false}
      />
      <div className="container yt-3">
        <form noValidate onSubmit={handleSubmit}>
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={signUpInput.email}
            onChange={handleInputChange}
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={signUpInput.password}
            onChange={handleInputChange}
          />
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirm-password"
            className="form-control"
            value={signUpInput.confirmPassword}
            onChange={handleInputChange}
          />
          <div className="mb-3">{error && <p>{error}</p>}</div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
