import { motion } from "motion/react";
import styled from "styled-components";

function FileTab({fileObj}) {
    const Container = styled(motion.div)`
        width: 100%;
        padding: 7.5px 0px 7.5px 0px;
        display: flex;
        align-items: center;
        justify-content: center;
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

    console.log(fileObj)

    return (
        <Container
            initial={{
                backgroundColor: "#464950"
            }}
        >
            <Text>{fileObj.name}</Text>
            
        </Container>
    )
}

export default FileTab