import { GetAdminOrders } from '@/utils/Actions/Actions';
import React, { useEffect, useState } from 'react'

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetAdminOrders()
        .then((data) => {
            setOrders(data);
            setLoading(false);
        })
    }, []);

    if(loading){
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Sl.no</th>
                        <th>User Email</th>
                        <th>Order Date</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Order Qty</th>
                        <th>Sub Total</th>
                        <th>Discount Percentage</th>
                        <th>Order Total</th>
                        <th>Transaction #</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order: any, index: number) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{order.email}</td>
                            <td>{order.order_date}</td>
                            <td>{order.product_name}</td>
                            <td>{order.product_price}</td>
                            <td>{order.order_qty}</td>
                            <td>{order.product_price*order.order_qty}</td>
                            <td>{order.discount_percentage}</td>
                            <td>{
                                order.discount_percentage ? 
                                order.product_price*order.order_qty - (order.product_price*order.order_qty * order.discount_percentage / 100) :
                                order.product_price*order.order_qty   
                            }</td>
                            <td>{order.transaction_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminOrders
