import {IPlum, PlumColors} from "../../components/plum/plum.component.interface";


export function PlumCreator(x: number, y: number, sameLengthColumns: boolean = false): Array<Array<IPlum>> {
    const matrix = Array.from({length: x}, (): Array<IPlum> => {
        return [];
    });

    const availableColors: Array<PlumColors> = [PlumColors.Tertiary, PlumColors.Primary, PlumColors.Secondary, PlumColors.Quaternary];
    const availableColorsMap: Record<PlumColors, number> = availableColors.reduce((acum: Record<PlumColors, number>, color: PlumColors): Record<PlumColors, number> => {
        acum[color] = y;

        return acum;
    }, {} as Record<PlumColors, number>)

    let total: number = x * y;
    while (total--) {
        const indexForItem = !sameLengthColumns ? getRandUpToN(matrix.length) : indexUntilViable(matrix, y);
        matrix[indexForItem].push(
            {
                id: total,
                color: pickAColor(availableColors, availableColorsMap)
            })
    }

    return matrix;
}

export function getRandUpToN(n: number): number {
    return Math.ceil(Math.random() * 37 * 151) % n;
}

export function indexUntilViable(matrix: Array<Array<IPlum>>, max: number): number {
    const randomIndex = getRandUpToN(matrix.length);
    if (matrix[randomIndex].length < max) {
        return randomIndex;
    } else {
        return indexUntilViable(matrix, max)
    }
}

export function pickAColor(colors: Array<PlumColors>, availability: Record<PlumColors, number>): PlumColors {
    const choice: PlumColors = colors[getRandUpToN(colors.length)];

    if (availability[choice] > 0) {
        --availability[choice];
        return choice;
    } else {
        return pickAColor(colors, availability);
    }
}