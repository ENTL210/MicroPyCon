import { motion } from "motion/react";
import { useState } from "react";
import styled from "styled-components";
import FileTab from "./FileTab";
import rightArr from "../../assets/right-arr.png"
import downArr from "../../assets/down-arr.png"

function Directories({directories}) {

    const [isDirectoryExpanded, setIsDirectoryExpanded] = useState(false) 

    const DirectoryContainer = styled(motion.div)`
        width: 100%;
        padding: 7.5px 0px 7.5px 0px;
        display: flex;
        align-items: center;
        justify-content: center;
    `

    const ExpandButton = styled(motion.button)`
        width: 20%;
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
            width: 60%;
        }
    `

    const Text = styled(motion.div)`
        width: 75%;
        font-weight: 700;
        color: #FFFFFF;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `

    console.log(directories)

    return (
        <>
            {(directories.subDirectory.length > 0) ? (
                <DirectoryContainer
                    initial={{
                        backgroundColor: "#464950",
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        setIsDirectoryExpanded(!isDirectoryExpanded)
                    }}
                >
                    <ExpandButton>
                        {(isDirectoryExpanded === true) ? (
                            <img src={downArr}/>
                        ) : (
                            <img src={rightArr}/>
                        )}
                    </ExpandButton>
                    <Text>{directories.name}</Text>
                </DirectoryContainer>
            ) : (
                <FileTab fileObj={directories}/>
            )}
        </>
    )
}

export default Directories