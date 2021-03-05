//Algorithm for Q1

const symbo = (chemicals, symbols) => {
  let res = []
  for(let i in chemicals) {
    for(let j in symbols) {
      if(chemicals[i].includes(symbols[j])) {
        let temp = chemicals[i].replace(symbols[j], "[" + symbols[j] + "]")
        res.push(temp)
      }
    }
  }
  return res
}

//Solution 2:

const intersection = (arr1, arr2) => {
  let arr = arr1.filter((val) => arr2.includes(val))
  arr = [...new Set(arr)]
  return arr
}

//Solution 3:

const isValidString = (text) => {
  const brackets = {"(": ")","{": "}","[": "]"}
  const arr = []
  const match = (x) => brackets[x] ? arr.push(brackets[x]) : arr.pop() === x
  return [...text].every(match) && !arr.length
}

//Solution 4:

const singleOne = (arr) => {
  let result = arr[0]
  for(let i = 1; i < arr.length; i++) {
    result = result ^ arr[i]
  }
  return result
}