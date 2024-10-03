"use client";
import { IUserSession } from "@/interfaces/Types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProfileView = () => {
    const router = useRouter();
  const [userData, setUserData] = useState<IUserSession | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = JSON.parse(localStorage.getItem("userSession")!);
      setUserData(userData);
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
        title: "You are logged out",
        width: 400,
        padding: "3em",
    });
    localStorage.removeItem("userSession")
    router.push("/")
  }

  return (
    <div>
        <h1>Dashboard de usuario</h1>
        <h2>Bienvenido: {userData?.user.name}</h2>
        <p>Tu dirección es: {userData?.user.address}</p>
        <p>Tu correo: {userData?.user.email}</p>
        <p>Tu celular: {userData?.user.phone}</p>
        <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfileView;
