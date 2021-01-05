import { IroColorPickerOptions } from './colorPickerOptions';
import { IroColor } from './color';
export interface HueRingProps extends IroColorPickerOptions {
    color: IroColor;
    ringWidth: number;
}
/**
 * @desc Get the point as the center of the ring
 * @param props - ring props
 */
export declare function getHueRingDimensions(props: Partial<HueRingProps>): {
    width: number;
    radius: number;
    ringWidth: number;
    cx: number;
    cy: number;
    borderWidth: number;
};
/**
 * @desc Translate an angle according to wheelAngle and wheelDirection
 * @param props - wheel props
 * @param angle - input angle
 */
export declare function translateHueRingAngle(props: Partial<HueRingProps>, angle: number, invert?: boolean): number;
/**
 * @desc Get the current handle position for a given color
 * @param props - wheel props
 * @param color
 */
export declare function getHueRingHandlePosition(props: Partial<HueRingProps>, color: IroColor): {
    x: number;
    y: number;
};
/**
 * @desc Get the current wheel value from user input
 * @param props - wheel props
 * @param x - global input x position
 * @param y - global input y position
 */
export declare function getHueRingValueFromInput(props: Partial<HueRingProps>, x: number, y: number): {
    h: number;
};
