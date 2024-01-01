"use client";

import Input from "@/components/Input";
import { TSignUpSchema, signUpShcema } from "@/libs/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpShcema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        confirmPassword: 24234234523,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const resData = await res.json();

    if (!res.ok) {
      alert("submitting form failed!");
      return;
    }

    if (resData.errors) {
      const errors = resData.errors;

      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        });
      } else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password,
        });
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword,
        });
      } else {
        alert("something went wrong!");
      }
    }

    // reset();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 rounded-lg border border-gray-200 p-6 shadow-lg shadow-gray-100 w-[50%]"
      >
        <h1 className="text-center text-blue-950 text-xl font-medium mb-6">
          React hook form
        </h1>
        <Input
          register={register}
          error={errors.email}
          type="text"
          name="email"
          placeholder="Email"
        />
        <Input
          register={register}
          error={errors.password}
          minLength={8}
          type="password"
          name="password"
          placeholder="Password"
        />
        <Input
          register={register}
          error={errors.confirmPassword}
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
        />

        <button
          disabled={isSubmitting}
          className="p-3 rounded-lg bg-blue-400 text-white w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </main>
  );
}
