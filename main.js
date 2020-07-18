let scene, camera, renderer, cube;
let frustrum = 200;

function Init(){
    scene = new THREE.Scene();
    /*
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight,
        0.1,
        1000 );
    */

    camera = new THREE.OrthographicCamera(
        window.innerWidth / -(0.5 * frustrum),
        window.innerWidth / (0.5 * frustrum),
        window.innerHeight / (0.5 * frustrum),
        window.innerHeight / -(0.5 * frustrum),
        -500,
        1000 );
    
    camera.position.z =  -5;
    camera.position.y =  0;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1,1,1);
    //const material = new THREE.MeshBasicMaterial( {color: 0x00ff00});
    const texture = new THREE.TextureLoader().load('img/Test512x512.png');
    //const texture = THREE.ImageUtils.loadTexture('img/Test512X512.png');
    const material = new THREE.MeshBasicMaterial({ map: texture });

    scene.background = new THREE.Color(0x2a9d8f);

    const linePoints = [];
    linePoints.push(new THREE.Vector3(-10, 0, 0)); 
    linePoints.push(new THREE.Vector3(0, 5, 0));
    linePoints.push(new THREE.Vector3(10, 0, 0));
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);

    var line = new THREE.Line(lineGeometry, material);
    scene.add(line);

    cube = new THREE.Mesh(geometry, material);
    cube1 = new THREE.Mesh(geometry, material);    
    cube2 = new THREE.Mesh(geometry, material);
    cube3 = new THREE.Mesh(geometry, material);
    cube4 = new THREE.Mesh(geometry, material);
    cube5 = new THREE.Mesh(geometry, material);
    cube6 = new THREE.Mesh(geometry, material);

    cube1.position.x += 5;
    cube2.position.x -= 5;
    cube3.position.y += 5;
    cube4.position.y -= 5;
    cube5.position.z += 5;
    cube6.position.z -= 5;

    scene.add(cube);
    scene.add(cube1);
    scene.add(cube2);
    scene.add(cube3);
    scene.add(cube4);
    scene.add(cube5);
    scene.add(cube6);
}

function animate()
{
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.03;

    renderer.render(scene, camera);
}

function onWindowResize() {
    //camera.aspect = window.innerWidth / window.innerHeight;
    camera.left  = window.innerWidth  / -(0.5 * frustrum),
    camera.right = window.innerWidth  /  (0.5 * frustrum),
    camera.top   = window.innerHeight /  (0.5 * frustrum),
    camera.right = window.innerHeight / -(0.5 * frustrum),
    camera.upda();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

Init();
animate();