import { useCounter } from './useCounter.js'
import { useEffect, useState } from 'react'
import { useFilter, useSortData } from './tableHooks.js'


/**
 * 这是一个table组件
 * 点击表头可进行排序
 * 输入关键字可进行过滤搜索
 * */
function TableDataComponent() {
  const tableData = [
    { name: '张三', age: '18', },
    { name: '张三7', age: '24', },
    { name: '六三姐', age: '45', },
    { name: '李四', age: '23', },
    { name: 'tom', age: '32', },
    { name: 'dare', age: '3', }
  ]
  const { value, handleSort, } = useSortData(tableData)
  const { filterData, handleFilter, } = useFilter(value)
  const inputEvent = (e) => {
    console.log(e)
    handleFilter(e.target.value)
  }




  return (

    <>
      <input onInput={inputEvent}  />
      <table>
        <thead>
          <tr>

            {Object.keys(tableData[0])
              .map((key, index) => (
                <th key={index} onClick={(() => handleSort(key))}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>

          {filterData.map((data, index1) => (
            <tr key={index1}>
              {
                Object.keys(tableData[0])
                  .map((key, index2) => (
                    <td key={index2}>{data[key]}</td>
                  ))
              }
            </tr>
          ))}
        </tbody>

      </table>
    </>
  )
}


export function CustomHook() {
  const {
    count,
    increment,
    decrement,
    reset,
  } = useCounter(1)

  const [state, setState] = useState('偶数')
  useEffect(() => {
    if (count % 2 === 0) {
      setState('偶数')
    } else {
      setState('奇数')
    }
  }, [count])

  return (
    <>
      <div>count:{count} </div>
      <div>{state}</div>
      <div>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
        <button onClick={reset}>reset</button>
      </div>

      <div>使用自定义钩子对表格进行排序</div>
      <div>点击表头即可排序</div>
      <TableDataComponent></TableDataComponent>
    </>
  )
}
