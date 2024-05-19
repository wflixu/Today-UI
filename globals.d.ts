/// <reference types="vite/client" />
// declare module '*.vue' { import type { DefineComponent } from 'vue'  
//  const component: DefineComponent<{}, {}, any>   
//  export default component 
// }

// eslint-disable-next-line no-unused-vars
// declare const PKG_VERSION: string;

declare module '*.vue' {
    import type { DefineComponent, Plugin } from 'vue';

    // eslint-disable-next-line @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any> & Plugin;
    export default component;
}


