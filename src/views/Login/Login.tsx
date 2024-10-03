"use client";
import { login } from "@/helpers/auth.helper";
import { validateLoginForm } from "@/helpers/validate";
import { ILoginErrors, ILoginProps } from "@/interfaces/Types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const LoginView = () => {
  const router = useRouter();
  const initialState = {
    email: "",
    password: "",
  };
  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<ILoginErrors>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setDataUser({
        ...dataUser,
        [name]: value
    })
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await login(dataUser)
    const {token, user} = response;
    localStorage.setItem("userSession", JSON.stringify({token, user}))
    Swal.fire({
      title: "You have successfully logged",
      width: 400,
      padding: "3em",
    });
    router.push("/")
  };

  useEffect(() => {
    const errors = validateLoginForm(dataUser)
    setErrors(errors)
  }, [dataUser]);

  return (
    <div>
      <div>
        <h1>Sign in to X STORE</h1>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
            <div>
                <label htmlFor="email-address">Email:</label>
                <input 
                    
                    autoComplete="off"
                    id="email-address"
                    name="email"
                    type="email"
                    value={dataUser.email}
                    onChange={handleChange}
                    placeholder="johndoe@gmail.com"
                />
                {errors.email && <span>{errors.email}</span>}
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    value={dataUser.password}
                    onChange={handleChange}
                    placeholder="**********"
                />
                {errors.password && <span>{errors.password}</span>}
            </div>

            <button disabled={errors.email ? true : false} type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginView;
