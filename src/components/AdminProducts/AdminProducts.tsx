import { GetAdminProducts } from '@/utils/Actions/Actions';
import React, { useEffect, useState } from 'react'

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetAdminProducts()
        .then((data) => {
            setProducts(data);
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
                        <th>Product Name</th>
                        <th>Total Orders</th>
                        <th>Total Ordered Qty</th>
                        <th>Total Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: any, index: number) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{product.product_name}</td>
                            <td>{product.total_orders}</td>
                            <td>{product.total_ordered_qty}</td>
                            <td>₹{product.total_sales}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminProducts
