import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";

function CodingArea() {
    const dispatch = useDispatch()
    const currentFile = useSelector(state => state.directories.currentFile)
    const [currentFileContents, setCurrentFileContents] = useState([])
    const Container = styled(motion.div)`
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        gap: 5px;
        overflow-y: auto;
        white-space: pre;
        box-sizing: border-box;
    `

    const CodeLine = styled.div`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 5px;
    `

    const LineNumber = styled.p`
        width: 1.5em;
        flex-shrink: 0;
        box-sizing: border-box;
        font-size: 12px;
        text-align: right;
        user-select: none;
        color: #909297;
    `

    const LineContent = styled.div`
        flex-grow: 1;
        color: #909297;
    `

    useEffect(() => {
        async function readFile(path) {
            try {
                const data = await window.electron.readCurrentFile(path)
                setCurrentFileContents(data)
            } catch (err) {
                console.log("Error involking data of currentFile from rendered process: ", err)
            }
        }
        if (JSON.stringify(currentFile) !== '{}') {
            readFile(currentFile.path)
        } else {
            setCurrentFileContents([])
        }
    }, [currentFile])

    if (currentFileContents.length > 0) {
        return (
            <Container>
                {currentFileContents.map((line, index) => (
                    <CodeLine key={index}>
                        <LineNumber>{index + 1}</LineNumber>
                        <LineContent>{line}</LineContent>
                    </CodeLine>
                ))}
            </Container>
        )
    }
}

export default CodingArea;