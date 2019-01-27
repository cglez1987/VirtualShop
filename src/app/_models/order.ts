import { ProductInOrder } from "./productInOrder";

export class Order {
    number: string;
    date: Date;
    user: string;
    shippingAddress: string;
    paymentType: string;
    totalvalue: number;
    products: ProductInOrder[];
}
