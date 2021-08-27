import {Dispatch, SetStateAction, useState} from "react";
import {PlumCreator} from "../plum-creator/plum-creator.service";
import {IPlum} from "../../components/plum/plum.component.interface";

export function useWinningState(): [Array<Array<IPlum>>, Dispatch<SetStateAction<Array<Array<IPlum>>>>] {
    const [winningState, setWinningState] = useState(() => PlumCreator(4, 4, true));


    return [winningState, setWinningState]
}