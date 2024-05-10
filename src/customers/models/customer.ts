type Customer = {
    id: number;
    name: string;
    phone_number: string;
    email: string;
    address: string;
}

type CustomerFormRequest = Omit<Customer, | 'id'>

export type {
    Customer,
    CustomerFormRequest,
}