import { useState } from "react"
import { motion } from "motion/react";
import styled from "styled-components";
import FileTab from "./FileTab";
import Directories from "./Directories";

function DirectoryTab({ selectedDirectory }) {

    const [selectedDirectoryObj, setSelectedDirectoryObj] = useState(selectedDirectory)

    const DirectoryTab = styled.div`
        width: 100%;
        min-width: ${(props) => props.sidebarWidth || '215px'};
        scroll-snap-align: start;
        user-select: none;
    `

    const Container = styled.div`
        width: 100%;
        margin: 0px 0px 0px 15px;
    `

    const TabTitle = styled.div`
        font-weight: 700;
        color: #FFFFFF;
        font-size: 18px;
    `

    const FileTree = styled(motion.div)`
        width: 90%;
        display: flex;
        flex-direction: column;
        gap: 7.5px;
        margin: 10px 0px 0px 0px;
    `



    return (
        <DirectoryTab>
            <Container>
                <TabTitle>File</TabTitle>
                <FileTree>
                    {selectedDirectoryObj.map(items => (
                        <>
                            <Directories directories={items}/>
                        </>
                    ))}
                </FileTree>
            </Container>
        </DirectoryTab>
    )
}

export default DirectoryTab
