export const toLowerCamelCase = (input: string) : string => {
    return input[0].toLowerCase() + input.substring(1)
}
  
export const nestObject = (original: any, propNames: string[]): any => {
    const result: { [key: string]: any } = {}
  
    for (const [k, v] of Object.entries(original)) {
      let matched = false
  
      for (const propName of propNames) {
        if (k.startsWith(propName) && v != null) {
          const nested = result[propName] || {}
          const nestedKey = toLowerCamelCase(k.substring(propName.length))
          nested[nestedKey] = v
          result[propName] = nested
          matched = true
          break
        }
      }
  
      if (!matched) {
        result[k] = v
      }
    }
  
    return result
  }
  
export const flattenId = (original: any, propName: string) : any => {
    const result = {...original}
    const nested = result[propName]
    delete result[propName]
    if(nested && nested.id){
      result[`${propName}Id`] = nested.id
    }
    return result
}