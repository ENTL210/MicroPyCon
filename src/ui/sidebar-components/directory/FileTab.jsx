import { motion } from "motion/react";
import styled from "styled-components";

function FileTab({ fileObj, isSub}) {
    const File = styled(motion.div)`
        width: 100%;
        height:30px;
        display: flex;
        align-items: center;
        border-radius: 5px;
    `

    const FileWrapper = styled(motion.div)`
        display: flex;
        align-items: center;
        width: 100%;
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

    const SubDirectoryIndicator = styled(motion.div)`
    width: 12.5%;
    display: flex;
    align-items: center;
    justify-content: center;

    hr {
        border-left: 1px solid #FFFFFF;
        height: 12.5px;
        padding: 0px;
    }
    `

    return (
        <File
            initial={{
                backgroundColor: "#464950"
            }}
        >
            <FileWrapper>
                {
                    isSub && <SubDirectoryIndicator><hr></hr></SubDirectoryIndicator>
                }
                <Text>{fileObj.name}</Text>
            </FileWrapper>

        </File>
    )
}

export default FileTab