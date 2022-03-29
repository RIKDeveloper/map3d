import React from 'react';
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {useEffect, useRef} from "react";

const Russia3D = (props)=>{
    let subjList = {"10403": {"name": "Республика Марий Эл", "color": 0xbcc3f9, "scale": 1.27}, "10404": {"name": "Республика Мордовия", "color": 0xbcc3f9, "scale": 1.52}, "11107": {"name": "Республика Саха (Якутия)", "color": 0xbcc3f9, "scale": 1.42}, "10706": {"name": "Республика Северная Осетия - Алания", "color": 0xbcc3f9, "scale": 1.75}, "10608": {"name": "Республика Татарстан", "color": 0xbcc3f9, "scale": 1.68}, "11005": {"name": "Республика Тыва", "color": 0xbcc3f9, "scale": 1.76}, "11006": {"name": "Республика Хакасия", "color": 0xbcc3f9, "scale": 1.36}, "10105": {"name": "Мурманская область", "color": 0xbcc3f9, "scale": 1.65}, "11106": {"name": "Сахалинская область", "color": 0xbcc3f9, "scale": 1.38}, "10103": {"name": "Республика Карелия", "color": 0xbcc3f9, "scale": 1.21}, "10106": {"name": "Ненецкий автономный округ", "color": 0xbcc3f9, "scale": 1.27}, "11001": {"name": "Красноярский край", "color": 0xbcc3f9, "scale": 1.14}, "10202": {"name": "Ленинградская область", "color": 0xbcc3f9, "scale": 1.61}, "10205": {"name": "Псковская область", "color": 0xbcc3f9, "scale": 1.11}, "11104": {"name": "Камчатский край", "color": 0xbcc3f9, "scale": 1.97}, "11105": {"name": "Магаданская область", "color": 0xbcc3f9, "scale": 1.28}, "11101": {"name": "Приморский край", "color": 0xbcc3f9, "scale": 1.4}, "11109": {"name": "Еврейская автономная область", "color": 0xbcc3f9, "scale": 1.44}, "11103": {"name": "Амурская область", "color": 0xbcc3f9, "scale": 1.75}, "11003": {"name": "Забайкальский край", "color": 0xbcc3f9, "scale": 1.3}, "11002": {"name": "Иркутская область", "color": 0xbcc3f9, "scale": 1.64}, "10907": {"name": "Республика Алтай", "color": 0xbcc3f9, "scale": 1.51}, "10901": {"name": "Алтайский край", "color": 0xbcc3f9, "scale": 1.67}, "10902": {"name": "Кемеровская область", "color": 0xbcc3f9, "scale": 1.97}, "10101": {"name": "Архангельская область", "color": 0xbcc3f9, "scale": 1.39}, "10903": {"name": "Новосибирская область", "color": 0xbcc3f9, "scale": 1.32}, "10904": {"name": "Омская область", "color": 0xbcc3f9, "scale": 1.82}, "10801": {"name": "Курганская область", "color": 0xbcc3f9, "scale": 1.74}, "10104": {"name": "Республика Коми", "color": 0xbcc3f9, "scale": 1.58}, "10803": {"name": "Пермский край", "color": 0xbcc3f9, "scale": 1.69}, "10102": {"name": "Вологодская область", "color": 0xbcc3f9, "scale": 1.9}, "10402": {"name": "Кировская область", "color": 0xbcc3f9, "scale": 1.25}, "10601": {"name": "Астраханская область", "color": 0xbcc3f9, "scale": 1.43}, "10701": {"name": "Краснодарский край", "color": 0xbcc3f9, "scale": 1.22}, "11200": {"name": "Калининградская область", "color": 0xbcc3f9, "scale": 1.51}, "10204": {"name": "Новгородская область", "color": 0xbcc3f9, "scale": 1.97}, "10308": {"name": "Костромская область", "color": 0xbcc3f9, "scale": 1.64}, "10305": {"name": "Ивановская область", "color": 0xbcc3f9, "scale": 1.23}, "10703": {"name": "Ростовская область", "color": 0xbcc3f9, "scale": 1.8}, "10501": {"name": "Белгородская область", "color": 0xbcc3f9, "scale": 1.09}, "10303": {"name": "Брянская область", "color": 0xbcc3f9, "scale": 1.15}, "10311": {"name": "Смоленская область", "color": 0xbcc3f9, "scale": 1.9}, "10307": {"name": "Калужская область", "color": 0xbcc3f9, "scale": 1.94}, "10804": {"name": "Свердловская область", "color": 0xbcc3f9, "scale": 1.17}, "10802": {"name": "Оренбургская область", "color": 0xbcc3f9, "scale": 1.37}, "10602": {"name": "Волгоградская область", "color": 0xbcc3f9, "scale": 1.94}, "11301": {"name": "Республика Крым", "color": 0xbcc3f9, "scale": 1.42}, "10309": {"name": "Орловская область", "color": 0xbcc3f9, "scale": 1.81}, "10503": {"name": "Курская область", "color": 0xbcc3f9, "scale": 1.89}, "10304": {"name": "Владимирская область", "color": 0xbcc3f9, "scale": 1.65}, "10401": {"name": "Нижегородская область", "color": 0xbcc3f9, "scale": 1.87}, "10603": {"name": "Самарская область", "color": 0xbcc3f9, "scale": 1.11}, "10605": {"name": "Саратовская область", "color": 0xbcc3f9, "scale": 1.58}, "10604": {"name": "Пензенская область", "color": 0xbcc3f9, "scale": 1.05}, "10502": {"name": "Воронежская область", "color": 0xbcc3f9, "scale": 1.07}, "10504": {"name": "Липецкая область", "color": 0xbcc3f9, "scale": 1.41}, "10310": {"name": "Рязанская область", "color": 0xbcc3f9, "scale": 1.87}, "10302": {"name": "Московская область", "color": 0xbcc3f9, "scale": 1.88}, "10301": {"name": "г. Москва", "color": 0xbcc3f9, "scale": 1.6}, "10201": {"name": "г.Санкт-Петербург", "color": 0xbcc3f9, "scale": 1.42}, "11302": {"name": "г.Севастополь", "color": 0xbcc3f9, "scale": 1.61}, "10705": {"name": "Кабардино-Балкарская Республика", "color": 0xbcc3f9, "scale": 1.62}, "40200": {"name": "Азербайджанская Республика", "color": 0xbcc3f9, "scale": 1.69}, "10710": {"name": "Карачаево-Черкесская Республика", "color": 0xbcc3f9, "scale": 1.87}, "10711": {"name": "Республика Адыгея", "color": 0xbcc3f9, "scale": 1.08}, "10806": {"name": "Республика Башкортостан", "color": 0xbcc3f9, "scale": 1.24}, "11004": {"name": "Республика Бурятия", "color": 0xbcc3f9, "scale": 1.08}, "10704": {"name": "Республика Дагестан", "color": 0xbcc3f9, "scale": 1.2}, "10708": {"name": "Республика Ингушетия", "color": 0xbcc3f9, "scale": 1.18}, "10607": {"name": "Республика Калмыкия", "color": 0xbcc3f9, "scale": 1.62}, "30200": {"name": "Латвийская Республика", "color": 0xbcc3f9, "scale": 1.64}, "30100": {"name": "Литовская Республика", "color": 0xbcc3f9, "scale": 1.75}, "90100": {"name": "Монголия", "color": 0xbcc3f9, "scale": 1.41}, "40300": {"name": "Республика Армения", "color": 0xbcc3f9, "scale": 1.89}, "70100": {"name": "Республика Беларусь", "color": 0xbcc3f9, "scale": 1.88}, "40100": {"name": "Республика Грузия", "color": 0xbcc3f9, "scale": 1.23}, "60100": {"name": "Республика Казахстан", "color": 0xbcc3f9, "scale": 1.79}, "50200": {"name": "Республика Кыргызстан", "color": 0xbcc3f9, "scale": 1.05}, "80100": {"name": "Республика Молдова", "color": 0xbcc3f9, "scale": 1.31}, "50300": {"name": "Республика Таджикистан", "color": 0xbcc3f9, "scale": 1.45}, "50100": {"name": "Республика Узбекистан", "color": 0xbcc3f9, "scale": 1.12}, "50400": {"name": "Туркменистан", "color": 0xbcc3f9, "scale": 1.13}, "20100": {"name": "Украина", "color": 0xbcc3f9, "scale": 1.9}, "30300": {"name": "Эстонская Республика", "color": 0xbcc3f9, "scale": 1.01}, "10807": {"name": "Удмуртская Республика", "color": 0xbcc3f9, "scale": 1.61}, "10709": {"name": "Чеченская Республика", "color": 0xbcc3f9, "scale": 1.0}, "10405": {"name": "Чувашская Республика", "color": 0xbcc3f9, "scale": 1.84}, "10306": {"name": "Тверская область", "color": 0xbcc3f9, "scale": 1.53}, "10909": {"name": "Ямало-Ненецкий автономный округ", "color": 0xbcc3f9, "scale": 1.86}, "11108": {"name": "Чукотский автономный округ", "color": 0xbcc3f9, "scale": 1.89}, "11102": {"name": "Хабаровский край", "color": 0xbcc3f9, "scale": 1.31}, "10908": {"name": "Ханты-Мансийский автономный округ", "color": 0xbcc3f9, "scale": 1.5}, "10905": {"name": "Томская область", "color": 0xbcc3f9, "scale": 1.39}, "10906": {"name": "Тюменская область", "color": 0xbcc3f9, "scale": 1.04}, "10702": {"name": "Ставропольский край", "color": 0xbcc3f9, "scale": 1.61}, "10313": {"name": "Ярославская область", "color": 0xbcc3f9, "scale": 1.48}, "10312": {"name": "Тульская область", "color": 0xbcc3f9, "scale": 1.69}, "10805": {"name": "Челябинская область", "color": 0xbcc3f9, "scale": 1.06}, "10606": {"name": "Ульяновская область", "color": 0xbcc3f9, "scale": 1.39}, "10505": {"name": "Тамбовская область", "color": 0xbcc3f9, "scale": 1.19}}
    let selectSubj = {}

    const mount = useRef(null)
    let map = null;
    const widthCanvas = (window.innerWidth / 2);
    const heightCanvas = (window.innerHeight / 1.5);
    let mouse = {position: new THREE.Vector2()};

    let lightUTC = new THREE.SpotLight(0xFFCC33, 1, 7);
    lightUTC.angle = Math.PI / 11;
    lightUTC.penumbra = 0.2;
    lightUTC.decay = 1;
    lightUTC.shadow.focus = 1
    lightUTC.position.set(6, 1, 2.3);

    lightUTC.target.position.setZ(2.3)
    lightUTC.target.updateMatrixWorld();
    let timeUTC = new Date().getUTCHours()
    const colorsMap = [];

    useEffect(() => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, widthCanvas / heightCanvas, 0.1, 10000);
        const light = new THREE.AmbientLight(0x424040, 4);
        const loaderGltf = new GLTFLoader();
        const renderer = new THREE.WebGLRenderer({alpha: true});
        // const controls = new OrbitControls(camera, renderer.domElement);

        renderer.setSize(widthCanvas, heightCanvas);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // renderer.outputEncoding = THREE.sRGBEncoding;
        mount.current.appendChild(renderer.domElement);

        scene.add(light);

        let mainLight = new THREE.SpotLight(0xffffff, 0.3);
        mainLight.position.set(4, -2, 0);
        mainLight.angle = Math.PI / 4;
        mainLight.penumbra = 1;
        mainLight.decay = 2;
        mainLight.distance = 10;

        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        mainLight.shadow.camera.near = 3;
        mainLight.shadow.camera.far = 6;
        mainLight.shadow.focus = 1;
        mainLight.rotation.set(0, 20, 0)

        scene.add(mainLight);
        // scene.add(lightUTC);


        camera.position.set(1, 0, 0);
        light.position.set(3, 0, 0)

        loaderGltf.load("models/map.glb", (gltf) => {
            map = gltf.scene;

            for (const group of map.children) {
                for (const i of group.children)
                    if (i instanceof THREE.Mesh) {
                        i.material = new THREE.MeshPhongMaterial({
                            dithering: true,
                        })
                        i.material.color.setHex(subjList[group.name].color)
                        i.castShadow = true;
                        i.receiveShadow = true;
                        if (subjList[group.name]) {
                            subjList[group.name].defaultScale = i.scale.x
                        }
                        i.scale.setX(subjList[group.name].defaultScale * subjList[group.name].scale)


                        colorsMap[group.name] = i.material.color.getHexString();

                    }

            }

            map.rotateY(Math.PI)
            map.rotateZ(-0.15)
            map.position.setY(-0.7)

            scene.add(map);
        })

        camera.lookAt(0, 0, 0)

        const raycaster = new THREE.Raycaster();

        document.querySelector(".map").addEventListener('click', (e) => {
            // console.log("select", selectSubj)
            mouse.position = new THREE.Vector2((((e.clientX - e.target.offsetLeft) / widthCanvas) * 2) - 1, (-((e.clientY - e.target.offsetTop) / heightCanvas) * 2) + 1)
            console.log(e.clientX, e.target.offsetLeft, widthCanvas, (e.clientX - e.target.offsetLeft), ((e.clientX - e.target.offsetLeft) / widthCanvas) * 2, (((e.clientX - e.target.offsetLeft) / widthCanvas) * 2) - 1, mouse)
            mouse.action = "click"
        })

        document.querySelector(".map").addEventListener('mousemove', (e) => {
            mouse.position = new THREE.Vector2((((e.clientX - e.target.offsetLeft) / widthCanvas) * 2) - 1, (-((e.clientY - e.target.offsetTop) / heightCanvas) * 2) + 1)
            // console.log(e.target.offsetTop, e.target.offsetLeft)
            mouse.action = "focus"
        })

        const CheckChildren = (children_list, intersect_obj) => {
            for (const children of children_list) {
                if (children === intersect_obj) {
                    return true
                }
            }
            return false
        }

        const animate = function () {
            timeUTC = new Date().getUTCHours()
            requestAnimationFrame(animate);

            if (map && mouse.position.x !== 0) {
                raycaster.setFromCamera(mouse.position, camera);
                const intersects = raycaster.intersectObjects(map.children);
                // console.log("reycaster", intersects, mouse, map)
                for (const item of map.children) {
                    if (intersects.length > 0) {
                        if (item === intersects[0].object || CheckChildren(item.children, intersects[0].object)) {
                            if (mouse.action === "click") {
                                if (JSON.stringify(selectSubj) !== JSON.stringify({subjCode: item.name, scale: subjList[item.name].scale, name:subjList[item.name].name})){
                                    selectSubj = {subjCode: item.name, scale: subjList[item.name].scale, name:subjList[item.name].name}
                                    if (props.onChange)
                                        props.onChange({value: item.name, name:subjList[item.name].name})
                                }
                                // console.log("click", item.name, selectSubj)
                                for (const subject of item.children) {
                                    subject.material.color.setHex(0xff0000)
                                }
                            } else if (mouse.action === "focus") {
                                if(item.name !== selectSubj.subjCode){
                                    for (const subject of item.children) {
                                        subject.material.color.setHex(0x5267f4)
                                    }
                                }
                            }
                            continue;
                        }
                        if(item.name !== selectSubj.subjCode){
                            for (const subject of item.children) {
                                subject.material.color.setHex(subjList[item.name].color)
                            }
                        } else{
                            for (const subject of item.children) {
                                subject.material.color.setHex(0xff0000)
                            }
                        }
                    } else{
                        if(item.name !== selectSubj.subjCode){
                            for (const subject of item.children) {
                                subject.material.color.setHex(subjList[item.name].color)
                            }
                        } else{
                            for (const subject of item.children) {
                                subject.material.color.setHex(0xff0000)
                            }
                        }
                    }

                }
            }

            let y = Math.sin(0.2 * timeUTC + 9.5) + 1.37
            let x = 0.135 * (timeUTC - 10);

            lightUTC.position.set(6, y, x);
            lightUTC.target.position.setY(y)
            lightUTC.target.position.setZ(x)
            lightUTC.target.updateMatrixWorld();

            renderer.render(scene, camera);
        }
        animate();

    }, [])

    return (
        <>
            <div className={"map"}
                 ref={mount}/>
        </>
    )
}

export default Russia3D