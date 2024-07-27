import { useEffect, useState } from 'react';
import * as React from "react";
import styles from './DropdownInput.module.css';
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

type Option = {
    value: string;
    label: string;
};

type DropdownInputProps = {
    options: Option[];
    placeholder: string;
    onSelect: (option: Option) => void;
    data : string;
    error : boolean;
};

const DropdownInput: React.FC<DropdownInputProps> = ({ options, placeholder, onSelect , data , error}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onSelect) onSelect(option);
    };

    const radius = 100;
    const [visible, setVisible] = React.useState(false);
    const [visibleAfter, setVisibleAfter] = React.useState(false);

    useEffect(() => {
      if (data) {
        setVisibleAfter(true)
      } else {
        setVisibleAfter(false)
      }
    }, [data])

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
        let { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const isStyleActive = visible || visibleAfter;
    
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
            <div className={`${styles.dropdown} bg-black-100  rounded-lg text-sm ${selectedOption ? 'text-white' : 'text-neutral-600'}`}>
                <div className={styles.dropdownHeader} onClick={() => setIsOpen(!isOpen)}>
                    {selectedOption ? selectedOption.label : placeholder}
                    <span className={`${styles.arrow} ${isOpen ? styles.open : ''} text-sm`}>▼</span>
                </div>
                {isOpen && (
                    <div className={`${styles.dropdownList} bg-black-100 text-white`}>
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={styles.dropdownListItem}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default DropdownInput;
