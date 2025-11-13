"use client";
import { deleteProductData, getproductData } from "@/app/services" 
import { RippleButton } from "@/components/ui/ripple-button";
import { useEffect, useState } from "react"




function DashboardPartial() {
    const [productData, setProductData] = useState([])

    const getData = async () => {
        const data = await getproductData()
        setProductData(data)
        console.log(data)
    }

    useEffect(() => {
        getData()
    }, [])


    const deleteProduct = (id) =>{
        const deleteData = deleteProductData(id)
        setProductData(deleteData)
        getData()
    }

    console.log(productData)




    return <section>
        <h1 className="text-[35px]">DashBoard</h1>
        <div className="flex w-full gap-[15px]">
            {productData.map((product) => {
                const { name, description , id } = product
                return (
                    <div key={id} className="max-w-[400px] min-w-[300px] bg-black shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold text-white mb-2">
                            {name}
                        </h2>
                        <p className="text-white mb-4">
                           {description}
                        </p>

                        <div className="flex justify-end gap-3">
                          <RippleButton rippleColor="#ADD8E6" >Edit</RippleButton>
                            <button onClick={() =>{
                                deleteProduct(id)
                            }} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>

    </section>
}


export default DashboardPartial