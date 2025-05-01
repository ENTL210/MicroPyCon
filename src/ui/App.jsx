import { useState, useEffect } from 'react'
import { motion } from 'motion/react';
import styled from 'styled-components'
import Sidebar from './sidebar-components/Sidebar'
import { easeIn } from 'motion';
import WelcomingScreen from './main-component/WelcomingScreen';
import TabBar from './main-component/TabBar';
import { useDispatch, useSelector } from 'react-redux';
import { updateDirectoriesArr, updateDirectoryPath } from '../state/directory/directorySlice';


function App() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const dispatch = useDispatch()
  const directoryPath = useSelector(state => state.directories.directoryPath)

  useEffect(() => {
    window.electron.onFetchSelectedDirectory((event, path) => {
      dispatch(updateDirectoryPath(path))

    });
    window.electron.onFetchSelectedFile((event, path) => {
      dispatch(updateDirectoryPath(path))
    })
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
  }


  const RootContainer = styled.div`
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(42, 42, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.125);
  border-radius: 9px;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  `

  const Main = styled(motion.div)`
  background-color: rgb(35,35,35);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 20px;
  `

  return (
    <RootContainer>
      <Sidebar sidebarWidth={`${sidebarWidth}px`} />
      <Main
        initial={{
          width: '100vw',
          margin: '50px 7.5px 7.5px 7.5px',
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

        <TabBar/>
      </Main>
    </RootContainer>
  )
}

export default App
