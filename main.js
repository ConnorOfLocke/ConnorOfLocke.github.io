let scene, camera, renderer, cube;
let viewSize = 200;
let origRatio;

function Init(){
    scene = new THREE.Scene();
    /*
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight,
        0.1,
        1000 );
    */
    const aspectRatio = window.innerWidth / window.innerHeight;
    origRatio = aspectRatio;
    camera = new THREE.OrthographicCamera(
        -aspectRatio * viewSize / 2,
        aspectRatio * viewSize / 2,
        viewSize / 2,
        -viewSize / 2,
        0.1,
        1000
    );
    /*
    camera = new THREE.OrthographicCamera(
        window.innerWidth / -(0.5 * frustrum),
        window.innerWidth / (0.5 * frustrum),
        window.innerHeight / (0.5 * frustrum),
        window.innerHeight / -(0.5 * frustrum),
        -500,
        1000 );
    */
    camera.position.z = -10;
    camera.position.x = 0;
    camera.position.y = 0;
    camera.lookAt(scene.position);

    renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer({antialiasing: true}) : new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(10,10,10);
    //const material = new THREE.MeshBasicMaterial( {color: 0x00ff00});
    const texture = new THREE.TextureLoader().load('img/Test512x512.png');
    //const texture = THREE.ImageUtils.loadTexture('img/Test512X512.png');
    const material = new THREE.MeshBasicMaterial({ map: texture });

    scene.background = new THREE.Color(0x2a9d8f);

    var bottomLeft = new THREE.Vector3(-1, -1, 0).unproject(camera);
    var topLeft = new THREE.Vector3(-1, 1, 0).unproject(camera);
    var bottomRight = new THREE.Vector3(1, -1, 0).unproject(camera);
    var topRight = new THREE.Vector3(1, 1, 0).unproject(camera);
    bottomLeft.z = topLeft.z = bottomRight.z = topRight.z = 0;

    const linePoints = [];
    linePoints.push(topLeft); 
    linePoints.push(new THREE.Vector3(0, 0, 0));
    linePoints.push(bottomRight);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);

    var line = new THREE.Line(lineGeometry, material);
    scene.add(line);

    cube = new THREE.Mesh(geometry, material);
    var upCube = new THREE.Mesh(geometry, material);
    upCube.position.y += 20;

    scene.add(cube);
    scene.add(upCube);
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

    const aspectRatio = window.innerWidth / window.innerHeight;
    camera.left  = -aspectRatio * viewSize / 2;
    camera.right = aspectRatio * viewSize / 2;
    camera.top = viewSize / 2;
    camera.bottom = -viewSize / 2;
    camera.updateProjectionMatrix();


    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

Init();
animate();