import { IroColorPickerOptions } from './colorPickerOptions';
import { IroColor } from './color';
export interface TriangleProps extends IroColorPickerOptions {
    color: IroColor;
    trianglePoints: {
        x: number;
        y: number;
    }[];
    rotation?: number;
}
/**
 * @desc Get the point as the center of the wheel
 * @param props - wheel props
 */
export declare function getTriangleDimensions(props: Partial<TriangleProps>): {
    width: number;
    height: number;
    radius: number;
    trianglePoints: {
        x: number;
        y: number;
    }[];
    cx: number;
    cy: number;
    borderWidth: number;
};
/**
 * @desc Translate an angle according to wheelAngle and wheelDirection
 * @param props - wheel props
 * @param angle - input angle
 */
export declare function translateTriangleAngle(props: Partial<TriangleProps>, angle: number, invert?: boolean): number;
/**
 * @desc Get the current handle position for a given color
 * @param props - wheel props
 * @param color
 */
export declare function getTriangleHandlePosition(props: Partial<TriangleProps>, color: IroColor): {
    x: number;
    y: number;
};
/**
 * @desc Get the current wheel value from user input
 * @param props - wheel props
 * @param x - global input x position
 * @param y - global input y position
 */
export declare function getTriangleValueFromInput(props: Partial<TriangleProps>, x: number, y: number): {
    s: number;
    v: number;
};
/**
 * @desc Get the gradient stops for a triangle
 * @param props - box props
 * @param color
 */
export declare function getTriangleGradients(props: Partial<TriangleProps>, color: IroColor): (string | number)[][][];
