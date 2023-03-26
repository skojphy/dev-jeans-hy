export type UserInfo = {
  email: string
  firstName: string
  id: number
  lastName: string
  photos: [
    {
      createdDate: string
      fileName: string
      id: number
      imageUrl: string
      lastModifiedDate: string
      likeCount: number
      visitCount: number
    },
  ]
  profilePictureUrl: string
  roles: string
}
