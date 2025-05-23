import { motion } from "motion/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function ToolsTab({ sidebarWidth }) {
    const [isExpand, setIsExpand] = useState(false)
    const serialPorts = useSelector(state => state.device.deviceList)

    const ToolsTab = styled.div`
        min-width: 100%;
        scroll-snap-align: start;
        user-select: none;
        padding: 10px;
        margin: 50px 0px 0px 0px;
        box-sizing: border-box;
        overflow-y: auto;
    `

    const Container = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12.5px;
    `

    const TabTitle = styled.div`
        font-weight: 700;
        color: #FFFFFF;
        font-size: 18px;
    `

    const DeviceMenuWrapper = styled(motion.div)`
        max-width: 100%;
        background: rgba( 255, 255, 255, 0.08);
        backdrop-filter: blur(50px) saturate(180%);
        -webkit-backdrop-filter: blur(50px) saturate(180%);
        box-shadow: 0.5px 0.5px 0.5px 0.2px rgba( 0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, .18);
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        gap: 7.5px;
        align-items: center;
        justify-content: flex-start;
        border-radius: 5px;
        padding: 1.25px 0px 1.25px 10px;
        cursor: pointer;
    `

    const ExpandBtn = styled(motion.button)`
        background: none;
        color: white;
        font-weight: 700;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    `

    const Text = styled.h1`
        width: 75%;
        font-weight: 700;
        color: #FFFFFF;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `



    return (
        <ToolsTab width={sidebarWidth}>
            <Container>
                <TabTitle>Tools</TabTitle>
                <DeviceMenuWrapper
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsExpand(prev => !prev)
                    }}
                    animate={{
                        background: isExpand ? "#2e96ff" : "rgba( 255, 255, 255, 0.08 )"
                    }}
                    whileHover={{
                            background: "#2e96ff"
                    }}
                >
                    <ExpandBtn>
                        {isExpand ? '▼' : '▶'}
                    </ExpandBtn>
                    <Text>Devices</Text>
                </DeviceMenuWrapper>
            </Container>
        </ToolsTab>
    )

}

export default ToolsTab;