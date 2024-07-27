"use client"

import React, { useEffect, useState } from 'react'
import { Spotlight } from './ui/Spotlight'
import { TextGenerateEffect } from './ui/textgenerateeffect'
import { Button } from './ui/Button'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/navigation'

const Hero = () => {

    const [showBtn, setShowBtn] = useState(false)
    const [detectClick, setDetectClick] = useState(false)

    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            setShowBtn(true)
        }, 1500)
    }, [])

    useEffect(() => {
        if (detectClick) {
            gsap.to('#text-revel', {
                x: 1200,
                duration: 1.5
            })
            gsap.to('#btn-auth', {
                x: -1000,
                duration: 2
            })
        }
    }, [detectClick])

    useGSAP(() => {
        gsap.from('#btn-auth', {
            opacity: 0,
            duration: 2,
            y: 500
        })
    }, [])

    const handleClick = () => {
        setDetectClick(true)
        setTimeout(() => {
            router.push('/register')
        }, 900)
    }


    return (
        <div className='pb-20 pt-36 h-[100vh]'>
            <div>
                <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20' fill='white' animate={true}/>
                <Spotlight className='top-10 left-full h-[80vh] w-[50vw]' fill='purple' animate={true}/>
                <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill='blue' animate={true}/>
            </div>

            <div
                className="h-screen w-full  
       absolute top-0 left-0 flex items-center justify-center"
            >
                <div
                    className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
                />
            </div>

            <div className="flex justify-center relative my-20 z-10">
                <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[50vw] flex flex-col items-center justify-center">
                    <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80 font-poppins">
                        Project Tracker Managemento
                    </p>
                    <div id='text-revel'>
                        <TextGenerateEffect
                            words="Most Efficient concept of tracking projects"
                            className="text-center text-[40px] md:text-5xl lg:text-6xl lg:text-[3.30rem] font-poppins "
                        />
                    </div>
                    <div id='btn-auth'>
                        <Button className='flex justify-center mt-16' onClick={handleClick}>
                            <button className={`${showBtn ? '' : 'hidden'} font-poppins inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none hover:scale-110`}>
                                Sign up
                            </button>
                        </Button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Hero