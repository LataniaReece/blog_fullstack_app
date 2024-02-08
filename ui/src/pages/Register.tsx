import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { SplitScreenLayout } from "../components/layouts/SplitScreenLayout";
import { RootState } from "../store";
import logo from "../images/logo-black.png";
import { useCreateUserMutation } from "../services/blogApi";
import { extractErrorMessage } from "../utils/errorUtils";
import ButtonSpinner from "../components/ButtonSpinner";

const inputStyle = (hasError: boolean) =>
  classNames(
    "w-full p-4 rounded-md border focus:border-[#1A585F] focus:ring-1 focus:ring-[#1A585F] outline-none",
    {
      "border-red-700": hasError,
      "border-gray-300": !hasError,
    }
  );

const errorMessageStyle = "text-md text-red-700 mt-1 pl-3";

const Register: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, { isLoading, isError, error, isSuccess }] =
    useCreateUserMutation();

  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isLoggedIn || isSuccess) {
      navigate("/");
    }
  }, [isLoggedIn, isSuccess, navigate]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password1: "",
      password2: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password1: Yup.string().required("Password is required"),
      password2: Yup.string()
        .oneOf([Yup.ref("password1")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      registerUser({ username: values.username, password: values.password1 });
    },
  });

  const errorMessage = isError ? extractErrorMessage(error) : "";

  return (
    <SplitScreenLayout>
      <div className="flex flex-col justify-between h-full">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-3">
            <img src={logo} alt="Logo" className="w-20 rounded-full" />
            <p className="text-3xl">Register</p>
            <p className="text-lg text-slate-500">Join our community!</p>
          </div>

          {/* Username Field */}
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

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password1"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password1}
              className={inputStyle(
                !!formik.errors.password1 && !!formik.touched.password1
              )}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              type="button"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {formik.errors.password1 && formik.touched.password1 && (
              <p className={errorMessageStyle}>{formik.errors.password1}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password2"
              placeholder="Confirm Password"
              onChange={formik.handleChange}
              value={formik.values.password2}
              className={inputStyle(
                !!formik.errors.password2 && !!formik.touched.password2
              )}
            />
            {formik.errors.password2 && formik.touched.password2 && (
              <p className={errorMessageStyle}>{formik.errors.password2}</p>
            )}
          </div>

          <div className="flex flex-col justify-between text-center sm:flex-row ">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-[#457E86] hover:underline">
                Login
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
            <div className={errorMessageStyle} role="alert">
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
            {isLoading ? <ButtonSpinner /> : "Register"}
          </button>
        </form>
      </div>
    </SplitScreenLayout>
  );
};

export default Register;
