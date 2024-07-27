"use client"

import React, { useEffect, useState } from 'react'
import { Spotlight } from '@/components/ui/Spotlight'
import { TextGenerateEffect } from '@/components/ui/textgenerateeffect'
import { Button } from '@/components/ui/Button'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const page = ({ params }: any) => {

    const [showBtn, setShowBtn] = useState(false)
    const [detectClick, setDetectClick] = useState(false)
    const [checkExpire, setCheckExpire] = useState(false)
    const [checkLink, setCheckLink] = useState(false)
    const [checkVerified, setCheckVerified] = useState(false)

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

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = params.usertoken;
            const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/userDetails`;

            const payload = {
                token: token
            };

            try {
                const response = await axios({
                    method: 'post',
                    url: URL,
                    data: payload,
                    withCredentials: true
                });
                console.log(response?.data?.message);
                if (response?.data?.data?.isVerified === true) {
                    setCheckVerified(true);
                }
            } catch (err: any) {
                console.log(err?.response?.data?.message);

                if (err?.response?.data?.message == 'invalid signature') {
                    setCheckLink(true)
                    console.log('HI Link')
                } else {
                    if (err?.response?.data?.message == 'jwt expired') {
                        setCheckExpire(true);
                        console.log('HI EXP')
                    }
                }
            }
        };

        fetchUserDetails();
    }, []);

    const handleClick = async () => {
        const token = params.usertoken
        console.log(token)

        const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/verify-email/${token}`

        try {
            const response = await axios({
                method: 'post',
                url: URL,
                withCredentials: true
            });;

            if (response?.data?.success) {
                console.log(response?.data?.tokendata)
                console.log(response);
            }
        } catch (err: any) {
            console.log(err?.response?.data?.message)
        }
    }

    return (
        <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
            <div className="max-w-7xl w-full">
                <div className='pb-20 pt-36 h-[100vh]'>
                    <div>
                        <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20' fill='white' animate={true} />
                        <Spotlight className='top-10 left-full h-[80vh] w-[50vw]' fill='purple' animate={true} />
                        <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill='blue' animate={true} />
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
                        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
                            <p className="font-poppins uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
                                Project Tracker Managemento
                            </p>
                            <div id='text-revel'>
                                <TextGenerateEffect
                                    words="Click verify user button to verify yourself"
                                    className="text-center text-[40px] md:text-5xl lg:text-6xl lg:text-[3.30rem] font-poppins"
                                />
                            </div>
                            <div id='btn-auth'>
                                <Button className={`flex justify-center mt-16`} onClick={handleClick} >
                                    <button className={`${showBtn ? '' : 'hidden'} ${!checkLink ? checkExpire ? ' cursor-not-allowed' : !checkVerified ? '' : 'cursor-not-allowed' : ' cursor-not-allowed'} inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none hover:scale-110 font-poppins`} disabled={checkExpire || checkLink || checkVerified}>
                                        {!checkLink ? checkExpire ? 'Link Expired' : !checkVerified ? 'Verify user' : 'Already Verified' : 'Invalid Link'}
                                    </button>
                                </Button>
                            </div>
                        </div>
                    </div>

                </div >
            </div>
        </main>
    )
}

export default page