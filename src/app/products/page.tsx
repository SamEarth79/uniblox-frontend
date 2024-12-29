"use client";
import { GetProducts } from '@/utils/Actions/Actions';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react'
import { CartProps, DiscountProps, ProductProps } from '@/types/types';
import { OrderSummary } from '@/components/OrderSummary/OrderSummary';


const Loading = () => (
    <div className="flex justify-center items-center h-full">
        Loading...
    </div>
)

const ProductCard = ({product, cart, setCart} : {product: ProductProps, cart: CartProps[], setCart: any}) => {
    
    const cartItem = cart.find((item: CartProps) => item.product_id === product.product_id);
    const addToCart = () => {
        setCart((prev:[CartProps]) => [
            ...prev,
            {
                ...product,
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
        })
    }
    
    return (
        <div className="flex flex-col w-[14em] mb-4">
            <div className="w-full flex items-center justify-center">
                <Image
                    src={product.product_image}
                    width={200}
                    height={100}
                    alt="product"
                    className='w-full object-contain rounded-xl'
                />
            </div>
            <div className="flex w-full justify-between my-2 gap-4 h-16 overflow-hidden">
                <div className="flex-[3]">
                    <h3 className="text-lg font-semibold">{product.product_name}</h3>
                    <p className="text-xs font-light">{product.product_description}</p>
                </div>
                <div className="flex-[1] font-extrabold text-lg">₹{product.product_price}</div>
            </div>
            <div className="text-lg">
                {cartItem ?
                    <div className="flex justify-between w-24 border border-[#bf91f2] rounded-md cursor-pointer">
                        <button 
                            className='bg-[#bf91f2] flex-1 text-center text-white'
                            onClick={decreaseQty}
                        >
                            -
                        </button>
                        <div className="flex-1 text-center">{cartItem.qty}</div>
                        <button 
                            className='bg-[#bf91f2] flex-1 text-center text-white'
                            onClick={increaseQty}
                        >
                            +
                        </button>
                    </div> 
                    :
                    <button 
                        className="bg-gradient-to-r from-violet-400 to-blue-400 text-white font-bold py-[1px] w-24 rounded-md"
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
    const [availableDiscounts, setAvailableDiscounts] = useState<string[]>([]);
    const [cart, setCart] = useState<CartProps[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        GetProducts()
        .then(response => {
            setProducts(response.products);
            setAvailableDiscounts(response.discount);
            setLoading(false);
        })
    }, []);

    const subtotal = useMemo(() => {
        return cart.reduce((total:number, item:CartProps) => total + (item.qty * item.product_price), 0)
    }, [cart]);

    if(loading){
        return <Loading />
    }

    return (
        <div className="flex flex-col h-full py-10 px-16">
            <h1 className="text-3xl font-bold">Products For You!</h1>
            <div className="flex justify-between mt-10">
                <div className="flex gap-12 flex-wrap w-[66%]">
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
                <OrderSummary 
                    cart={cart} 
                    subtotal={subtotal} 
                    resetCart={() => setCart([])}
                    availableDiscounts={availableDiscounts}
                />
            </div>

        </div>
    )
}

export default Products
