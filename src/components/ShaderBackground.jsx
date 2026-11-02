import { useEffect, useRef } from 'react'
import { gsap, onBgColors } from '../lib/motion'

const VERT = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uC1;
uniform vec3 uC2;
uniform float uIntensity;

vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec2 mod289(vec2 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0,i1.y,1.0)) + i.x + vec3(0.0,i1.x,1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for(int i=0;i<4;i++){ v += a*snoise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = uv; p.x *= asp;
  vec2 m = uMouse; m.x *= asp;
  float t = uTime * 0.06;

  vec2 q = vec2(fbm(p*1.2 + vec2(t, -t*0.7)), fbm(p*1.2 + vec2(-t*0.8, t) + 3.1));
  float n = fbm(p*1.6 + q*1.8 + t);

  float d = distance(p, m);
  float glow = exp(-d*d*6.0);

  vec3 base = vec3(0.039, 0.039, 0.043);
  vec3 col = base;
  col = mix(col, uC1, smoothstep(0.15, 0.95, n) * 0.22 * uIntensity);
  col = mix(col, uC2, smoothstep(0.0, 0.9, q.x) * 0.22 * uIntensity);
  col += uC1 * glow * 0.10 * uIntensity;

  // soft contour lines
  float lines = smoothstep(0.02, 0.0, abs(fract(n*6.0) - 0.5) - 0.47);
  col += lines * 0.018 * uIntensity;

  // vignette
  float vig = smoothstep(1.25, 0.2, length(uv - 0.5) * 1.6);
  col *= mix(0.55, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`

const hex2rgb = (hex) => {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

export default function ShaderBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) {
      canvas.style.display = 'none'
      return
    }

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = (n) => gl.getUniformLocation(prog, n)
    const uRes = u('uRes'), uTime = u('uTime'), uMouse = u('uMouse')
    const uC1 = u('uC1'), uC2 = u('uC2'), uInt = u('uIntensity')

    const state = {
      mouse: { x: 0.5, y: 0.5 },
      target: { x: 0.5, y: 0.5 },
      c1: hex2rgb('#c6ff3d'),
      c2: hex2rgb('#7b5cff'),
      intensity: 0,
    }
    gsap.to(state, { intensity: 1, duration: 2.5, ease: 'power2.out', delay: 0.6 })

    const DPR = Math.min(window.devicePixelRatio, 1.5) * 0.5
    const resize = () => {
      canvas.width = window.innerWidth * DPR
      canvas.height = window.innerHeight * DPR
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      state.target.x = e.clientX / window.innerWidth
      state.target.y = 1 - e.clientY / window.innerHeight
    }
    window.addEventListener('pointermove', onMove)

    const offColors = onBgColors((a, b) => {
      const c1 = hex2rgb(a || '#c6ff3d')
      const c2 = hex2rgb(b || '#7b5cff')
      gsap.to(state.c1, { 0: c1[0], 1: c1[1], 2: c1[2], duration: 1.2, ease: 'power2.out', overwrite: true })
      gsap.to(state.c2, { 0: c2[0], 1: c2[1], 2: c2[2], duration: 1.2, ease: 'power2.out', overwrite: true })
    })

    let raf
    const start = performance.now()
    const render = () => {
      state.mouse.x += (state.target.x - state.mouse.x) * 0.04
      state.mouse.y += (state.target.y - state.mouse.y) * 0.04
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.uniform2f(uMouse, state.mouse.x, state.mouse.y)
      gl.uniform3fv(uC1, state.c1)
      gl.uniform3fv(uC2, state.c2)
      gl.uniform1f(uInt, state.intensity)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      offColors()
    }
  }, [])

  return <canvas className="bg-shader" ref={canvasRef} aria-hidden="true" />
}
