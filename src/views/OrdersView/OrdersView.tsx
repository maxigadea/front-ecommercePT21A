'use client'
import { getOrders } from "@/helpers/orders.helper"
import { IOrder, IUserSession } from "@/interfaces/Types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const OrdersView = () => {
  const router = useRouter();
const [orders, setorders] = useState<IOrder[]>([])
const [userData, setUserData] = useState<IUserSession | null>(null);

  const fetchData = async () => {
    const response = await getOrders(userData?.token!)
    setorders(response)
  }

  useEffect(() => {
    if(userData?.user.name) {
      userData?.user.name === undefined ? router.push("/login") : fetchData()
    }
  }, [userData?.user])

  useEffect(() => {
    if(typeof window !== "undefined" && window.localStorage) {
      const userData = JSON.parse(localStorage.getItem("userSession")!)
      setUserData(userData)
    }
  }, [])


  return (
    <div className='flex flex-row items-center justify-around w-full p-4'>
      <div>
        {
          orders && orders.length > 0 ? (
              orders?.map((orders) => {
                return (
                  <div key={orders.id}>
                    <div>
                      <p>{new Date(orders.date)?.toDateString()}</p>
                      <p>Status: {orders.status}</p>
                      {
                        orders.products.map((product) => {
                          return (
                            <div key={product.id}>{product.name}</div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
          ) : (
            <div>
              <p>You dont have any products in your orders yet</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default OrdersView