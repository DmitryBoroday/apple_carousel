'use client'

import { useState } from 'react'
import {motion, MotionConfig, AnimatePresence} from 'framer-motion'
import Left from '../public/left.svg'
import Right from '../public/right.svg'

const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg']

function Carousel() {
    const [current, setCurrent] = useState(0)
    const [isFocuse, setIsFocuse] = useState(false)

    const onPrevClick = () => {
        if (current > 0) {
            setCurrent(current - 1)
        }
    }
    const onNextClick = () => {
        if (current < images.length - 1) {
            setCurrent(current + 1)
        }
    }
    
    return (
        <MotionConfig
            transition={{
                duration: 0.7,
                ease: [0.32, 0.72, 0 , 1]
          }}
        >
        <div className='relative w-full max-w-[14apple00px] flex items-center'>
                <AnimatePresence>
        {isFocuse && (
                    <motion.div
                        className='absolute left-2 right-2 flex justify-between z-10'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onHoverStart={()=> setIsFocuse(true)}        
                        onHoverEnd={()=> setIsFocuse(false)} 
                    >
              <button onClick={onPrevClick}>
                  <Left className='w-8 h-8'/>
              </button>
              <button onClick={onNextClick}>
                  <Right className='w-8 h-8'/>
              </button>
          </motion.div>
           )}
         </AnimatePresence>
         <motion.div
            className='flex gap-4 flex-nowrap'
            animate={{ x: `calc(-${current * 100}% - ${current}rem)` }}
            onHoverStart={()=> setIsFocuse(true)}        
            onHoverEnd={()=> setIsFocuse(false)}        
          >
          {[...images].map((image, idx) => (
            <motion.img
              key={idx}
              src={image}
              alt={image}
              animate={{opacity: idx === current ? 1 : 0.3}}
              className='object-cover aspect-[16/9]'
            />
          ))}
                </motion.div>
                <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10'>
                    <div className='flex gap-3 px-3 py-2 bg-gray-400 rounded-full opacity-80'>
                        {[...images].map((_, idx) => (
                            <button
                                key={idx}
                                onClick={()=> setCurrent(idx)}
                            >
                                <div className={`w-2 h-2 rounded-full ${idx === current ? 'bg-white' : 'bg-zinc-600'}`}></div>
                            </button>
                        ))}
                    </div>
                </div>
        </div>
      </MotionConfig>
  )
}

export default Carousel
