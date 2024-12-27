"use client";
import { GetProducts } from '@/utils/Actions/Actions';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Loading = () => (
    <div className="flex justify-center items-center h-full">
        Loading...
    </div>
)

const ProductCard = ({product}) => {
    return (
        <div className="flex flex-col w-[14em]">
            <div className="w-full flex items-center justify-center">
                <Image
                    src={'/product_placeholder.jpg'}
                    width={200}
                    height={100}
                    alt="product"
                    className='w-full object-contain rounded-xl'
                />
            </div>
            <div className="flex w-full justify-between my-2 gap-4 h-20">
                <div className="flex-[3]">
                    <h3 className="text-lg font-semibold">{product.product_name}</h3>
                    <p className="text-xs font-light">{product.product_description}</p>
                </div>
                <div className="flex-[1] font-extrabold text-lg">${product.product_price}</div>
            </div>
            <div className="">
                <button 
                    className="bg-gradient-to-r from-violet-400 to-blue-400 text-white font-bold py-1 w-20 rounded-md"
                >
                    Add
                </button>
            </div>
        </div>
    )
}

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        GetProducts()
        .then(response => {
            setProducts(response);
            setLoading(false);
        })
    }, []);

    if(loading){
        return <Loading />
    }

    return (
        <div className="flex flex-col h-full py-10 px-16">
            <h1 className="text-3xl font-bold">Products For You!</h1>
            <div className="flex w-full gap-4 flex-wrap py-10">
                {products.map((product, index) => {
                    return (
                        <ProductCard product={product} key={index}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Products
