type Market = {
  id: number
  name: string
  phone_number: number
  active_market: number
  owner_name: string
  location_link: string
}

type MarketFormRequest = Omit<Market, 'id'>

export type { Market, MarketFormRequest }
