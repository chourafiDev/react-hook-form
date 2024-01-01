import React, { FC } from "react";

type InputProps = {
  type: string;
  placeholder: string;
  name: string;
  register: any;
  error: any;
  minLength?: number;
};

const Input: FC<InputProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
}) => {
  return (
    <div>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`outline-none rounded-lg p-3 text-gray-500 border  w-full ${
          error ? "border-red-500" : "border-gray-200"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Input;
