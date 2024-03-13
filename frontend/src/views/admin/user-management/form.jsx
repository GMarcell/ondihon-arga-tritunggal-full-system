import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../../hooks/stateContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axiosClient from "../../../axios-client";
import { checkFormError } from "../../../utils/checkErrors";

function Form() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [formErrors, setFormErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, register } = useForm();

  const { setUser, setToken } = useStateContext();

  const onSubmit = (data) => {
    setIsLoading(true);
    setFormErrors(null);
    axiosClient
      .post("/users", data)
      .then((response) => {
        // setUser(response.data.user);
        // setToken(response.data.token);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        const response = error.response;
        if (response && response.status == 422) {
          setFormErrors(response.data.errors);
        }
      });
  };

  return (
    <div className=" w-full max-w-full flex-col items-center md:pl-4 p-4 bg- rounded-lg shadow-md">
      {formErrors && (
        <div role="alert" className="alert alert-error">
          <div className="flex flex-col">
            {Object.keys(formErrors).map((key) => (
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span key={key}>{formErrors[key][0]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-black font-bold">Username</span>
          </div>
          <input
            type="text"
            placeholder="Username"
            className={`input text-black input-bordered w-full disabled:bg-slate-50 disabled:border-slate-50 bg-slate-50 ${
              checkFormError(formErrors, "name") ? "input-error" : ""
            }`}
            {...register("name")}
            disabled={isLoading}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-black font-bold">Email</span>
          </div>
          <input
            type="email"
            placeholder="Email"
            className={`input text-black input-bordered w-full disabled:bg-slate-50 disabled:border-slate-50 bg-slate-50 ${
              checkFormError(formErrors, "email") ? "input-error" : ""
            }`}
            {...register("email")}
            disabled={isLoading}
          />
        </label>
        <div className="my-3">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-black font-bold">Password</span>
            </div>
            <label
              className={`input bg-slate-50 input-bordered flex items-center gap-2 text-black ${
                checkFormError(formErrors, "password") ? "input-error" : ""
              }`}
            >
              <input
                type={showPassword.password ? "text" : "password"}
                className={`grow `}
                placeholder="Password"
                {...register("password")}
                disabled={isLoading}
              />
              <btn
                className="btn btn-square btn-link"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    password: !showPassword.password,
                  })
                }
              >
                {showPassword.password ? <FaRegEye /> : <FaRegEyeSlash />}
              </btn>
            </label>
          </label>
        </div>
        <div className="my-3">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-black font-bold">
                Password Confirmation
              </span>
            </div>
            <label
              className={`input text-black bg-slate-50 input-bordered flex items-center gap-2 ${
                checkFormError(formErrors, "password") ? "input-error" : ""
              }`}
            >
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                className={`grow ${
                  formErrors != null
                    ? "password" in formErrors
                      ? "input-error"
                      : ""
                    : ""
                }`}
                placeholder="Password"
                {...register("password_confirmation")}
                disabled={isLoading}
              />
              <btn
                className="btn btn-square btn-link"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirmPassword: !showPassword.confirmPassword,
                  })
                }
              >
                {showPassword.confirmPassword ? (
                  <FaRegEye />
                ) : (
                  <FaRegEyeSlash />
                )}
              </btn>
            </label>
          </label>
        </div>
        <div className="flex justify-between">
          <button
            className="linear mt-2 w-full lg:w-1/2 lg:mx-3 rounded-xl bg-[#E8AD19] py-[12px] text-base font-medium text-[#0A055B] transition duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Create"
            )}
          </button>
          <a
            className="linear mt-2 w-full lg:w-1/2 lg:mx-3 rounded-xl py-[12px] text-base font-medium btn btn-outline btn-error transition duration-200"
            href="/administrator/user-management"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Cancel"
            )}
          </a>
        </div>
      </form>
    </div>
  );
}

export default Form;
