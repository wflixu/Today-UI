import { Fragment } from "react";
import { Menu, MenuItem } from "../compoents/DropdownMenu";

export default function () {
  return (
    <Menu label="Edit">
      <MenuItem label="Undo" />
      <MenuItem label="Redo" />
      <MenuItem label="Cut" disabled />
      <Menu label="Copy as">
        <MenuItem label="Text" />
        <MenuItem label="Video" />
        <Menu label="Image">
          <MenuItem label=".png" />
          <MenuItem label=".jpg" />
          <MenuItem label=".svg" />
          <MenuItem label=".gif" />
        </Menu>
        <MenuItem label="Audio" />
      </Menu>
      <Menu label="Share">
        <MenuItem label="Mail" />
        <MenuItem label="Instagram" />
      </Menu>
    </Menu>
  );
}
