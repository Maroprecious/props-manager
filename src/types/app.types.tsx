export type NotificationProps = {
  date: string | {
    month: string,
    year: string,
    day: string
  },
  items: {
    id: any,
    title: string,
    type: NotificationType,
    text: string,
    status?: "success" | "failed"
  }[]
}

export type NotificationType = "settings" | "bill" | "location" | "mail" | "invoice" | "award" 

export type AlertModalType = "success" | "error" | "info" | "warning"

export type ReduxAuthState = {
  token: string | undefined | null,
  user: AuthUserType
}

export type roleTypes = "landlord" | "tenant" | "property-manager" | null

export type AuthUserType = {
  id: string | null
  aliasName?: string
  email: string
  firstName: string
  lastName: string
  roles: string[]
  completed: boolean
  verified: boolean
  phoneNumber?: string
  roleType: roleTypes
  pushToken?: string
  referralCode?: string
  bankAvailable?: boolean
}

export type PaymentData = {
  unitId: string
  invoiceId: string
  referenceId: string
  tenantId: string
  ownerId: string
  amountExpected: number
  paymentStatus: boolean
  invoiceCreationDate: string
}

export type FinancialData = {
  inflowHistory: Array<any>,
  outflowHistory: Array<any>,
  totalInflow: number,
  totalOutflow: number,
  userId: string,
  walletBalance: number
}