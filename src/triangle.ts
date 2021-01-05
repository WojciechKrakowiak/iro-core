import { IroColorPickerOptions } from './colorPickerOptions';
import { IroColor, IroColorValue } from './color';
import {getWheelDimensions, translateWheelAngle} from "./wheel";

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
export function getTriangleDimensions(props: Partial<TriangleProps>) {
  const rad = props.width / 2;
  const height = (props.width * Math.sqrt(3))/2;


  return {
    width: props.width,
    height: height,
    radius: rad - props.borderWidth,
    trianglePoints: [
      {
        x: props.width/2,
        y: 0
      },
      {
        x: 0,
        y: height,
      },
      {
        x: props.width,
        y: height,
      }
    ],
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
export function translateTriangleAngle(props: Partial<TriangleProps>, angle: number, invert?: boolean) {
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
export function getTriangleHandlePosition(props: Partial<TriangleProps>, color: IroColor) {
  const hsv = color.hsv;
  const { height, width } = getTriangleDimensions(props);
  const handleAngleDeg = (180 + translateTriangleAngle(props, hsv.h, true));

  return {
    x: width * (1 + (hsv.v * (hsv.s - 200))/20000),
    y: height * (1 - hsv.s * hsv.v/10000),
  }

}

/**
 * @desc Get the current wheel value from user input
 * @param props - wheel props
 * @param x - global input x position
 * @param y - global input y position
 */
export function getTriangleValueFromInput(props: Partial<TriangleProps>, x: number, y: number) {
  const { width, height, cx, cy } = getTriangleDimensions(props);

  const rotation = props.rotation ? props.rotation * Math.PI/180 : 0;

  let s: number;
  let v: number;

  let newX = x;
  let newY = y;

  if (props.rotation) {
    const sin = Math.sin(-1 * rotation)
    const cos = Math.cos(-1 * rotation)

    const xc = x - cx - (sin * cos * 15)
    const yc = y - cy - (sin * cos * 15)

    newX = xc * cos - yc * sin
    newY = xc * sin + yc * cos

    newX += cx
    newY += cy

  }

  s = (200 * width * (height - newY))/((3 * height * width) - (2 * height * newX) - width * newY);
  v = 50 * (3 - (newY/height) - (2 * newX/width));

  return {
    s: Math.min(100, Math.max( 0, Math.round(s))),
    v: Math.min(100, Math.max( 0, Math.round(v)))
  };
}

/**
 * @desc Get the gradient stops for a triangle
 * @param props - box props
 * @param color
 */
export function getTriangleGradients(props: Partial<TriangleProps>, color: IroColor) {
  const hue = color.hue;
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