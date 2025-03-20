export type User = {
  id: string
  username: string
  name: string
  email: string
  avatar: string
  status: UserStatus
  roles: Role[]
  createdAt: string
  updatedAt: string
}

export enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
}

export type Role = {
  name: string
  description: string
}
export type UserResponse = {
  code: number
  message?: string
  data: User
}

export type PageUsersResponse = {
  code: number
  message?: string
  data: {
    pageNo: number
    pageSize: number
    totalPages: number
    totalElements: number
    items: User[]
  }
}
