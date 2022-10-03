const slideDeck = async page => {
  // Run code in hubs page
  const interval = await page.evaluate(() => {

    // Define slide deck
    // let slide1 = [];
    // let slide2 = [];
    let slide_deck = [[], [], []];
    let num_slides = slide_deck.length;
    var slide_index = 0;
    let door_model_url = 'https://sketchfab.com/models/c9c8894a1c2e4e7daa5f89ca60b81a69'
    let helix_url = 'https://sketchfab.com/3d-models/a-dna-sticks-model-74e4602a8c544a12a64d1bac160ee1c6'
    let lab_machine = 'https://sketchfab.com/3d-models/machine-lab-02097b72cb764df79f0188df985014a5'
    let c2_h4_o3 = 'https://sketchfab.com/3d-models/chem1-c2-h4-o3-2ec7a5d11d2545c094df5c17ab37c2af'
    // let mr_molecule = 'https://sketchfab.com/3d-models/mr-molecule-74d0dfa9d38e407db286eb8d10eba496';
    let bucky_ball = 'https://sketchfab.com/3d-models/buckyball-22d563fc2e4e4dda9bdb1f9dfaacb150';
    let graphine = 'https://sketchfab.com/3d-models/graphene-14ff4c51d42743f88b69efed79f373b1';
    let bn_nanotube = 'https://sketchfab.com/3d-models/bn-nanotube-833e0a21357b4b6f843e9c010be7ff30';

    
    // Bot speak function
    const say = (message) => {
      window.APP.hubChannel.sendMessage(message)
    }

    // Function to load assets
    const loadAssetsFromURLs = URLs => URLs.map(src => {
      let object = document.createElement('a-entity')
      AFRAME.scenes[0].append(object)
      object.setAttribute('media-loader', { src, fitToBox: true, resolve: true })
      object.setAttribute('networked', { template: '#interactable-media' })
      return object
    })

    // door_model_url, {'scale':'3 3 3', 'position':'3.5 1 -1', 'rotation':'0 90 0'}
    // door_model_url, {'scale':'3 3 3', 'position':'3.5 1 0', 'rotation':'0 90 0'}
    // helix_url,      {'scale':'4 4 4', 'position':'-0.5 1 2.8' }
    // c2_h4_o3,       {'scale':'5 5 5', 'position':'-2 1 -2.9' }
    // lab_machine,    {'scale':'3 3 3', 'position':'-3 1 2.4' }

    //
    // const loadSlide1 = () => {
    //   slide_deck[0] = loadAssetsFromURLs([door_model_url, door_model_url])
    //   slide_deck[0][0].setAttribute('scale', '3 3 3')
    //   slide_deck[0][1].setAttribute('scale', '3 3 3')

    //   slide_deck[0][0].setAttribute('position', '3.5 1 -1')
    //   slide_deck[0][1].setAttribute('position', '3.5 1 0')

    //   slide_deck[0][0].setAttribute('rotation', '0 90 0')
    //   slide_deck[0][1].setAttribute('rotation', '0 90 0')
    // }
    const loadSlide1 = () => {
      say("slide 1/3");
      slide_deck[0] = loadAssetsFromURLs([bucky_ball])
      slide_deck[0][0].setAttribute('scale', '4 4 4')
      slide_deck[0][0].setAttribute('position', '-1.7 1.5 0')
      slide_deck[0][0].setAttribute('rotation', '0 90 0')

    }

    // 
    const loadSlide2 = () => {
      say("slide 2/3");
      slide_deck[1] = loadAssetsFromURLs([graphine])
      slide_deck[1][0].setAttribute('scale', '10 10 10')
      slide_deck[1][0].setAttribute('position', '-1.7 1 0')
      slide_deck[1][0].setAttribute('rotation', '0 0 0')

    }

    const loadSlide3 = () => {
      say("slide 3/3");
      slide_deck[2] = loadAssetsFromURLs([bn_nanotube])
      slide_deck[2][0].setAttribute('scale', '10 10 10')
      slide_deck[2][0].setAttribute('position', '-1.7 1 0')
      slide_deck[2][0].setAttribute('rotation', '0 0 0')
    }

    // Remove objects in slide n
    const removeSlide = n => {
      slide_deck[n].forEach((obj)=>{
        obj.parentNode.removeChild(obj);
      })
    }
    
    // 
    const loadSlide = n => {
      switch(n) {
        case 0:
          console.log("loading slide 1")
          loadSlide1();
          break;
        case 1:
          console.log("loading slide 2")
          loadSlide2();
          break;
        case 2:
          console.log("loading slide 3")
          loadSlide3();
          break;
        default:
          // code block
      }
    }

    // Load first slide on spawn
    loadSlide(slide_index);

    // Play the sequence
    const incrementFrame = () => {
      const avatars = Array.from(document.querySelectorAll('[networked-avatar]'))
      avatars.forEach((a, i)=>{
        let posObj = a.getAttribute('position')
        let pos = `(${posObj.x.toFixed(2)}, ${posObj.y.toFixed(2)}, ${posObj.z.toFixed(2)})`
        console.log(pos);
      });

      // remove current slide objs
      removeSlide(slide_index)

      // increment and wrap overflow
      slide_index++
      if (slide_index >= num_slides){
        slide_index = 0
      }

      // load objects from next slide
      loadSlide(slide_index);
    }

    // Change the slide every 5 seconds
    return window.setInterval(incrementFrame, 10000)
  })
}

export default slideDeck
