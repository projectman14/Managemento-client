"use client"

import React, { useEffect, useState } from 'react'
import { Spotlight } from '@/components/ui/Spotlight'
import Link from 'next/link'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';

const page = () => {

    const router = useRouter()

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const [passError, setPassError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [endAnimation, setEndAnimation] = useState(false)

    useGSAP(() => {
        gsap.to('#tagline', {
            y: -150,
            duration: 1,
        })

        gsap.to('#tagline-para', {
            fontSize: '1rem',
            duration: 1
        })

        gsap.from('#form-container', {
            opacity: 0,
            duration: 3
        })
    }, [])

    useGSAP(() => {
        if (endAnimation) {
            gsap.to('#form-container', {
                y: 1000,
                duration: 1.5
            })
        }
    }, [endAnimation])

    useEffect(() => {

        const domain = process.env.NEXT_PUBLIC_DOMAIN_SPECIFIC || '';

        if (!data.email.endsWith(domain) && data.email !== '') {
            setEmailError(true)
        } else {
            setEmailError(false)
        }

    }, [data])


    const handleOnChange = (e: any) => {
        const { name, value } = e.target

        setData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })

        setPassError(false)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let errorCheck = false;


        if (!emailError && !passError && !errorCheck) {
            const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/email`

            const payLoad = {
                email: data.email
            }

            try {
                const response = await axios.post(URL, payLoad);
                console.log(response?.data?.message);

                if (response?.data?.success) {
                    // toast.success(response?.data?.message)
                    try {
                        const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/password`

                        const newPayload = {
                            userId: response?.data?.data?._id,
                            password: data.password
                        }

                        const newResponse = await axios({
                            method: 'post',
                            url: URL,
                            data: newPayload,
                            withCredentials: true
                        })

                        if (newResponse?.data?.success) {
                            console.log(newResponse?.data?.message)
                            toast.success(response?.data?.message)
                            setData({
                                email: '',
                                password: '',
                            })
                            setTimeout(() => router.push('/dashboard'), 1000)
                        } else {
                            setPassError(true)
                            toast.error(response?.data?.message)
                        }
                    } catch (err: any) {
                        console.log(err)
                        toast.error(err?.response?.data?.message)
                        setPassError(true)
                    }
                }else{
                    toast.error(response?.data?.message)
                }
            } catch (err: any) {
                console.log(err?.response?.data?.message)
                toast.error(err?.response?.data?.message)
            }
        }

    };

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

                    <div className="flex flex-col items-center relative my-20 z-10" id='tagline'>
                        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
                            <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-96 font-poppins" id='tagline-para'>
                                Project Tracker Managemento
                            </p>
                        </div>

                        <div className='mt-5 flex flex-col items-center font-poppins' id='form-container'>
                            <form className="my-8" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" name='email' placeholder="projectmanagemento@lnmiit.ac.in" type="email" onChange={handleOnChange} className='bg-black-100 text-white font-poppins w-[15rem]' value={data.email} data={data.email} error={emailError} />
                                    {emailError && <p className='text-red-600 text-center text-xs italic'>Email Must be of LNMIIT</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" name='password' placeholder="••••••••" type="password" onChange={handleOnChange} className='bg-black-100 text-white font-poppins w-[15rem]' value={data.password} data={data.password} error={passError} />
                                    {passError && <p className='text-red-600 text-center text-xs italic'>Incorrect Password</p>}
                                </div>
                                <button
                                    className="bg-gradient-to-br mt-4 relative group/btn from-zinc-900 to-zinc-900  block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] font-poppins"
                                    type="submit"
                                >
                                    Login &rarr;
                                </button>

                                <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                            </form>
                        </div>
                    </div>

                </div >
            </div>
            <Toaster />
        </main>

    )
}


export default page

