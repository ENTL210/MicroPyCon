import React from "react";
import styled from "styled-components";
import { motion, easeIn } from "motion/react";
import { useSelector } from "react-redux";

function TabBar() {
    const Wrapper = styled(motion.div)`
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        flex-wrap: nowrap;
        overflow-x: auto;
        box-sizing: border-box;
        padding: 5px 0px 5px 0px;
    `

    const Tab = styled(motion.div)`
        min-width: 200px;
        background: rgba(42,42,42,0.75);
        backdrop-filter: blur(10px) saturate(180%);
        box-shadow: 0.5px 0.5px 0.5px 0.2px rgba( 255, 255, 255, 0.20 );
        border-radius: 5px;
        border: 1px solid rgba(255, 255, 255, 0.125);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        user-select: none;
    `

    const Text = styled.h1`
        font-weight: 700;
        color: #FFFFFF;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `

    const activedFiles = useSelector(state => state.directories.activedFilesArr)

    return (
        <>
            {(activedFiles.length > 0) && (
                <Wrapper
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        ease: easeIn,
                        duration: 0.25,
                    }}
                >
                    {activedFiles.map(items => {
                        return (
                            <Tab
                            whileHover={{
                                background: "#2e96ff"
                            }}
                            >
                                <Text>{items.name}</Text>
                            </Tab>
                        )
                    })}
                </Wrapper>
            )}
        </>
    )
}

export default TabBar;