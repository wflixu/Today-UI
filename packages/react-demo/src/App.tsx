
import './App.css'
import { Floating } from './page/Floating'
import { Interactions } from './page/Interaction'
import { Routes, Route, Link } from "react-router-dom";

import { Tooltip } from './compoents/Tooltip'
import DialogPlay from './page/DialogPlay'
import { Menu, MenuItem } from './compoents/DropdownMenu'
import { ContextMenu } from './compoents/ContextMenu'
import Nav from './page/Nav';
import DropdownPlay from './page/DropdownPlay';
import TooltipPlay from './page/TooltipPlay';

function App() {

  
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Nav />} />
        <Route path="/tooltip" element={<TooltipPlay />} />
        <Route path="/dialog" element={<DialogPlay />} />
        <Route path="/dropdown" element={<DropdownPlay />} />
      </Routes>
      {/* <Floating/> */}
      {/* <Interactions />
      <h2>Tooltip</h2>
      <Tooltip label="My tooltip">
        <button>Hover me</button>
      </Tooltip>
      <hr />
      <h2>dropmenu</h2>
      <div>
        <Menu label="File">
          <MenuItem label="New tab" />
          <MenuItem label="New window" />
          <MenuItem label="Close Tab" disabled />
          <Menu label="Share...">
            <MenuItem label="Mail" />
            <MenuItem label="Instagram" />
            <Menu label="Other...">
              <MenuItem label="Reddit" />
              <MenuItem label="LinkedIn" />
            </Menu>
          </Menu>
        </Menu>
      </div>
      <hr />
      <h2> ContextMenu</h2>
      <div>

        <ContextMenu>
          <MenuItem label="New tab" />
          <MenuItem label="New window" />
          <MenuItem label="Close tab" disabled />
        </ContextMenu>
      </div> */}
    </div>
  )
}

export default App
