import { IroColor } from './color';
import { IroColorPickerOptions } from './colorPickerOptions';

export interface BoxOptions extends IroColorPickerOptions {
  color: IroColor;
}

/**
 * @desc Get the CSS styles for the box root element
 * @param props - box props
 */
export function getBoxStyles(props: Partial<BoxOptions>) {
  return {
    [props.layoutDirection === 'vertical' ? 'marginLeft' : 'marginTop']: props.sliderMargin
  }
}

/**
 * @desc Get the bounding dimensions of the box
 * @param props - box props
 */
export function getBoxDimensions(props: Partial<BoxOptions>) {
  const { width, padding, handleRadius } = props;
  return {
    width: width,
    height: width,
    radius: padding + handleRadius
  };
}

/**
 * @desc Get the current box value from user input
 * @param props - box props
 * @param x - global input x position
 * @param y - global input y position
 * @param bounds - box element bounding box
 */
export function getBoxValueFromInput(props: Partial<BoxOptions>, x: number, y: number, bounds: any) {
  const { width, height, radius } = getBoxDimensions(props);
  const handleStart = radius;
  const handleRangeX = width - radius * 2;
  const handleRangeY = height - radius * 2;
  x -= (bounds.left + handleStart);
  y -= (bounds.top + handleStart);
  const percentX = (x / handleRangeX) * 100;
  const percentY = (y / handleRangeY) * 100;
  return {
    s: Math.max(0, Math.min(percentX, 100)),
    v: Math.max(0, Math.min(100 - percentY, 100))
  }
}

/**
 * @desc Get the current box handle position
 * @param props - box props
 */
export function getBoxHandlePosition(props: Partial<BoxOptions>) {
  const { width, height, radius } = getBoxDimensions(props);
  const hsv = props.color.hsv;
  const handleStart = radius;
  const handleRangeX = width - radius * 2;
  const handleRangeY = height - radius * 2;
  return { 
    x: handleStart + (hsv.s / 100) * handleRangeX,
    y: handleStart + (handleRangeY - ((hsv.v / 100) * handleRangeY))
  }
}

/**
 * @desc Get the gradient stops for a box
 * @param props - box props
 */
export function getBoxGradients(props: Partial<BoxOptions>) {
  const hue = props.color.hue;
  return [
    // saturation gradient
    [
      [0, '#fff'],
      [100, `hsl(${hue},100%,50%)`],
    ],
    // lightness gradient
    [
      [0, 'rgba(0,0,0,0)'],
      [100, '#000'],
    ]
  ];
}