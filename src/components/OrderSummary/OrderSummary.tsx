import { CartProps, DiscountProps } from "@/types/types";
import { CheckDiscountCode, Checkout } from "@/utils/Actions/Actions";
import Image from "next/image";
import { useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const OrderSummary = ({cart, subtotal, resetCart, availableDiscounts} : {cart: CartProps[], subtotal: number, resetCart: any, availableDiscounts: string[]}) => {
    
    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState<DiscountProps|null>(null);

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
            <div className="flex flex-col items-center justify-center gap-4 my-[-2em] mx-auto py-3 rounded-lg">
                {availableDiscounts.length > 0 &&
                    <p className="text-sm font-light text-left">Hurray! We have some discount codes for you! <br />
                    Use either {availableDiscounts.map((discount, index)=>(<span key={index}>{discount}, </span>))} to get some off</p>
                }
                <div className='flex items-center justify-between w-full gap-4'>
                    <input 
                        type="text" 
                        placeholder="Apply coupon code" 
                        className="bg-gray-200 py-2 px-2 rounded-lg outline-none w-full"
                        value={discountCode}
                        onChange={(e)=>setDiscountCode(e.target.value)}
                    />
                    <button 
                        className='font-bold text-violet-500 p-2'
                        onClick={() => {
                            if(!discountCode)
                                return;

                            if(discount){
                                setDiscount(null);
                                return;
                            }
                            CheckDiscountCode(discountCode)
                            .then(discount => {
                                setDiscount(discount);
                            }).catch(()=>{alert("Invalid Coupon Code!")})
                            }
                        }
                    >
                        {discount ? `Remove` : `Apply`}
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 my-10 mx-auto py-2 px-4 rounded-lg bg-[#e9e1f2]">
                <div className="flex w-full justify-between items-center">
                    <h3 className="text-base font-semibold">{discount ? `Sub Total` : `Total`}</h3>
                    <p className="text-sm font-semibold">₹{subtotal}</p>
                </div>
                {
                    (discount) && 
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
                    Checkout(cart, discount)
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