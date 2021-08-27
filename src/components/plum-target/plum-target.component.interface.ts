import {IPlum} from "../plum/plum.component.interface";

export interface IPlumTargetProps {
    target: Array<Array<IPlum>>;
    onClick?: () => void;
}

export enum TargetViewState {
    Solution= 'Solution',
    Button ='button'
}