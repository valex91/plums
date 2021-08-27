import React, {useEffect, useState} from "react";
import {PlumColumn} from "../plum-column/plum-column.component";
import {PlumCreator} from "../../services/plum-creator/plum-creator.service";
import styles from "./plums.module.scss"
import {IPlum} from "../plum/plum.component.interface";
import {PlumRow} from "../plum-row/plum-row.component";
import {Axis} from "../plum-row/plum-row.component.interface";
import {IPlumsState} from "./plums.interface";
import {plumStateCompare} from "../../services/plum-state-compare/plum-state-compare.service";

export function Plums(props: IPlumsState) {
    const [columns, setColumn] = useState(() => PlumCreator(4, 4));
    const [rows, setRow] = useState(() => PlumCreator(4, 0));
    const [movingFrom, setMovingFrom] = useState<Axis>();
    const {winningState, onWin} = props;
    let movingIndex: number = -Infinity;

    useEffect((): void => {
        if (plumStateCompare(winningState, columns)) {
            onWin()
        }
    }, [onWin, winningState, columns]);

    useEffect((): void => {
        setColumn(PlumCreator(4, 4));
    }, [winningState])

    function columnToRow(columnIndex: number) {
        setColumn((currentColumn: Array<Array<IPlum>>) => {
            const relevantColumn: Array<IPlum> = currentColumn[columnIndex];
            setRow((currentRow: Array<Array<IPlum>>) => {
                if (currentRow[columnIndex] && currentRow[columnIndex].length === 0 && movingIndex === columnIndex) {
                    const firstOfColumn: IPlum = relevantColumn[0];
                    currentRow.splice(columnIndex, 1, [firstOfColumn]);
                    relevantColumn.splice(0, 1)
                }

                return [...currentRow];
            });

            return [...currentColumn];
        })
    }

    function rowToColumn(row: number) {
        setRow((currentRow: Array<Array<IPlum>>) => {
            const relevantRow = currentRow[row];
            setColumn((currentColumns: Array<Array<IPlum>>) => {
                const content = relevantRow.pop();

                if (content) {
                    currentColumns[row].unshift(content)
                }


                return [...currentColumns];
            });

            return [...currentRow];
        })
    }

    function rowToRow(rowIndex: number): void {
        setRow((currentRow: Array<Array<IPlum>>) => {
            if ((((rowIndex - 1) === movingIndex) || ((rowIndex + 1) === movingIndex)) && currentRow[rowIndex].length === 0) {
                const moved: IPlum | undefined = currentRow[movingIndex].pop();
                if (moved) {
                    currentRow[rowIndex].push(moved);
                }
            }


            return [...currentRow]
        });
    }

    function onMatrixMovementStrategy(index: number, target: Axis) {
        const strategyMap: Record<Axis, Record<Axis.Row | Axis.Column, (i: number) => void>> = {
            [Axis.Row]: {
                [Axis.Row]: rowToRow,
                [Axis.Column]: rowToColumn
            },
            [Axis.Column]: {
                [Axis.Row]: columnToRow,
                [Axis.Column]: (i: number) => {
                },
            }
        }

        strategyMap[movingFrom as Axis][target](index);
    }

    return (
        <div>
            <div className={styles.headContainer}>
                {
                    rows.map((row: Array<IPlum>, rowIndex: number) => {
                        return <PlumRow row={row}
                                        key={rowIndex}
                                        onDrag={() => {
                                            setMovingFrom(Axis.Row);
                                            movingIndex = rowIndex;
                                        }
                                        }
                                        onRowDrop={() => onMatrixMovementStrategy(rowIndex, Axis.Row)}/>
                    })
                }
            </div>
            <div className={styles.columnsContainer}>
                {
                    columns.map((plums: Array<IPlum>, columnIndex: number) => {
                        return <PlumColumn
                            onDrag={() => {
                                setMovingFrom(Axis.Column);
                                movingIndex = columnIndex;
                            }}
                            key={columnIndex}
                            onColumnDrop={() => onMatrixMovementStrategy(columnIndex, Axis.Column)}
                            column={plums}/>
                    })
                }
            </div>
        </div>
    )
}