import type { BaseStatus } from "@/core/models/base-status";

type Customer = {
    id: number;
    name: string;
    phone_number: string;
    email: string;
    address: string;
    is_active: BaseStatus;
    is_trusted: BaseStatus;
}

type CustomerFormRequest = Omit<Customer, | 'id'>

export type {
    Customer,
    CustomerFormRequest,
}