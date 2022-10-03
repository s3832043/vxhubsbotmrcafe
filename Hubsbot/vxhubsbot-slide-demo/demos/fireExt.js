const loadFireExt = async page => {
  // Run code in hubs page
  const interval = await page.evaluate(() => {
    // Function to load assets
    const loadAssetsFromURLs = URLs => URLs.map(src => {
      let object = document.createElement('a-entity')
      AFRAME.scenes[0].append(object)
      object.setAttribute('media-loader', { src, fitToBox: true, resolve: true })
      object.setAttribute('networked', { template: '#interactable-media' })
      object.setAttribute('pinnable', true)
      return object
    })

    // Load 2 doors and set positions
    let objects = loadAssetsFromURLs(['https://sketchfab.com/3d-models/fire-extinguisher-8b96ed9d18ee4341b13084658cd64c7e'])
    objects[0].setAttribute('scale', '3 3 3')
    objects[0].setAttribute('position', '3 1 0')

  })
}

export default loadFireExt
