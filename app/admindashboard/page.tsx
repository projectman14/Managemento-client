"use client"

import React, { useEffect, useState } from 'react'
import { Spotlight } from '@/components/ui/Spotlight'
import { TextGenerateEffect } from '@/components/ui/textgenerateeffect'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/Button'
import Avatar from '@/components/Avatar'
import { useGSAP } from '@gsap/react'
import axios from 'axios'
import Link from "next/link";
import { useRouter } from 'next/navigation'
import Logout from '@/components/Logout'

const Page = () => {

    const [userData, setUserData] = useState([])
    const router = useRouter()
    const [isAdmin , setIsAdmin] = useState(true)
    const [logout, setLogout] = useState(false)

    useGSAP(() => {
        gsap.from('#tagline', {
            y: -150,
            duration: 1.5,
        })

        gsap.from('#tagline-para', {
            fontSize: '1rem',
            duration: 2
        })

        gsap.from('#nav-container', {
            opacity: 0,
            duration: 3
        })

    }, [])

    useEffect(() => {
        const fetchUSerDetail = async () => {
            try {
                const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/allusersdata`

                const response = await axios({
                    method: 'get',
                    url: URL,
                    withCredentials: true
                })

                console.log(response)

                if (response?.data?.error) { }


                if (response?.data?.success) {
                    setUserData(response?.data?.data)
                }

                console.log(response?.data?.data)


            } catch (err) {
                console.log(err)
            }
        }
        fetchUSerDetail()

        const fetchActiveUserDetail = async () => {
            try {
                const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login-verificaton`

                const response = await axios({
                    method: 'post',
                    url: URL,
                    withCredentials: true
                })

                console.log(response)

                if (response?.data?.data?.logout) {
                    router.push('/login')
                }

                if (response?.data?.success) {
                    if(response?.data?.data?.userType === 'Student'){
                        setIsAdmin(false)
                        router.push('/dashboard')
                    }
                }

                console.log(response?.data?.data?._id)


            } catch (err) {
                console.log(err)
            }
        }

        fetchActiveUserDetail()
    }, [])



    return (
        <main className="relative bg-black-100 flex flex-col overflow-x-hidden mx-auto sm:px-10 px-5 h-screen">
            <div className='flex justify-between ' id='nav-container'>
                <div className='mt-8 z-50 cursor-pointer' onClick={() => setLogout(true)}>
                    <Avatar height={45} width={45} name='Lakshya Jain' userId={''} />
                </div>
                <Button className='flex justify-end mt-8 cursor-pointer' onClick={() => router.push('/dashboard')}>
                    <span className='font-poppins inline-flex h-[2.5rem] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none hover:scale-110'>User Dashboard</span>
                </Button>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
                <div className=''>
                    <div>
                        <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20' fill='white' animate={false} />
                        <Spotlight className='top-10 left-full h-[80vh] w-[50vw]' fill='purple' animate={false} />
                        <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill='blue' animate={false} />
                    </div>

                    <div
                        className="h-screen w-full absolute top-0 left-0 flex items-center justify-center"
                    >
                        <div
                            className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
                        />
                    </div>

                    <div className={`flex flex-col justify-center items-center relative mt-20 z-10 hidden`} id='tagline'>
                        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
                            <p id='tagline-para' className="font-poppins uppercase tracking-widest text-xs text-center text-blue-100 max-w-96">
                                Project Tracker Managemento
                            </p>
                            <div id='text-revel'>
                                <TextGenerateEffect
                                    words="Most Efficient concept of tracking projects"
                                    className="text-center text-[40px] md:text-5xl lg:text-6xl lg:text-[3.30rem] font-poppins"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <div className='flex justify-around'>
                    <p className="font-poppins uppercase tracking-widest text-xs text-center pl-12 text-blue-100 w-32 italic font-semibold hidden md:flex">
                        Name
                    </p>
                    <p className="font-poppins uppercase tracking-widest text-xs text-center text-blue-100 w-32 italic font-semibold lg:ml-12">
                        Email
                    </p>
                    <p className={`hidden lg:flex font-poppins uppercase tracking-widest text-xs lg: ml-4 text-blue-100 w-32 italic font-semibold`}>
                        UserType
                    </p>
                    <p className="font-poppins uppercase tracking-widest text-xs md:pl-10 lg:pl-4 text-blue-100 w-32 italic font-semibold hidden md:flex">
                        Verified
                    </p>
                    <p className="font-poppins uppercase tracking-widest text-xs  text-center text-blue-100 w-32 italic font-semibold md:pl-12 lg:pl-0">
                        Check Profile
                    </p>
                </div>
                {userData.map((data: any, index) => (
                    <div className='flex justify-around mt-8 z-50' key={index}>
                        <p className="font-poppins uppercase tracking-widest text-xs text-center text-blue-100 w-32 italic font-semibold hidden md:flex">
                            {data.name}
                        </p>
                        <p className="font-poppins lg:pl-5 tracking-widest text-xs text-center text-blue-100 w-32 italic font-semibold">
                            {data.email}
                        </p>
                        <p className="font-poppins uppercase tracking-widest text-xs text-center lg:pl-8 text-blue-100 w-32 italic font-semibold hidden md:flex">
                            {data.userType}
                        </p>
                        <p className="font-poppins  tracking-widest text-xs text-center text-blue-100 w-32 lg:pl-12 italic font-semibold hidden md:flex">
                            {String(data.isVerified)}
                        </p>
                        <p className="font-poppins  tracking-widest text-xs text-center pl-4 text-black-100 w-32 italic cursor-pointer font-semibold ">
                            <button className='bg-white rounded-lg h-[1.5rem] px-2 pt-1 pb-2 text-center cursor-pointer' onClick={() => router.push(`/admindashboard/${data._id}`)}>
                                Check Profile
                            </button>
                        </p>
                    </div>
                ))}
            </div>

            <div>
                {logout && <Logout setLogoutVisible={() => setLogout(false)} />}
            </div>
        </main>
    )
}

export default Page
