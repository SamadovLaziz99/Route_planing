const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default (e) => {
  return new Promise((resolve, reject) => {
    // const image = new FormData()
    // image.append('image', e.file)
    getBase64(e, imageUrl => {
      resolve({
        image: imageUrl
      })
    })
  })
}
