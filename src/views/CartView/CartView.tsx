'use client'
import { createOrder } from "@/helpers/orders.helper"
import IProduct from "@/interfaces/IProduct"
import { IUserSession } from "@/interfaces/Types"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const CartPage = () => {
const [cart, setCart] = useState<IProduct[]>([])
const [userData, setUserData] = useState<IUserSession | null>(null);

  useEffect(() => {
    if(typeof window !== "undefined" && window.localStorage) {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
      setCart(storedCart)
    }
  }, [])

  useEffect(() => {
    if(typeof window !== "undefined" && window.localStorage) {
      const userData = JSON.parse(localStorage.getItem("userSession")!)
      setUserData(userData)
    }
  }, [])

  const handleClick = async () => {
      const idProducts = cart.map((product) => product.id)
      await createOrder(idProducts, userData?.token!)
      Swal.fire({
        title: "Buy successfully",
        width: 400,
        padding: "3em",
      });
      setCart([])
      localStorage.setItem("cart", "[]")
  }

  return (
    <div className='flex flex-row items-center justify-around w-full p-4'>
      <div className="w-full flex flex-row items-center gap-4">
        {
          cart && cart.length > 0 ? (
              cart?.map((cart) => {
                return (
                  <div key={cart.id}>
                    <div>
                      <p>{cart.name}</p>
                      <p>Price: {cart.price}</p>
                    </div>
                  </div>
                )
              })
          ) : (
            <div>
              <p>You dont have any products in your cart yet</p>
            </div>
          )
        }
      </div>
      <div>
          <p>Total: $0</p>
          <button onClick={handleClick}>Checkout</button>
      </div>
    </div>
  )
}

export default CartPage