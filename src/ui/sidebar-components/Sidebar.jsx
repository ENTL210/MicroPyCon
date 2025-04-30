import styled from "styled-components";
import { motion } from "motion/react";
import DirectoryTab from "./directory/DirectoryTab";
import { memo } from "react";
import { useSelector } from "react-redux";

function Sidebar({sidebarWidth}) {
    const Sidebar = styled(motion.div)`
    position: relative;
    margin: 50px 0px 7.5px 0;
    padding:5px;
    color:black;
    display: flex;
    justify-content: flex-start;
    overflow-x: scroll;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    font-weight: 700;
    `

    const directoriesArr = useSelector(state => state.directories.directoriesArr)


    return(
        <Sidebar
        initial={{
            width: '0px',
            padding: '0px'
        }}
        animate={{
            width: (directoriesArr.length > 0) ? sidebarWidth : '0px'
        }}
        >
            <DirectoryTab sidebarWidth={sidebarWidth}/>
        </Sidebar>
    )
}

export default Sidebar
