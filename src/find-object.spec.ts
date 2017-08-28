import { findFirst, findAll } from './find-object'
import test from 'ava'

const users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
  { user: 'pebbles', age: 1, active: true }
]

test('findFirst with non-object source', async t => {
  t.is(findFirst(null, {}), undefined)
  t.is(findFirst(undefined, {}), undefined)
  t.is(findFirst(1234, {}), undefined)
  t.is(findFirst(1234.567, {}), undefined)
  t.is(findFirst('a string', {}), undefined)
})

test('findFirst', async t => {
  t.deepEqual(findFirst(users, { age: 36 }), users[0])
  t.deepEqual(findFirst(users, { age: 1 }), users[2])
  t.deepEqual(findFirst(users, { user: 'fred' }), users[1])
  t.deepEqual(findFirst(users, { age: 40, user: 'fred' }), users[1])

  t.is(findFirst(users, { age: 140 }), undefined)
  t.is(findFirst(users, { age: 40, user: 'fred1' }), undefined)
})

test('findAll', async t => {
  const source = {
    a: {
      b: 1,
      c: 2
    },
    d: {
      b: 1,
      c: 2,
      d: 3
    }
  }

  const results = findAll(source, { b: 1 })
  t.deepEqual(results, [{ b: 1, c: 2 }, { b: 1, c: 2, d: 3 }])

  t.deepEqual(findAll(users, { active: true }), [users[0], users[2]])

  t.deepEqual(findAll(users, { activeFooBar: true }), undefined)
})
