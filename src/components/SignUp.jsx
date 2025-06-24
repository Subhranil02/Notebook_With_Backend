import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account created Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2">
      <h2 className="my-3 mb-3">Create an account to use inotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row mb-3">
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              className="form-control"
              id="name"
              name="name"
              onChange={onChange}
              placeholder="Name"
            />
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={onChange}
              placeholder="Email"
            />
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onChange}
              placeholder="Password"
            />
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              onChange={onChange}
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
