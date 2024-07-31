export type UserProductType = {
    userId: string
    username: string
    email:string
    avatar: string
    password?: string
    birthdate: Date
    created_at: Date
};

export type UserType = {
    userId: string
    avatar: string
    prefix: string
    fullName: string
    gender: string
    sex: string
    address: string
    age: number
    nationalId: string
    phone: string
    email: string
    job: string
    brithday: Date
}