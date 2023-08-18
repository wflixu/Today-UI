

import { type App } from 'vue';
import * as components from './components';
import { version} from '../package.json';

export function install(app: App, config?: Record<string, unknown>): void {
  Object.keys(components).forEach((key) => {
    // @ts-ignore
     app.use(components[key as keyof typeof components] , config);
  });
}

const TodayUI = {
  install,
  version: version ?? '' , 
}
export * from './components';

export default TodayUI ;
