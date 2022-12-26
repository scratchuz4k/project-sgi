
let relogio = new THREE.Clock()
let misturador = new THREE.AnimationMixer(cena)
let acoes = []
let loading = true
let sizes
let children = []

let carregador = new THREE.GLTFLoader()
carregador.load(
    './assets/blender/armario.gltf',
    function (gltf) {
        gltf.scene.children.forEach((e) => {
            if (e.name != 'Cube') {
                e.addEventListener("click", function () { console.log("teste") })
                children.push(e)
            }
        });
        console.log(children)
        debugger
        gltf.scene.position.set(0, -1, 0)
        let bbox = new THREE.Box3().setFromObject(gltf.scene);
        let helper = new THREE.Box3Helper(bbox, new THREE.Color(0, 255, 0));
        cena.add(gltf.scene);
        gltf.animations.forEach((e) => {
            acoes.push(misturador.clipAction(e));
        })
        sizes = bbox.getSize(new THREE.Vector3()); // HEREyou get the size
        // cena.add(helper);
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
    })
})



let btnPlay = document.getElementById("btn_play")

btnPlay.addEventListener('click', function () {
    acoes[0].play()
    acoes[1].play()
    acoes[2].play()
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