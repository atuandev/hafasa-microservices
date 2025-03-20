export type Token = {
  accessToken: string
  refreshToken: string
  authenticated: boolean
}

export type TokenResponse = {
  code: number
  message?: string
  data: Token
}