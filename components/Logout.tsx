"use client"

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

const Logout = ({ setLogoutVisible } : any) => {

    const router = useRouter()

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('#updateBox', {
            opacity: 0,
            y: -800,
            duration: 1
        })

        tl.from('#steps', {
            y: 800,
            duration: 0,
            ease: 'bounce'
        })

    }, [])

    const handleLogOut = async () => {
        try {
            const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/logout`

            const response = await axios({
                method: 'post',
                url: URL,
                withCredentials: true
            })

            if(response?.data?.success){
                router.push('/login')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="bg-black flex h-[40vh] w-[22vw] fixed top-[25%] left-[40%] rounded-2xl flex-col z-50" id='updateBox'>
            <div id='steps' className='mt-5'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex mb-8'>
                        <p className='text-white font-poppins font-semibold italic text-sm'>Managemento</p>
                    </div>
                    <div>
                        <p className='text-white font-poppins font-medium italic text-xs'>Are you sure you want to logout</p>
                    </div>

                    <Button className='flex justify-center mt-8 cursor-pointer' onClick={handleLogOut}>
                        <span className='font-poppins inline-flex h-[2.5rem] w-[10rem] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none hover:scale-110'>Logout</span>
                    </Button>

                    <Button className='flex justify-center -mt-4 cursor-pointer' onClick={() =>  setLogoutVisible()}>
                        <span className='font-poppins inline-flex h-[2.5rem] w-[10rem] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none hover:scale-110'>Cancel</span>
                    </Button>
                </div>


            </div>
        </div>
    )
}

export default Logout