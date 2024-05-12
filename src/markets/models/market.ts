type Market = {
  id: number
  phone_number: string
  active_market: number
  authenticated: number
  market_name: string
  owner_name: string
  location_link: string
}

type MarketFormRequest = Omit<Market, 'id'>

export type { Market, MarketFormRequest }
