import {IPlum} from "../plum/plum.component.interface";

export interface IPlumContainerProps {
    column: Array<IPlum>;
    onColumnDrop: () => void;
    onDrag: () => void
}