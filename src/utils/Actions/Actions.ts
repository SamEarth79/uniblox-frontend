import { CartProps } from "@/app/products/page";
import Backend from "../Backend/Backend"

export const GetProducts = async () => {
    try{

        const backend = new Backend();
        const response = await backend.makeApiCall(
            "products/", 
            "GET", 
        );
        return Promise.resolve(response.json());
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export const Checkout = async (cart: CartProps[]) => {
    try {

        const new_order_data = cart.map(item => {
            return {
                ...item,
                "total": item.qty * item.product_price,
            }
        })

        const backend = new Backend();
        const response = await backend.makeApiCall(
            "orders/",
            "POST",
            {new_order_data}
        );
        if(response.status === 201)
            return Promise.resolve();
        return Promise.reject();
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}