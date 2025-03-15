import { motion } from "motion/react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import FileTab from "./FileTab";
import rightArr from "../../assets/right-arr.png"
import downArr from "../../assets/down-arr.png"

function Directories({ directories, isSub, activePath, updateActivePath}) {

    const [isDirectoryExpanded, setIsDirectoryExpanded] = useState(false)

    const DirectoryContainer = styled(motion.div)`
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 7.5px;
    `

    const ParentDirectory = styled(motion.div)`
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        border-radius: 5px;
    `

    const ParentDirectoryWrapper = styled(motion.div)`
        display: flex;
        align-items: center;
        width: 100%;
    `

    const SubDirectoryIndicator = styled(motion.div)`
        width: 12.5%;
        display: flex;
        /* align-items: center; */
        justify-content: center;

        hr {
            border-left: 1px solid #FFFFFF;
            height: 12.5px;
            padding: 0px;
        }
    `

    const ExpandButton = styled(motion.button)`
        width: 12.5%;
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
            width: 40%;
        }
    `

    const Text = styled(motion.div)`
        width: 75%;
        font-weight: 700;
        color: #FFFFFF;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `
    return (
        <>
            {(directories.subDirectory.length > 0) ? (
                <DirectoryContainer>
                    <ParentDirectory
                        initial={{
                            backgroundColor: "#464950",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            if (isDirectoryExpanded === false) {
                                setIsDirectoryExpanded(true)
                            } else {
                                setIsDirectoryExpanded(false)
                            }
                        }}
                        animate={{
                           
                        }}
                    >   
                        <ParentDirectoryWrapper>
                            {
                                isSub && <SubDirectoryIndicator><hr></hr></SubDirectoryIndicator>
                            }
                            <ExpandButton>
                                {(isDirectoryExpanded === true) ? (
                                    <img src={downArr} />
                                ) : (
                                    <img src={rightArr} />
                                )}
                            </ExpandButton>
                            <Text>{directories.name}</Text>
                        </ParentDirectoryWrapper>
                    </ParentDirectory>
                    {(isDirectoryExpanded) && (
                        <div 
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "7.5px",
                            marginLeft: "5%",
                        }}
                        >
                            {directories.subDirectory.map(items => (
                                <Directories directories={items} isSub={true} key={items.path}/>
                            ))}
                        </div>
                    )}
                </DirectoryContainer>
            ) : (
                <FileTab fileObj={directories} isSub={true}/>
            )}
        </>
    )
}

export default Directories