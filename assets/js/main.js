
let relogio = new THREE.Clock()
let misturador = new THREE.AnimationMixer(cena)
let acoes = []
let loading = true
let sizes

let carregador = new THREE.GLTFLoader()
carregador.load(
    './assets/blender/armario.gltf',
    function (gltf) {
        model = gltf.scene;
        console.log(gltf);
        loading = false
        model.position.set(0, -1, 0)
        let bbox = new THREE.Box3().setFromObject(model);
        let helper = new THREE.Box3Helper(bbox, new THREE.Color(0, 255, 0));
        sizes = bbox.getSize(new THREE.Vector3()); // HEREyou get the size
        cena.add(model);
        cena.add(helper);
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
        console.log(e.target)
    })
})


// iniciar animação... 
animar();

function animar() {
    requestAnimationFrame(animar);

    // mostrar... 
    renderer.render(cena, camara);
    controlos.update(0.01)
    misturador.update(relogio.getDelta())
}