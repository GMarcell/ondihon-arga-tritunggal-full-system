import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../../../axios-client";
import CustomInput from "../../../components/Input";
import { useStateContext } from "../../../hooks/stateContext";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../../../components/Notification";
import { isEmpty } from "../../../utils/CheckEmptyObject";

function Form() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const { handleSubmit, register, setValue, getValues } = useForm();

  const { setNotification } = useStateContext();

  const onSubmitCreate = (data) => {
    setIsLoading(true);
    setFormErrors(null);
    axiosClient
      .post("/users", data)
      .then(() => {
        setNotification("User Successfully Created");
        navigate("/administrator/user-management");
      })
      .catch((error) => {
        setIsLoading(false);
        const response = error.response;
        if (response && response.status == 422) {
          setFormErrors(response.data.errors);
        }
      });
  };

  const getUserInfo = (id) => {
    setIsLoading(true);
    axiosClient
      .get(`/users/${id}`)
      .then(({ data }) => {
        setIsLoading(false);
        setValue("name", data.data.name);
        setValue("email", data.data.email);
        setUser({
          name: data.data.name,
          email: data.data.email,
        });
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const onSubmitUpdate = (data) => {
    let trimmedData = Object.fromEntries(
      Object.entries(data)
        .filter(([_, v]) => v != "")
        .filter(([key, v]) => v != user[key])
    );
    if (isEmpty(trimmedData)) {
      setFormErrors({
        name: ["Name is the same with previous data"],
        email: ["Email is the same with previous data"],
      });
    } else {
      setIsLoading(true);
      setFormErrors(null);
      axiosClient
        .put(`/users/${id}`, trimmedData)
        .then(() => {
          setNotification("User Successfully Updated");
          navigate("/administrator/user-management");
        })
        .catch((error) => {
          setIsLoading(false);
          const response = error.response;
          if (response && response.status == 422) {
            console.log(response.data.errors);
            setFormErrors(response.data.errors);
          }
        });
    }
  };

  useEffect(() => {
    if (id != undefined) {
      getUserInfo(id);
    }
  }, []);

  return (
    <div className=" w-full max-w-full flex-col items-center md:pl-4 p-4 bg- rounded-lg shadow-md">
      {formErrors && <Notification type="error" formError={formErrors} />}

      <form onSubmit={handleSubmit(id ? onSubmitUpdate : onSubmitCreate)}>
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

        <div className="flex lg:justify-between sm:flex-col lg:flex-row">
          <button
            className="linear mt-2 w-full lg:w-1/2 lg:mx-3 rounded-xl bg-[#E8AD19] py-[12px] text-base font-medium text-[#0A055B] transition duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : id ? (
              "Update"
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
