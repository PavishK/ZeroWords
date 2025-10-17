import axios from "axios";

export const serverApi = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_SERVER_URL,
});

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});