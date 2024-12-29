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