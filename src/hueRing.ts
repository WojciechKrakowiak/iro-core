import { IroColorPickerOptions } from './colorPickerOptions';
import { IroColor, IroColorValue } from './color';

export interface HueRingProps extends IroColorPickerOptions {
  color: IroColor;
  ringWidth: number
}

/**
 * @desc Get the point as the center of the ring
 * @param props - ring props
 */
export function getHueRingDimensions(props: Partial<HueRingProps>) {
  const rad = props.width / 2;
  const radius = rad - props.borderWidth

  return {
    width: props.width,
    radius: radius,
    ringWidth: props.ringWidth || (props.padding + props.handleRadius + props.borderWidth) * 2,
    cx: rad,
    cy: rad,
    borderWidth: props.borderWidth
  };
}

/**
 * @desc Translate an angle according to wheelAngle and wheelDirection
 * @param props - wheel props
 * @param angle - input angle
 */
export function translateHueRingAngle(props: Partial<HueRingProps>, angle: number, invert?: boolean) {
  const wheelAngle = props.wheelAngle;
  const wheelDirection = props.wheelDirection
  if ((!invert && wheelDirection === 'clockwise') || (invert && wheelDirection === 'anticlockwise')) {
    angle = (invert ? 180 : 360) - (wheelAngle - angle);
  } 
  else {
    angle = wheelAngle + angle;
  }
  // javascript's modulo operator doesn't produce positive numbers with negative input
  // https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e
  return (angle % 360 + 360) % 360;
}

/**
 * @desc Get the current handle position for a given color
 * @param props - wheel props
 * @param color
 */
export function getHueRingHandlePosition(props: Partial<HueRingProps>, color: IroColor) {
  const hsv = color.hsv;
  const { radius, cx, cy } = getHueRingDimensions(props);
  const handleAngle = (180 + translateHueRingAngle(props, hsv.h, true)) * (Math.PI / 180);
  const direction = props.wheelDirection === 'clockwise' ? -1 : 1;
  const ringWidth = props.ringWidth ? props.ringWidth : (props.padding + props.handleRadius + props.borderWidth) * 2;
  return {
    x: cx + (radius - ringWidth/2) * Math.cos(handleAngle) * direction,
    y: cy + (radius - ringWidth/2) * Math.sin(handleAngle) * direction,
  }
}

/**
 * @desc Get the current wheel value from user input
 * @param props - wheel props
 * @param x - global input x position
 * @param y - global input y position
 */
export function getHueRingValueFromInput(props: Partial<HueRingProps>, x: number, y: number) {
  const { cx, cy } = getHueRingDimensions(props);
  x = cx - x;
  y = cy - y;
  // Calculate the hue by converting the angle to radians
  const hue = translateHueRingAngle(props, Math.atan2(-y, -x) * (180 / Math.PI));

  return {
    h: Math.round(hue)
  };
}