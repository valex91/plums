import {FunctionComponent} from "react";
import styles from './target-card.module.scss';
import {IPlumTargetProps} from "../plum-target/plum-target.component.interface";
import {IPlum} from "../plum/plum.component.interface";

export const TargetCard: FunctionComponent<IPlumTargetProps> = (props: IPlumTargetProps) => {
    const {target, onClick} = props;

    return (
        <div onClick={onClick!.bind(this)}
             className={styles.container}>
            <p className={styles.textHelp}>
                Reach the following combination to win:
            </p>
            <div className={styles.combinationContainer}>
                {
                    target.map((column: Array<IPlum>, columnIndex: number) => {
                        return (<div className={styles.dotColumn} key={columnIndex}>
                            {
                                column.map((dot: IPlum) => {
                                    return <span className={styles[dot.color]} key={dot.id}/>
                                })
                            }
                        </div>)
                    })
                }
            </div>
        </div>
    )
}