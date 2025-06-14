import React from 'react'
interface FollowPointerProps {
  info: { name: string; email: string; avatar: string };
  x?: number;
  y?: number;
  connectionId: number;
}
import {motion} from 'framer-motion';
function stringToColor(str: string) {
    let hash = 0;   
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
}
function FollowPointer({ info, x = 0, y = 0, connectionId }: FollowPointerProps) {
    const color = stringToColor(info.email || '1');
  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke={color}
        fill={color}
        strokeWidth="1"
        viewBox="0 0 16 16"
        className={`h-6 w-6 text-[${color}] transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-[${color}]`}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 ...z"></path>
      </svg>
      <motion.div>{info?.name || info?.email}</motion.div>
    </motion.div>
  );
}

export default FollowPointer
