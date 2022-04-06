import { setupCartesian } from '../utils/cartesianutils.js'

const CANVAS_W = 600
const CANVAS_H = 400

// sample usage
const { drawFunction, drawParametric } = setupCartesian('canvas', CANVAS_W, CANVAS_H, -10, 20, -10, 20)
drawFunction((x) => -2*x + 1)
// drawFunction((x) => 5*Math.sin(x))
drawFunction((x) => x*x*x )
drawParametric(-5, 5, (t) => t*t, (t) => t)
drawParametric(0, 2*Math.PI, (t) => 5*Math.cos(t), (t) => 3*Math.sin(t))
drawParametric(0, 2*Math.PI, (t) => -5*Math.sin(t), (t) => 3*Math.cos(t))