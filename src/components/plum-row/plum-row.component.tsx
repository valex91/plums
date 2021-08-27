import {FunctionComponent, ReactElement, DragEvent} from "react";
import {IPlumRowProps} from "./plum-row.component.interface";
import {IPlum} from "../plum/plum.component.interface";
import styles from "./plpum-row.module.scss"
import {Plum} from "../plum/plum.component";

export const PlumRow: FunctionComponent<IPlumRowProps> = (props: IPlumRowProps): ReactElement => {
    const {row, onRowDrop, onDrag} = props;

    function avoidDefault(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    return (
        <div className={styles.row}
             onDrop={(e) => {
                 e.preventDefault();
                 onRowDrop();
             }}
             onDragEnd={(e) => e.preventDefault()}
             onDragEnter={(e) => e.preventDefault()}
             onDragOver={avoidDefault.bind(this)}
             onDragLeave={avoidDefault.bind(this)}>
            {
                row.map((plum: IPlum, index: number) => {
                    return <Plum isDraggable={index === 0}
                                 onDragStart={() => {
                                     onDrag()
                                 }}
                                 key={plum.id}
                                 plum={plum}/>
                })
            }
            <div className={styles.rowLine} />
        </div>
    )
}