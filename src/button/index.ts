
import { withInstall, type WithInstallType } from '../shared/withInstall';
import _Button from "./Button";

export * from './type';

export const Button: WithInstallType<typeof _Button> = withInstall(_Button);
export default Button;