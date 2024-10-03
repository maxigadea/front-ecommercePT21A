'use client'
import IProduct from "@/interfaces/IProduct"
import { IUserSession } from "@/interfaces/Types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const ProductDetail: React.FC<IProduct> = ({ name, image, description, stock, price, id, categoryId}) => {
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const router = useRouter();
  useEffect(() => {
    if(typeof window !== "undefined" && window.localStorage) {
      const userData = JSON.parse(localStorage.getItem("userSession")!)
      setUserData(userData)
    }
  }, [])

  const handleClick = () => {
    if(userData?.token) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const productExist = cart.some((product: IProduct) => {
        if(product.id === id) return true
        return false
      })
      if(productExist) {
        Swal.fire({
          title: "This product exist in your cart",
          width: 400,
          padding: "3em",
        });
        router.push("/cart")
      } else {
        cart.push({
          name, image, description, stock, price, id, categoryId
        })
        localStorage.setItem("cart", JSON.stringify(cart))
        Swal.fire({
          title: "Product added to your cart",
          width: 400,
          padding: "3em",
        });
      }
    } else {
      Swal.fire({
        title: "You must have to be logged",
        width: 400,
        padding: "3em",
      });
    }
  }

  return (
    <div>
        <h2>{name}</h2>
        <img src={image} alt="Imagen del producto" />
        <p>{description}</p>
        <p>Price: ${price}</p>
        <p>Stock: {stock}</p>
        <button
            onClick={handleClick}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center"
          >
            Add to cart
        </button>
    </div>
  )
}

export default ProductDetail