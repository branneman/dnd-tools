const { curryN, curry, _ } = require('./fp')

describe('curryN()', () => {
  it('should correctly curry to given arity', () => {
    const threeArg = (a, b, c = 42) => c
    const fn = curryN(2, threeArg)

    const res1 = fn() //=> fn with arity of 2
    const res2 = fn(1) //=> fn with arity of 1
    const res3 = fn(1, 2) //=> run function
    const res4 = fn(1, 2, 3) //=> run function
    const res5 = fn(1, 2, 3, 4) //=> run function

    expect(typeof res1).toStrictEqual('function')
    expect(typeof res2).toStrictEqual('function')
    expect(res3).toStrictEqual(42)
    expect(res4).toStrictEqual(3)
    expect(res5).toStrictEqual(3)
  })
})

describe('curry()', () => {
  it('returns a new function on subsequent calls', () => {
    const sum = (a, b) => a + b

    const fn0 = curry(sum)
    const fn1 = fn0()
    const fn2 = fn1()
    const fn3 = fn2()

    expect(fn3(10, 5)).toStrictEqual(15)
  })

  it('handles more arguments than given arity', () => {
    // sumAll arity = 2
    const sumAll = curry(function(a, b) {
      const xs = Array.from(arguments)
      return xs.reduce((acc, curr) => acc + curr, 0)
    })

    const result = [
      sumAll()(40)(20),
      sumAll(20)(40),
      sumAll(30, 30),
      sumAll(10, 20, 30),
      sumAll(10)(20, 30),
      sumAll(10, 20, 30),
      sumAll(10)(20, 20, 10),
      sumAll(10)(10, 10, 10, 20)
    ]

    expect(result.every(x => x === 60)).toBe(true)
  })

  it('accepts an arity of 0', () => {
    const give15 = () => 10 + 5
    const fn = curry(give15)
    expect(fn()).toStrictEqual(15)
  })

  it('accepts an arity of 1', () => {
    const add5 = n => n + 5
    const fn = curry(add5)
    expect(fn(10)).toStrictEqual(15)
  })

  it('accepts an arity of 2', () => {
    const sum = (a, b) => a + b

    const fn = curry(sum)
    const result = [fn()(10)(5), fn(10)(5), fn(10, 5)]

    expect(result).toStrictEqual([15, 15, 15])
  })

  it('accepts an arity of 3', () => {
    const sum3 = (a, b, c) => a + b + c

    const fn = curry(sum3)
    const result = [
      fn(10, 20, 30),
      fn(10)(20, 30),
      fn(10, 20)(30),
      fn(10)(20)(30)
    ]

    expect(result).toStrictEqual([60, 60, 60, 60])
  })

  it('accepts an arity of 12', () => {
    const sum12 = (a, b, c, d, e, f, g, h, i, j, k, l) =>
      a + b + c + d + e + f + g + h + i + j + k + l

    const fn = curry(sum12)
    const result = [
      fn(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
      fn(1, 2)(3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
      fn(1, 2, 3, 4, 5, 6)(7)(8)(9, 10, 11, 12),
      fn(1, 2)(3, 4)(5, 6, 7, 8)(9, 10, 11, 12),
      fn(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)
    ]

    expect(result).toStrictEqual([78, 78, 78, 78, 78])
  })
})

describe('placeholder', () => {
  it('it allows gaps via placeholder value', () => {
    const sum3 = (a, b, c) => a + b + c
    const fn = curry(sum3)

    const result = [
      fn(10, 20, 30),
      fn(_, 20, 30)(10),
      fn(_, _, 30)(10)(20),
      fn(_, _, 30)(10, 20),
      fn(_, 20)(10)(30),
      fn(_, 20)(10, 30),
      fn(_, 20)(_, 30)(10)
    ]

    expect(result.every(x => x === 60)).toBe(true)
  })
})
