import React, { useState } from "react";
import { User2Icon, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";

function Login() {
  const router = useNavigate();
  const { setUser } = useAuth();
  const [ loginData, setLoginData ] = useState({ username:"", password:""});
  const [showPassword, setShowPassword] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const handleInputChange = (e) => {
    setLoginData({...loginData, [e.target.name]:e.target.value});
  }

  const onClickLoginBtn = async(e) => {
    e.preventDefault();
    if( !loginData.username || !loginData.password) {
      toast.error("Please fill out the fields!");
      return;
    }
    try {
      setLoading(true);
      toast.loading("Logging in...",{ id:"loginId"});
      const res = await authApi.post("/api/auth/login-user/", loginData );
      setUser( {...loginData, id:res.data.id} );
      toast.success("Login successful!",{ id:"loginId"});
      setTimeout(()=>router('/blog/home'),300);
    } catch (error) {
      toast.error(error.response.data.detail,{ id:"loginId"});
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg text-text">
      <form className={`${ loading? 'bg-bg border-secondary':'bg-secondary'} transition-all delay-150 border border-border rounded-2xl shadow-xl p-8 w-full max-w-md`}>
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center mb-2 text-heading">
          Welcome back to <span className="text-primary font-bold">ZeroWords</span>
        </h1>
        <p className="text-center text-sm text-text/70 mb-8">
          Log in to continue your writing journey ✍️
        </p>

        {/* Email Input */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2 text-text/80">
            Email
          </label>
          <div className="flex items-center border border-border rounded-lg px-3 py-2 focus-within:border-primary transition-all bg-bg">
            <User2Icon className="text-primary" size={22} />
            <input
              name="username"
              disabled={loading}
              autoComplete="username"
              value={loginData.username}
              type="text"
              placeholder="username or email"
              onChange={handleInputChange}
              className="bg-transparent w-full px-2 focus:outline-none text-text placeholder:text-text/50"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-2 text-text/80">
            Password
          </label>
          <div className="flex items-center border border-border rounded-lg px-3 py-2 focus-within:border-primary transition-all bg-bg">
            <Lock className="text-primary" size={22} />
            <input
              name="password"
              disabled={loading}
              autoComplete="current-password"
              value={loginData.password}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              onChange={handleInputChange}
              className="bg-transparent w-full px-2 focus:outline-none text-text placeholder:text-text/50"
            />
          </div>
        </div>

        {/* Show Password */}
        <div className="flex items-center gap-x-2 mb-6">
          <input
            type="checkbox"
            disabled={loading}
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="accent-primary"
          />
          <span className="text-sm text-text/80">Show password</span>
        </div>

        {/* Login Button */}
        <button disabled={loading} onClick={onClickLoginBtn} className="w-full bg-heading text-bg font-semibold py-2 rounded-lg hover:bg-primary transition-all">
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-text/80 mt-6">
          Don’t have an account?{" "}
          <span onClick={()=> router('/auth/register')} className="text-primary font-medium hover:underline cursor-pointer">
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
