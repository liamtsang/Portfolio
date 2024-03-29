const SEED = String(require('./query').seed || '2')
const seedRandom = require('seed-random')
// const SimplexNoise = require("simplex-noise");

export const random = seedRandom(SEED)

// export const simplex = new SimplexNoise(random)
// console.log(simplex)

export const randomSign = () => (random() > 0.5 ? 1 : -1)

export const randomFloat = function (min, max) {
  if (max === undefined) {
    max = min
    min = 0
  }

  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('Expected all arguments to be numbers')
  }

  return random() * (max - min) + min
}

export const randomCircle = function (out, scale) {
  scale = scale || 1.0
  let r = random() * 2.0 * Math.PI
  out[0] = Math.cos(r) * scale
  out[1] = Math.sin(r) * scale
  return out
}

export const randomSphere = function (out, scale) {
  scale = scale || 1.0
  let r = random() * 2.0 * Math.PI
  let z = random() * 2.0 - 1.0
  let zScale = Math.sqrt(1.0 - z * z) * scale
  out[0] = Math.cos(r) * zScale
  out[1] = Math.sin(r) * zScale
  out[2] = z * scale
  return out
}

export const shuffle = function (arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected Array, got ' + typeof arr)
  }

  let rand
  let tmp
  let len = arr.length
  let ret = arr.slice()

  while (len) {
    rand = Math.floor(random() * len--)
    tmp = ret[len]
    ret[len] = ret[rand]
    ret[rand] = tmp
  }

  return ret
}
