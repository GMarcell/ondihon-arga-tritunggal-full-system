import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axiosClient from "../../../axios-client";
import CustomInput from "../../../components/Input";
import { useStateContext } from "../../../hooks/stateContext";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../../../components/Notification";
import { checkFormError } from "../../../utils/checkErrors";

function ProductForm() {
  const selectOption = [
    {
      label: "Air System",
      value: 1,
    },
    {
      label: "Gas Generation",
      value: 2,
    },
    {
      label: "Instalation",
      value: 3,
    },
  ];
  const { id } = useParams();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState(null);

  const { handleSubmit, register, setValue, control, getValues, watch } =
    useForm({
      defaultValues: {
        description: "",
      },
    });

  const { setNotification } = useStateContext();

  const onSubmitCreate = (data) => {
    const formData = new FormData();
    formData.append("title", data["title"]);
    formData.append("type", data["type"]);
    formData.append("description", data["description"]);
    formData.append("image_link", data["image_link"]);
    setIsLoading(true);
    setFormErrors(null);
    axiosClient
      .post("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setNotification("Product Successfully Created");
        navigate("/administrator/product-management");
      })
      .catch((error) => {
        setIsLoading(false);
        const response = error.response;
        if (response && response.status == 422) {
          setFormErrors(response.data.errors);
        }
      });
  };

  const getProductInfo = (id) => {
    setIsLoading(true);
    axiosClient
      .get(`/product/${id}`)
      .then(({ data }) => {
        setIsLoading(false);
        setValue("title", data.data.title);
        setValue("type", data.data.type);
        setValue("description", data.data.description);
        setValue("image_link", data.data.image_link);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const onSubmitUpdate = (data) => {
    const formData = new FormData();
    formData.append("title", data["title"]);
    formData.append("type", data["type"]);
    formData.append("description", data["description"]);
    if (img != null) {
      formData.append("image_link", data["image_link"]);
    }
    setIsLoading(true);
    setFormErrors(null);
    axiosClient
      .post(`/product/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setIsLoading(false);
        setNotification("Product Successfully Created");
        navigate("/administrator/product-management");
      })
      .catch((error) => {
        setIsLoading(false);
        const response = error.response;
        if (response && response.status == 422) {
          setFormErrors(response.data.errors);
        }
      });
  };

  useEffect(() => {
    if (id != undefined) {
      getProductInfo(id);
    }
  }, []);

  return (
    <div className=" w-full max-w-full flex-col items-center md:pl-4 p-4 bg- rounded-lg shadow-md">
      {formErrors && <Notification type="error" formError={formErrors} />}

      <form onSubmit={handleSubmit(id ? onSubmitUpdate : onSubmitCreate)}>
        <CustomInput
          type="text"
          labelText="Product Name"
          disabled={isLoading}
          errors={formErrors}
          name="title"
          hookForm={register}
        />

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-black font-bold">
              Product Type
            </span>
          </div>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <select
                className={`select select-bordered w-full disabled:bg-slate-50 disabled:border-slate-50 bg-slate-50 text-black ${
                  checkFormError(formErrors, "type") ? "select-error" : ""
                }`}
                onChange={(e) => field.onChange(e.target.value)}
                disabled={isLoading}
                value={selectOption?.find((e) => e.value == getValues('type'))}
              >
                <option disabled selected>
                  Pick one
                </option>
                {selectOption.map((el) => (
                  <option value={el.value}>{el.label}</option>
                ))}
              </select>
            )}
          />
        </label>

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
              name="image_link"
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
                    checkFormError(formErrors, "image_link")
                      ? "input-error"
                      : ""
                  }`}
                />
              )}
            />
          </label>
        </div>

        <div className="p3">
          {getValues("image_link") != undefined ? (
            <img
              src={
                getValues("image_link") != undefined
                  ? img == null
                    ? import.meta.env.VITE_API_BASE_URL +
                      "/storage/" +
                      getValues("image_link")
                    : URL.createObjectURL(img)
                  : null
              }
              className="max-h-96"
            />
          ) : null}
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
            href="/administrator/customer-management"
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

export default ProductForm;
