import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import styled from "styled-components";

function ConsoleArea({ }) {
    const Wrapper = styled(motion.div)`
        border-top: 1px solid rgba(255,255,255, 0.2);
        width: 100%;
        height: 45%;
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

    return (
        <AnimatePresence>
            <Wrapper>
                <OutputLine>
                    Hello
                </OutputLine>
            </Wrapper>
        </AnimatePresence>
    )
}

export default ConsoleArea