import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Navigate } from "react-router-dom";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex h-svh w-svh items-center justify-center ">
      {/* Sign in section */}
      <div className=" w-full max-w-full flex-col items-center md:pl-4 lg:max-w-[420px] p-4 bg- rounded-lg shadow-md bg-[#0A055B]">
        <h4 className="mb-2.5 text-4xl font-bold text-white">Sign In</h4>
        <p className="mb-9 ml-1 text-base text-slate-300">
          Enter your username and password to sign in!
        </p>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            {...register("username")}
          />
        </label>
        <div className="my-3">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <input type={showPassword ? 'text' : 'password'} className="grow" placeholder="Search" />
              <btn className="btn btn-square btn-ghost" onClick={() => setShowPassword(!showPassword)}>
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
