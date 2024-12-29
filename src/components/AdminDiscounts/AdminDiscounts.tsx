import { GetAdminDiscounts } from '@/utils/Actions/Actions';
import React, { useEffect, useState } from 'react'

const AdminDiscounts = () => {
    const [allDiscounts, setAllDiscounts] = useState([]);
    const [appliedDiscounts, setAppliedDiscounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetAdminDiscounts()
        .then((data) => {
            setAllDiscounts(data.discounts);
            setAppliedDiscounts(data.applied_discounts);
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
        <div className='flex flex-col gap-10'>
            <div className="">
                <h1 className='text-3xl font-semibold px-10 py-4'>All Discounts</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Sl.no</th>
                            <th>Discount Id</th>
                            <th>Discount Code</th>
                            <th>Discount Percentage</th>
                            <th>User</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allDiscounts.map((discount: any, index: number) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{discount.discount_id}</td>
                                <td>{discount.discount_code}</td>
                                <td>{discount.discount_percentage}</td>
                                <td>{discount.email}</td>
                                <td>{discount.status === 1 ? `Applied` : `Not Applied`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="">
                <h1 className='text-3xl font-semibold px-10 py-4'>Applied Discounts</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Sl.no</th>
                            <th>Discount Code</th>
                            <th>Discount Percentage</th>
                            <th>User</th>
                            <th>Order Total</th>
                            <th>Discounted Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appliedDiscounts.map((discount: any, index: number) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{discount.discount_code}</td>
                                <td>{discount.discount_percentage}</td>
                                <td>{discount.email}</td>
                                <td>{discount.order_total}</td>
                                <td>{(discount.discount_percentage*discount.order_total/100)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminDiscounts
