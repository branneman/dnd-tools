import { slug, ellipsify } from './text'

describe('slug()', () => {
  it('lowercases', () => {
    const input = 'AbC'
    const output = slug(input)
    expect(output).toEqual('abc')
  })

  it('replaces anything not a-z or minus', () => {
    const tests = [
      ['abc 123', 'abc-123'],
      ['DeF 456', 'def-456'],
      ['ghi-jkl', 'ghi-jkl'],
      ["Alchemist's Fire (flask)", 'alchemist-s-fire-flask']
    ]

    tests.forEach(([test, expected]) => expect(slug(test)).toEqual(expected))
  })

  it('leaves no leading and trailing dashes', () => {
    const tests = [
      ['abc def', 'abc-def'],
      [' DeF GHI', 'def-ghi']
    ]

    tests.forEach(([test, expected]) => expect(slug(test)).toEqual(expected))
  })

  it('never results in duplicate dashes', () => {
    const tests = [
      ['abc  def  ', 'abc-def'],
      [' DeF   GHI', 'def-ghi']
    ]

    tests.forEach(([test, expected]) => expect(slug(test)).toEqual(expected))
  })
})

describe('ellipsify()', () => {
  it('truncates text to max length', () => {
    const input = '0123456789'
    const output = ellipsify(input, 5, '')
    expect(output).toEqual('01234')
  })

  it('appends ellipsis', () => {
    const input = '0123456789'
    const output = ellipsify(input, 5, '---')
    expect(output).toEqual('01---')
  })
})
