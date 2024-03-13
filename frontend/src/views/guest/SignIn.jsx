import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../hooks/stateContext";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser, setToken } = useStateContext();

  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    setFormErrors(null);
    axiosClient
      .post("/login", data)
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        const response = error.response;
        if (response && response.status == 422) {
          setFormErrors(response.data.errors);
        } else {
          setFormErrors({
            email: response.data.message,
          });
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

        {formErrors && <ErrorNotification formError={formErrors} />}

        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            type="email"
            labelText="Email"
            disabled={isLoading}
            errors={formErrors}
            name="email"
            hookForm={register("email")}
          />

          <div className="my-3">
            <CustomInput
              type="password"
              labelText="Password"
              disabled={isLoading}
              errors={formErrors}
              name="password"
              hookForm={register("password")}
            />
          </div>

          <button
            className="linear mt-2 w-full rounded-xl bg-[#E8AD19] py-[12px] text-base font-medium text-[#0A055B] transition duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <a
          className="linear mt-2 w-full rounded-xl py-[12px] text-base font-medium btn btn-outline btn-error transition duration-200"
          href="/"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Cancel"
          )}
        </a>
      </div>
    </div>
  );
}
