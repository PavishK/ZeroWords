import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { serverApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const router = useNavigate();
  const [ registerData, setRegisterData ] = useState({ username:"", email:"", password:""});
  const [showPassword, setShowPassword] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const handleInputChange = (e) => {
    setRegisterData({...registerData, [e.target.name]:e.target.value});
  }

  const onClickRegisterBtn = async(e) => {
    e.preventDefault();
    toast.loading('Creating your account...', { id:"registerId"});
    if( !registerData.username || !registerData.email || !registerData.password) {
      toast.error("Please fill out the fields!", { id:"registerId"});
      return;
    }

    try {
      setLoading(true);
      await serverApi.post("/api/auth/register-user/", registerData);
      toast.success('Registered successful!', { id:"registerId"});
      setTimeout(()=>router('/auth/login'),300);
    } catch (error) {
      if( error.response.data?.email)
        toast.error( error.response.data.email, { id:"registerId" });
      if( error.response.data?.username )
        toast.error( error.response.data.username, { id:"registerId" });
      if( error.response.data?.password )
        toast.error( error.response.data.password, { id:"registerId" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg text-text">
      <form className={`${ loading ? 'bg-bg border-secondary':'bg-secondary'} transition-all delay-150 border border-border rounded-2xl shadow-xl p-8 w-full max-w-md`}>
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center mb-2 text-heading">
          Join <span className="text-primary font-bold">ZeroWords</span>
        </h1>
        <p className="text-center text-sm text-text/70 mb-8">
          Create an account and start your writing journey ✨
        </p>

        {/* Name Input */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2 text-text/80">
            Full Name
          </label>
          <div className="flex items-center border border-border rounded-lg px-3 py-2 focus-within:border-primary transition-all bg-bg">
            <User className="text-primary" size={22} />
            <input
              name="username"
              autoComplete="username"
              disabled={loading}
              value={registerData.username}
              type="text"
              placeholder="Your name"
              onChange={handleInputChange}
              className="bg-transparent w-full px-2 focus:outline-none text-text placeholder:text-text/50"
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2 text-text/80">
            Email
          </label>
          <div className="flex items-center border border-border rounded-lg px-3 py-2 focus-within:border-primary transition-all bg-bg">
            <Mail className="text-primary" size={22} />
            <input
              name="email"
              disabled={loading}
              autoComplete="email"
              value={registerData.email}
              type="email"
              placeholder="you@example.com"
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
              value={registerData.password}
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

        {/* Register Button */}
        <button disabled={loading} onClick={onClickRegisterBtn} className="w-full bg-heading text-bg font-semibold py-2 rounded-lg hover:bg-primary transition-all">
          Register
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-text/80 mt-6">
          Already have an account?{" "}
          <span onClick={() => router('/auth/login')}  className="text-primary font-medium hover:underline cursor-pointer">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
