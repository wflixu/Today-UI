
import './App.css'
import { Floating } from './page/Floating'
import { Interactions } from './page/Interaction'

import { Tooltip } from './compoents/Tooltip'
import DialogPlay from './page/DialogPlay'
import { Menu, MenuItem } from './compoents/DropdownMenu'
import { ContextMenu } from './compoents/ContextMenu'

function App() {

  
  return (
    <div className="App">
      {/* <Floating/> */}
      <DialogPlay></DialogPlay>
      <Interactions />
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
      </div>
    </div>
  )
}

export default App
