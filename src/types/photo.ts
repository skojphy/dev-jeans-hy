export type PhotoRes = {
  createdDate: string
  imageUrl: string
  thumbnailImageUrl: string
  lastModifiedDate: string
  likeCount: 0
  visitCount: 0
  photoTitle: string
  photoId: number
}

export type PhotoPages = {
  content: PhotoRes[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    unpaged: boolean
  }
  size: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  totalElements: number
  totalPages: number
}

export type SortType = 'latest' | 'ranked'
