const imageSequence = async page => {
  // Run code in hubs page
  const interval = await page.evaluate(() => {
    // Images
    const images = [
      'https://uploads-prod.reticulum.io/files/e6a52880-6b70-4793-bb43-43890a8366f4.jpg',
      'https://uploads-prod.reticulum.io/files/2196516d-1ae0-4863-bf19-1b44816a59d5.jpg'
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
    image.setAttribute('scale','5.5')
    image.setAttribute('position', '2.5 2.5 25.4')
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
