import type { App } from "vue";

import FileTree from "./FileTree";
export { FileTree };

export * from "./type";

export default {
    title: "FileTree 下拉菜单",
    status: "50%",
    install(app: App): void {
      app.component(FileTree.name, FileTree);
    },
  };
  

// export const FileTree: WithInstallType<typeof _FileTree> =
//   withInstall(_FileTree);
// export default FileTree;
