import { IroColorPickerOptions } from './colorPickerOptions';
import { IroColor } from './color';
export interface TriangleWheelProps extends IroColorPickerOptions {
    color: IroColor;
    trianglePoints: {
        x: number;
        y: number;
    }[];
}
/**
 * @desc Get the point as the center of the wheel
 * @param props - wheel props
 */
export declare function getTriangleWheelDimensions(props: Partial<TriangleWheelProps>): {
    width: number;
    radius: number;
    trianglePoints: {
        x: number;
        y: number;
    }[];
    cx: number;
    cy: number;
};
/**
 * @desc Translate an angle according to wheelAngle and wheelDirection
 * @param props - wheel props
 * @param angle - input angle
 */
export declare function translateTriangleWheelAngle(props: Partial<TriangleWheelProps>, angle: number, invert?: boolean): number;
/**
 * @desc Get the current handle position for a given color
 * @param props - wheel props
 * @param color
 */
export declare function getTriangleWheelHandlePosition(props: Partial<TriangleWheelProps>, color: IroColor): {
    x: number;
    y: number;
};
/**
 * @desc Get the current wheel value from user input
 * @param props - wheel props
 * @param x - global input x position
 * @param y - global input y position
 */
export declare function getTriangleWheelValueFromInput(props: Partial<TriangleWheelProps>, x: number, y: number): {
    h: number;
};
