import {IPlum} from "../plum/plum.component.interface";

export interface IPlumsState {
    winningState: Array<Array<IPlum>>;
    onWin: () => void
}