type Coupon = {
    id: number;
    coupon_code: string;
    limit: string | number;
    discount_percentage: string | number;
    expire_date: string;
}

type CouponFormRequest = Omit<Coupon, | 'id'>

export type {
    Coupon,
    CouponFormRequest
}