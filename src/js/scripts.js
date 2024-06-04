import gsap from 'gsap';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as YUKA from 'yuka';
import {
    ANSWERSTEXT,
    AUDIOS,
    BLINKINGLIGHTS,
    BLUEVEHICLESPATHS,
    LISTENER,
    REDVEHICLESPATHS,
    WHEELS,
    YELLOWVEHICLESPATHS
} from './constants';

import { OrbitControls } from 'three/examples/jsm/Addons.js';

const entityManager = new YUKA.EntityManager();
const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.querySelector('.progress-bar-container');
const loadingManager = new THREE.LoadingManager();

const startButton = document.querySelector('.header button');
const title = document.querySelector('.header h1');

const explanation = document.querySelector('.explanation');
const nextQuestionBtn = document.querySelector('.explanation button');
const question = document.querySelector('.questions p');

const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');

const option1Symbol = document.getElementById('a1-symbol');
const option2Symbol = document.getElementById('a2-symbol');
const option3Symbol = document.getElementById('a3-symbol');

const option1Text = document.getElementById('a1-text');
const option2Text = document.getElementById('a2-text');
const option3Text = document.getElementById('a3-text');

let clicked = true;
let questionNumber = 1;
let cameraX = 3;
let cameraZ = 144;

const yellowCars = [];
const redCars = [];
const blueCars = [];
let carToAnimate = 0;

const blinkGeo = new THREE.SphereGeometry(0.1);
const blinkMat = new THREE.MeshBasicMaterial({color: 0xFF8300});
const blinkMesh = new THREE.Mesh(blinkGeo, blinkMat);

const score = document.querySelector('.score span');
let scoreVal = 0;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0x94D8FB);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// const controls = new OrbitControls( camera, renderer.domElement );
// Camera positioning
camera.position.set(3, 10, 218);
camera.lookAt(scene.position)
// controls.update();

// Add sound
camera.add(LISTENER);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0x94D8FB, 0x9CFF2E, 1);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.9);
scene.add(directionalLight);

renderer.outputColorSpace = THREE.SRGBColorSpace;

loadingManager.onProgress = function(url, loaded, total) {
    progressBar.value = (loaded/total) * 100;
}

loadingManager.onLoad = function() {
    progressBarContainer.style.display = 'none';
}

// Loader
const loader = new GLTFLoader(loadingManager);
const dLoader = new DRACOLoader();
dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
dLoader.setDecoderConfig({type: 'js'});
loader.setDRACOLoader(dLoader);

loader.load('./assets/map.glb', function(glb) {
    const model = glb.scene;
    scene.add(model);
});

// Car
function sync(entity, renderComponent) {
    renderComponent.matrix.copy(entity.worldMatrix);
}

function createBlinkingLight(group, positions) {
    const bClone1 = blinkMesh.clone();
    bClone1.position.copy(positions.front);
    group.add(bClone1);

    const bClone2 = blinkMesh.clone();
    bClone2.position.copy(positions.back);
    group.add(bClone2);
}

function createCarV(model, path, entityManager, yRotation, blinkingLight) {
    const group = new THREE.Group();
    scene.add(group);
    group.matrixAutoUpdate = false;

    const car = SkeletonUtils.clone(model);
    group.add(car);

    const v = new YUKA.Vehicle();
    v.setRenderComponent(group, sync);

    entityManager.add(v);

    const followPathBehavior = new YUKA.FollowPathBehavior(path, 2);
    const onPathBehavior = new YUKA.OnPathBehavior(path);
    onPathBehavior.radius = 0.1;

    v.position.copy(path.current());
    v.maxSpeed = 5;
    v.steering.add(onPathBehavior);
    v.steering.add(followPathBehavior);

    followPathBehavior.active = false;

    v.rotation.fromEuler(0, yRotation, 0);

    if(blinkingLight)
        createBlinkingLight(group, blinkingLight);

    const vehicleAll = {vehicle: v, modelGroup: car};
    return vehicleAll;
}


loader.load('./assets/SUV.glb', function(glb) {
    const model = glb.scene;
    const v1 = createCarV(model, YELLOWVEHICLESPATHS[0], entityManager, Math.PI);
    const v2 = createCarV(model, YELLOWVEHICLESPATHS[1], entityManager, Math.PI, BLINKINGLIGHTS.yellow.right);
    const v3 = createCarV(model, YELLOWVEHICLESPATHS[2], entityManager, Math.PI / 2, BLINKINGLIGHTS.yellow.left);
    const v4 = createCarV(model, YELLOWVEHICLESPATHS[3], entityManager, Math.PI, BLINKINGLIGHTS.yellow.left);
    const v5 = createCarV(model, YELLOWVEHICLESPATHS[4], entityManager, -Math.PI / 2, BLINKINGLIGHTS.yellow.right);
    const v6 = createCarV(model, YELLOWVEHICLESPATHS[5], entityManager, Math.PI, BLINKINGLIGHTS.yellow.left);
    const v7 = createCarV(model, YELLOWVEHICLESPATHS[6], entityManager, -Math.PI / 2);
    const v8 = createCarV(model, YELLOWVEHICLESPATHS[7], entityManager, -Math.PI / 2, BLINKINGLIGHTS.yellow.left);
    const v9 = createCarV(model, YELLOWVEHICLESPATHS[8], entityManager, Math.PI);
    const v10 = createCarV(model, YELLOWVEHICLESPATHS[9], entityManager, Math.PI);
    yellowCars.push(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10);
});

loader.load('./assets/red.glb', function(glb) {
    const model = glb.scene;
    const v1 = createCarV(model, REDVEHICLESPATHS[0], entityManager, 0, BLINKINGLIGHTS.red.left);
    const v2 = createCarV(model, REDVEHICLESPATHS[1], entityManager, 0, BLINKINGLIGHTS.red.left);
    const v3 = createCarV(model, REDVEHICLESPATHS[2], entityManager, -Math.PI / 2, BLINKINGLIGHTS.red.right);
    const v4 = createCarV(model, REDVEHICLESPATHS[3], entityManager, 0);
    const v5 = createCarV(model, REDVEHICLESPATHS[4], entityManager, Math.PI / 2, BLINKINGLIGHTS.red.left);
    const v6 = createCarV(model, REDVEHICLESPATHS[5], entityManager, 0, BLINKINGLIGHTS.red.right);
    const v7 = createCarV(model, REDVEHICLESPATHS[6], entityManager, Math.PI / 2);
    const v8 = createCarV(model, REDVEHICLESPATHS[7], entityManager, Math.PI / 2);
    const v9 = createCarV(model, REDVEHICLESPATHS[8], entityManager, -Math.PI / 2, BLINKINGLIGHTS.red.left);
    const v10 = createCarV(model, REDVEHICLESPATHS[9], entityManager, 0, BLINKINGLIGHTS.red.left);
    redCars.push(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10);
});

loader.load('./assets/blue.glb', function(glb) {
    const model = glb.scene;
    const v1 = createCarV(model, BLUEVEHICLESPATHS[0], entityManager, Math.PI / 2);
    const v2 = createCarV(model, BLUEVEHICLESPATHS[1], entityManager, Math.PI / 2);
    const v3 = createCarV(model, BLUEVEHICLESPATHS[2], entityManager, 0);
    const v4 = createCarV(model, BLUEVEHICLESPATHS[3], entityManager, Math.PI / 2, BLINKINGLIGHTS.blue.left);
    const v7 = createCarV(model, BLUEVEHICLESPATHS[4], entityManager, Math.PI);
    const v8 = createCarV(model, BLUEVEHICLESPATHS[5], entityManager, Math.PI);
    const v9 = createCarV(model, BLUEVEHICLESPATHS[6], entityManager, Math.PI / 2, BLINKINGLIGHTS.blue.right);
    const v10 = createCarV(model, BLUEVEHICLESPATHS[7], entityManager, Math.PI / 2);
    blueCars.push(v1, v2, v3, v4, v7, v8, v9, v10);
});

// Arrow

loader.load('./assets/arrow.glb', function(glb) {
    const model = glb.scene;

    function createArrow(position, yRotation = 0) {
        const arrow = SkeletonUtils.clone(model);
        arrow.position.copy(position);
        arrow.rotation.y = yRotation;
        scene.add(arrow);
    }

    //Arrows for yellow cars
    createArrow(new THREE.Vector3(7, 2, 130), Math.PI);
    createArrow(new THREE.Vector3(7, 2, 36), 0.5 * Math.PI);
    createArrow(new THREE.Vector3(89, 2, 26), Math.PI);
    createArrow(new THREE.Vector3(103.5, 2, -60), -0.5 * Math.PI);
    createArrow(new THREE.Vector3(16, 2, -75.86), Math.PI);
    createArrow(new THREE.Vector3(6.5, 2, -156.04), -0.5 * Math.PI);
    createArrow(new THREE.Vector3(-78.82, 2, -170.17), -Math.PI / 2);
    createArrow(new THREE.Vector3(-78.82, 2, -76.17));
    createArrow(new THREE.Vector3(-88, 2, 35), Math.PI);
    createArrow(new THREE.Vector3(-88, 2, 130), Math.PI);

    //Arrows for red cars
    createArrow(new THREE.Vector3(1, 2, 105.32), 0.5 * Math.PI);
    createArrow(new THREE.Vector3(1, 2, 10.01), 0.5 * Math.PI);
    createArrow(new THREE.Vector3(112, 2, 21), Math.PI);
    createArrow(new THREE.Vector3(97.45, 2, -85.35));
    createArrow(new THREE.Vector3(-8, 2, -70.24), Math.PI);
    createArrow(new THREE.Vector3(1.25, 2, -180.84), -0.5 * Math.PI);
    createArrow(new THREE.Vector3(-103.74, 2, -164.74), Math.PI / 2);
    createArrow(new THREE.Vector3(-104, 2, -70.17), Math.PI / 2);
    createArrow(new THREE.Vector3(-78, 2, 19.5));
    createArrow(new THREE.Vector3(-94, 2, 105.32), 0.5 * Math.PI);

    //Arrows for blue cars
    createArrow(new THREE.Vector3(-7.55, 2, 120.5), 0.5 * Math.PI);
    createArrow(new THREE.Vector3(-7.55, 2, 25.64), 0.5 * Math.PI);
    createArrow(new THREE.Vector3(97.5, 2, 10.95));
    createArrow(new THREE.Vector3(88.599, 2, -69.83), Math.PI);
    createArrow(new THREE.Vector3(-87.88, 2, -154.78), Math.PI);
    createArrow(new THREE.Vector3(-87.88, 2, -60.78), Math.PI);
    createArrow(new THREE.Vector3(-104, 2, 25.78));
    createArrow(new THREE.Vector3(-103, 2, 120.5), 0.5 * Math.PI);

});

function showAnswerSymbol(opt1, opt2, opt3) {
    option1Symbol.style.backgroundImage = `url('./assets/symbols/${opt1}.png')`;
    option2Symbol.style.backgroundImage = `url('./assets/symbols/${opt2}.png')`;
    option3Symbol.style.backgroundImage = `url('./assets/symbols/${opt3}.png')`;
}

function animateCar(delay, car, wheels, last) {
    setTimeout(function() {
        car.vehicle.steering.behaviors[1].active = true;

        gsap.to(car.modelGroup.getObjectByName(wheels.frontRight).rotation, {
            x: '+=60',
            duration: 20
        });
        gsap.to(car.modelGroup.getObjectByName(wheels.frontLeft).rotation, {
            x: '+=60',
            duration: 20
        });
        gsap.to(car.modelGroup.getObjectByName(wheels.back).rotation, {
            x: '+=60',
            duration: 20
        });

        if(last)
            carToAnimate++;
    }, delay);
}

function chooseAnswer(option) {
    if(!clicked) {
        switch (carToAnimate) {
            case 0:
                showAnswerSymbol('correct', 'incorrect', 'incorrect');
                animateCar(3000, yellowCars[carToAnimate], WHEELS.yellowCar);
                animateCar(5000, redCars[carToAnimate], WHEELS.redCar, true);
                animateCar(0, blueCars[carToAnimate], WHEELS.blueCar);
                if(option.id === 'option1') {
                    scoreVal++;
                    score.innerText = scoreVal;
                }
                break;
            case 1:
                showAnswerSymbol('correct', 'incorrect', 'incorrect');
                animateCar(3000, yellowCars[carToAnimate], WHEELS.yellowCar);
                animateCar(5000, redCars[carToAnimate], WHEELS.redCar, true);
                animateCar(0, blueCars[carToAnimate], WHEELS.blueCar);
                if(option.id === 'option1') {
                    scoreVal++;
                    score.innerText = scoreVal;
                }
                break;
            case 2:
                showAnswerSymbol('incorrect', 'incorrect', 'correct');
                animateCar(3000, yellowCars[carToAnimate], WHEELS.yellowCar);
                animateCar(0, redCars[carToAnimate], WHEELS.redCar);
                animateCar(5000, blueCars[carToAnimate], WHEELS.blueCar, true);
                if(option.id === 'option3') {
                    scoreVal++;
                    score.innerText = scoreVal;
                }
                break;
            case 3:
                showAnswerSymbol('correct', 'incorrect', 'incorrect');
                animateCar(5000, yellowCars[carToAnimate], WHEELS.yellowCar, true);
                animateCar(3000, redCars[carToAnimate], WHEELS.redCar);
                animateCar(0, blueCars[carToAnimate], WHEELS.blueCar);
                if(option.id === 'option1') {
                    scoreVal++;
                    score.innerText = scoreVal;
                }
                break;
            case 4:
                showAnswerSymbol('incorrect', 'correct', 'incorrect');
                animateCar(0, yellowCars[carToAnimate], WHEELS.yellowCar);
                animateCar(3000, redCars[carToAnimate], WHEELS.redCar, true);
                //animateCar(0, blueCars[carToAnimate], null);
                if(option.id === 'option2') {
                    scoreVal++;
                    score.innerText = scoreVal;
                }
                break;
            case 5:
                showAnswerSymbol('correct', 'incorrect', 'incorrect');
                animateCar(3000, yellowCars[carToAnimate], WHEELS.yellowCar, true);
                animateCar(0, redCars[carToAnimate], WHEELS.redCar);
                //animateCar(0, blueCars[carToAnimate], null);
                if(option.id === 'option1') {
                    scoreVal++;
                    score.innerText = scoreVal;
                }
                break;
            case 6:
                showAnswerSymbol('incorrect', 'correct', 'incorrect');
                animateCar(3000, yellowCars[carToAnimate], WHEELS.yellowCar, true);
                animateCar(3000, redCars[carToAnimate], WHEELS.redCar);
                animateCar(0, blueCars[carToAnimate - 2], WHEELS.blueCar);
                if(option.id === 'option2') {
                    scoreVal++;
                    score.innerText = scoreVal;
                }
                break;
            case 7:
                showAnswerSymbol('incorrect', 'correct', 'incorrect');
                animateCar(3000, yellowCars[carToAnimate], WHEELS.yellowCar);
                animateCar(0, redCars[carToAnimate], WHEELS.redCar);
                animateCar(8000, blueCars[carToAnimate - 2], WHEELS.blueCar, true);
                if(option.id === 'option2') {
                    scoreVal++;
                    score.innerText = scoreVal;
                }
                break;
            case 8:
                showAnswerSymbol('incorrect', 'correct', 'incorrect');
                animateCar(8000, yellowCars[carToAnimate], WHEELS.yellowCar, true);
                animateCar(3000, redCars[carToAnimate], WHEELS.redCar);
                animateCar(0, blueCars[carToAnimate - 2], WHEELS.blueCar);
                if(option.id === 'option2') {
                    scoreVal++;
                    score.innerText = scoreVal;
                }
                break;
            case 9:
                showAnswerSymbol('incorrect', 'incorrect', 'correct');
                animateCar(0, yellowCars[carToAnimate], WHEELS.yellowCar);
                animateCar(3000, redCars[carToAnimate], WHEELS.redCar);
                animateCar(8000, blueCars[carToAnimate - 2], WHEELS.blueCar, true);
                if(option.id === 'option3') {
                    scoreVal++;
                    score.innerText = scoreVal;
                }
                break;
            default:
                break;
        }
        
        option.style.backgroundColor = 'white';
        option.style.color = 'black';

        gsap.to(explanation, {
            autoAlpha: 1,
            y: '-=10',
            duration: 0.5
        })
        clicked = true;
    }
}

option1.addEventListener('click', chooseAnswer.bind(null, option1));
option2.addEventListener('click', chooseAnswer.bind(null, option2));
option3.addEventListener('click', chooseAnswer.bind(null, option3));

function changeColors() {
    option1.style.backgroundColor = 'black';
    option1.style.color = 'white';
    option2.style.backgroundColor = 'black';
    option2.style.color = 'white';
    option3.style.backgroundColor = 'black';
    option3.style.color = 'white';

    option1Symbol.style.backgroundImage = '';
    option2Symbol.style.backgroundImage = '';
    option3Symbol.style.backgroundImage = '';
}

function changeOptionsText(qtion, opt1, opt2, opt3) {
    question.textContent = qtion;
    option1Text.textContent = opt1;
    option2Text.textContent = opt2;
    option3Text.textContent = opt3;
}

nextQuestionBtn.addEventListener('click', function() {
    questionNumber++;

    switch (questionNumber) {
        case 2:
            cameraZ = 51;
            break;
        case 3:
            cameraX = 100;
            break;
        case 4:
            cameraZ = -45;
            break;
        case 5:
            cameraX = 4;
            break;
        case 6:
            cameraZ = -145;
            break;
        case 7:
            cameraX = -91;
            cameraZ = -140;
            break;
        case 8:
            cameraZ = -45;
            break;
        case 9:
            cameraZ = 50;
            break;
        case 10:
            cameraZ = 145;
            nextQuestionBtn.disabled = true;
            break;
        default:
            break;
    }

    const tl = gsap.timeline();
    tl.to(camera.position, {
        x: cameraX,
        z: cameraZ,
        duration: 4
    })
    .to(question, {
        autoAlpha: 0,
        duration: 0.2
    }, 0)
    .to(explanation, {
        autoAlpha: 0,
        y: '+=10',
        duration: 0.5
    }, 0)
    .to(option1, {
        rotateX: 90,
        duration: 0.2
    }, '-=3.7')
    .to(option2, {
        rotateX: 90,
        duration: 0.2
    }, '-=3.5')
    .to(option3, {
        rotateX: 90,
        duration: 0.2,
        onComplete: function() {
            changeColors();
            changeOptionsText(
                ANSWERSTEXT[questionNumber - 1].question,
                ANSWERSTEXT[questionNumber - 1].answer1,
                ANSWERSTEXT[questionNumber - 1].answer2,
                ANSWERSTEXT[questionNumber - 1].answer3
            );
        }
    }, '-=3.3')
    .to(question, {
        autoAlpha: 1,
        duration: 0.2,
        onComplete: function() {
            AUDIOS[questionNumber - 1].question.play();
        }
    }, '-=0.5')
    .to(option1, {
        rotateX: 0,
        duration: 0.2,
        onComplete: function() {
            AUDIOS[questionNumber - 1].answer1.play();
        }
    }, '+=2.5')
    .to(option2, {
        rotateX: 0,
        duration: 0.2,
        onComplete: function() {
            AUDIOS[questionNumber - 1].answer2.play();
        }
    }, '+=2.4')
    .to(option3, {
        rotateX: 0,
        duration: 0.2,
        onComplete: function() {
            clicked = false;
            AUDIOS[questionNumber - 1].answer3.play();
        }
    }, '+=2.4')
});

//Animation

startButton.addEventListener('mousedown', function() {
    const tl = gsap.timeline();
    tl.to(startButton, {
        autoAlpha: 0,
        y: '-=20',
        duration: 0.5
    })
    .to(title, {
        autoAlpha: 0,
        y: '-=20',
        duration: 1
    }, 0)
    .to(camera.position, {
        z: 144,
        duration: 4
    }, 0)
    .to(camera.rotation, {
        x: -0.4,
        duration: 4
    }, 0)
    .to(question, {
        autoAlpha: 1,
        duration: 0.2,
        onComplete: function() {
            AUDIOS[questionNumber - 1].question.play();
        }
    }, '+=0.7')
    .to(option1, {
        rotateX: 0,
        duration: 0.2,
        onComplete: function() {
            AUDIOS[questionNumber - 1].answer1.play();
        }
    }, '+=2.5')
    .to(option2, {
        rotateX: 0,
        duration: 0.2,
        onComplete: function() {
            AUDIOS[questionNumber - 1].answer2.play();
        }
    }, '+=2.4')
    .to(option3, {
        rotateX: 0,
        duration: 0.2,
        onComplete: function() {
            AUDIOS[questionNumber - 1].answer3.play();
            clicked = false;
        }
    }, '+=2.4')
});

// Audio setup
const listener = new THREE.AudioListener();
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();

audioLoader.load('./assets/sounds/bgm.mp3', function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.2);
    sound.play();
});

// BGM Toggle button
const toggleButton = document.getElementById('toggleButton');
const volumeIcon = document.getElementById('volumeIcon');

toggleButton.addEventListener('click', () => {
    if (sound.isPlaying) {
        sound.pause();
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.add('fa-volume-xmark');
    } else {
        sound.play();
        volumeIcon.classList.remove('fa-volume-xmark');
        volumeIcon.classList.add('fa-volume-high');
    }
});

const time = new YUKA.Time();

function animate(t) {
    if(Math.sin(t / 130) > 0)
        blinkMesh.material.color.setHex(0xDC2F02);
    else
        blinkMesh.material.color.setHex(0xFF8300);

    const delta = time.update().getDelta();
    entityManager.update(delta);
    // controls.update();
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});