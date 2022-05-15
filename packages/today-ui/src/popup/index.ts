import _Popup from './popup';
import { withInstall, WithInstallType } from '../shared/withInstall';
import { TPopupProps } from './type';

import './style';

export * from './type';
export type PopupProps = TPopupProps;

export const Popup: WithInstallType<typeof _Popup> = withInstall(_Popup);
export default Popup;
