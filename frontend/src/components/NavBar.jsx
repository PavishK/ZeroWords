import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOutIcon, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/auth";
import { authApi } from "../services/api";
import toast from "react-hot-toast";

function NavBar() {
  const router = useNavigate();
  const { user, setUser } = useAuth();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const menuRef = useRef(null);

  const navLinks = [
    { name: "Home", to: "/blog/home" },
    { name: "About", to: "/blog/about" },
  ];

  const profileLinks = [
    { name: "My Posts", to: `/blog/my-posts/${user?.id}` },
    { name: "Profile", to: `/blog/profile/${user?.id}` },
  ];

  const handleMenu = () => setToggleMenu((prev) => !prev);

  const logout = async () => {
    try {
      toast.loading("Logging out...", { id: "logout" });
      await authApi.post("/api/auth/logout-user/", {});
      setToggleMenu(false);
      toast.success("Logged out successfully!", { id: "logout" });
      setUser(null);
      setTimeout(() => router('/blog/home'),300);
    } catch (error) {
      console.error(error);
      toast.error("Error logging out!", { id: "logout" });
    }
  };

  useEffect(() => {
    const onCloseMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setToggleMenu(false);
        setProfileMenu(false);
      }
    };
    const onScroll = () => setToggleMenu(false);

    window.addEventListener("mousedown", onCloseMenu);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("mousedown", onCloseMenu);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isLoggedIn = !!user?.username;

  return (
    <div className="min-h-screen w-screen bg-bg">
      <div className="z-[1000] w-full flex items-center justify-between px-6 bg-secondary text-text py-3 shadow-md">
        <h1
          className="font-bold text-3xl text-text tracking-wide cursor-pointer"
          onClick={() => router("/blog/home")}
        >
          ZeroWords
        </h1>

        <ul className="hidden sm:flex items-center gap-x-6 font-medium">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg hover:bg-bg hover:text-primary transition-colors duration-300 ${
                    isActive ? "bg-bg text-primary font-semibold shadow-md" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          {!isLoggedIn ? (
            <li className="flex items-center gap-x-3">
              <button
                onClick={() => router("/auth/login")}
                className="px-5 py-2.5 rounded-md border border-border bg-bg text-text font-medium hover:bg-secondary hover:border-primary transition-all duration-200 shadow-sm"
              >
                Login
              </button>
              <button
                onClick={() => router("/auth/register")}
                className="px-5 py-2.5 rounded-md border border-primary bg-primary text-bg font-medium hover:bg-heading hover:border-heading transition-all duration-200 shadow-sm"
              >
                Register
              </button>
            </li>
          ) : (
            <li className="flex items-center gap-x-3">
              <span
                onClick={() => setProfileMenu((prev) => !prev)}
                className="w-10 h-10 border flex items-center justify-center text-lg font-bold capitalize rounded-full bg-bg border-primary text-text cursor-pointer"
              >
                {user?.username[0]}
              </span>
            </li>
          )}
        </ul>

        <div onClick={handleMenu} className="sm:hidden cursor-pointer z-50">
          {toggleMenu ? <X size={28} className="text-text" /> : <Menu size={28} className="text-text" />}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {toggleMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute z-[10000] top-16 right-6 p-5 rounded-2xl w-48 bg-secondary border-border border-2 shadow-2xl sm:hidden"
          >
            <ul className="flex flex-col gap-y-2 font-medium">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <NavLink
                    to={link.to}
                    onClick={() => setToggleMenu(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg hover:bg-bg hover:text-primary transition-colors duration-300 ${
                        isActive ? "bg-bg text-primary font-semibold shadow-sm" : ""
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

              {!isLoggedIn ? (
                <>
                  <li>
                    <button
                      onClick={() => router("/auth/login")}
                      className="w-full p-2 rounded-md border border-border bg-bg text-text font-medium hover:bg-secondary hover:border-primary transition-all duration-200 shadow-sm"
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => router("/auth/register")}
                      className="w-full p-2 rounded-md border border-primary bg-primary text-bg font-medium hover:bg-heading hover:border-heading transition-all duration-200 shadow-sm"
                    >
                      Register
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {profileLinks.map((link, idx) => (
                    <li key={idx}>
                      <NavLink
                        to={link.to}
                        onClick={() => setToggleMenu(false)}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-lg hover:bg-bg hover:text-primary transition-colors duration-300 ${
                            isActive ? "bg-bg text-primary font-semibold shadow-sm" : ""
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={logout}
                      className="flex items-center gap-x-1 justify-center p-2 w-full rounded-md border-2 border-red-600 text-red-600 font-medium hover:bg-red-100 transition-all duration-200 shadow-sm"
                    >
                      <LogOutIcon size={20} />
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Menu */}
      <AnimatePresence>
        {profileMenu && isLoggedIn && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="sm:block absolute z-[10000] hidden top-16 right-6 p-5 rounded-2xl w-48 bg-secondary border-border border-2 shadow-2xl"
          >
            <ul className="flex flex-col gap-y-1 font-medium">
              {profileLinks.map((link, idx) => (
                <li key={idx}>
                  <NavLink
                    to={link.to}
                    onClick={() => setProfileMenu(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg hover:bg-bg hover:text-primary transition-colors duration-300 ${
                        isActive ? "bg-bg text-primary font-semibold shadow-sm" : ""
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              <li>
                <button
                  onClick={logout}
                  className="flex items-center gap-x-1 justify-center p-2 w-full rounded-md border-2 border-red-600 text-red-600 font-medium hover:bg-red-100 transition-all duration-200 shadow-sm"
                >
                  <LogOutIcon size={20} />
                  Logout
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <Outlet />
    </div>
  );
}

export default NavBar;
