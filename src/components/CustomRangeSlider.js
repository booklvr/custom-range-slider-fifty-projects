import React, { Fragment, useState, useRef } from 'react'

const MAX = 100
const MIN = 0

const CustomRangeSlider = () => {
  const [percent, setPercent] = useState(50)
  const [leftPosition, setLeftPosition] = useState(110)

  const input = useRef(null)
  const label = useRef(null)

  const handleChange = (e) => {
    setPercent(e.target.value)

    const rangeWidth = getComputedStyle(input.current).getPropertyValue('width')
    const labelWidth = getComputedStyle(label.current).getPropertyValue('width')

    const numWidth = +rangeWidth.substring(0, rangeWidth.length - 2)
    const numLabelWidth = +labelWidth.substring(0, labelWidth.length - 2)

    const left =
      percent * (numWidth / MAX) -
      numLabelWidth / 2 +
      scale([percent], MIN, MAX, 10, -10)

    console.log('rangeWidth', rangeWidth)
    console.log('labelWidth', labelWidth)
    console.log('numWidth', numWidth)
    console.log('numLabelWidth', numLabelWidth)
    console.log('left', left)
    setLeftPosition(left)
  }

  // https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
  const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  }

  return (
    <Fragment>
      <h2>Custom Range Slider</h2>
      <div className='range-container'>
        <input
          ref={input}
          type='range'
          min={MIN}
          max={MAX}
          onChange={(e) => handleChange(e)}
        />
        <label
          ref={label}
          htmlFor='range'
          style={{ left: `${leftPosition}px` }}
        >
          {percent}
        </label>
      </div>
    </Fragment>
  )
}

export default CustomRangeSlider
