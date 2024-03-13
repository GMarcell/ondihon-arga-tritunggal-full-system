import React, { useState } from "react";
import { checkFormError } from "../utils/checkErrors";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function CustomInput({ type, labelText, disabled, errors, name, hookForm }) {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  if (type == "password") {
    return (
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-black font-bold">{labelText}</span>
        </div>
        <label
          className={`input bg-slate-50 input-bordered flex items-center gap-2 text-black ${
            checkFormError(errors, name) ? "input-error" : ""
          }`}
        >
          <input
            type={showPassword.password ? "text" : "password"}
            className={`grow `}
            placeholder="Password"
            {...hookForm}
            disabled={disabled}
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
    );
  }

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-black font-bold">{labelText}</span>
      </div>
      <input
        type={type}
        placeholder={labelText}
        className={`input text-black input-bordered w-full disabled:bg-slate-50 disabled:border-slate-50 bg-slate-50 ${
          checkFormError(errors, name) ? "input-error" : ""
        }`}
        disabled={disabled}
        {...hookForm}
      />
    </label>
  );
}

export default CustomInput;