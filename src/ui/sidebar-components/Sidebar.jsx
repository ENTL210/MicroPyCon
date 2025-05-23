import styled from "styled-components";
import { motion } from "motion/react";
import DirectoryTab from "./directory/DirectoryTab";
import { memo } from "react";
import { useSelector } from "react-redux";
import ToolsTab from "./ToolsTab";

function Sidebar({ sidebarWidth }) {
    const Sidebar = styled(motion.div)`
    position: relative;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    color:black;
    display: flex;
    justify-content: flex-start;
    overflow-x: scroll;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    font-weight: 700;
    overflow-y: hidden;

    &::-webkit-scrollbar {
        width: 8px; /* Width of the vertical scrollbar */
        height: 12px; /* Height of the horizontal scrollbar */
        padding: 0;
        display: block; /* Ensure it's always visible if content overflows */
    }

    &::-webkit-scrollbar-track {
        background: rgba(30, 30, 30, 0.5); /* Darker track background */
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(90, 90, 90, 0.7); /* Dark grey thumb */
        background-clip: padding-box; /* Ensures border doesn't cut into background-color */
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: rgba(120, 120, 120, 0.9); /* Lighter thumb on hover */
    }
    `

    const directoriesArr = useSelector(state => state.directories.directoriesArr)


    return (
        <Sidebar
            initial={{
                width: '0px',
                padding: '0px'
            }}
            animate={{
                width: (directoriesArr.length > 0) ? sidebarWidth : '0px'
            }}
        >
            <DirectoryTab sidebarWidth={sidebarWidth} />
            <ToolsTab sidebarWidth={sidebarWidth} />
        </Sidebar>
    )
}

export default Sidebar
