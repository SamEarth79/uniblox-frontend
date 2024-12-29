"use client";
import AdminDiscounts from '@/components/AdminDiscounts/AdminDiscounts';
import AdminOrders from '@/components/AdminOrders/AdminOrders';
import AdminProducts from '@/components/AdminProducts/AdminProducts';
import React, { useState } from 'react'

enum Section {
    Orders,
    Products,
    Discounts,
}

const Admin = () => {

    const [section, setSection] = useState<Section>(Section.Orders);

    const AdminHeader = () => {
        return (
            <div className="flex py-4 px-14 gap-10 text-xl bg-[#EAEAEA44] sticky top-0">
                <button className={`p-2 ${section === Section.Orders && `underline underline-offset-8 text-violet-500`}`} onClick={() => setSection(Section.Orders)}>Orders</button>
                <button className={`p-2 ${section === Section.Products && `underline underline-offset-8 text-violet-500`}`} onClick={() => setSection(Section.Products)}>Products</button>
                <button className={`p-2 ${section === Section.Discounts && `underline underline-offset-8 text-violet-500`}`} onClick={() => setSection(Section.Discounts)}>Discounts</button>
            </div>
        )
    }

    return (
        <div>
            <AdminHeader />
            {section === Section.Orders && <AdminOrders />}
            {section === Section.Products && <AdminProducts />}
            {section === Section.Discounts && <AdminDiscounts />}
        </div>
    )
}

export default Admin
