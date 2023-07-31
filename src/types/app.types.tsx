export type NotificationProps = {
  date: string,
  items: {
    id: any,
    title: string,
    type: NotificationType,
    text: string,
    status?: "success" | "failed"
  }[]
}

export type NotificationType = "settings" | "bill" | "location" | "mail" | "invoice" | "award" 

export type ReduxAuthState = {
  token: string | undefined | null,
  user: AuthUserType
}

export type AuthUserType = {
  id: string | null
  username: string
  email: string
  firstName: string
  lastName: string
  roles: string[]
  completed: boolean
  verified: boolean
  phoneNumber?: string
}
