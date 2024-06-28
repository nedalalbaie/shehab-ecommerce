type Ad = {
  id: number
  name: string
  show: 0 | 1
  start_date: string
  end_date: string
  url: string
}

type PostOrPatchAdRequest = Omit<Ad, 'id' | 'url'> & {
  url: File | string
}

export type { Ad, PostOrPatchAdRequest }
