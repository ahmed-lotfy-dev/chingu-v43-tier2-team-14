import type { User } from "./userType"

export type AuthResponse = {
  data?: { user: User | null }
  error?: { message: string } | string
}
