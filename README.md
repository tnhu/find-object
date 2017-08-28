# find-object

Find object(s) in a JSON tree.

## Install

```sh
npm i --save find-object
```

or

```sh
yarn add find-object
```

## Usage

```javascript
import { findFirst, findAll } from 'find-object'

const users = [
  { user: 'barney',  age: 36, active: true },
  { user: 'fred',    age: 40, active: false },
  { user: 'pebbles', age: 1,  active: true }
]

findFirst(users, { user: 'fred }) // user[1]
findAll(users, { active: true })  // [ user[0], users[2] ]
```

## License

MIT