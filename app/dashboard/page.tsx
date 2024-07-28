"use client"

import React, { useEffect, useState } from 'react'
import { Spotlight } from '@/components/ui/Spotlight'
import { TextGenerateEffect } from '@/components/ui/textgenerateeffect'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/Button'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Avatar from '@/components/Avatar'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useGSAP } from '@gsap/react'
import PhotoUpload from '@/components/PhotoUpload'
import axios from 'axios'
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from 'next/navigation'


type Project = {
    projectName: string;
    githubRepoLink: string;
    thumbnail: string;
    techStack: [];
    liveHostedLink: string;
    creatorId: string;
    _id: string;
};


const Page = () => {

    const router = useRouter()

    const [link, setLink] = useState('')
    const [UpdateLink, setUpdateLink] = useState('')
    const [projectNameError, setprojectNameError] = useState(false)
    const [thumbnailError, setThumbnailError] = useState(false)
    const [githubLinkError, setGithubLinkError] = useState(false)
    const [techStack, setTechStack] = useState('')
    const [updateTechStack, setUpdateTechStack] = useState('')
    const [projects, setProjects] = useState<Project[]>([])
    const [avatarName, setAvatarName] = useState('')

    const [data, setData] = useState({
        projectName: '',
        githubRepoLink: '',
        thumbnail: '',
        liveHostedLink: '',
        techStack: [],
        creatorId: '66a33c3222d9ab749650739e'
    })

    const [updateData, setUpdateData] = useState({
        projectName: '',
        githubRepoLink: '',
        thumbnail: '',
        liveHostedLink: '',
        techStack: [],
        id: ''
    })

    useGSAP(() => {
        gsap.from('#tagline', {
            y: -150,
            duration: 1.5,
        })

        gsap.from('#tagline-para', {
            fontSize: '1rem',
            duration: 2
        })

        gsap.from('#scroll-animation', {
            y: -10,
            yoyo: true,
            repeat: -1,
            ease: 'power1'
        })

        gsap.from('#scroll-animation', {
            opacity: 0,
            duration: 2
        })

        gsap.from('#nav-container', {
            opacity: 0,
            duration: 5
        })

    }, [])

    useEffect(() => {
        if (link) {
            setData((prevData) => {
                return {
                    ...prevData,
                    thumbnail: link
                }
            })
        }

    }, [link])

    useEffect(() => {
        if (link) {
            setUpdateData((prevData) => {
                return {
                    ...prevData,
                    thumbnail: UpdateLink
                }
            })
        }

    }, [UpdateLink])

    useEffect(() => {
        const fetchUSerDetail = async () => {
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
                    setData((prevData) => {
                        return {
                            ...prevData,
                            creatorId: response?.data?.data?._id
                        }
                    })

                    setAvatarName(response?.data?.data?.name)
                }

                console.log(response?.data?.data?._id)


            } catch (err) {
                console.log(err)
            }
        }

        const fetchProjects = async () => {
            try {
                const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/userProjects`

                const response = await axios({
                    method: 'get',
                    url: URL,
                    withCredentials: true
                })

                console.log(response)

                if (response?.data?.logout) {

                }

                if (response?.data?.success) {
                    setProjects(response?.data?.data);
                    console.log(response?.data?.data);
                }


            } catch (err) {
                console.log(err)
            }
        }

        fetchUSerDetail()
        fetchProjects()


    }, [])



    const handleOnChange = (e: any) => {
        const { name, value } = e.target

        setData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })

        const TeachStackArray = stringToArray(techStack)
        setData((prevData: any) => {
            return {
                ...prevData,
                techStack: TeachStackArray
            }
        })

        console.log(TeachStackArray);
    }

    const handleOpenDrawerEditClick = (projectName: string, githubRepoLink: string, liveHostedLink: string, thumbnail: string, techStack: [], id: string) => {
        setLink(thumbnail)

        setUpdateData({
            projectName: projectName,
            githubRepoLink: githubRepoLink,
            thumbnail: thumbnail,
            liveHostedLink: liveHostedLink,
            techStack: techStack,
            id: id
        })
    }

    const handleOnEditChange = (e: any) => {
        const { name, value } = e.target

        setUpdateData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })

    }

    const stringToArray = (input: string): string[] => {
        return input.split(',').map(word => word.trim());
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        console.log(data)


        if (data.projectName === '') {
            setprojectNameError(true)
        } else {
            setprojectNameError(false)
        }

        if (data.githubRepoLink === '') {
            setGithubLinkError(true)
        } else {
            setGithubLinkError(false)
        }

        if (data.thumbnail === '') {
            setThumbnailError(true)
        } else {
            setThumbnailError(false)
        }

        if (!projectNameError && !githubLinkError && !thumbnailError) {
            try {
                const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project-add`

                const response = await axios.post(URL, data)

                if (response?.data?.success) {
                    console.log(response?.data?.data)
                    setData({
                        projectName: '',
                        githubRepoLink: '',
                        thumbnail: '',
                        liveHostedLink: '',
                        techStack: [],
                        creatorId: ''
                    })
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    const handleEditSubmit = async (e: any) => {
        e.preventDefault();

        console.log(updateData)

        const newTechArray = stringToArray(updateTechStack);
        const updatedTechStack = Array.from(new Set([...updateData.techStack, ...newTechArray]));

        const updatedData = {
            ...updateData,
            techStack: updatedTechStack
        };

        console.log(updatedData)


        try {
            const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/edit-project`


            const response = await axios({
                method: 'post',
                url: URL,
                data: updatedData,
                withCredentials: true
            })

            if (response?.data?.success) {
                console.log(response?.data?.data)
                setUpdateData({
                    projectName: '',
                    githubRepoLink: '',
                    thumbnail: '',
                    liveHostedLink: '',
                    techStack: [],
                    id: ''
                })

                const fetchProjects = async () => {
                    try {
                        const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/userProjects`

                        const response = await axios({
                            method: 'get',
                            url: URL,
                            withCredentials: true
                        })

                        console.log(response)


                        if (response?.data?.success) {
                            setProjects(response?.data?.data);
                            console.log(response?.data?.data);
                        }


                    } catch (err) {
                        console.log(err)
                    }
                }

                fetchProjects()
            }
        } catch (err) {
            console.log(err)
        }

    }

    const handleDelete = async (id: string) => {
        try {
            const URL1 = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/delete`

            const response = await axios({
                method: 'post',
                url: URL1,
                data: { id: id },
                withCredentials: true
            })

            if (response?.data?.success) {
                const fetchProjects = async () => {
                    try {
                        const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/userProjects`

                        const response = await axios({
                            method: 'get',
                            url: URL,
                            withCredentials: true
                        })

                        console.log(response)


                        if (response?.data?.success) {
                            setProjects(response?.data?.data);
                            console.log(response?.data?.data);
                        }


                    } catch (err) {
                        console.log(err)
                    }
                }

                fetchProjects()
            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="relative bg-black-100 flex flex-col overflow-x-hidden mx-auto sm:px-10 px-5 h-screen">
            <div className='flex justify-between h-[100vh]' id='nav-container'>
                <div className='mt-8'>
                    <Avatar height={45} width={45} name={avatarName} userId={''} />
                </div>

                <Drawer>
                    <DrawerTrigger>
                        <Button className='flex justify-end mt-8'>
                            <span className='font-poppins inline-flex h-[2.5rem] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none hover:scale-110'>Add Project</span>
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>
                                <div className='w-full flex justify-center'>
                                    <p className='font-poppins uppercase tracking-widest text-xs text-center text-blue-100 max-w-96'>ENTER PROJECT DETAILS TO ADD</p>
                                </div>
                            </DrawerTitle>
                        </DrawerHeader>
                        <div className='mt-5 flex flex-col items-center font-poppins' id='form-container'>
                            <form className="my-8" onSubmit={handleSubmit}>
                                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                    <div className=''>
                                        <Label htmlFor="projectName">Project Name</Label>
                                        <Input id="projectName" name='projectName' placeholder="Managemento" type="text" className='bg-black-100 text-white font-poppins' value={data.projectName} onChange={handleOnChange} data={data.projectName} error={projectNameError} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='label-tag text-white text-sm mb-1 ml-[0.10rem]'>Thumbnail</p>
                                        <PhotoUpload data={link} setData={setLink} error={thumbnailError} />
                                    </div>

                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="githubRepoLink">Github Repo Link</Label>
                                    <Input id="githubRepoLink" name='githubRepoLink' placeholder="https://github.com/projectman14/Managemanto-api" type="text" onChange={handleOnChange} className='bg-black-100 text-white font-poppins' value={data.githubRepoLink} data={data.githubRepoLink} error={githubLinkError} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="liveHostedLink">Live Hosted Link</Label>
                                    <Input id="liveHostedLink" name='liveHostedLink' placeholder="https://vercel.com0/Managemanto" type="text" onChange={handleOnChange} className='bg-black-100 text-white font-poppins' value={data.liveHostedLink} data={data.liveHostedLink} error={false} />
                                </div>
                                <div className="">
                                    <Label htmlFor="techStack">Tech Stack</Label>
                                    <Input
                                        id="techStack"
                                        placeholder="Tech Stack"
                                        type="text" className='bg-black-100 text-white font-poppins'
                                        value={techStack}
                                        onChange={(e: any) => { setTechStack(e.target.value) }}
                                        //@ts-ignore
                                        name='techStack' data={techStack} error={false} />
                                    <p className='text-xs font-semibold text-blue-500 font-poppins text-center'>Apply ',' After Each Technology you write</p>
                                </div>

                                <button
                                    className="bg-gradient-to-br mt-4 relative group/btn from-zinc-900 to-zinc-900  block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] font-poppins"
                                    type="submit"
                                >
                                    Add Project &rarr;
                                </button>

                            </form>
                        </div>
                        <DrawerFooter>
                            <DrawerClose>
                                <Button>
                                    <span className='font-poppins inline-flex h-[2.5rem] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none hover:scale-110'>Cancel</span>
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
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

                    <div className="flex flex-col justify-center items-center relative mt-20 z-10" id='tagline'>
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
                        <div className='mt-[15rem]'>
                            <p className='text-purple font-extrabold italic text-sm font-poppins' id='scroll-animation'>{projects.length == 0 ? 'No Project Found' : 'Scroll Up to See Projects'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${projects.length == 0 ? 'hidden' : 'flex'} justify-center w-full mt-16 -p-12`}>
                <p className="font-poppins uppercase tracking-widest text-xs text-center text-blue-100 max-w-96">
                    Project Tracker Managemento
                </p>
            </div>

            <div className={`flex flex-wrap h-[100vh] mt-12 ${projects.length > 2 ? 'justify-start' : projects.length == 1 ? 'justify-center' : 'justify-around'}`}>
                {projects.map((project, index) => (
                    <CardContainer key={index} className="inter-var">
                        <CardBody className=" relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black-100 border-purple w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-white text-center flex justify-center w-full"
                            >
                                {project.projectName}
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <Image
                                    src={project.thumbnail}
                                    height="1000"
                                    width="1000"
                                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                    alt="thumbnail"
                                />
                            </CardItem>
                            <CardItem translateZ="100" className={`w-full mt-4 flex flex-wrap justify-center`}>
                                {project.techStack.map((tech, i) => (
                                    <div
                                        className='w-[5rem] text-white-200 font-poppins italic text-xs rounded-lg mt-5'
                                        key={i}
                                    >
                                        <p>{tech}</p>
                                    </div>
                                ))}
                            </CardItem>
                            <div className="flex justify-between items-center mt-8">
                                <CardItem
                                    translateZ={20}
                                    as={Link}
                                    href={project.githubRepoLink}
                                    target="__blank"
                                    className="px-4 py-2 rounded-xl text-xs font-normal text-white"
                                >
                                    Try now →
                                </CardItem>

                                <CardItem
                                    translateZ={20}
                                    as={'button'}
                                    href={project.liveHostedLink}
                                    target="__blank"
                                    className={` px-4 py-2 rounded-xl text-xs font-normal text-white ${project.liveHostedLink === '' ? 'cursor-not-allowed' : 'cursor-pointer'}`}

                                >
                                    <a href={project.liveHostedLink} target="_blank"><button disabled={project.liveHostedLink === ''} className={`${project.liveHostedLink === '' ? 'cursor-not-allowed' : ''}`}>Live Link →</button></a>
                                </CardItem>

                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    target="__blank"
                                    className="px-4 py-2 rounded-xl text-xs font-normal text-white"
                                    onClick={() => {
                                        handleDelete(project._id)
                                    }}
                                >
                                    Delete Project
                                </CardItem>

                                <Drawer>
                                    <DrawerTrigger>
                                        <CardItem
                                            translateZ={20}
                                            as="button"
                                            className="px-4 py-2 rounded-xl bg-white text-black  text-xs font-bold"
                                            onClick={() => {
                                                handleOpenDrawerEditClick(project.projectName, project.githubRepoLink, project.liveHostedLink, project.thumbnail, project.techStack, project._id)
                                            }}
                                        >
                                            Edit
                                        </CardItem>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader>
                                            <DrawerTitle>
                                                <div className='w-full flex justify-center'>
                                                    <p className='font-poppins uppercase tracking-widest text-xs text-center text-blue-100 max-w-96'>ENTER DETAIL TO EDIT</p>
                                                </div>
                                            </DrawerTitle>
                                        </DrawerHeader>
                                        <div className='mt-5 flex flex-col items-center font-poppins' id='form-container'>
                                            <form className="my-8" onSubmit={handleEditSubmit}>
                                                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                                    <div className=''>
                                                        <Label htmlFor="projectName">Project Name</Label>
                                                        <Input id="projectName" name='projectName' placeholder="Managemento" type="text" className='bg-black-100 text-white font-poppins' disabled value={updateData.projectName} onChange={handleOnEditChange} data={updateData.projectName} error={false} />
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <p className='label-tag text-white text-sm mb-1 ml-[0.10rem]'>Thumbnail</p>
                                                        <PhotoUpload data={UpdateLink} setData={setUpdateLink} error={false} />
                                                    </div>

                                                </div>
                                                <div className="mb-4">
                                                    <Label htmlFor="githubRepoLink">Github Repo Link</Label>
                                                    <Input id="githubRepoLink" name='githubRepoLink' placeholder="https://github.com/projectman14/Managemanto-api" type="text" onChange={handleOnEditChange} className='bg-black-100 text-white font-poppins' value={updateData.githubRepoLink} data={updateData.githubRepoLink} error={false} />
                                                </div>
                                                <div className="mb-4">
                                                    <Label htmlFor="liveHostedLink">Live Hosted Link</Label>
                                                    <Input id="liveHostedLink" name='liveHostedLink' placeholder="https://vercel.com0/Managemanto" type="text" onChange={handleOnEditChange} className='bg-black-100 text-white font-poppins' value={updateData.liveHostedLink} data={updateData.liveHostedLink} error={false} />
                                                </div>
                                                <div className="">
                                                    <Label htmlFor="techStack">Tech Stack</Label>
                                                    <Input
                                                        id="techStack"
                                                        placeholder="Tech Stack"
                                                        type="text" className='bg-black-100 text-white font-poppins'
                                                        value={updateTechStack}
                                                        onChange={(e: any) => { setUpdateTechStack(e.target.value) }}
                                                        //@ts-ignore
                                                        name='techStack' data={updateTechStack} error={false} />
                                                    <p className='text-xs font-semibold text-blue-500 font-poppins text-center'>Apply ',' After Each Technology you write</p>
                                                </div>

                                                <button
                                                    className="bg-gradient-to-br mt-4 relative group/btn from-zinc-900 to-zinc-900  block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] font-poppins"
                                                    type="submit"
                                                >
                                                    Edit Project &rarr;
                                                </button>
                                            </form>
                                        </div>
                                        <DrawerFooter className='flex justify-center'>
                                            <div className='flex justify-center items-center'>
                                                <DrawerClose>
                                                    <Button>
                                                        <span className='font-poppins max-w-[15rem] inline-flex h-[2.5rem] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none hover:scale-110'>Cancel</span>
                                                    </Button>
                                                </DrawerClose>
                                            </div>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                            </div>
                        </CardBody>
                    </CardContainer>
                ))}
            </div>
        </main>
    )
}

export default Page
