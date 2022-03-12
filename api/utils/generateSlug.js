const letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'


function choose(choices) {
  var index = Math.floor(Math.random() * choices.length)
  return choices[index]
}

function generateSlug(length) {
  let slug = ''
  for (let i = 0; i < length; i++) {
    slug += choose(letters)
  }

  return slug
}


module.exports = async (model) => {
  const length = model.rawAttributes.slug.type._length
  while (true) {
    const slug = generateSlug(length)
    const candedat = await model.findOne({
      raw: true,
      where: {
        slug,
      },
    })

    if (candedat) continue

    return slug
  }
}
