import { useRef, useEffect, useCallback } from 'react'

// ─── Shader sources ────────────────────────────────────────────────
// psrdnoise2 by Stefan Gustavson & Ian McEwan (MIT licence)
// Vendored locally to avoid remote dependency breakage.

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
out vec2 uv;
void main() {
  uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `#version 300 es
#define PI 3.14159265358979323846
precision highp float;

in vec2 uv;
out vec4 out_color;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_fade; // 1.0 = bottom fade to off-white, 0.0 = solid blue

// ── psrdnoise2 (MIT) Stefan Gustavson & Ian McEwan ──────────────
float psrdnoise(vec2 x, vec2 period, float alpha, out vec2 gradient) {
  vec2 uv = vec2(x.x + x.y*0.5, x.y);
  vec2 i0 = floor(uv);
  vec2 f0 = fract(uv);
  float cmp = step(f0.y, f0.x);
  vec2 o1 = vec2(cmp, 1.0-cmp);
  vec2 i1 = i0 + o1;
  vec2 i2 = i0 + vec2(1.0, 1.0);
  vec2 v0 = vec2(i0.x - i0.y * 0.5, i0.y);
  vec2 v1 = vec2(v0.x + o1.x - o1.y * 0.5, v0.y + o1.y);
  vec2 v2 = vec2(v0.x + 0.5, v0.y + 1.0);
  vec2 x0 = x - v0;
  vec2 x1 = x - v1;
  vec2 x2 = x - v2;
  vec3 iu, iv;
  vec3 xw, yw;
  if(any(greaterThan(period, vec2(0.0)))) {
    xw = vec3(v0.x, v1.x, v2.x);
    yw = vec3(v0.y, v1.y, v2.y);
    if(period.x > 0.0) xw = mod(vec3(v0.x, v1.x, v2.x), period.x);
    if(period.y > 0.0) yw = mod(vec3(v0.y, v1.y, v2.y), period.y);
    iu = floor(xw + 0.5*yw + 0.5);
    iv = floor(yw + 0.5);
  } else {
    iu = vec3(i0.x, i1.x, i2.x);
    iv = vec3(i0.y, i1.y, i2.y);
  }
  vec3 hash = mod(iu, 289.0);
  hash = mod((hash*51.0 + 2.0)*hash + iv, 289.0);
  hash = mod((hash*34.0 + 10.0)*hash, 289.0);
  vec3 psi = hash * 0.07482 + alpha;
  vec3 gx = cos(psi);
  vec3 gy = sin(psi);
  vec2 g0 = vec2(gx.x,gy.x);
  vec2 g1 = vec2(gx.y,gy.y);
  vec2 g2 = vec2(gx.z,gy.z);
  vec3 w = 0.8 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2));
  w = max(w, 0.0);
  vec3 w2 = w * w;
  vec3 w4 = w2 * w2;
  vec3 gdotx = vec3(dot(g0, x0), dot(g1, x1), dot(g2, x2));
  float n = dot(w4, gdotx);
  vec3 w3 = w2 * w;
  vec3 dw = -8.0 * w3 * gdotx;
  vec2 dn0 = w4.x * g0 + dw.x * x0;
  vec2 dn1 = w4.y * g1 + dw.y * x1;
  vec2 dn2 = w4.z * g2 + dw.z * x2;
  gradient = 10.9 * (dn0 + dn1 + dn2);
  return 10.9 * n;
}

// ── Rotation helper ─────────────────────────────────────────────
vec2 rot(vec2 v, float a) {
  return mat2(cos(a), -sin(a), sin(a), cos(a)) * v;
}

// ── Main ────────────────────────────────────────────────────────
void main() {
  vec2 st = uv * vec2(u_resolution.x / u_resolution.y, 1.0);
  st = rot(st, -PI / 6.0);

  vec2 gradient;
  float n = psrdnoise(2.0 * st, vec2(0.0), 0.60 * u_time, gradient);

  vec2 gradient2;
  float n2 = psrdnoise(3.5 * st + vec2(1.3, 0.7), vec2(0.0), 0.24 * u_time, gradient2);

  float streaks = cos((st.x * 1.2 + n * 0.18 + n2 * 0.08) * PI * 1.5);
  streaks = streaks * 0.5 + 0.5;
  streaks = pow(streaks, 2.5);

  vec3 deepBlue  = vec3(0.047, 0.376, 0.898);
  vec3 midBlue   = vec3(0.071, 0.522, 0.965);
  vec3 highlight = vec3(0.290, 0.749, 0.988);
  vec3 offWhite  = vec3(0.953, 0.949, 0.941);

  float baseBlend = n * 0.5 + 0.5;
  vec3 base = mix(deepBlue, midBlue, baseBlend);
  vec3 blueLayer = mix(base, highlight, streaks * 0.55);

  // When u_fade == 1.0: bottom fades to off-white (original behaviour)
  // When u_fade == 0.0: solid blue throughout
  float fadeT = smoothstep(0.0, 0.55, uv.y);
  vec3 faded = mix(offWhite, blueLayer, fadeT);
  vec3 colour = mix(blueLayer, faded, u_fade);

  out_color = vec4(colour, 1.0);
}
`

// ─── WebGL helpers ─────────────────────────────────────────────

function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(`Shader compile error: ${log}`)
  }
  return shader
}

function createProgram(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram {
  const program = gl.createProgram()!
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw new Error(`Program link error: ${log}`)
  }
  return program
}

// ─── Component ─────────────────────────────────────────────────

interface AnimatedBlueProps {
  className?: string
  style?: React.CSSProperties
  /** When true (default), the bottom of the gradient fades to off-white. When false, solid blue throughout. */
  fade?: boolean
}

export function AnimatedBlue({ className = '', style, fade = true }: AnimatedBlueProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const fadeRef = useRef(fade)
  fadeRef.current = fade

  const glRef = useRef<{
    gl: WebGL2RenderingContext
    program: WebGLProgram
    uResolution: WebGLUniformLocation | null
    uTime: WebGLUniformLocation | null
    uFade: WebGLUniformLocation | null
  } | null>(null)

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()
    const w = Math.round(rect.width * dpr)
    const h = Math.round(rect.height * dpr)
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, powerPreference: 'low-power' })
    if (!gl) {
      console.warn('AnimatedBlue: WebGL2 not supported')
      return
    }

    // Compile shaders & link program
    let program: WebGLProgram
    try {
      const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
      program = createProgram(gl, vs, fs)
    } catch (e) {
      console.error(e)
      return
    }

    // Full-screen quad
    const buffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const aPosition = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uFade = gl.getUniformLocation(program, 'u_fade')
    gl.useProgram(program)

    glRef.current = { gl, program, uResolution, uTime, uFade }
    resize()

    // Animation loop
    const tick = () => {
      resize()
      const { gl: g } = glRef.current!
      g.viewport(0, 0, canvas.width, canvas.height)
      g.uniform2f(uResolution, canvas.width, canvas.height)
      g.uniform1f(uTime, Date.now() / 1000)
      g.uniform1f(uFade, fadeRef.current ? 1.0 : 0.0)
      g.drawArrays(g.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
    }
  }, [resize])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
