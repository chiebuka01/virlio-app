import Button from "../components/Button";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
import axios, { AxiosError } from "axios";
import { useState, ChangeEvent } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function SignupPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "consumer",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <Layout>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await axios.post(`${API_URL}/signup`, credentials);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            window.location.href = "/";
          } catch (error) {
            if (error instanceof AxiosError) {
              setErrors(error.response?.data.message);
            }
          }
        }}
      >
        {errors.map((error) => (
          <p
            className="bg-red-900 text-slate-200 mb-1 px-2 py-1 rounded-sm"
            key={error}
          >
            {error}
          </p>
        ))}
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
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <select
          name="role"
          onChange={handleChange}
          className="bg-zinc-800 px-2 py-1 outline-none text-slate-300 block mb-2"
        >
          <option value="consumer">Consumer (watch, comment, rate)</option>
          <option value="creator">Creator (upload videos)</option>
        </select>
        <Button>Sign Up</Button>
      </form>
    </Layout>
  );
}

export default SignupPage;
