import React, {FunctionComponent, useState} from "react";
import {IPlumTargetProps, TargetViewState} from "./plum-target.component.interface";
import styles from "../../App.module.scss";
import {TargetCard} from "../target-card/target-card.component";

export const PlumTarget: FunctionComponent<IPlumTargetProps> = (props: IPlumTargetProps) => {
    const [viewState, setViewState] = useState(() => TargetViewState.Button);
    const {target} = props;

    return (viewState === TargetViewState.Button ? <button type='button'
                                                           className={styles.button}
                                                           onClick={() => setViewState(TargetViewState.Solution)}>how to win</button> : <TargetCard onClick={() => setViewState(TargetViewState.Button)} target={target}/>)
}
