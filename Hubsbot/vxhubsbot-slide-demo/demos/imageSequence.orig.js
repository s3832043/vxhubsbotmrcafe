const imageSequence = async page => {
  // Run code in hubs page
  const interval = await page.evaluate(() => {
    // Images
    const images = [
      'https://www.unistude.com/wp-content/uploads/2021/02/rmit-canvas-login-page.jpg',
      'https://www.thecampusbookstore.com/wp-content/uploads/2020/01/RMIT-logo.jpg'
    ]

    // Function to load assets
    const loadAssetsFromURLs = URLs => URLs.map(src => {
      let object = document.createElement('a-entity')
      AFRAME.scenes[0].append(object)
      object.setAttribute('media-loader', { src, fitToBox: true, resolve: true })
      object.setAttribute('networked', { template: '#interactable-media' })
      return object
    })

    // Load initial image
    let image = loadAssetsFromURLs([images[0]])[0]
    image.setAttribute('scale', '1.5 1.5 1.5')
    image.setAttribute('position', '3 2 -5')
    image.setAttribute('rotation', '0 0 0')

    let index = 1

    // Play the sequence
    const nextFrame = () => {
      image.setAttribute('media-loader', { src: images[index], fitToBox: true, resolve: false })
      index++
      if (index > images.length-1) index = 0
    }

    // Change the image every 2 seconds
    return window.setInterval(nextFrame, 2000)
  })
}

export default imageSequence
