import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../../hooks/stateContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axiosClient from "../../../axios-client";
import { checkFormError } from "../../../utils/checkErrors";
import ErrorNotification from "../../../components/ErrorNotification";
import CustomInput from "../../../components/Input";

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
      {formErrors && <ErrorNotification formError={formErrors} />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          type="text"
          labelText="Username"
          disabled={isLoading}
          errors={formErrors}
          name="name"
          hookForm={register("name")}
        />

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

        <div className="my-3">
          <CustomInput
            type="password"
            labelText="Password Confirmation"
            disabled={isLoading}
            errors={formErrors}
            name="password"
            hookForm={register("password_confirmation")}
          />
        </div>

        <div className="flex lg:justify-between sm:flex-col lg:flex-row">
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
