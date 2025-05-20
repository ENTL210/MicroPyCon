import { motion } from "motion/react";
import styled from "styled-components";

function ToolsTab({sidebarWidth}) {
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

    return (
        <ToolsTab width={sidebarWidth}>
            <Container>
                <TabTitle>Tools</TabTitle>
            </Container>
        </ToolsTab>
    )

}

export default ToolsTab;