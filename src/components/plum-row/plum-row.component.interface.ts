import {IPlum} from "../plum/plum.component.interface";

export interface IPlumRowProps {
    row: Array<IPlum>;
    onRowDrop: () => void;
    onDrag: () => void
}

export enum Axis {
    Row = 'row',
    Column = 'column'
}