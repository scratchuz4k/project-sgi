
let relogio = new THREE.Clock()
let misturador = new THREE.AnimationMixer(cena)
let acoes = []
let loading = true
let sizes
let children = []
let model

let material = {};
material.wood = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('./assets/img/textures/wood.jpg') })
material.roxo = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('./assets/img/textures/roxo.jpg') })
material.nogueira = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('./assets/img/textures/nogueira.jpg') })

let lastMaterialName;

let carregador = new THREE.GLTFLoader()
carregador.load(
    './assets/blender/armario.gltf',
    function (gltf) {
        model = gltf.scene

        let cube = model.getObjectByName('Cube');
        material.mogno = cube.material;
        lastMaterialName = cube.material.name
        gltf.scene.position.set(0, -1, 0)

        cena.add(gltf.scene);

        gltf.animations.forEach((e) => {
            acoes.push(misturador.clipAction(e));
        })

        acoes.forEach((e) => {
            let loop = THREE.LoopOnce
            let clamp = true;
            e.setLoop(loop)
            e.clampWhenFinished = clamp
        })
    }
)

let btnCamaraPos = document.querySelectorAll(".img-thumbnails")

btnCamaraPos.forEach((e) => {
    e.addEventListener('click', (e) => {
        switch (e.target.id) {
            case 'front':
                camara.position.set(0, 3, 5)
                camara.lookAt(0, 0, 0)
                break;
            case 'sideL':
                camara.position.set(-5, 2, 4)
                camara.lookAt(0, 0, 0)
                break;
            case 'sideR':
                camara.position.set(5, 2, 4)
                camara.lookAt(0, 0, 0)
                break;
            case 'back':
                camara.position.set(0, 2, -5)
                camara.lookAt(0, 0, 0)
                break;

        }
        btnCamaraPos.forEach((e) => { e.classList.remove('selected') })
        e.target.classList.add('selected')
    })
})


let btnPlay = document.querySelectorAll(".btn-play")
let boolPortas = false
let boolGavetas = true

btnPlay.forEach((e) => {
    e.addEventListener('click', function () {
        if (e.id == 'gavetas') {
            switch (boolGavetas) {
                case false:
                    toggleAnimation(acoes[2], -1)
                    toggleAnimation(acoes[3], 1)
                    boolGavetas = 'fechar'
                    e.innerHTML = "Fechar Gavetas"
                    break;
                case true:
                    toggleAnimation(acoes[2], 1)
                    toggleAnimation(acoes[3], -1)
                    boolGavetas = false
                    e.innerHTML = "Abrir Gavetas"
                    break;
                case 'fechar':
                    toggleAnimation(acoes[2], -1)
                    toggleAnimation(acoes[3], -1)
                    boolGavetas = true
                    e.innerHTML = "Abrir Gavetas"
                    break;
                default:
                    toggleAnimation(acoes[2], -1)
                    toggleAnimation(acoes[3], -1)
                    boolGavetas = true
                    break
            }
        } else {
            if (!boolPortas) {
                toggleAnimation(acoes[0], 1)
                toggleAnimation(acoes[1], 1)
                boolPortas = !boolPortas
                e.innerHTML = "Fechar Portas"
            } else {
                toggleAnimation(acoes[0], -1)
                toggleAnimation(acoes[1], -1)
                boolPortas = !boolPortas
                e.innerHTML = "Abrir Portas"
            }
        }
    })
})

function toggleAnimation(animation, timeScale,) {
    animation.paused = false
    animation.timeScale = timeScale;
    animation.play()
}

let btnTexture = document.querySelectorAll(".texture-item")

btnTexture.forEach((e) => {
    e.addEventListener('click', function () {
        model.traverse(function (child) {
            if (child.isMesh && child.material.name == lastMaterialName) {
                child.material = material[e.id]
                child.material.name = e.id
            }
        })
        lastMaterialName = e.id
        cena.add(model);
        btnTexture.forEach((e) => { e.classList.remove('active') })
        e.classList.add('active')
    });
})

animar();

function animar() {
    requestAnimationFrame(animar);

    // mostrar... 
    renderer.render(cena, camara);
    controlos.update(0.01)
    misturador.update(relogio.getDelta())

    // update the picking ray with the camera and pointer position
    raycaster.setFromCamera(rato, camara);
}