export type Ordinal = { 
  x: number, 
  y: number
}

export type AsteroidModel = {
  h: number
  w: number
  x: number
  y: number
  sheet: Sheet 
}

export type Sheet = {
  img?: string
  x: number
  y: number
  w: number
  h: number
  fQty?: number
}

export type Limits = {
  t: number
  r: number
  b: number
  l: number
}

export type MineralModel = {
  type: string
  name: string
  chance: number[]
  sheet: Sheet
}

export type ClientModel = {
  id: string
  requiredXp: number
  period: number
  timeShopping: number
  sheet: Sheet
}

export type LibraryItem = {
  [key: string]: string 
}

export type ItemAccount = { 
  type: string
  qty: number
}

export type MineralPrice = { 
  type: string
  price: number
}
