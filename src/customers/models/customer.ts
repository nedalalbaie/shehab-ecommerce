import type { EditAddressBody } from "@/addresses/models/address";
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

type EditCustomerBody = CustomerFormRequest & {
    addresses: EditAddressBody []
}

export type {
    Customer,
    CustomerFormRequest,
    EditCustomerBody
}