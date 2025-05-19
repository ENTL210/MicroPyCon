import { motion } from "motion/react";
import styled from "styled-components";

function ToolsTab({sidebarWidth}) {
    const ToolsTab = styled.div`
        min-width: calc(${props => props.width} - 15px);
        scroll-snap-align: start;
        user-select: none;
        padding: 0px 0px 10px 0px;
        margin: 50px 0px 0px 0px;
        overflow-y: auto;
    `

    const Container = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12.5px;
        padding-left: 15px;
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