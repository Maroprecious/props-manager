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
  user: {
    id: string | undefined | null
  }
}
