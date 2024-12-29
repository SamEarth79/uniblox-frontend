import { CreateDiscount, GetAdminDiscounts } from '@/utils/Actions/Actions';
import React, { useEffect, useState } from 'react'

const AdminDiscounts = () => {
    const [allDiscounts, setAllDiscounts] = useState([]);
    const [appliedDiscounts, setAppliedDiscounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newDiscount, setNewDiscount] = useState({
        discount_code: '',
        discount_percentage: '',
        email: '',
    });

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

    const inputFieldStyles = 'border w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent';

    return (
        <div className='flex flex-col gap-10'>
            <div className="">
                <h1 className='text-3xl font-semibold px-10 py-4'>Create a discount</h1>
                <div className="flex justify-around gap-4 px-10 w-4/6 mx-auto mt-4">
                    <input 
                        type="text" 
                        placeholder='Code' 
                        className={`${inputFieldStyles}`}
                        value={newDiscount.discount_code}
                        onChange={(e) => setNewDiscount({...newDiscount, discount_code: e.target.value})}
                    />
                    <input 
                        type="text" 
                        placeholder='Discount Percentage'
                        className={`${inputFieldStyles}`}
                        value={newDiscount.discount_percentage}
                        onChange={(e) => setNewDiscount({...newDiscount, discount_percentage: e.target.value})}
                    />
                    <input 
                        type="text" 
                        placeholder='Email' 
                        className={`${inputFieldStyles}`}
                        value={newDiscount.email}
                        onChange={(e) => setNewDiscount({...newDiscount, email: e.target.value})}
                    />
                    <button 
                        className='bg-gradient-to-r from-violet-400 to-blue-400 p-2 rounded-lg text-white font-semibold'
                        onClick={() => {
                            CreateDiscount(newDiscount)
                            .then(()=>{
                                alert('Discount created successfully!')
                            })
                            .catch(() => {
                                alert('Failed to create discount!')
                            })
                            setNewDiscount({
                                discount_code: '',
                                discount_percentage: '',
                                email: '',
                            })
                        }}
                    >
                        Create
                    </button>
                </div>
            </div>
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
                            <th>Transaction #</th>
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
                                <td>{discount.transaction_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminDiscounts
