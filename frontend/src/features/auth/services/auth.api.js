import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  try {
    const res = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function login({ email, password }) {
  console.log(email, "e");

  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.log(error);
  }
}

export async function getMe() {
  try {
    const res = await api.get("/auth/get-me");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
