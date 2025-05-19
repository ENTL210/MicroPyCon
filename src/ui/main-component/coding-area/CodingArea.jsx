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
        flex-direction: column;
        gap: 5px;
        overflow: auto;
        white-space: pre;
        box-sizing: border-box;
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
                <LineContent 
                    ref={codeRef} 
                    className="language-python"
                    contentEditable={true}
                    onInput={() => {
                        console.log("Hello")
                    }}
                >
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