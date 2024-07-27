"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { useEffect } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  data: string,
  error : boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, data, error , ...props }, ref) => {
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

    const isStyleActive = visible || visibleAfter || error;

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
        <input
          type={type}
          className={cn(
            `flex h-10 w-full border-none bg-zinc-800 :text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]   focus-visible:var(--blue-500)
           disabled:cursor-not-allowed disabled:opacity-50
           shadow-[var(--blue-500)]
           group-hover/input:shadow-none transition duration-400
           `,
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);
Input.displayName = "Input";

export { Input };
