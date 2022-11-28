let sizeX = 600
let sizeY = 400

/* CANVAS */
let meuCanvas = document.getElementById('meuCanvas')
let renderer = new THREE.WebGLRenderer({ canvas: meuCanvas, alpha: true })
// const renderer = new THREE.WebGLRenderer({ alpha: true });

const initRenderer = () => {
    renderer.setSize(sizeX, sizeY);
    renderer.shadowMap.enabled = true
    renderer.setClearColor(0xffffff, 0);
    // document.body.appendChild(renderer.domElement);
}
initRenderer()

/* CENA */
const cena = new THREE.Scene();


/* CAMARA */
const camara = new THREE.PerspectiveCamera(70, sizeX / sizeY, 0.01, 100);
const controlos = new THREE.OrbitControls(camara, renderer.domElement)

const initCamara = () => {
    // criar uma camara... 
    camara.position.z = 4
    camara.position.x = -5
    camara.position.y = 2
    camara.lookAt(0, 0, 0)
}

initCamara()

/* PONTO DE LUZ */
// const pontoLuz1 = new THREE.PointLight("white")
// pontoLuz1.castShadow = true
// pontoLuz1.position.set(4, 5, 4)
// cena.add(pontoLuz1)

const pontoLuz2 = new THREE.AmbientLight("white")
// pontoLuz2.castShadow = true
// pontoLuz2.position.set(-4, 0, -4)
cena.add(pontoLuz2)
/* RAYCASTER */
let raycaster = new THREE.Raycaster()
let rato = new THREE.Vector2()

/* GRID HELPER */
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper(size, divisions);
// cena.add(gridHelper);

