export default (input, key) => {
  var unique = []
  var exists = []

  for (let i = 0; i < input.length; i++) {
    if (exists.includes(input[i][key])) {
      exists.push(input[i][key])
      unique.push(input[i])
    }
  }

  return unique
} 
