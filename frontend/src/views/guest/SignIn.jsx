import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../hooks/stateContext";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState(null);

  const { setUser, setToken } = useStateContext();

  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    axiosClient
      .post("/login", data)
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status == 422) {
          setFormErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="flex h-svh w-svh items-center justify-center ">
      {/* Sign in section */}
      <div className=" w-full max-w-full flex-col items-center md:pl-4 lg:max-w-[420px] p-4 bg- rounded-lg shadow-md bg-[#0A055B]">
        <h4 className="mb-2.5 text-4xl font-bold text-white">Sign In</h4>
        <p className="mb-9 ml-1 text-base text-slate-300">
          Enter your username and password to sign in!
        </p>

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

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">email</span>
          </div>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            {...register("email")}
          />
        </label>
        <div className="my-3">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type={showPassword ? "text" : "password"}
                className="grow"
                placeholder="Password"
                {...register("password")}
              />
              <btn
                className="btn btn-square btn-link"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </btn>
            </label>
          </label>
        </div>
        <button
          className="linear mt-2 w-full rounded-xl bg-[#E8AD19] py-[12px] text-base font-medium text-[#0A055B] transition duration-200"
          onClick={handleSubmit(onSubmit)}
        >
          Sign In
        </button>
        <a
          className="linear mt-2 w-full rounded-xl py-[12px] text-base font-medium btn btn-outline btn-error transition duration-200"
          href="/"
        >
          Cancel
        </a>
      </div>
    </div>
  );
}
