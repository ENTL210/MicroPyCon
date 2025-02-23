import styled from "styled-components";
import { motion } from "motion/react";
import FileTab from "./FileTab";

function Sidebar({sidebarWidth, selectedDirectory}) {
    const Sidebar = styled(motion.div)`
    // width: ${sidebarWidth || '215px'};
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

    return(
        <Sidebar
        initial={{
            width: '0px',
            padding: '0px'
        }}
        >
            <FileTab sidebarWidth={sidebarWidth} selectedDirectory={selectedDirectory}/>
        </Sidebar>
    )
}

export default Sidebar