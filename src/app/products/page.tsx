"use client";
import { GetProducts } from '@/utils/Actions/Actions';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Loading = () => (
    <div className="flex justify-center items-center h-full">
        Loading...
    </div>
)

type CartProps = {
    product_id: number,
    qty: number,
}

type ProductProps = {
    product_id: number,
    product_name: string,
    product_description: string,
    product_price: number,
}

const ProductCard = ({product, cart, setCart} : {product: ProductProps, cart: CartProps[], setCart: any}) => {
    
    const cartItem = cart.find((item: CartProps) => item.product_id === product.product_id);
    const addToCart = () => {
        setCart((prev:[CartProps]) => [
            ...prev,
            {
                product_id: product.product_id,
                qty: 1,
            }
        ])
    }

    const increaseQty = () => {
        setCart((prev:[CartProps]) => 
            prev.map((item: CartProps) => 
                item.product_id === product.product_id ? {...item, qty: item.qty + 1} : item
            )
        )
    }

    const decreaseQty = () => {
        setCart((prev:[CartProps]) => {
            const qty = cartItem?.qty;
            if(qty === 1){
                return prev.filter((item: CartProps) => item.product_id !== product.product_id)
            }
            return prev.map((item: CartProps) => 
                item.product_id === product.product_id ? {...item, qty: item.qty - 1} : item
            )
        }
        )
    }
    
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
            <div className="text-lg">
                {cartItem ?
                    <div className="flex justify-between w-20 border border-blue-900 rounded-md cursor-pointer">
                        <div 
                            className='bg-blue-900 flex-1 text-center text-white'
                            onClick={decreaseQty}
                        >
                            -
                        </div>
                        <div className="flex-1 text-center">{cartItem.qty}</div>
                        <div 
                            className='bg-blue-900 flex-1 text-center text-white'
                            onClick={increaseQty}
                        >
                            +
                        </div>
                    </div> 
                    :
                    <button 
                        className="bg-gradient-to-r from-violet-400 to-blue-400 text-white font-bold py-1 w-20 rounded-md"
                        onClick={addToCart}
                    >
                        Add
                    </button>
                }
            </div>
        </div>
    )
}

const Products = () => {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [cart, setCart] = useState<CartProps[]>([]);
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
                        <ProductCard 
                            key={index}
                            product={product}
                            cart={cart}
                            setCart={setCart}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Products
