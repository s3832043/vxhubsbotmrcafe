//var anime = require("animejs").default;

const proximityDoors = async page => {
  console.log('Running proximity door demo...')

  // Run code in hubs page
  const interval = await page.evaluate(() => {

    // Function to load assets
    const loadAssetsFromURLs = URLs => URLs.map(src => {
      console.log('loadAssetsFromURLs')
      let object = document.createElement('a-entity')
      AFRAME.scenes[0].append(object)
      object.setAttribute('media-loader', { src, fitToBox: true, resolve: true })
      object.setAttribute('networked', { template: '#interactable-media' })
      return object
    })

    // Load 2 doors and set positions
    console.log("loading door models")
    let door_model_url = 'https://sketchfab.com/3d-models/door-boarder-4ca063d2c3674ad5bbbe081f9d12da0c'
    let doors = loadAssetsFromURLs([door_model_url, door_model_url,door_model_url,door_model_url,door_model_url,door_model_url])

        console.log("loading distance judgment point for each door ")
        let point_model_url = 'https://sketchfab.com/3d-models/kai-yuan-tong-bao-coin-e779cda40c03429690d845f5766fe855'
        let points = loadAssetsFromURLs([point_model_url, point_model_url, point_model_url])

          //cafe door point
        points[0].setAttribute('scale','0.01 0.01 0.01')
        points[0].setAttribute('position','4.5 1 8.9')
        points[0].setAttribute('rotation','0 90 0')

          //first floor door point
        points[1].setAttribute('scale','0.01 0.01 0.01')
        points[1].setAttribute('position','-6 1 25.5')
        points[1].setAttribute('rotation','0 90 0')

          //second floor door point
        points[2].setAttribute('scale','0.01 0.01 0.01')
        points[2].setAttribute('position','-6 1 2')
        points[2].setAttribute('rotation','0 0 0')


          //cafe door
        doors[0].setAttribute('scale', '5.8 5.8 5.8')
        doors[0].setAttribute('position', '4.5 1.6 8.2')
        doors[0].setAttribute('rotation', '0 0 0')

        doors[1].setAttribute('scale', '5.8 5.8 5.8')
        doors[1].setAttribute('position', '4.5 1.6 9.7')
        doors[1].setAttribute('rotation', '0 0 0')

        //First Floor Door
        doors[2].setAttribute('scale', '8 8 8')
        doors[2].setAttribute('position', '-5 2.3 25.5')
        doors[2].setAttribute('rotation', '0 90 0')

        doors[3].setAttribute('scale', '8 8 8')
        doors[3].setAttribute('position', '-6.7 2.3 25.5')
        doors[3].setAttribute('rotation', '0 90 0')

        //Second floor door
        doors[4].setAttribute('scale', '8 8 8')
        doors[4].setAttribute('position', '-7 2.3 3')
        doors[4].setAttribute('rotation', '0 90 0')

        doors[5].setAttribute('scale', '8 8 8')
        doors[5].setAttribute('position', '-5 2.3 3')
        doors[5].setAttribute('rotation', '0 90 0')

          let open_cafe = false
          let open_first = false
          let open_second = false

    // Constantly check if any users are less than 2 meters away from either door
    const checkPosition = () => {
      //console.log('prox tick')
      const avatars = Array.from(document.querySelectorAll('[networked-avatar]'))
      //console.log(`there are ${avatars.length} avatar(s) loaded in the scene.`)

        let cafeDoors_activated = false;
        let first_floor_door_activated = false;
        let second_floor_door_activated = false;

      avatars.forEach((a, i)=>{
        let posObj = a.getAttribute('position')
        let pos = `(${posObj.x.toFixed(2)}, ${posObj.y.toFixed(2)}, ${posObj.z.toFixed(2)})`

        let rotObj = a.getAttribute('rotation')
        let rot = `(${rotObj.x.toFixed(2)}, ${rotObj.y.toFixed(2)}, ${rotObj.z.toFixed(2)})`


        let distToCafe = posObj.distanceTo(points[0].getAttribute('position'))
        let distToFirstFloor = posObj.distanceTo(points[1].getAttribute('position'))
        let distToSecondFloor = posObj.distanceTo(points[2].getAttribute('position'))


        if (distToCafe < 6){cafeDoors_activated = true}
        if (distToFirstFloor < 6) {first_floor_door_activated = true}
        if (distToSecondFloor < 6) {second_floor_door_activated = true}

        //console.log(` [User ${i+1}] distance: ${dist.toFixed(4)}`);
      });

      // Open & close the cafe doors
      if (cafeDoors_activated && !open_cafe) {
        console.log("opening doors.")
        open_cafe = true
        doors[0].setAttribute('position', '4.5 1.6 6.7')
        doors[1].setAttribute('position', '4.5 1.6  11.3')
      }


      if (!cafeDoors_activated && open_cafe) {
        console.log("closing doors.")
        open_cafe = false
        doors[0].setAttribute('position', '4.5 1.6 8.2')
        doors[1].setAttribute('position', '4.5 1.6 9.7')
      }
            //open & close the first floor doors
        if (first_floor_door_activated && !open_first) {
          console.log("opening first floor doors.")
          open_first = true
                    doors[2].setAttribute('position', '-3 2.3 25.5')
          doors[3].setAttribute('position', '-9 2.3 25.5')
                    }

        if (!first_floor_door_activated && open_first){
                console.log("closing first floor doors.")
                open_first = false
                doors[2].setAttribute('position', '-5 2.3 25.5')
                doors[3].setAttribute('position', '-6.7 2.3 25.5')                                                          }

            //open & close the second floor doors
            if (second_floor_door_activated && !open_second) {
                console.log("opening second floor doors.")
                open_second = true
                doors[4].setAttribute('position', '-9 2.3 3')
                doors[5].setAttribute('position', '-3 2.3 3')
        }

             if (!second_floor_door_activated && open_second){
                console.log("closing second floor doors.")
                open_second = false
                doors[4].setAttribute('position', '-7 2.3 3')
                doors[5].setAttribute('position', '-5 2.3 3')
        }

    }

    // Check player positions every 200 milliseconds
    console.log('checkPosition loop launch...',window)
    return window.setInterval(checkPosition, 50)
  })
}

export default proximityDoors
                                                                                                                                                                                                                           157,16        Bot                                                                                                                                                                                                                 118,16        64%
