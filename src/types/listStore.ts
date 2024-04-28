export interface ILists {
  id: number
  count: number
  color: string
  checked: boolean
}

export interface IListColors {
  name: string
  shuffle: boolean
  showSubTree: boolean
  data: ILists[]
}
