import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";

import { SplitScreenLayout } from "../components/layouts/SplitScreenLayout";
import { useLoginUserMutation } from "../services/blogApi";
import logo from "../images/logo-black.png";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { extractErrorMessage } from "../utils/errorUtils";
import ButtonSpinner from "../components/ButtonSpinner";

interface LoginValues {
  username: string;
  password: string;
}

const inputStyle = (hasError: boolean) =>
  classNames(
    "w-full p-4 rounded-md border focus:border-[#1A585F] focus:ring-1 focus:ring-[#1A585F] outline-none",
    {
      "border-red-700": hasError,
      "border-gray-300": !hasError,
    }
  );

const errorMessageStyle = "text-md text-red-700 mt-1 pl-3";

const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [loginUser, { isLoading, isSuccess, isError, error }] =
    useLoginUserMutation();

  const navigate = useNavigate();
  const { id } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id || isSuccess) {
      navigate("/");
    }
  }, [id, isSuccess, navigate]);

  const errorMessage: string = isError ? extractErrorMessage(error) : "";

  const handleLogin = (values: LoginValues) => {
    loginUser(values);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <SplitScreenLayout>
      <div className="flex flex-col justify-between h-full">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-3">
            <img src={logo} alt="" className="w-20 rounded-full" />
            <p className="text-3xl">Login</p>
            <p className="text-lg text-slate-500">Welcome back!</p>
          </div>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={formik.handleChange}
              value={formik.values.username}
              className={inputStyle(
                !!formik.errors.username && !!formik.touched.username
              )}
            />
            {formik.errors.username && formik.touched.username && (
              <p className={errorMessageStyle}>{formik.errors.username}</p>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className={inputStyle(
                !!formik.errors.password && !!formik.touched.password
              )}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              type="button"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {formik.errors.password && formik.touched.password && (
              <p className={errorMessageStyle}>{formik.errors.password}</p>
            )}
          </div>

          <div className="flex flex-col justify-between text-center sm:flex-row ">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-[#457E86] hover:underline">
                Sign Up
              </Link>
            </p>
            <Link
              to="/"
              className="underline hover:no-underline hover:text-[#457E86]"
            >
              Go back to blogs
            </Link>
          </div>
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <p>{errorMessage}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={classNames(
              "w-full p-4 rounded-md shadow-md transition-colors duration-150",
              {
                "bg-black text-white hover:bg-gray-800": !isLoading,
                "bg-gray-500 text-gray-200 cursor-not-allowed": isLoading,
              }
            )}
          >
            {isLoading ? <ButtonSpinner /> : "Login"}
          </button>
        </form>
      </div>
    </SplitScreenLayout>
  );
};
export default Login;
