import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../hooks/stateContext";
import CustomInput from "../../components/Input";
import Notification from "../../components/Notification";

export default function SignUp() {
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
      .post("/signup", data)
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
        }
      });
  };

  return (
    <div className="flex h-svh w-svh items-center justify-center ">
      {/* Sign in section */}
      <div className=" w-full max-w-full flex-col items-center md:pl-4 lg:max-w-[420px] p-4 bg- rounded-lg shadow-md bg-[#0A055B]">
        <h4 className="mb-2.5 text-4xl font-bold text-white">Sign In</h4>
        <p className="mb-9 ml-1 text-base text-slate-300">sign up!</p>

        {formErrors && <Notification type='error' formError={formErrors} />}

        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            type="text"
            labelText="Username"
            disabled={isLoading}
            errors={formErrors}
            name="name"
            hookForm={register}
          />

          <CustomInput
            type="email"
            labelText="Email"
            disabled={isLoading}
            errors={formErrors}
            name="email"
            hookForm={register}
          />

          <div className="my-3">
            <CustomInput
              type="password"
              labelText="Password"
              disabled={isLoading}
              errors={formErrors}
              name="password"
              hookForm={register}
            />
          </div>

          <div className="my-3">
            <CustomInput
              type="password"
              labelText="Password Confirmation"
              disabled={isLoading}
              errors={formErrors}
              name="password_confirmation"
              hookForm={register}
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
        </form>
      </div>
    </div>
  );
}
