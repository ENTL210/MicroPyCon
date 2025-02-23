import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Sidebar from './sidebar-components/Sidebar'

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(215);
  const [selectedFolderPath, setSelectedFolderPath] = useState("")
  
  useEffect(() => {
    window.electron.onFetchSelectedDirectory((event, path) => {
      setSelectedFolderPath(path)
    });
    window.electron.selectedDirectory(selectedFolderPath)
  })

  const RootContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  `

  const Main = styled.div`
  width: calc(100vw - ${(props) => props.sidebarWidth || '215px'});
  background-color: rgba(44,44,43,1);
  border-radius: 10px;
  margin: 7.5px;
  `
  

  return (
    <RootContainer>
      <Sidebar sidebarWidth={`${sidebarWidth}px`} selectedDirectory={selectedFolderPath}/>
      <Main sidebarWidth={`${sidebarWidth}px`}>
      </Main>
    </RootContainer>
  )
}

export default App
