const proximityDoors = async page => {
  // Run code in hubs page
  const interval = await page.evaluate(() => {

    // https://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file
    function dynamicallyLoadScript(url) {
      var script = document.createElement("script");  // create a script DOM node
      script.src = url;  // set its src to the provided URL
      document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
      console.log("dynamicallyLoadScript");
    }

    console.log("dynamicallyLoadScript...");
    dynamicallyLoadScript('https://github.com/RobotWebTools/roslibjs/blob/develop/build/roslib.min.js');

    var tfclient;
    var watchdog_topic;
    var ros;

    function connectROS() {
      ros = new ROSLIB.Ros({
	//url : 'ws://10.42.170.5:9090'
	url : 'ws://gazebo:9090'
      });
      //
      ros.on('connection', function() {
	ros_connected = true;
	console.log('Connected to ROS.');
	//var tf = new ROSLIB.Topic({"ros":ros, "name":"/tf", "messageType":"core_msgs/Transform"});
	//var tf = new ROSLIB.Topic({"ros":ros, "name":"/tf", "messageType":"tf2_msgs/TFMessage"});
	console.log('Watchdog subscribe...');
	watchdog_topic = new ROSLIB.Topic({"ros":ros, "name":"/watchdog", "messageType":"std_msgs/String"});
	watchdog_topic.subscribe(watchdog_rx);
	console.log('TFClient...');
	tfclient = new ROSLIB.TFClient({
	  ros : ros,
	  fixedFrame : 'map',
	  //fixedFrame : 'base',
	  angularThres : 0.01,
	  transThres : 0.01,
	  rate : 3.0
	});
	console.log('tfsubs: '+JSON.stringify(tfsubs));
	for (fid in tfsubs) {
	  tfclient.subscribe(fid,tfrelay(fid));
	}
      });
      //
      ros.on('error', function(error) {
	console.log('Error connecting to ROS websocket server: ', error);
      });
      //
      ros.on('close', function() {
	console.log('Connection to websocket server closed.');
      });
    }
    //connectROS();



    // Function to load assets
    const loadAssetsFromURLs = URLs => URLs.map(src => {
      let object = document.createElement('a-entity')
      AFRAME.scenes[0].append(object)
      object.setAttribute('media-loader', { src, fitToBox: true, resolve: true })
      object.setAttribute('networked', { template: '#interactable-media' })
      return object
    })

    // Load 2 doors and set positions
    let doors = loadAssetsFromURLs(['https://sketchfab.com/models/c9c8894a1c2e4e7daa5f89ca60b81a69', 'https://sketchfab.com/models/c9c8894a1c2e4e7daa5f89ca60b81a69'])
    doors[0].setAttribute('scale', '3 3 3')
    doors[1].setAttribute('scale', '3 3 3')
    doors[0].setAttribute('position', '3 1 0')
    doors[1].setAttribute('position', '4 1 0')

    let open = false

    // Constantly check if any users are less than 2 meters away from either door
    const checkPosition = () => {
      const proximity = Array.from(document.querySelectorAll('[networked-avatar]')).some(avatar => avatar.getAttribute('position').distanceTo(doors[0].getAttribute('position')) < 2 || avatar.getAttribute('position').distanceTo(doors[1].getAttribute('position')) < 2)
      if (proximity && !open) {
        open = true
        // Open the doors
        const door0Anim = AFRAME.ANIME.default.timeline({ targets: doors[0].object3D.position, autoplay: false })
        const door1Anim = AFRAME.ANIME.default.timeline({ targets: doors[1].object3D.position, autoplay: false })
        door0Anim.add({ x: 2.5, y: 1, z: 0 })
        door1Anim.add({ x: 4.5, y: 1, z: 0 })
        door0Anim.restart()
        door1Anim.restart()
      }
      if (!proximity && open) {
        open = false
        // Close the doors
        const door0Anim = AFRAME.ANIME.default.timeline({ targets: doors[0].object3D.position, autoplay: false })
        const door1Anim = AFRAME.ANIME.default.timeline({ targets: doors[1].object3D.position, autoplay: false })
        door0Anim.add({ x: 3, y: 1, z: 0 })
        door1Anim.add({ x: 4, y: 1, z: 0 })
        door0Anim.restart()
        door1Anim.restart()
      }
    }

    // Check player positions every 200 milliseconds
    return window.setInterval(checkPosition, 200)
  })
}

export default proximityDoors
