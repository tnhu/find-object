export type KVO = {
  [key: string]: any
}

function findObject(
  source: any,
  obj: KVO,
  findAll?: boolean,
  findAllResults?: Array<any>
): Array<any> | object | undefined {
  var result, index, key, root

  if (findAll && !findAllResults) {
    findAllResults = []
    root = true
  }

  if (Array.isArray(source)) {
    for (index in source) {
      result = findObject(source[index], obj, findAll, findAllResults)

      if (result && !findAll) {
        return result
      }
    }

    return root ? findAllResults : undefined
  }

  if (typeof source !== 'object') {
    return
  }

  if (source && Object.keys(obj).every(key => {
    const val = obj[key]
    return source.hasOwnProperty(key) && (val === Object || val === source[key]) // if Object is the value, find all by key
  })) {
    if (findAll && findAllResults) {
      findAllResults.push(source)
    } else {
      return source
    }
  } else {
    for (key in source) {
      result = findObject(source[key], obj, findAll, findAllResults)

      if (result) {
        if (!findAll) {
          return result
        }
      }
    }
  }

  return findAll && root ? findAllResults : undefined
}

export function findFirst(dataSource: any, obj: KVO) {
  return findObject(dataSource, obj)
}

export function findAll(dataSource: any, obj: KVO) {
  return findObject(dataSource, obj, true)
}
