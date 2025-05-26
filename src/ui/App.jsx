import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react';
import styled from 'styled-components'
import Sidebar from './sidebar-components/Sidebar'
import { easeIn } from 'motion';
import WelcomingScreen from './main-component/WelcomingScreen';
import TabBar from './main-component/TabBar';
import { useDispatch, useSelector } from 'react-redux';
import { resetActivedFilesArr, resetCurrentFile, updateDirectoriesArr, updateDirectoryPath } from '../state/slicers/directorySlice';
import CodingArea from './main-component/CodingArea';
import { setDeviceList } from '../state/slicers/deviceSlice';
import Popups from './Popups';
import ConsoleArea from './main-component/ConsoleArea';
import { addConsoleOutput, clearConsoleOutput } from '../state/slicers/consoleSlice';


function App() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const dispatch = useDispatch()
  const directoryPath = useSelector(state => state.directories.directoryPath)
  const tabBarScrollLeft = useRef(0)


  useEffect(() => {
    window.electron.onFetchSelectedDirectory((event, path) => {
      dispatch(updateDirectoryPath(path))

    });
    window.electron.onFetchSelectedFile((event, path) => {
      dispatch(updateDirectoryPath(path))
    })

    window.electron.clearConsoleOutput((event) => {
      dispatch(clearConsoleOutput())
    })

    window.electron.getConsoleOutput((event, data) => {
      dispatch(addConsoleOutput(data))
    })

    const fetchSerialPorts = async () => {
      try {
        const ports = await window.electron.getSerialPort();
        dispatch(setDeviceList(ports))
      } catch (err) {
        console.log("Error fetching serial ports in render: ", err)
      } 
    }

    fetchSerialPorts()

    dispatch(resetActivedFilesArr())
  })

  if (directoryPath.length > 0) {
    async function output() {
      try {
        const files = await window.electron.getDirectoryContents(directoryPath)
        dispatch(updateDirectoriesArr(files))
      } catch (err) {
        console.log("An error occured while retrieving contents", err)
      }
    }

    output()
    dispatch(resetCurrentFile())
  }


  const RootContainer = styled.div`
  background: rgba(18, 18, 18, 0.65); 
  backdrop-filter: blur(19.5px) saturate(180%);
  -webkit-backdrop-filter: blur(19.5px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 9px;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  `

  const Main = styled(motion.div)`
  border-radius: 0px 9px 9px 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  gap: 5px;
  `

  return (
    <RootContainer>
      {(directoryPath.length >0) && (
        <Sidebar sidebarWidth={`${sidebarWidth}px`} />
      )}
      <Main
        initial={{
          width: '100vw',
        }}
        animate={{
          opacity: 1,
          width: (directoryPath.length > 0) ? `calc(100vw - ${sidebarWidth}px)` : '100vw',
          margin: (directoryPath.length > 0) ? `50x 7.5px 7.5px 7.5px ` : '50px 7.5px 7.5px 7.5px',
          transition: {
            ease: easeIn,
            duration: 0.75,
          }
        }}
      >

        {(directoryPath.length === 0) && (
          <WelcomingScreen />
        )}

        <TabBar tabBarScrollLeft={tabBarScrollLeft}/>
        <CodingArea/>
        <ConsoleArea/>
      </Main>
      <Popups/>
    </RootContainer>
  )
}

export default App
