import { AwardIcon } from "lucide-react"

const { default: axios } = require("axios")

const getproductData = async() =>{
    const response = await axios.get('https://smit-backend-crud.vercel.app/api/items')
    const {data : itemData} = response
    const {data} = itemData
    return data
}

const deleteProductData = async (id) =>{
    const response = await axios.delete(`https://smit-backend-crud.vercel.app/api/items/${id}`)
    return response
}

const addPost = async(data) => {
    const response = await axios.post('https://smit-backend-crud.vercel.app/api/items',data)
    return response
} 

const updatePost = async(id , data) => {
    console.log(id)
    const response = await axios.patch(`https://smit-backend-crud.vercel.app/api/items/${id}`,data)
    return response
}

export{
    getproductData,
    deleteProductData, 
    addPost,
    updatePost
}