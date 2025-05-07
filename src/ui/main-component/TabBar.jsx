import {React, useEffect, useRef} from "react";
import styled from "styled-components";
import { motion, easeIn } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveStatusOfActivedFiles } from "../../state/directory/directorySlice";

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
        min-width: ${props => props.isActive ? "300px" : "200px"};
        background: ${props => props.isActive ? "#2e96ff" : "rgba(255, 255, 255, 0.08)"}; 
        backdrop-filter: blur(50px) saturate(180%);
        -webkit-backdrop-filter: blur(50px) saturate(180%);
        box-shadow: 0.5px 0.5px 0.5px 0.2px rgba( 0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, .18);
        border-radius: 5px;
        padding: 2.5px 0px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        user-select: none;
        cursor: pointer;
    `

    const Text = styled.h1`
        font-weight: 700;
        color: #FFFFFF;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `

    const dispatch = useDispatch()
    const containerRef = useRef(null)
    const lastScrollPositionRef = useRef(0)

    const activedFiles = useSelector(state => state.directories.activedFilesArr)

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = lastScrollPositionRef.current 
        }
    }, [activedFiles])

    return (
        <>
            {(activedFiles.length > 0) && (
                <Wrapper
                    ref={containerRef}
                >
                    {activedFiles.map(item => {
                        return (
                            <Tab key={item.path} isActive={item.active}
                            whileHover={{
                                background: "#2e96ff"
                            }}
                            onClick={() => {
                                if (containerRef.current) {
                                    lastScrollPositionRef.current = containerRef.current.scrollLeft
                                }

                                dispatch(updateActiveStatusOfActivedFiles(item))
                            }}
                            >
                                <Text>{item.name}</Text>
                            </Tab>
                        )
                    })}
                </Wrapper>
            )}
        </>
    )
}

export default TabBar;