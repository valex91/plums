import {IPlumContainerProps} from "./plum-column.component.interface";
import {ReactElement, FunctionComponent, DragEvent} from 'react'
import style from './plum-column.module.scss';
import {Plum} from "../plum/plum.component";
import {IPlum} from "../plum/plum.component.interface";

export const PlumColumn: FunctionComponent<IPlumContainerProps> = (props: IPlumContainerProps): ReactElement => {
    const {column, onColumnDrop, onDrag} = props;

    function noOpEvent(e: DragEvent<HTMLDivElement>): void {
        e.preventDefault()
    }

    return (
        <div className={style.container}
             onDrop={(e) => {
                 e.preventDefault();
                 onColumnDrop();
             }}
             onDragEnd={noOpEvent.bind(this)}
             onDragEnter={noOpEvent.bind(this)}
             onDragOver={noOpEvent.bind(this)}
             onDragLeave={noOpEvent.bind(this)}>
            {column.map((plum: IPlum, index: number) => {
                return <Plum key={plum.id} isDraggable={index === 0} onDragStart={onDrag.bind(this)} plum={plum}
                />
            })}
            <div className={style.columnLine}/>
        </div>);
}