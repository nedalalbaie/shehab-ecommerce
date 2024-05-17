export const BASE_STATUS = {
  Activated: 1,
  Deactivated: 0
} as const

export type BaseStatus = (typeof BASE_STATUS)[keyof typeof BASE_STATUS]
