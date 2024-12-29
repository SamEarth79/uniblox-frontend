import { CartProps, DiscountProps } from "@/app/products/page";
import Backend from "../Backend/Backend"

export const GetProducts = async () => {
    try{

        const backend = new Backend();
        const response = await backend.makeApiCall(
            "products/", 
            "GET", 
        );
        const data = await response.json()
        console.log(data);
        return Promise.resolve(data);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export const Checkout = async (cart: CartProps[], discount: DiscountProps|null,) => {
    try {

        const new_order_data = cart.map(item => {
            return {
                ...item,
                "total": item.qty * item.product_price,
            }
        })

        const payload = {
            "new_order_data": new_order_data,
            "discount": discount
        }

        const backend = new Backend();
        const response = await backend.makeApiCall(
            "orders/",
            "POST",
            payload
        );
        if(response.status === 201)
            return Promise.resolve();
        return Promise.reject();
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export const GetOrders = async () => {
    try{
        const backend = new Backend();
        const response = await backend.makeApiCall(
            "orders/", 
            "GET", 
        );
        const data = await response.json()
        console.log(data);
        return Promise.resolve(data);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export const GetAdminOrders = async () => {
    try{
        const backend = new Backend();
        const response = await backend.makeApiCall(
            "adminorders/", 
            "GET", 
        );
        const data = await response.json()
        console.log(data);
        return Promise.resolve(data);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export const GetAdminProducts = async () => {
    try{
        const backend = new Backend();
        const response = await backend.makeApiCall(
            "adminproducts/", 
            "GET", 
        );
        const data = await response.json()
        console.log(data);
        return Promise.resolve(data);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export const GetAdminDiscounts = async () => {
    try{
        const backend = new Backend();
        const response = await backend.makeApiCall(
            "admindiscounts/", 
            "GET", 
        );
        const data = await response.json()
        console.log(data);
        return Promise.resolve(data);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export const CheckCouponCode = async (couponCode:string) => {
    try{
        const backend = new Backend();
        const response = await backend.makeApiCall(
            `discounts?couponCode=${couponCode}`, 
            "GET", 
        );
        if(response.status===200){
            const data = await response.json()
            console.log(data);
            return Promise.resolve(data);
        }else{
            return Promise.reject();
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}