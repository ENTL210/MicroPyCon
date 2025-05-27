import React, { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css';
import styled from "styled-components";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";

function CodingArea() {
    const dispatch = useDispatch()
    const currentFile = useSelector(state => state.directories.currentFile)
    const [currentFileContents, setCurrentFileContents] = useState([])
    const Container = styled(motion.pre)`
        width: 100%;
        height: 100vh;
        display: flex;
        padding: 0px 10px;
        flex-direction: column;
        gap: 5px;
        overflow: auto;
        white-space: pre;
        box-sizing: border-box;
        margin: 0;

        &::-webkit-scrollbar {
            width: 8px; /* Width of the vertical scrollbar */
            height: 12px; /* Height of the horizontal scrollbar */
            padding: 0;
            display: block; /* Ensure it's always visible if content overflows */
        }

        &::-webkit-scrollbar-track {
            background: rgba(30, 30, 30, 0.5); /* Darker track background */
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba(90, 90, 90, 0.7); /* Dark grey thumb */
            background-clip: padding-box; /* Ensures border doesn't cut into background-color */
        }

        &::-webkit-scrollbar-thumb:hover {
            background-color: rgba(120, 120, 120, 0.9); /* Lighter thumb on hover */
        }
    `

    const Line = styled.div`
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
        color: #ABB2BF;
    `

    const LineContent = styled.code`
        flex-grow: 1;
        background: inherit;
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

    const CodeLine = ({ lineIndex, code }) => {
        const codeRef = useRef(null)

        useEffect(() => {
            if (codeRef.current) {
                hljs.highlightElement(codeRef.current)
            }
        }, [code])

        return (
            <Line>
                <LineNumber>{lineIndex + 1}</LineNumber>
                <LineContent ref={codeRef} className="language-python">
                    {code}
                </LineContent>
            </Line>
        )
    }

    if (currentFileContents.length > 0) {
        return (
            <Container>
                {currentFileContents.map((contents, index) => (
                    <CodeLine key={index} lineIndex={index} code={contents} />
                ))}
            </Container>
        )
    }
}

export default CodingArea;