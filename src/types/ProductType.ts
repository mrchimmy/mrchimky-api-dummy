import { UserType } from "./UserType";

export type ProductType = {
    productId: string
    image: string
    title: string
    description: string
    price: number
    sold: number
    favorite: number
    user: UserType
};