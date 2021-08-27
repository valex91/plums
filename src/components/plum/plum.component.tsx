import React, {DragEvent, FunctionComponent} from "react";
import {IPlumProps} from "./plum.component.interface";
import style from './plum.module.scss'

export const Plum: FunctionComponent<IPlumProps> = (props: IPlumProps) => {
    const {color} = props.plum,
        {onDragStart, isDraggable} = props;

    function onDragOver(e: DragEvent<HTMLDivElement>) {
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <div draggable={isDraggable}
             onDrag={onDragOver.bind(this)}
             onDragOver={onDragOver.bind(this)}
             onDragStart={(e) => {
                 onDragStart()
             }}
             className={style[color]}>
        </div>
    )
}