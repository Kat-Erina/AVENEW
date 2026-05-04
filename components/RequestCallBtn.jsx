import React from 'react'

const RequestCallBtn = ({text , background}) => {
  return (
    <button className={`border border-white text-2xl max-w-80 py-3 w-full z-10 ${background}`}>
       {text}
    </button>
  )
}

export default RequestCallBtn