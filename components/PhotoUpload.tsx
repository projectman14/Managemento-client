import React, { useState } from 'react'

import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { useEffect } from "react";
import { profileUrl } from '@/appwrite/appwrite.js'

const PhotoUpload = ({ data, setData, error }: any) => {

    const [uploadPhoto, setUploadPhoto] = useState('')
    const [uploadPhotoName, setUploadPhotoName] = useState('')
    const radius = 100;
    const [visible, setVisible] = React.useState(false);
    const [visibleAfter, setVisibleAfter] = React.useState(false);

    useEffect(() => {
        if (uploadPhotoName) {
            setVisibleAfter(true)
            const url = () => {
                setData('')
            }

        } else {
            setVisibleAfter(false)
        }
    }, [uploadPhoto])

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
        let { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const isStyleActive = visible || visibleAfter;

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    const handleProfileSubmit = async (e: any) => {
        const file = e.target.files[0];
        setUploadPhoto(file);
        if (file) {
            setUploadPhotoName(file.name);
        }
    };

    useEffect(() => {
        const updateProfilePic = async () => {
            if (uploadPhoto) {
                const url = await profileUrl(uploadPhoto);
                console.log(url);
                setData(url);
            }
        };

        updateProfilePic();
    }, [uploadPhoto])



    return (
        <motion.div
            style={{
                background: useMotionTemplate`
        radial-gradient(
          ${isStyleActive ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          ${error ? '#dc2626' : 'var(--blue-500)'},
          transparent 80%
        )
      `,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="p-[2px] rounded-lg transition duration-300 group/input"
        >
            <div className='flex flex-col'>
                <label htmlFor='thumbnail' className='cursor-pointer'>
                    <div className='bg-black-100 w-[11rem] h-[3rem] rounded-lg focus:outline-none text-white pl-2 text-sm flex justify-center items-center'>
                        <p className=''>{uploadPhotoName ? uploadPhotoName : 'Upload Thumbnail'}</p>
                    </div>
                </label>

                <input type='file' id='thumbnail' name='thumbnail' className='hidden' onChange={handleProfileSubmit} />
            </div>
        </motion.div>
    )
}

export default PhotoUpload