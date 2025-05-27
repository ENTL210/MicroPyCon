import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import refreshingIcon from "../../assets/refresh-icon.png"
import consoleIcon from "../../assets/console-icon.png"
import memoryReset from "../../assets/memory-reset.png"
import uploadingIcon from "../../assets/upload-icon.png"
import { setCurrentDevice, setDeviceList, setSelectedFirmware } from "../../state/slicers/deviceSlice";
import { hidePopup, showPopup } from "../../state/slicers/popupSlice";

function ToolsTab({ sidebarWidth }) {
    const dispatch = useDispatch()
    const [isExpand, setIsExpand] = useState(false)
    const [expandedHeight, setExpandedHeight] = useState(0)
    const devicesRef = useRef({})
    const serialPortsArr = useSelector(state => state.device.deviceList)
    const selectedDevice = useSelector(state => state.device.selectedDevice)
    const selectedFirmware = useSelector(state => state.device.selectedFirmware)
    const selectedDirectory = useSelector(state => state.directories.directoryPath)

    useEffect(() => {
        console.log("Rendering Tool tabs...")
        console.log(selectedDevice)
    }, [])

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

    const FileDialogLauncherButton = styled(motion.button)`
        max-width: 100%;
        background: rgba( 255, 255, 255, 0.08 );
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
        outline: inherit;
    `

    const DeviceMenuWrapper = styled(motion.div)`
        max-width: 100%;
        background: ${props => props.background};
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

    const Button = styled(motion.button)`
        width: 30px;
        height: 30px;
        margin-right: 5px;
        padding: 5px;
        background: none;
        color: white;
        font-weight: 700;
        border: none;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;

        img {
            width: 80%;
        }
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

    const DeviceItem = styled(motion.div)`
        max-width: 100%;
        background: ${props => props.background};
        backdrop-filter: blur(50px) saturate(180%);
        -webkit-backdrop-filter: blur(50px) saturate(180%);
        box-shadow: 0.5px 0.5px 0.5px 0.2px rgba( 0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, .18);
        padding: 1.25px 0px 1.25px 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 7.5px;
        align-items: flex-start;
        justify-content: center;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 7.5px;
    `

    const FunctionBar = styled(motion.div)`
        width: 100%;
        height: 50%;
        border-top: 1px solid rgba(255, 255, 255, .5);
        padding: 5px 10px 5px 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
    `


    return (
        <ToolsTab width={sidebarWidth}>
            <Container>
                <TabTitle>Tools</TabTitle>
                <FileDialogLauncherButton
                    whileHover={{
                        background: "#2e96ff"
                    }}
                    onClick={async () => {
                        try {
                            const filePath = await window.electron.openFileDialog();
                            if (filePath.length > 0) {
                                dispatch(setSelectedFirmware(filePath[0]))
                                dispatch(showPopup({
                                    messeage: `${filePath[0].split("/").at(-1)} has been selected`,
                                    type: "success",
                                }))
                            }
                        } catch (err) {
                            console.log("Error selecting MicroPython firmware in render", err)
                        }
                    }}
                >
                    <Text
                        style={{
                            textAlign: "start",
                            width: "100%"
                        }}
                    >
                        {selectedFirmware ? `Firmware: ${selectedFirmware.split("/").at(-1)}` : "Select MicroPython Firmware..."}
                    </Text>
                </FileDialogLauncherButton>
                <DeviceMenuWrapper
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsExpand((prev) => {
                            if (prev) {
                                dispatch(setCurrentDevice({}))
                            }
                            return !prev
                        })
                    }}
                    background={isExpand ? "#2e96ff" : "rgba( 255, 255, 255, 0.08 )"}
                    whileHover={{
                        background: "#2e96ff"
                    }}
                >
                    <ExpandBtn>
                        {isExpand ? '▼' : '▶'}
                    </ExpandBtn>
                    <Text>Devices</Text>
                    <Button
                        whileHover={{
                            background: "rgba(18,18,18, 0.15)"
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                            const fetchSerialPorts = async () => {
                                try {
                                    const ports = await window.electron.getSerialPort();
                                    dispatch(setDeviceList(ports))
                                } catch (err) {
                                    console.log("Error fetching serial ports in render: ", err)
                                }
                            }

                            fetchSerialPorts()
                        }}
                        title="Refreshing"
                    >
                        <img src={refreshingIcon} alt="Refreshing Icon" />
                    </Button>
                </DeviceMenuWrapper>
                {(isExpand) && (
                    serialPortsArr.map((item) => {
                        return (
                            <DeviceItem
                                background={Object.keys(selectedDevice).length > 0 && (item.path === selectedDevice.path) ? "#2e96ff" : "rgba( 255, 255, 255, 0.08 )"}
                                key={item.path}
                                ref={element => {
                                    if (element) {
                                        devicesRef.current[item.path] = element
                                    } else {
                                        delete devicesRef.current[item.path]
                                    }
                                }}
                                whileHover={{
                                    background: "#2e96ff"
                                }}
                                animate={{
                                    border: selectedDevice.path === item.path ? "none" : "1px solid rgba(255, 255, 255, .18)"
                                }}
                                transition={{ duration: 0.2 }}
                                onClick={() => {
                                    if (selectedFirmware) {
                                        dispatch(setCurrentDevice(item))
                                    } else {
                                        dispatch(showPopup({
                                            messeage: "Please select a MicroPython firmware...",
                                            type: "warning",
                                        }))
                                    }
                                }}
                            >
                                <Text>{item.path}</Text>
                                {(selectedDevice.path === item.path) && (
                                    <FunctionBar>
                                        <Button
                                            whileHover={{
                                                background: "rgba(18,18,18, 0.15)"
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                const serialPort = selectedDevice.path
                                                const firmware = selectedFirmware
                                                window.electron.triggerFlash(serialPort, firmware)
                                            }}
                                            title="Flash device"
                                        >
                                            <img src={memoryReset} alt="Flash device" />
                                        </Button>
                                        <Button
                                            whileHover={{
                                                background: "rgba(18,18,18, 0.15)"
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                const serialPort = selectedDevice.path
                                                const directoryPath = selectedDirectory
                                                window.electron.uploadCode(serialPort, directoryPath)
                                            }}
                                            title="Upload to device"
                                        >
                                            <img src={uploadingIcon} alt="Upload to device" />
                                        </Button>
                                        <Button
                                            whileHover={{
                                                background: "rgba(18,18,18, 0.15)"
                                            }}
                                            title="Open Console"
                                        >
                                            <img src={consoleIcon} alt="Open Console" />
                                        </Button>
                                    </FunctionBar>
                                )}
                            </DeviceItem>
                        )
                    })
                )}

            </Container>
        </ToolsTab>
    )

}

export default ToolsTab;