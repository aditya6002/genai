import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  const res = await api
    .post("/auth/register", {
      email,
      username,
      password,
    })
    .then(() => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function login({ email, password }) {
  const res = await api
    .post("/auth/login", {
      email,
      password,
    })
    .then(() => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function logout() {
  const res = await api
    .post("/auth/logout")
    .then(() => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getMe() {
  const res = await api
    .get("/auth/get-me")
    .then(() => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
