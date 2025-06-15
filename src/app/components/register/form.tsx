"use client";

import axios from "@/app/lib/axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { AxiosError } from "axios";

const RegisterSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

interface IRegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function FormRegister(){
  const initialValues: IRegisterForm ={
    name:"",
    email:"",
    password:"",
  };

  const onRegister = async (
  value: IRegisterForm,
  action: FormikHelpers<IRegisterForm>
) => {
  try {
    console.log("Registering user with:", value);
    await axios.post("/users/register", value);
    toast.success("register sucsesfully");
    action.resetForm();
  } catch (err: unknown) { // Change 'any' to 'unknown'
    if (err instanceof AxiosError && err.response && err.response.data) { // Type narrowing
      alert(err.response.data.message || "Registration failed.");
    } else {
      alert("Something went wrong.");
    }
    console.error(err);
    toast.error("register failed");
  }
};

  return(
    <div>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={(values, action) =>{
             onRegister(values, action)
            }}
        >
        {(props: FormikProps<IRegisterForm>) =>{
          const{touched,errors, isSubmitting} = props;
          return(
            <Form>
              <div className="flex flex-col">
                <label htmlFor="name" className="text-md">
                  Name
                </label>
                <Field name="name" type="text" className="mt-2 mb-1 p-2 border border-gray-600 rounded-md"
                />
                {(touched.name && errors.name) && (
                  <div className="text-red-500 text-[12px]">
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-md">
                  Email
                </label>
                <Field name="email" type="email" className="mt-2 mb-1 p-2 border border-gray-600 rounded-md"
                />
                {(touched.email && errors.email) && (
                  <div className="text-red-500 text-[12px]">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="text-md">
                  Password
                </label>
                <Field name="password" type="password" className="mt-2 mb-1 p-2 border border-gray-600 rounded-md"
                />
                {(touched.password && errors.password) && (
                  <div className="text-red-500 text-[12px]">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="mt-12">
                <button type="submit" disabled ={isSubmitting} className="py-1 px-2 w-full bg-gray-600 text-white tsxt-sm rounded-md disabled:bg-purple-600">
                  {isSubmitting ? "loading...." : "sign up"}
                </button>
              </div>
            </Form>
          );
        }}

        </Formik>

    </div>
  )
}