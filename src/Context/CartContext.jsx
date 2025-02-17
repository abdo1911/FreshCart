import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {

    const [NumOfCartItems, setNumOfCartItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [cartId, setcartId] = useState('')

    let headers = {
        token: localStorage.getItem("userToken")
    }

    async function addToCart(productId) {
        return await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
            productId
        }, {
            headers
        }).then((response) => {
            setNumOfCartItems(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            setcartId(response.data.data._id)
            toast.success(response.data.message);
            return response;

        }).catch((error) => {
            // console.log(error);
            toast.error(error.data.message);

            return error;
        });
    }

    async function getCart() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers
        }).then((response) => {
            setNumOfCartItems(response.data.numOfCartItems)
            setcartId(response.data.data._id)
            setTotalPrice(response.data.data.totalCartPrice)
            // console.log(response);
            return response;

        }).catch((error) => {
            // console.log(error);
            return error;
        });
    }

    async function removeCatItem(productId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers
        }).then((response) => {
            // console.log(response);
            // toast.success(response.data.message);
            setNumOfCartItems(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            return response;

        }).catch((error) => {
            // console.log(error);
            // toast.error(error.data.message);
            return error;
        });
    }

    async function updateCarItem(productId, count) {
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count,
        }, {
            headers
        }).then((response) => {
            // console.log(response);
            // toast.success(response.data.message);
            setcartId(response.data.data._id)
            setNumOfCartItems(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            return response;

        }).catch((error) => {
            // console.log(error);
            // toast.error(error.data.message);
            return error;
        });
    }

    async function onlinePayment(shippingAddress) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, {
            shippingAddress,
        }, {
            headers
        }).then((response) => {
            console.log(response.data.session.url);
            window.location.href = response.data.session.url;
            return response;

        }).catch((error) => {
            console.log(error);
            // toast.error(error.data.message);
            return error;
        });
    }

    async function cashPayment(shippingAddress) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
            shippingAddress,
        }, {
            headers
        }).then((response) => {
            console.log(response);
            window.location.href = "http://localhost:5173/allorders";
            setNumOfCartItems(0);
            setTotalPrice(0);
            return response;

        }).catch((error) => {
            console.log(error);
            // toast.error(error.data.message);
            return error;
        });
    }

    async function deleteAllCart() {
        return await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
            headers
        }).then((response) => {
            // console.log(response);
            toast.success(response.data.message);
            setNumOfCartItems(0)
            setTotalPrice(0)
            return response;

        }).catch((error) => {
            // console.log(error);
            toast.error(error.data.message);
            return error;
        });
    }

    return <CartContext.Provider value={{ addToCart, getCart, removeCatItem, updateCarItem, deleteAllCart, NumOfCartItems, totalPrice, onlinePayment, cashPayment }}>{props.children}</CartContext.Provider>
}