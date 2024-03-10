import { RangeInput } from '../../component/RangeInput.jsx'
import { useState } from 'react'

export function BrightnessAndContrast() {
  const [brightness, setBrightness] = useState(0)
  const [contrast, setContrast] = useState(10)

  const onBrightnessChange = (e) => {
    const value = e.target.value
    setBrightness(value)
  }
  const onContrastChange = (e) => {
    const value = e.target.value
    setContrast(value)
  }
  return (
    <div>
      <div>
        <label>Brightness</label>：<RangeInput onChange={onBrightnessChange} value={brightness}/>
      </div>
      <div>
        <label>Contrast</label>：<RangeInput onChange={onContrastChange} value={contrast}/>
      </div>
    </div>
  )
}
