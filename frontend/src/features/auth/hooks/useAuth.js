import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { register, login, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { setUser, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    const data = await login({ email, password });
    setUser(data.user);
    setLoading(false);
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    const data = await register({ username, email, password });
    setUser(data.user);
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setUser(null);
    setLoading(false);
  };

  const handleGetMe = async () => {
    setLoading(true);
    const data = await getMe();
    setUser(data.user);
    setLoading(false);
  };

  return { handleLogin, handleRegister, handleLogout, handleGetMe };
};
