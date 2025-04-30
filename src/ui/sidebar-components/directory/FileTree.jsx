import { memo, React, useState } from "react";
import styled from "styled-components";
import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import { addActivedFilesArr } from "../../../state/directory/directorySlice";


function FileTree({directories}) {
    const dispatch = useDispatch()
    const [expandedItems, setExpandedItems] = useState({})
    const [focusItem, setFocusedItem] = useState(null)


    const handleToggleExpand = (itemPath) => {
        setExpandedItems(prev => ({
            ...prev,
            [itemPath]: !prev[itemPath]
        }))
    }

    const handleItemClick = (item) => {
        setFocusedItem(item.path)
        // If it's a folder...
        if (item.subDirectory && item.subDirectory.length > 0) {
            handleToggleExpand(item.path)
        }
        
        // If it's a file...
        if (item.fileExtension) {
            setExpandedItems({})
            dispatch(addActivedFilesArr(item))
        }

    }

    const FileTreeWrapper = styled(motion.div)`
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    `

    const FileTreeItem = styled(motion.div)`
        width: 89%;
        display: flex;
        flex-direction: row;
        gap: 7.5px;
        align-items: center;
        justify-content: flex-start;
        border-radius: 5px;
        padding: 0px 0px 0px 10px;
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

    const Indentation = styled.div`
        width: 10px;
        display: inline-block;
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
        <>
            {directories.map((item) => (
                <FileTreeWrapper
                    key={item.path}
                >
                    <FileTreeItem
                        onClick={(e) => {
                            handleItemClick(item)
                        }}
                        initial={{
                            background: "#464950",
                        }}
                        animate={{
                            background: focusItem == item.path ? "#2e96ff" : "#464950"
                        }}
                    >
                        {item.subDirectory && item.subDirectory.length > 0 ? (
                            <ExpandBtn
                            >
                                {expandedItems[item.path] ? '▼' : '▶'}
                            </ExpandBtn>
                        ) : (
                            <Indentation />
                        )}
                        <Text>{item.name}</Text>
                    </FileTreeItem>
                    {item.subDirectory && expandedItems[item.path] && (
                        <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            marginLeft: "12.5px"
                        }}
                        >
                            <FileTree directories={item.subDirectory}/>
                        </div>
                    )}
                </FileTreeWrapper>

            ))}
        </>
    )
}

export default FileTree