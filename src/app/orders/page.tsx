"use client";
import { GetOrders } from '@/utils/Actions/Actions';
import React, { useEffect, useState } from 'react'

const OrderCard = ({order} : {order: any}) => {
    return (
        <div className="bg-[#e9e1f2] p-4 rounded-lg">
            <div className="flex items-center justify-between">
                <h3>Transaction: <span className='text-2xl font-semibold'>{order.transaction_id}</span></h3>
                <p>{order.order_date}</p>
            </div>
            <div className="">
                <h3 className='text-lg font-medium'>Products</h3>
                <table>
                    
                </table>
                <ul className='list-disc list-inside'>
                        <li 
                            className='flex items-center justify-between border-b py-2 px-4'
                        >
                            <p className='mx-4 text-gray-500 text-sm'>{}</p>
                            <p className='flex-1'>Name</p>
                            <p className='flex-1'>Qty</p>
                            <p className='flex-1'>Price</p>
                        </li>
                    {order.products.map((product: any, index: number) => (
                        <li 
                            key={`${product.product_id}_${index}`}
                            className='flex items-center justify-between border-b py-2 px-4'
                        >
                            <p className='mx-4 text-gray-500 text-sm'>{index+1}</p>
                            <p className='flex-1'>{product.product_name}</p>
                            <p className='flex-1'>{product.order_qty}</p>
                            <p className='flex-1'>₹{product.product_price}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex gap-8 items-center justify-end">
                {order.discount?.discount_percentage && <div className="flex items-center gap-2">
                    <h3>Discount</h3>
                    <p className='text-2xl font-semibold'>{order.discount?.discount_percentage}%</p>
                </div>}
                <div className="flex items-center  gap-2">
                    <h3>Total</h3>
                    <p className='text-2xl font-semibold'>₹{
                        order.discount?.discount_percentage ? 
                        order.order_total - (order.order_total * order.discount.discount_percentage / 100) :
                        order.order_total
                    }</p>
                </div>
            </div>
        </div>
    )
}

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetOrders()
        .then((data) => {
            setOrders(data);
            setLoading(false);
        })
    }, []);

    if(loading){
        return (
            <div className="flex justify-center items-center h-full">
                Loading...
            </div>
        )
    }

    return (
        <div className='flex flex-col py-10 px-14'>
            <h1 className='text-6xl font-semibold'>Orders</h1>
            <div className='mt-8 flex flex-col gap-4'>
                {Object.keys(orders).map((key) => (
                    <OrderCard key={key} order={orders[key]}/>
                ))}
            </div>
        </div>
    )
}

export default Orders
