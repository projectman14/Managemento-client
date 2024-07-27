import React from 'react';

interface AvatarProps {
    userId: string;
    name?: string;
    imageUrl?: string;
    width: number;
    height: number;
}

const Avatar: React.FC<AvatarProps> = ({ userId, name, imageUrl, width, height }) => {

    let avatarName = "";

    if (name) {
        const splitName = name.split(" ");

        if (splitName.length > 1) {
            avatarName = splitName[0][0] + splitName[1][0];
        } else {
            avatarName = splitName[0][0];
        }
    }

    const bgColor = [
        'bg-slate-200',
        'bg-red-200',
        'bg-gray-200',
    ];

    const randomNumber = Math.floor(Math.random() * bgColor.length);

    return (
        <div className={`text-slate-800 rounded-full font-bold relative`} style={{ width: width + "px", height: height + "px" }}>
            {
                imageUrl ? (
                    <img
                        src={imageUrl}
                        width={width}
                        height={height}
                        alt={name}
                        className='overflow-hidden rounded-full'
                    />
                ) : (
                    name ? (
                        <div style={{ width: width + "px", height: height + "px" }} className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`}>
                            {avatarName}
                        </div>
                    ) : (
                        <div className={`w-${width} h-${height} rounded-full`}></div>
                    )
                )
            }

        </div>
    );
}

export default Avatar;
