import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import styled from "styled-components";

function ConsoleArea({ }) {
    const dispatch = useDispatch();
    const consoleOutput = useSelector((state) => state.console.consoleOutput)
    const consoleRef = useRef(null);

    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [consoleOutput]);


    const Console = styled(motion.div)`
        width: 100%;
        height: 100vh;
        border-top: 1px solid rgba(255,255,255, 0.2);
        padding: 10px;
        overflow: auto;
        white-space: pre;
        box-sizing: border-box;
        background-color: rgba(18,18,18, 1);

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

    const OutputLine = styled.p`
        width: 1.5em;
        flex-shrink: 0;
        box-sizing: border-box;
        font-size: 12px;
        color: #ABB2BF;
        text-align: left;
    `;

    const consoleAnimationVariant = {
        hidden: { y: '100%', opacity: 0 }, // Starts off-screen at the bottom
        visible: { y: '0%', opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 10 } },
        exit: { y: '100%', opacity: 0, transition: { duration: 0.3 } },
    };


    return (
        <AnimatePresence>
            {consoleOutput.length > 0 && (
                <Console 
                    ref={consoleRef}
                    variants={consoleAnimationVariant}
                    initial="hidden"
                    animate={"visible"}
                    exit={"exit"}
                >
                    {consoleOutput.map((line, index) => (
                        <OutputLine key={index}>{line}</OutputLine>
                    ))}
                </Console>
            )}
        </AnimatePresence>
    )
}

export default ConsoleArea