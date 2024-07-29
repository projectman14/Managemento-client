"use client"

import React from 'react'
import { Spotlight } from '@/components/ui/Spotlight'
import { TextGenerateEffect } from '@/components/ui/textgenerateeffect'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const Page = () => {

  useGSAP(() => {
    gsap.from('#tagline', {
      y: -150,
      duration: 1.5,
    })

    gsap.from('#tagline-para', {
      fontSize: '1rem',
      duration: 2
    })

  }, [])

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
            <div className="max-w-7xl w-full">
                <div className='pb-20 pt-36 h-[100vh]'>
                    <div>
                        <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20' fill='white' animate={false} />
                        <Spotlight className='top-10 left-full h-[80vh] w-[50vw]' fill='purple' animate={false} />
                        <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill='blue' animate={false} />
                    </div>

                    <div
                        className="h-screen w-full  
       absolute top-0 left-0 flex items-center justify-center"
                    >
                        <div
                            className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
                        />
                    </div>

                    <div className="flex justify-center relative my-20 z-10" id='tagline'>
                        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
                            <p id='tagline-para' className="font-poppins uppercase tracking-widest text-xs text-center text-blue-100 max-w-96">
                                Project Tracker Managemento
                            </p>
                            <div id='text-revel'>
                                <TextGenerateEffect
                                    words="Click on the link we have sent you in the email to verify yourself."
                                    className="text-center text-[40px] md:text-5xl lg:text-6xl lg:text-[3.30rem] font-poppins"
                                />
                            </div>
                        </div>
                    </div>

                </div >
            </div>
        </main>
  )
}

export default Page