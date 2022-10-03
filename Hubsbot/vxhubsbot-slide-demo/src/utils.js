// Thanks to Fabien Benetou (https://gist.github.com/Utopiah/1cfc123239fa2994569fc7c5c60b2928)

export const getUserMedia = () => document.querySelectorAll('[media-loader][id^=naf]')

export const resetUserMediaRotation = () => {
  getUserMedia().forEach(m => m.setAttribute('rotation', '0 0 0'))
}

export const removeEntitiesFromMediaList = entities => {
  entities.forEach(e => e.removeComponent('listed-media'))
}

export const setPinEntities = (entities, pinned) => {
  entities.forEach(e => e.setAttribute('pinnable', { pinned: pinned }))
}

export const loadAssetsFromURLs = URLs => URLs.map(src => {
  let object = document.createElement('a-entity')
  AFRAME.scenes[0].append(object)
  object.setAttribute('media-loader', { src, fitToBox: true, resolve: true })
  object.setAttribute('networked', { template: '#interactable-media' })
  return object
})

export const getAvatarFromName = name => {
  const avatar = document.querySelectorAll('[networked-avatar]').find(avatar =>
    document.querySelector(`#${avatar.id}`)?.components['player-info'].displayName.trim() === name.trim()
  )
  return document.querySelector(`#${avatar.id}`)
}

export const getFirstElementFromHash = hash =>
  AFRAME.scenes[0].querySelectorAll('[media-loader]').find(el =>
    el.components['media-loader'].attrValue.src.match(hash)
  )

export const objects3DFromPartialName = name => {
  let matches = []
  AFRAME.scenes[0].object3D.traverse(o => {
    const match = o.name.match(name)
    if (match && match.length && o.type == 'Object3D') {
      matches.push(o)
    }
  })
  return matches
}

export const getFirstElementFromPartialURL = partialURL =>
  document.querySelectorAll('[media-loader]').find(media =>
    media.components['media-loader'].attrValue.src.match(partialURL)
  )

export const setName = displayName => {
  window.APP.store.update({
    activity: {
      hasChangedName: true,
      hasAcceptedProfile: true,
    },
    profile: {
      displayName,
    }
  })
}
