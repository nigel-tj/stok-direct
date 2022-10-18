export interface IUSState {
  code: string
  name: string
}
export function USStateFilter(value: string): IUSState[] {
  return USStates.filter((state) => {
    return (
      (state.code.length === 2 && state.code.toLowerCase() === value.toLowerCase()) ||
      state.name.toLowerCase().indexOf(value.toLowerCase()) === 0
    )
  })
}
const USStates = [
  { code: 'AK', name: 'Alaska' },
  { code: 'AL', name: 'Alabama' },
  { code: 'WY', name: 'Wyoming' },
]
