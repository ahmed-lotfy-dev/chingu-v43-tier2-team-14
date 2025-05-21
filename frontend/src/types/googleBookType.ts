export type GoogleBook = {
  id: string
  etag: string
  selfLink: string
  volumeInfo: {
    title: string
    subtitle?: string
    authors?: string[]
    publisher?: string
    publishedDate?: string
    description?: string
    industryIdentifiers?: {
      type: string
      identifier: string
    }[]
    readingModes?: {
      text: boolean
      image: boolean
    }
    pageCount?: number
    printType?: string
    categories?: string[]
    averageRating?: number
    ratingsCount?: number
    maturityRating?: string
    allowAnonLogging?: boolean
    contentVersion?: string
    imageLinks?: {
      smallThumbnail?: string
      thumbnail?: string
    }
    language?: string
    previewLink?: string
    infoLink?: string
    canonicalVolumeLink?: string
  }
  saleInfo?: {
    country: string
    saleability: string
    isEbook: boolean
    listPrice?: {
      amount: number
      currencyCode: string
    }
    retailPrice?: {
      amount: number
      currencyCode: string
    }
    buyLink?: string
  }
  accessInfo?: {
    country: string
    viewability: string
    embeddable: boolean
    publicDomain: boolean
    textToSpeechPermission: string
    epub?: { isAvailable: boolean }
    pdf?: { isAvailable: boolean }
    webReaderLink: string
    accessViewStatus: string
    quoteSharingAllowed: boolean
  }
  searchInfo?: {
    textSnippet: string
  }
}
