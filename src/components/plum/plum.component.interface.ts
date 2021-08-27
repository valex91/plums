export interface IPlumProps {
    plum: IPlum;
    isDraggable: boolean;
    onDragStart: () => void;
}

export interface IPlum {
    id: number;
    color: PlumColors
}

export enum PlumColors {
    Primary = 'Primary',
    Secondary = 'Secondary',
    Tertiary = 'Tertiary',
    Quaternary = 'Quaternary'
}