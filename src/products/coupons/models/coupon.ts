type Coupon = {
    id: number;
    coupon_code: string;
    limit: number;
    discount_percentage: string;
    expire_date: string;
}

type CouponFormRequest = Omit<Coupon, | 'id'>

export type {
    Coupon,
    CouponFormRequest
}