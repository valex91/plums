import {IPlum} from "../../components/plum/plum.component.interface";

export function plumStateCompare(state1: Array<Array<IPlum>>, state2: Array<Array<IPlum>>): boolean {
    return state1.every((item: Array<IPlum>, index: number) => {
        return item.map((plum: IPlum) => plum.color).join('|') === state2[index].map((plum: IPlum) => plum.color).join('|')
    })
}