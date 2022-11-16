let relogio = new THREE.Clock()
let misturador = new THREE.AnimationMixer(cena)
let acoes = []
let loading = true

let carregador = new THREE.GLTFLoader()
carregador.load(
    './assets/blender/armario.gltf',
    function (gltf) {
        console.log(loading)
        loading = false
        cena.add(gltf.scene)
        console.log(loading)
        // acao1 = THREE.AnimationClip.findByName(gltf.animations, 'LocY')
        // acoes[1] = misturador.clipAction(acao1)
        // acao2 = THREE.AnimationClip.findByName(gltf.animations, 'LocZ')
        // acoes[2] = misturador.clipAction(acao2)
        // acao = THREE.AnimationClip.findByName(gltf.animations, 'RotZ')
        // acoes[3] = misturador.clipAction(acao)
    }
)


// iniciar animação... 
animar();

function animar() {
    requestAnimationFrame(animar);

    // mostrar... 
    renderer.render(cena, camara);
    // controlos.update(0.01)
    misturador.update(relogio.getDelta())
}