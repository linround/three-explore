import { useState } from 'react'

export function useSortData(data) {
  const [value, setValue] = useState(data)
  const handleSort = (key) => {
    console.log(key)
    data.sort((a, b) => a[key].localeCompare(b[key]))
    setValue(data)
  }
  return { value, handleSort, }

}


export function useFilter(data) {
  const [filterData, setValue] = useState(data)
  const handleFilter = (words) => {
    const newData = data.filter((item) => item.name.includes(words))
    setValue(newData)
  }
  return { filterData, handleFilter, }

}
