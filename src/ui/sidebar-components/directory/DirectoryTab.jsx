import { memo, useEffect, useState } from "react"
import { motion } from "motion/react";
import styled from "styled-components";
import FileTree from "./FileTree.jsx";
import { useSelector } from "react-redux";

function DirectoryTab({sidebarWidth}) {

    const directoriesArr = useSelector(state => state.directories.directoriesArr)


    const DirectoryTab = styled.div`
        min-width: calc(${props => props.width} - 15px);
        scroll-snap-align: start;
        user-select: none;
        padding: 0px 0px 10px 0px;
        margin: 50px 0px 0px 0px;
    `

    const Container = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12.5px;
        padding-left: 15px;
    `

    const TabTitle = styled.div`
        font-weight: 700;
        color: #FFFFFF;
        font-size: 18px;
    `
    

    return (
        <DirectoryTab width={sidebarWidth}>
            <Container>
                <TabTitle>File</TabTitle>
                <FileTree directories={directoriesArr}/>
            </Container>
        </DirectoryTab>
    )
}

export default DirectoryTab
