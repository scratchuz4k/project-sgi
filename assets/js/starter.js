const sizeX = 600
const sizeY = 400
let renderer
let cena
let misturador

/* CAMARA */
const camara = new THREE.PerspectiveCamera(70, sizeX / sizeY, 0.01, 100);
let controlos

function initCamara() {
    // criar uma camara... 
    camara.position.z = 4
    camara.position.x = -5
    camara.position.y = 2
    camara.lookAt(0, 0, 0)
    controlos = new THREE.OrbitControls(camara, renderer.domElement)

    /* PONTO DE LUZ */
    const pontoLuz2 = new THREE.AmbientLight("white")
    cena.add(pontoLuz2)

    misturador = new THREE.AnimationMixer(cena)
}

/* CANVAS */
function initRenderer() {
    let meuCanvas = document.getElementById('meuCanvas')
    renderer = new THREE.WebGLRenderer({ canvas: meuCanvas, alpha: true })
    renderer.setSize(sizeX, sizeY);
    renderer.shadowMap.enabled = true
    renderer.setClearColor(0xffffff, 0);
    cena = new THREE.Scene();
    initCamara()
}

