import React from "react";
import styled from "styled-components";
import { motion } from "motion/react";
import { useSelector } from "react-redux";

function TabBar() {
    const Wrapper = styled(motion.div)`
    width: 100%;
    
    `

    const activedFiles = useSelector(state => state.directories.activedFilesArr)

    return (
        <>
        {(activedFiles.length > 0) && (
            <Wrapper>

            </Wrapper>
        )}
        </>
    )
}

export default TabBar;