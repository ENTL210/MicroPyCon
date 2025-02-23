import styled from "styled-components";

function FileTab() {
    const FileTab = styled.div`
        width: 100%;
        min-width: ${(props) => props.sidebarWidth || '215px'};
        scroll-snap-align: start;
        padding: 0px;
    `

    const Container = styled.div`
        width: 100%;
        margin: 0px 0px 0px 15px;
    `

    const TabTitle = styled.div`
        font-weight: 700;
        color: #FFFFFF;
        font-size: 15px;
    `

    return (
        <FileTab>
            <Container>
                <TabTitle>File</TabTitle>
            </Container>
        </FileTab>
    )
}

export default FileTab