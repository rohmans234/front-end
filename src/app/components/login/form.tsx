"use client";

import axios from "@/app/lib/axios"
import { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import * as yup from "yup";

const LoginSchema = yup.object().shape({
  login: yup.string().required("login is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "min 6 character"),
});

interface ILoginForm {
  login: string;
  password: string;
}

export default function FormLogin() {
  const initialValues: ILoginForm = {
    login: "",
    password: "",
  };

  const onLogin = async (
    value: ILoginForm,
    action: FormikHelpers<ILoginForm>
  ) => {
    try {
      const { data } = await axios.post("/users/login", value);
      await signIn("credentials", {
        redirectTo: "/",
        objectId: data.objectId,
        name: data.name,
        email: data.email,
        userToken: data["user-token"],
      });
      toast.success("Login successfully");
      action.resetForm();
    } catch (err) {
      console.log(err);
      action.setSubmitting(false);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values, action) => {
          onLogin(values, action);
        }}
      >
        {(props: FormikProps<ILoginForm>) => {
          const { touched, errors, isSubmitting } = props;
          return (
            <Form>
              <div className="flex flex-col">
                <label htmlFor="login" className="text-md">
                  Email
                </label>
                <Field
                  name="login"
                  type="text"
                  className="mt-2 mb-1 p-2 border border-gray-600 rounded-md"
                />
                {touched.login && errors.login && (
                  <div className="text-red-500 text-[12px]">{errors.login}</div>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="text-md">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="mt-2 mb-1 p-2 border border-gray-600 rounded-md"
                />
                {touched.password && errors.password && (
                  <div className="text-red-500 text-[12px]">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-1 px-2 w-full bg-gray-600 text-white tsxt-sm rounded-md disabled:bg-gray-400"
                >
                  {isSubmitting ? "Loading ..." : "Sign in"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}