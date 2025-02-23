import styled from "styled-components";

function FileTab() {
    const FileTab = styled.div`
        width: 100%;
        flex-grow: 1;
        scroll-snap-align: start;
        position: relative;
    `

    const TabTitle = styled.div`
        font-weight: 700;
        color: #FFFFFF;
        font-size: 15px;
    `

    return (
        <FileTab>
            <TabTitle>File</TabTitle>
        </FileTab>
    )
}

export default FileTab