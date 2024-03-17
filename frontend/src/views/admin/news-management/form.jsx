import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axiosClient from "../../../axios-client";
import CustomInput from "../../../components/Input";
import { useStateContext } from "../../../hooks/stateContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import Notification from "../../../components/Notification";
import { isEmpty } from "../../../utils/CheckEmptyObject";
import useFilePreview from "../../../hooks/useFilePreview";
import { checkFormError } from "../../../utils/checkErrors";
import NewsPreview from "./preview";

function NewsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const { handleSubmit, register, setValue, control, getValues, watch } =
    useForm();

  const { setNotification } = useStateContext();

  const onSubmitCreate = (data) => {
    const formData = new FormData();
    formData.append("title", data["title"]);
    formData.append("description", data["description"]);
    formData.append("image_link", data["image-link"]);
    formData.append("video_link", data["video-link"]);
    setIsLoading(true);
    setFormErrors(null);
    axiosClient
      .post("/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setNotification("News Successfully Created");
        navigate("/administrator/news-management");
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
          labelText="Title"
          disabled={isLoading}
          errors={formErrors}
          name="title"
          hookForm={register}
        />

        <CustomInput
          type="longText"
          labelText="Description"
          disabled={isLoading}
          errors={formErrors}
          name="description"
          hookForm={register}
        />

        <div className="my-3">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-black font-bold">
                Image Link
              </span>
            </div>
            <Controller
              control={control}
              name="image-link"
              render={({ field }) => (
                <input
                  onChange={(e) => {
                    field.onChange(e.target.files[0]);
                    setImg(e.target.files[0]);
                  }}
                  type="file"
                  placeholder="Image Link"
                  disabled={isLoading}
                  className={`file-input file-input-bordered text-black input-bordered w-full disabled:bg-slate-50 disabled:border-slate-50 bg-slate-50 ${
                    checkFormError(formErrors, "image-link")
                      ? "input-error"
                      : ""
                  }`}
                />
              )}
            />
          </label>
        </div>

        <div className="my-3">
          <CustomInput
            type="text"
            labelText="Video Link"
            disabled={isLoading}
            errors={formErrors}
            hookForm={register}
            name="video-link"
          />
        </div>

        <div className="p-3 border-slate-500 border-2 rounded-sm">
          {/* <h3 className="font-bold text-brand-500 text-center text-md">Preview</h3> */}
          <NewsPreview
            title={getValues("title")}
            desc={watch("description")}
            video={watch("video-link")}
            image={
              getValues("image-link") != undefined
                ? URL.createObjectURL(img)
                : null
            }
          />
        </div>

        <div className="flex lg:justify-between flex-col lg:flex-row">
          <button
            className="mt-2 w-full lg:w-1/2 lg:mx-3 rounded-xl bg-[#E8AD19] py-[12px] text-base font-medium text-[#0A055B] transition duration-200"
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
            className="mt-2 w-full lg:w-1/2 lg:mx-3 rounded-xl py-[12px] text-base font-medium btn btn-outline btn-error transition duration-200"
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

export default NewsForm;
