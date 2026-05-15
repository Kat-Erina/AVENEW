import React from 'react'

const RequestCallBtn = ({text , background, onClick }) => {
  return (
    <button  onClick={onClick} className={`tracking-tight uppercase font-normal  border border-white text-lg max-w-60 md:text-2xl md:max-w-80 py-3 w-full z-10 ${background} hover:scale-105 transition-all duration-200 cursor-pointer text-white `}>
       {text}
    </button>
  )
}

export default RequestCallBtn