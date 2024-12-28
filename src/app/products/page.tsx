"use client";
import { Checkout, GetProducts } from '@/utils/Actions/Actions';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



export type CartProps = {
    qty: number,
} & ProductProps;

export type ProductProps = {
    product_id: number,
    product_name: string,
    product_description: string,
    product_price: number,
    product_image: string,
}

export type DiscountProps = {
    discount_id: number,
    discount_code: string,
    user_id: number,
    discount_percentage: number,
    status: boolean,
}

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

const OrderSummary = ({cart, subtotal, resetCart, discount} : {cart: CartProps[], subtotal: number, resetCart: any, discount: DiscountProps}) => {
    
    const [discountApplied, setDiscountApplied] = useState(false);

    if(cart.length === 0){
        return (
            <div className="w-[33%] bg-[#FAFAFA] p-4 rounded-xl h-fit px-4">
                <h2 className="text-2xl font-bold">Order Summary</h2>
                <div className="flex flex-col items-center justify-center gap-4 my-10 mx-auto py-2 px-4 rounded-lg">
                    <Image 
                        src={'/cart_illustration.svg'}
                        width={200}
                        height={200}
                        alt="empty cart"
                    />
                    <h3 className="text-base font-semibold">Start Adding Items to Cart</h3>
                </div>
            </div>
        )
    }
    
    return (
        <div className="w-[33%] bg-[#FAFAFA] p-4 rounded-xl h-fit px-4">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <div className="flex flex-col items-center justify-center gap-4 my-10 mx-auto py-2 px-4 rounded-lg bg-[#e9e1f2]">
                {cart.map((item:CartProps, index) => {
                    return (
                        <div className="flex w-full justify-between items-center" key={index}>
                            <h3 className="text-base font-semibold">{item?.product_name}</h3>
                            <p className="text-sm font-semibold">{item.qty}<span className='text-xs font-light mx-2'>x</span>₹{item?.product_price}</p>
                        </div>
                )})}
            </div>
            <div className="flex flex-col items-center justify-center gap-4 my-[-2em] mx-auto py-2 px-4 rounded-lg">
                {discount && 
                    <div className='flex items-center justify-between w-full'>
                        <p>Get {discount.discount_percentage}% off using {discount.discount_code}</p>
                        <button 
                            className='font-bold text-violet-500 p-2'
                            onClick={() => setDiscountApplied(!discountApplied)}
                        >
                            {discountApplied ? `Remove` : `Apply`}
                        </button>
                    </div>
                }
            </div>
            <div className="flex flex-col items-center justify-center gap-4 my-10 mx-auto py-2 px-4 rounded-lg bg-[#e9e1f2]">
                <div className="flex w-full justify-between items-center">
                    <h3 className="text-base font-semibold">{discountApplied ? `Sub Total` : `Total`}</h3>
                    <p className="text-sm font-semibold">₹{subtotal}</p>
                </div>
                {
                    discountApplied && 
                    <>
                        <div className="flex w-full justify-between items-center">
                            <h3 className="text-base font-semibold">Discount</h3>
                            <p className="text-sm font-semibold">-₹{subtotal * discount.discount_percentage / 100}</p>
                        </div>
                        <div className="flex w-full justify-between items-center">
                            <h3 className="text-base font-semibold">Total</h3>
                            <p className="text-sm font-semibold">₹{subtotal - (subtotal * discount.discount_percentage / 100)}</p>
                        </div>
                    </>
                }
            </div>
            <button 
                className="bg-[#e9e1f2] mx-auto rounded-lg p-2 w-full text-xl font-semibold flex items-center gap-2 justify-center"
                onClick={() => {
                    Checkout(cart, discountApplied ? discount : null)
                    .then(()=>{
                        resetCart();
                        alert("Order Placed Successfully!")
                        window.location.reload();           // This is a temporary solution to refresh the page after checkout, we can use redux to fetch and update the products and discounts
                    })
                    .catch(()=>{alert("Order Failed!")})
                }}
            >
                CheckOut
                <ArrowForwardIcon />
            </button>
        </div>
    )

}

const Products = () => {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [discount, setDiscount] = useState<DiscountProps|null>(null);
    const [cart, setCart] = useState<CartProps[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        GetProducts()
        .then(response => {
            setProducts(response.products);
            setDiscount(response.discount);
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
                    discount={discount}
                />
            </div>

        </div>
    )
}

export default Products
