import {React, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import { motion, easeIn } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteActiveFileArr, resetActivedFilesArr, resetCurrentFile, updateActiveStatusOfActivedFiles } from "../../state/slicers/directorySlice";

function TabBar({tabBarScrollLeft}) {
    const Wrapper = styled(motion.div)`
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        flex-wrap: nowrap;
        overflow-x: auto;
        box-sizing: border-box;
        padding: 20px 10px;
    `

    const Tab = styled(motion.div)`
        min-width: 200px;
        background: ${props => props.isActive ? "#2e96ff" : "rgba(255, 255, 255, 0.08)"}; 
        backdrop-filter: blur(50px) saturate(180%);
        -webkit-backdrop-filter: blur(50px) saturate(180%);
        box-shadow: 0.5px 0.5px 0.5px 0.2px rgba( 0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, .18);
        border-radius: 5px;
        padding: 2.5px 10px;
        gap: 5px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
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

    const CloseBtn = styled(motion.svg)`
        width: 12px;
        height: 12px;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
        stroke: #FFFFFF;
    `



    const dispatch = useDispatch()
    const containerRef = useRef(null)

    const activedFiles = useSelector(state => state.directories.activedFilesArr)
    const [hoverItem, setHoverItem] = useState({})

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = tabBarScrollLeft.current
        }
    })

    return (
        <>
            {(activedFiles.length > 0) && (
                <Wrapper
                    ref={containerRef}
                    onScroll={() => {
                        tabBarScrollLeft.current = containerRef.current.scrollLeft
                    }}
                >
                    {activedFiles.map(item => {
                        return (
                            <Tab key={item.path} isActive={item.active}
                            whileHover={{
                                background: "#2e96ff"
                            }}
                            onHoverStart={() => {
                                setHoverItem(item)
                            }}
                            onHoverEnd={() => {
                                setHoverItem({})
                            }}
                            onClick={() => {
                                dispatch(updateActiveStatusOfActivedFiles(item))
                            }}
                            >
                                <Text>{item.name}</Text>

                                {(item.active === true || JSON.stringify(item) === JSON.stringify(hoverItem)) && (
                                    <CloseBtn viewBox="0 0 10 10"
                                    whileHover={{
                                        background: "rgba(18,18,18, 0.15)"
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        dispatch(deleteActiveFileArr(item))
                                        dispatch(resetCurrentFile())
                                    }}
                                    >
                                        <path d="M1 1 L9 9 M9 1 L1 9" strokeWidth="1" />
                                    </CloseBtn>
                                )}
                            </Tab>
                        )
                    })}
                </Wrapper>
            )}
        </>
    )
}

export default TabBar;