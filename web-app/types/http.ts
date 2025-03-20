type Payload = {
  message: string
  [key: string]: unknown
}

export class HttpError extends Error {
  status: number
  payload: Payload

  constructor({ status, payload }: { status: number; payload: Payload }) {
    super('Http Error')
    this.status = status
    this.payload = payload
  }
}