import { IroColorPickerOptions } from './colorPickerOptions';
import { IroColor, IroColorValue } from './color';

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
export function getTriangleWheelDimensions(props: Partial<TriangleWheelProps>) {
  const rad = props.width / 2;
  const triangleR = rad * 7/8;
  const triangleH = triangleR * 3/2;
  const triangleA = triangleR * 3/Math.sqrt(3)


  return {
    width: props.width,
    radius: rad - props.borderWidth,
    trianglePoints: [
      {
        x: rad,
        y: rad/8
      },
      {
        x: rad - triangleA/2,
        y: rad/8 + triangleH,
      },
      {
        x: rad + triangleA/2,
        y: rad/8 + triangleH,
      }
    ],
    cx: rad,
    cy: rad
  };
}

/**
 * @desc Translate an angle according to wheelAngle and wheelDirection
 * @param props - wheel props
 * @param angle - input angle
 */
export function translateTriangleWheelAngle(props: Partial<TriangleWheelProps>, angle: number, invert?: boolean) {
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
export function getTriangleWheelHandlePosition(props: Partial<TriangleWheelProps>, color: IroColor) {
  const hsv = color.hsv;
  const { radius, cx, cy } = getTriangleWheelDimensions(props);
  const handleRange = props.width / 2 - props.padding - props.handleRadius - props.borderWidth;
  const handleAngle = (180 + translateTriangleWheelAngle(props, hsv.h, true)) * (Math.PI / 180);
  //const handleDist = (hsv.s / 100) * handleRange;
  const direction = props.wheelDirection === 'clockwise' ? -1 : 1;
  return {
    x: cx + (radius - props.padding) * Math.cos(handleAngle) * direction,
    y: cy + (radius - props.padding) * Math.sin(handleAngle) * direction,
  }
}

/**
 * @desc Get the current wheel value from user input
 * @param props - wheel props
 * @param x - global input x position
 * @param y - global input y position
 */
export function getTriangleWheelValueFromInput(props: Partial<TriangleWheelProps>, x: number, y: number) {
  const { cx, cy } = getTriangleWheelDimensions(props);
  x = cx - x;
  y = cy - y;
  // Calculate the hue by converting the angle to radians
  const hue = translateTriangleWheelAngle(props, Math.atan2(-y, -x) * (180 / Math.PI));

  return {
    h: Math.round(hue)
  };
}