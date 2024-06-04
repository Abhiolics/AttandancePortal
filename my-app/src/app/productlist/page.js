"use client"
import { useEffect, useState } from "react"
import axios from "axios"


export default function Page() {
    const [product, setProduct] = useState([])

    useEffect(() => {
        async function getProduct() {
            await axios.get("https://attendence-api-px8b.onrender.com/")
            .then((response) =>setProduct(response.data))
            .catch((err) => console.log(err))

            // await fetch("https://dummyjson.com/products")
            //     .then(response => response.json())
            //     .then(result => console.log(result))
            //     .catch((err) => console.log(err))
        }

        getProduct();
    }, [])

    return (
        <div>
            <h1>
                Product List
            </h1>
            {product}
        </div>
    )
}