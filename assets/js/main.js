
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

        gltf.scene.children.forEach((e) => {
            if (e.name != 'Cube') {
                e.addEventListener("click", function () { console.log("teste") })
                children.push(e)
            }
        });
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


let btnPlay = document.getElementById("btn_play")

btnPlay.addEventListener('click', function () {
    acoes[0].play()
    acoes[1].play()
    acoes[2].play()
    acoes[3].play()
})

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

function onPointerMove(event) {

    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    rato.x = (event.clientX / window.innerWidth) * 2 - 1;
    rato.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(rato, camara);

    const intersects = raycaster.intersectObjects(children)
    for (let i = 0; i < intersects.length; i++) {
        console.log(intersects)
    }
}

window.addEventListener('mousemove', onPointerMove);

// iniciar animação... 
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