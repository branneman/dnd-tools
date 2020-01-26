// Curry
export const curryN = (() => {
  const isPlaceholder = x => x['@@functional/placeholder'] === true
  const filterPlaceholders = xs => xs.filter(x => isPlaceholder(x))
  const filterValues = xs => xs.filter(x => !isPlaceholder(x))

  return (arity, fn, accIn = []) => (...args) => {
    const accOut = accIn.slice()

    if (filterPlaceholders(accIn).length > 0) {
      filterValues(args).forEach(val => {
        const i = accOut.findIndex(isPlaceholder)
        const idx = i === -1 ? accOut.length : i
        accOut[idx] = val
      })
    } else {
      accOut.push(...args)
    }

    if (filterValues(accOut).length >= arity) {
      return fn.apply(null, accOut)
    }
    return curryN(arity, fn, accOut)
  }
})()
export const curry = fn => curryN(fn.length, fn)
export const _ = { '@@functional/placeholder': true }

// Typechecks
export const isUndef = x => typeof x === 'undefined'
export const isNull = x => x === null
export const isBool = x => typeof x === 'boolean'
export const isNum = x => typeof x === 'number' && isFinite(x)
export const isInt = x =>
  typeof x === 'number' && isFinite(x) && Math.floor(x) === x
export const isStr = x => typeof x === 'string'
export const isArr = x => Array.isArray(x)
export const isRegExp = x => isObj(x) && x instanceof RegExp
export const isFunc = x => typeof x === 'function'
export const isSymbol = x => typeof x === 'symbol'
export const isObj = x =>
  x === Object(x) && !isArr(x) && !isFunc(x) && !isSymbol(x)

// Array higher-order
export const map = curry((f, xs) => xs.map(f))
export const filter = curry((f, xs) => xs.filter(f))
export const foldl = curry((f, init, xs) => xs.reduce(f, init))
export const foldr = curry((f, init, xs) => xs.reduceRight(f, init))
export const find = curry((f, xs) => xs.find(f))
export const sort = curry((f, xs) => xs.slice().sort(f))
export const includes = curry((f, xs) => xs.includes(f))

// Array
export const length = xs => xs.length
export const nth = curry((i, xs) => xs[i])
export const slice = curry((from, to, xs) => xs.slice(from, to))
export const range = curry((from, to) =>
  map(add(from), [...Array(to - from).keys()])
)
export const head = nth(0)
export const init = slice(0, -1)
export const tail = slice(1, Infinity)
export const last = slice(-1, Infinity)
export const concat = curry((a, b) => a.concat(b))
export const flatten = foldl(concat, [])
export const reverse = xs => xs.slice().reverse()
export const distinct = xs =>
  foldl(
    (acc, curr) => (acc.indexOf(curr) < 0 ? acc.concat([curr]) : acc),
    [],
    xs
  )
export const update = curry((key, val, xs) => ((xs[key] = val), xs))

// Logic & Relation
export const not = a => !a
export const and = curry((a, b) => a && b)
export const or = curry((a, b) => a || b)
export const eq = curry((left, right) => left === right)
export const lt = curry((left, right) => left < right)
export const lte = curry((left, right) => left <= right)
export const gt = curry((left, right) => left > right)
export const gte = curry((left, right) => left >= right)
export const min = curry((a, b) => (b < a ? b : a))
export const max = curry((a, b) => (b > a ? b : a))
export const defaultTo = x => y => (isUndef(y) || isNull(y) ? x : y)

// Math
export const add = curry((a, b) => a + b)
export const subtract = curry((a, b) => a - b)
export const multiply = curry((a, b) => a * b)
export const divide = curry((a, b) => a / b)
export const inc = add(1)
export const dec = add(-1)
export const modulo = curry((a, b) => a % b)
export const negate = n => -n
export const sum = foldl(add, 0)
export const product = foldl(multiply, 1)
export const mean = xs => sum(xs) / length(xs)
export const median = xs =>
  length(xs) % 2
    ? xs[(length(xs) - 1) / 2]
    : mean([xs[length(xs) / 2 - 1], xs[length(xs) / 2]])

// String
export const test = curry((re, str) => re.test(str))
export const match = curry((re, str) => str.match(re) || [])
export const replace = curry((re, replacement, s) => s.replace(re, replacement))
export const lower = s => s.toLowerCase(s)
export const upper = s => s.toUpperCase(s)

// Object
export const has = curry((key, obj) =>
  Object.prototype.hasOwnProperty.call(obj, key)
)
export const keys = obj => Object.keys(obj)
export const values = obj => Object.values(obj)
export const entries = obj => Object.entries(obj)
export const prop = curry((key, obj) => obj[key])
export const assoc = curry((key, val, obj) => ((obj[key] = val), obj))
export const pick = curry((keys, obj) =>
  foldl(
    (acc, curr) => (obj[curr] ? ((acc[curr] = obj[curr]), acc) : acc),
    {},
    keys
  )
)

// Lenses
export const lens = curry((get, set) => ({ get, set }))
export const view = curry((lens, obj) => lens.get(obj))
export const set = curry((lens, val, obj) => lens.set(val, obj))
export const over = curry((lens, fn, obj) =>
  set(lens, fn(view(lens, obj)), obj)
)
export const lensIndex = key => lens(nth(key), update(key))
export const lensProp = key => lens(prop(key), assoc(key))

// Function
export const compose = (...xs) =>
  foldl((f, g) => (...args) => f(g(...args)), head(xs), tail(xs))
export const pipe = (...xs) => compose(...reverse(xs))
export const apply = curry((f, xs) => f.apply(null, xs))
export const complement = f => compose(not, f)
