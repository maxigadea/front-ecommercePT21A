import { ILoginProps, IRegisterProps } from "@/interfaces/Types";
import Swal from "sweetalert2";

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function register(userData: IRegisterProps) {
    try {
        const res = await fetch(`${APIURL}/users/register`, {
            method: "POST",
            headers: {
                "Content-type" : "application/json"                
            },
            body: JSON.stringify(userData)
        })

        if(res.ok) {
            return res.json()
        } else {
            throw new Error("Failed to register")
        }
    } catch (error: any) {
            throw new Error(error)
    }
};

export async function login(userData: ILoginProps) {
    try {
        const res = await fetch(`${APIURL}/users/login`, {
            method: "POST",
            headers: {
                "Content-type" : "application/json"                
            },
            body: JSON.stringify(userData)
        })

        const response = await res.json()
        if(res.status === 400) {
            Swal.fire({
                title: response.message,
                width: 400,
                padding: "3em",
            });
            throw new Error(response.message)
        } else {
            return response;
        }
    } catch (error: any) {
            throw new Error(error)
    }
};