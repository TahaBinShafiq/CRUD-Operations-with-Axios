"use client";
import { addPost, deleteProductData, getproductData, updatePost } from "@/app/services"
import { RippleButton } from "@/components/ui/ripple-button";
import { useEffect, useState } from "react"


function DashboardPartial() {
    const [productData, setProductData] = useState([])
    const [emptyInput, setEmptyInput] = useState(false)

    const [addUserData, setAddUserData] = useState({
        name: '',
        description: ''
    })

    const [editId, setEditId] = useState(null)
    const [editUserData, setEditUserData] = useState({
        name: '',
        description: ''
    })



    const editData = ({ id: editId, name: editName, description: editDis }) => {
        setEditId(editId)
        setEditUserData({
            name: editName,
            description: editDis
        })
        console.log(editId)
        console.log(editName)
        console.log(editDis)
    }
    console.log(editId)

    const submitEditData = async (editId) => {
        if (!editUserData.name || !editUserData) {
            alert("Enter Data")
            return
        }
        console.log(editId)
        const update = await updatePost(editId, editUserData)
        setEditUserData({ name: "", description: "" })
        setEditId(null)
        await getData()
    }


    const addData = async () => {
        if (!addUserData.name || !addUserData.description) {
            setEmptyInput(true);
            return;
        }

        setEmptyInput(false)

        const newPost = await addPost(addUserData)
        const { data: newData } = newPost
        const { data } = newData
        console.log(data.id)
        setProductData([...productData, data])

        setAddUserData({
            name: '',
            description: ''
        })
        console.log("add")
        console.log(productData)
    }


    const getData = async () => {
        const data = await getproductData()
        setProductData(data)

    }


    useEffect(() => {
        getData()
    }, [])
    console.log(addUserData)


    const deleteProduct = async (id) => {
        console.log(id)
        const deleteData = await deleteProductData(id)
        setProductData(deleteData)
        await getData()
    }




    return <section>
        <div>
            <h1 className="text-[30px] font-bold text-center">CRUD Operations Using Axios</h1>
        </div>

        <div className="lg:w-[800px] mx-auto mt-[20px] p-4 sm:p-6 md:p-5 bg-white rounded-2xl shadow-lg space-y-4 sm: w-[90%]">
            <h2 className="text-xl font-semibold text-center">{editId === null ? "Add Details" : "Edit Details"}</h2>


            {/* Name Input */}
            <div className="lg:flex flex-row w-full justify-start gap-[15px] sm:flex flex-col gap[40px]">

                <div className="flex flex-col w-full space-y-1">
                    <label className="text-sm font-medium">Name</label>
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={editId === null ? addUserData.name : editUserData.name}
                        onChange={editId === null ? (event) => setAddUserData({ ...addUserData, name: event.target.value }) :
                            (event) => setEditUserData({ ...editUserData, name: event.target.value })
                        }
                        className={emptyInput && !addUserData.name
                            ? "border border-red-500 rounded-[5px] p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            : "border rounded-[5px] p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }
                    />
                </div>


                {/* Description Input */}
                <div className="flex flex-col space-y-1 w-full" >
                    <label className="text-sm font-medium">Description</label>
                    <input
                        type="text"
                        placeholder="Enter description"
                        value={editId === null ? addUserData.description : editUserData.description}
                        onChange={editId === null ? (event) => setAddUserData({ ...addUserData, description: event.target.value }) :
                            (event) => { setEditUserData({ ...editUserData, description: event.target.value }) }
                        }
                        className={emptyInput && !addUserData.name
                            ? "border border-red-500 rounded-[5px] p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            : "border rounded-[5px] p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }
                    />
                </div>
                <button
                    onClick={editId === null ? addData : () => { submitEditData(editId) }}
                    className="lg:w-[150px] h-[47px] mt-[20px] cursor-pointer bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all duration-200 md:w-[150px] sm: w-full">
                    {editId === null ? "Add" : "Update"}
                </button>

            </div>

        </div>

        <div className="flex max-w-[1250px] mx-[auto] justify-center mt-[20px] px-1.5 gap-[10px] flex-wrap">
            {productData.length > 0 && productData.map((product) => {
                const { name, description, id } = product
                return (
                    <div key={id} className="min-w-[280px] max-w-[300px] bg-white shadow-lg rounded-2xl p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold text-black mb-2">
                            {name}
                        </h2>
                        <p className="text-gray mb-4">
                            {description}
                        </p>

                        <div className="flex justify-end gap-3">
                            <RippleButton rippleColor="#ADD8E6" onClick={() => {
                                editData(product)
                            }}>Edit</RippleButton>
                            <button onClick={() => {
                                deleteProduct(id)
                            }} className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
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