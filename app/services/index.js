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

export{
    getproductData,
    deleteProductData
}