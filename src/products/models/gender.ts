export const GENDER = {
  MALE: 1,
  FEMALE: 2,
  BOTH: 3
} as const

export type Gender = (typeof GENDER)[keyof typeof GENDER]
