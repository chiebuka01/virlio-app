import Button from "../components/Button";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
import axios, { AxiosError } from "axios";
import { useState, ChangeEvent } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function SigninPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <Layout>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await axios.post(`${API_URL}/signin`, credentials);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            window.location.href = "/";
          } catch (error) {
            if (error instanceof AxiosError) {
              setError(error.response?.data.message || "Login failed");
            }
          }
        }}
      >
        {error && (
          <p className="bg-red-900 text-slate-200 mb-1 px-2 py-1 rounded-sm">
            {error}
          </p>
        )}
        <Input
          name="email"
          type="text"
          placeholder="Email"
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button>Log In</Button>
      </form>
    </Layout>
  );
}

export default SigninPage;
