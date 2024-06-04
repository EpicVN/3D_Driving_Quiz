import { Audio, AudioListener, AudioLoader, Vector3 as Vec3 } from 'three';
import { Path, Vector3 } from 'yuka';

const YELLOWVEHICLESPATHS = [];
const REDVEHICLESPATHS = [];
const BLUEVEHICLESPATHS = [];

const yellowV1 = new Path();
yellowV1.add(new Vector3(7, 0.3, 130));
yellowV1.add(new Vector3(7, 0.3, 93.68));
YELLOWVEHICLESPATHS.push(yellowV1);

const yellowV2 = new Path();
yellowV2.add(new Vector3(7, 0.3, 36));
yellowV2.add(new Vector3(7.07, 0.3, 26));
yellowV2.add(new Vector3(33.32, 0.3, 26));
YELLOWVEHICLESPATHS.push(yellowV2);

const yellowV3 = new Path();
yellowV3.add(new Vector3(89, 0.3, 26));
yellowV3.add(new Vector3(103, 0.3, 22.84));
yellowV3.add(new Vector3(103, 0.3, -1.27));
YELLOWVEHICLESPATHS.push(yellowV3);

const yellowV4 = new Path();
yellowV4.add(new Vector3(103.5, 0.3, -60));
yellowV4.add(new Vector3(100, 0.3, -76));
yellowV4.add(new Vector3(76.00, 0.3, -76.41));
YELLOWVEHICLESPATHS.push(yellowV4);

const yellowV5 = new Path();
yellowV5.add(new Vector3(16, 0.3, -75.86));
yellowV5.add(new Vector3(6.5, 0.3, -75.96));
yellowV5.add(new Vector3(6.5, 0.3, -102.59));
YELLOWVEHICLESPATHS.push(yellowV5);

const yellowV6 = new Path();
yellowV6.add(new Vector3(6.5, 0.3, -156.04));
yellowV6.add(new Vector3(4.95, 0.3, -169.50));
yellowV6.add(new Vector3(-20.11, 0.3, -170.21));
YELLOWVEHICLESPATHS.push(yellowV6);

const yellowV7 = new Path();
yellowV7.add(new Vector3(-78.82, 0.3, -170.17));
yellowV7.add(new Vector3(-115.08, 0.3, -171.50));
YELLOWVEHICLESPATHS.push(yellowV7);

const yellowV8 = new Path();
yellowV8.add(new Vector3(-78.82, 0.3, -76.17));
yellowV8.add(new Vector3(-92.82, 0.3, -76.17));
yellowV8.add(new Vector3(-94.82, 0.3, -46.50));
YELLOWVEHICLESPATHS.push(yellowV8);

const yellowV9 = new Path();
yellowV9.add(new Vector3(-88, 0.3, 35));
yellowV9.add(new Vector3(-88, 0.3, -30));
YELLOWVEHICLESPATHS.push(yellowV9);

const yellowV10 = new Path();
yellowV10.add(new Vector3(-88, 0.3, 130));
yellowV10.add(new Vector3(-88, 0.3, 93.68));
YELLOWVEHICLESPATHS.push(yellowV10);

//Red cars

const redV1 = new Path();
redV1.add(new Vector3(1, 0.3, 105.32));
redV1.add(new Vector3(3.91, 0.3, 119.82));
redV1.add(new Vector3(27.74, 0.3, 120.04));
REDVEHICLESPATHS.push(redV1);

const redV2 = new Path();
redV2.add(new Vector3(1, 0.3, 10.01));
redV2.add(new Vector3(3.70, 0.3, 24.64));
redV2.add(new Vector3(26.53, 0.3, 26.73));
REDVEHICLESPATHS.push(redV2);

const redV3 = new Path();
redV3.add(new Vector3(112, 0.3, 21));
redV3.add(new Vector3(103, 0.3, 19));
redV3.add(new Vector3(103, 0.3, -8.42));
REDVEHICLESPATHS.push(redV3);

const redV4 = new Path();
redV4.add(new Vector3(97.45, 0.3, -85.35));
redV4.add(new Vector3(97.98, 0.3, -50.34));
REDVEHICLESPATHS.push(redV4);

const redV5 = new Path();
redV5.add(new Vector3(-8, 0.3, -70.24));
redV5.add(new Vector3(6.5, 0.3, -73.10));
redV5.add(new Vector3(6.5, 0.3, -97.01));
REDVEHICLESPATHS.push(redV5);

const redV6 = new Path();
redV6.add(new Vector3(1.25, 0.3, -180.84));
redV6.add(new Vector3(-0.64, 0.3, -171.20));
redV6.add(new Vector3(-25.56, 0.3, -171.28));
REDVEHICLESPATHS.push(redV6);

const redV7 = new Path();
redV7.add(new Vector3(-103.74, 0.3, -164.74));
redV7.add(new Vector3(-67.84, 0.3, -164.61));
REDVEHICLESPATHS.push(redV7);

const redV8 = new Path();
redV8.add(new Vector3(-104, 0.3, -70.17));
redV8.add(new Vector3(-70, 0.3, -70.50));
REDVEHICLESPATHS.push(redV8);

const redV9 = new Path();
redV9.add(new Vector3(-78, 0.3, 19.5));
redV9.add(new Vector3(-94, 0.3, 19.5));
redV9.add(new Vector3(-94, 0.3, 50));
REDVEHICLESPATHS.push(redV9);

const redV10 = new Path();
redV10.add(new Vector3(-94, 0.3, 105.32));
redV10.add(new Vector3(-91.91, 0.3, 119.82));
redV10.add(new Vector3(-60, 0.3, 120.04));
REDVEHICLESPATHS.push(redV10);

//Blue cars

const blueV1 = new Path();
blueV1.add(new Vector3(-7.55, 0.3, 120.5));
blueV1.add(new Vector3(33.29, 0.3, 120.5));
BLUEVEHICLESPATHS.push(blueV1);

const blueV2 = new Path();
blueV2.add(new Vector3(-7.55, 0.3, 25.64));
blueV2.add(new Vector3(39.31, 0.3, 25.53));
BLUEVEHICLESPATHS.push(blueV2);

const blueV3 = new Path();
blueV3.add(new Vector3(97.5, 0.3, 10.95));
blueV3.add(new Vector3(98, 0.3, 45.91));
BLUEVEHICLESPATHS.push(blueV3);

const blueV4 = new Path();
blueV4.add(new Vector3(88.599, 0.3, -69.83));
blueV4.add(new Vector3(102.51, 0.3, -75.48));
blueV4.add(new Vector3(103.25, 0.3, -96.45));
BLUEVEHICLESPATHS.push(blueV4);

const blueV7 = new Path();
blueV7.add(new Vector3(-87.88, 0.3, -154.78));
blueV7.add(new Vector3(-88, 0.3, -192.14));
BLUEVEHICLESPATHS.push(blueV7);

const blueV8 = new Path();
blueV8.add(new Vector3(-87.88, 0.3, -60.78));
blueV8.add(new Vector3(-88, 0.3, -100.14));
BLUEVEHICLESPATHS.push(blueV8);

const blueV9 = new Path();
blueV9.add(new Vector3(-104, 0.3, 25.78));
blueV9.add(new Vector3(-94, 0.3, 25));
blueV9.add(new Vector3(-94, 0.3, 70));
BLUEVEHICLESPATHS.push(blueV9);

const blueV10 = new Path();
blueV10.add(new Vector3(-103, 0.3, 120.5));
blueV10.add(new Vector3(-60, 0.3, 120.5));
BLUEVEHICLESPATHS.push(blueV10);

const ANSWERSTEXT = [
    {
        question: 'Q1: Các phương tiện sẽ di chuyển theo thứ tự nào ?',
        answer1: 'Xanh, vàng, đỏ',
        answer2: 'Đỏ, vàng, xanh',
        answer3: 'Đỏ, xanh, vàng'
    },
    {
        question: 'Q2: Phương tiện nào sẽ di chuyển cuối cùng ?',
        answer1: 'Xe đỏ',
        answer2: 'Xe xanh',
        answer3: 'Xe vàng'
    },
    {
        question: 'Q3: Phương tiện nào sẽ di chuyển đầu tiên ?',
        answer1: 'Xe xanh',
        answer2: 'Xe vàng',
        answer3: 'Xe đỏ'
    },
    {
        question: 'Q4: Khi nào xe màu đỏ nên đi tiếp ?',
        answer1: 'Trước xe vàng',
        answer2: 'Trước xe xanh',
        answer3: 'Sau cả hai xe'
    },
    {
        question: 'Q5: Phương tiện nào phải nhường đường ?',
        answer1: 'Xe vàng',
        answer2: 'Xe đỏ',
        answer3: 'Cả hai xe đều có thể đồng thời di chuyển'
    },
    {
        question: 'Q6: Phương tiện nào phải nhường đường ?',
        answer1: 'Xe vàng',
        answer2: 'Xe đỏ',
        answer3: 'Cả hai xe đều có thể đồng thời di chuyển'
    },
    {
        question: 'Q7: Những phương tiện nào có thể đồng thời di chuyển ?',
        answer1: 'Xe vàng và xe xanh',
        answer2: 'Xe vàng và xe đỏ',
        answer3: 'Xe xanh và xe đỏ'
    },
    {
        question: 'Q8: Phương tiện nào sẽ di chuyển cuối cùng ?',
        answer1: 'Xe đỏ',
        answer2: 'Xe xanh',
        answer3: 'Xe vàng'
    },
    {
        question: 'Q9: Phương tiện nào sẽ di chuyển đầu tiên ?',
        answer1: 'Xe đỏ',
        answer2: 'Xe xanh',
        answer3: 'Xe vàng'
    },
    {
        question: 'Q10: Các phương tiện sẽ di chuyển theo thứ tự nào ?',
        answer1: 'Xanh, vàng, đỏ',
        answer2: 'Đỏ, xanh, vàng',
        answer3: 'Vàng, đỏ, xanh'
    },
]

const WHEELS = {
    yellowCar: {
        frontRight: 'SUV_FrontRightWheel',
        frontLeft: 'SUV_FrontLeftWheel',
        back: 'SUV_BackWheels'
    },
    redCar: {
        frontRight: 'NormalCar1_FrontRightWheel',
        frontLeft: 'NormalCar1_FrontLeftWheel',
        back: 'NormalCar1_BackWheels'
    },
    blueCar: {
        frontRight: 'SportsCar_FrontRightWheel',
        frontLeft: 'SportsCar_FrontLeftWheel',
        back: 'SportsCar_BackWheels'
    }
}

const BLINKINGLIGHTS = {
    yellow: {
        left: {
            front: new Vec3(0.83, 0.66, 1.76),
            back: new Vec3(0.76, 0.83, -1.68)
        },
        right: {
            front: new Vec3(-0.83, 0.66, 1.76),
            back: new Vec3(-0.76, 0.83, -1.68)
        }
    },
    red: {
        left: {
            front: new Vec3(0.72, 0.48, 1.86),
            back: new Vec3(0.68, 0.60, -1.80)
        },
        right: {
            front: new Vec3(-0.72, 0.48, 1.86),
            back: new Vec3(-0.68, 0.60, -1.80)
        }
    },
    blue: {
        left: {
            front: new Vec3(0.72, 0.45, 1.64),
            back: new Vec3(0.62, 0.66, -1.68)
        },
        right: {
            front: new Vec3(-0.72, 0.45, 1.64),
            back: new Vec3(-0.62, 0.66, -1.68)
        }
    }
}

const LISTENER = new AudioListener();
const audioLoader = new AudioLoader();
const AUDIOS = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

audioLoader.load('./assets/sounds/q1.mp3', function(buffer) {
    AUDIOS[0].question = new Audio(LISTENER).setBuffer(buffer);
    AUDIOS[9].question = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q1a1.mp3' , function(buffer) {
    AUDIOS[0].answer1 = new Audio(LISTENER).setBuffer(buffer);
    AUDIOS[9].answer1 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q1a2.mp3', function(buffer) {
    AUDIOS[0].answer2 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q1a3.mp3' , function(buffer) {
    AUDIOS[0].answer3 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q2.mp3', function(buffer) {
    AUDIOS[1].question = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q2a1.mp3' , function(buffer) {
    AUDIOS[1].answer1 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q2a2.mp3', function(buffer) {
    AUDIOS[1].answer2 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q2a3.mp3' , function(buffer) {
    AUDIOS[1].answer3 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q3.mp3', function(buffer) {
    AUDIOS[2].question = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q3a1.mp3' , function(buffer) {
    AUDIOS[2].answer1 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q3a2.mp3', function(buffer) {
    AUDIOS[2].answer2 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q3a3.mp3' , function(buffer) {
    AUDIOS[2].answer3 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q4.mp3', function(buffer) {
    AUDIOS[3].question = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q4a1.mp3' , function(buffer) {
    AUDIOS[3].answer1 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q4a2.mp3', function(buffer) {
    AUDIOS[3].answer2 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q4a3.mp3' , function(buffer) {
    AUDIOS[3].answer3 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q5.mp3', function(buffer) {
    AUDIOS[4].question = new Audio(LISTENER).setBuffer(buffer);
    AUDIOS[5].question = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q5a1.mp3' , function(buffer) {
    AUDIOS[4].answer1 = new Audio(LISTENER).setBuffer(buffer);
    AUDIOS[5].answer1 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q5a2.mp3', function(buffer) {
    AUDIOS[4].answer2 = new Audio(LISTENER).setBuffer(buffer);
    AUDIOS[5].answer2 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q5a3.mp3' , function(buffer) {
    AUDIOS[4].answer3 = new Audio(LISTENER).setBuffer(buffer);
    AUDIOS[5].answer3 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q7.mp3', function(buffer) {
    AUDIOS[6].question = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q7a1.mp3' , function(buffer) {
    AUDIOS[6].answer1 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q7a2.mp3', function(buffer) {
    AUDIOS[6].answer2 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q7a3.mp3' , function(buffer) {
    AUDIOS[6].answer3 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q8.mp3', function(buffer) {
    AUDIOS[7].question = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q8a1.mp3' , function(buffer) {
    AUDIOS[7].answer1 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q8a2.mp3', function(buffer) {
    AUDIOS[7].answer2 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q8a3.mp3' , function(buffer) {
    AUDIOS[7].answer3 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q9.mp3', function(buffer) {
    AUDIOS[8].question = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q9a1.mp3' , function(buffer) {
    AUDIOS[8].answer1 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q9a2.mp3', function(buffer) {
    AUDIOS[8].answer2 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q9a3.mp3' , function(buffer) {
    AUDIOS[8].answer3 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q10a2.mp3', function(buffer) {
    AUDIOS[9].answer2 = new Audio(LISTENER).setBuffer(buffer);
});

audioLoader.load('./assets/sounds/q10a3.mp3' , function(buffer) {
    AUDIOS[9].answer3 = new Audio(LISTENER).setBuffer(buffer);
});

export {
    ANSWERSTEXT, AUDIOS, BLINKINGLIGHTS, BLUEVEHICLESPATHS, LISTENER, REDVEHICLESPATHS, WHEELS, YELLOWVEHICLESPATHS
};
