import React from 'react';
import * as THREE from "three";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";

const Map3D = () => {

    const Btn = styled.div`
      position: absolute;
      top: 4vmax;
      left: 45vw;
      cursor: pointer;
      background: #9197C2;
      padding: 10px 20px;
      border-radius: 40px;
      color: #fff;
      font-size: 0.5vmax;
      z-index: 2;

      & > svg {
        height: 1.2vmax;
        width: 1.2vmax;
      }
    `

    const Input = styled.input`
      width: 15vw;
      border: none;
      background-color: #B0B7EE;

      &:focus {
        border: none;
        outline: none;
      }
    `

    const InputContainer = styled.div`
      background-color: #B0B7EE;
      padding: 5px 10px;
      border-radius: 25px;
      display: inline-block;
      margin: 0 20px;
    `

    const Btn1 = styled.div`
      position: absolute;
      top: 4vmax;
      left: 35vw;
      cursor: pointer;
      background: #9197C2;
      padding: 10px 20px;
      border-radius: 40px;
      color: #fff;
      font-size: 0.5vmax;
      z-index: 2;

      &:last-child {
        left: 40vw;
      }
    `

    const Time = styled.div`
      position: absolute;
      top: 4vmax;
      left: 37vw;
      padding: 10px 20px;
      color: #000;
      font-size: 0.8vmax;
      z-index: 2;
    `

    const Wrap = styled.div`
      display: flex;
      justify-content: center;
    `

    const Btn2 = styled.div`
      padding: 5px 10px;
      background-color: #B0B7EE;
      border-radius: 25px;
      color: #fff;
      cursor: pointer;
    `

    const mount = useRef(null)
    const [select, setSelect] = useState({})
    const [subjState, setSubjState] = useState({changed: false})
    let selectSubj = {}
    let map = null;
    const light1 = new THREE.PointLight(0xffcf48, 0.5, 1.5);
    const sphere = new THREE.SphereGeometry(0.05, 16, 8);
    const widthCanvas = (window.innerWidth / 2);
    const heightCanvas = (window.innerHeight / 1.5);
    let mouse = {position: new THREE.Vector2()};
    let time = 12;

    let spotLight1 = new THREE.SpotLight(0xFFCC33, 5, 7);
    spotLight1.angle = Math.PI / 11;
    spotLight1.penumbra = 0.2;
    spotLight1.decay = 1;
    spotLight1.shadow.focus = 1
    spotLight1.position.set(6, 1, 2.3);

    spotLight1.target.position.setZ(2.3)
    spotLight1.target.updateMatrixWorld();
    let timeUTC = 18
    const colorsMap = [];
    let subjList = {changed: false};

    fetch("/Code2Sub.json").then(res => res.json()).then(json => {
        for (const index in json) {
            if (subjList[index])
                subjList[index].name = json[index]
            else
                subjList[index] = {"name": json[index]}
        }
        setSubjState(subjList)
    })


    useEffect(() => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, widthCanvas / heightCanvas, 0.1, 10000);
        const light = new THREE.AmbientLight(0x424040, 4);
        const loader = new OBJLoader();
        const loaderGltf = new GLTFLoader();
        const renderer = new THREE.WebGLRenderer({alpha: true});
        const controls = new OrbitControls(camera, renderer.domElement);

        renderer.setSize(widthCanvas, heightCanvas);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // renderer.outputEncoding = THREE.sRGBEncoding;
        mount.current.appendChild(renderer.domElement);

        scene.add(light);

        let spotLight = new THREE.SpotLight(0xffffff, 0.3);
        spotLight.position.set(4, -2, 0);
        spotLight.angle = Math.PI / 4;
        spotLight.penumbra = 1;
        spotLight.decay = 2;
        spotLight.distance = 10;

        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;
        spotLight.shadow.camera.near = 3;
        spotLight.shadow.camera.far = 6;
        spotLight.shadow.focus = 1;
        spotLight.rotation.set(0, 20, 0)
        scene.add(spotLight);


        // let lightHelper = new THREE.SpotLightHelper(spotLight);
        // scene.add(lightHelper);

        // let shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
        // scene.add(shadowCameraHelper);


        scene.add(spotLight1);

        // let lightHelper1 = new THREE.SpotLightHelper( spotLight1, 0x666 );
        // scene.add( lightHelper1 );

        // let shadowCameraHelper1 = new THREE.CameraHelper( spotLight1.shadow.camera );
        // scene.add( shadowCameraHelper1 );


        camera.position.set(1.1, 0, 0);
        light.position.set(3, 0, 0)

        loaderGltf.load("models/map1.glb", (gltf) => {
            map = gltf.scene;

            for (const group of map.children) {
                const scale = Math.floor(Math.random() * 10) / 10 + 1;
                const color = new THREE.Color(
                    `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
                );
                // group.scale.setX(scale)
                for (const i of group.children)
                    if (i instanceof THREE.Mesh) {

                        i.material = new THREE.MeshPhongMaterial({
                            color: color,
                            dithering: true,
                        })
                        i.castShadow = true;
                        i.receiveShadow = true;
                        if (subjList[group.name]) {
                            subjList[group.name].color = i.material.color.getHexString();
                            subjList[group.name].scale = scale;
                            subjList[group.name].defaultScale = i.scale.x
                        } else {
                            subjList[group.name] = {
                                color: i.material.color.getHexString(),
                                scale,
                                defaultScale: i.scale.x
                            };
                        }
                        i.scale.setX(subjList[group.name].defaultScale * subjList[group.name].scale)


                        colorsMap[group.name] = i.material.color.getHexString();

                    } else if (i instanceof THREE.Object3D) {
                        // console.log(i)
                    }


                // setSubjState(subjList)
            }

            console.log(colorsMap, subjList)

            map.rotateY(Math.PI)
            map.rotateZ(-0.15)
            // map.position.setZ(-0.3)
            map.position.setY(-0.7)
            // map.castShadow = true;
            // map.receiveShadow = true;

            scene.add(map);
        })

        camera.lookAt(0, 0, 0)


        const raycaster = new THREE.Raycaster();

        document.querySelector(".map").addEventListener('click', (e) => {
            // console.log("select", selectSubj)
            mouse.position.x = ((e.clientX - e.target.offsetLeft) / widthCanvas) * 2 - 1;
            mouse.position.y = -((e.clientY - e.target.offsetTop) / heightCanvas) * 2 + 1;
            mouse.action = "click"
        })

        document.querySelector(".map").addEventListener('mousemove', (e) => {
            mouse.position.x = ((e.clientX - e.target.offsetLeft) / widthCanvas) * 2 - 1;
            mouse.position.y = -((e.clientY - e.target.offsetTop) / heightCanvas) * 2 + 1;
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
            requestAnimationFrame(animate);

            // const nowTime = new Date().getTime()
            // // light1.position.setZ(Math.tan(( 3    * Math.PI) / 17000 * nowTime))
            // light1.position.setZ(1.21 * Math.cos((2 * Math.PI) / 17000 * nowTime))
            // light1.position.setX(1.21 * Math.sin((2 * Math.PI) / 17000 * nowTime));

            if (subjState["changed"] !== false){
                console.log("changed", subjState.changed)

                for (let item of map){
                    if(Object.keys(subjState).indexOf(item.name) >= 0){
                        item.scale.setX(subjState[item.name].defaultScale * subjState[item.name].scale)
                    }
                }

                subjList.changed = false
                // setSubjState(subjList)
            }

            if (map && mouse.position.x !== 0) {
                raycaster.setFromCamera(mouse.position, camera);
                const intersects = raycaster.intersectObjects(map.children);
                for (const item of map.children) {
                    if (intersects.length > 0) {
                        if (item === intersects[0].object || CheckChildren(item.children, intersects[0].object)) {
                            if (mouse.action == "click") {

                                // setSubj(subjList[item.name].name)
                                // setScale(subjList[item.name].defaultScale * subjList[item.name].scale)
                                setSelect({subjCode: item.name, scale: subjList[item.name].scale, name:subjList[item.name].name})
                                selectSubj = {subjCode: item.name, scale: subjList[item.name].scale, name:subjList[item.name].name}
                                console.log("click", item.name, selectSubj)
                                for (const subject of item.children) {
                                    subject.material.color.setHex(0xff0000)
                                }
                            } else if (mouse.action == "focus") {
                                // setSubj(subjList[item.name].name)
                                // setScale(subjList[item.name].defaultScale * subjList[item.name].scale)
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
                                subject.material.color.setHex("0x" + subjList[item.name].color)
                            }
                        } else{
                            for (const subject of item.children) {
                                subject.material.color.setHex(0xff0000)
                            }
                        }
                    }
                }
            }

            // let y = Math.sin(0.4 * timeUTC + 20.25)
            let y = 0.2 * Math.sin(0.25 * timeUTC - 3.6) + 0.7
            // let x = -2;
            let x = 0.227 * (timeUTC - 10);

            //1.5

            // console.log(y)
            spotLight1.position.set(6, y, x);
            spotLight1.target.position.setY(y)
            spotLight1.target.position.setZ(x)
            spotLight1.target.updateMatrixWorld();

            renderer.render(scene, camera);
            // changeLightPosition()
        }
        animate();

        return () => mount.current.removeChild(renderer.domElement);
    }, [])
    timeUTC = 22;

    const onRenderScaleMap = () => {
        // if (map instanceof THREE.Group) {
        //     for (const item of map.children) {
        //         const scale = Math.floor(Math.random() * 20) / 10 + 0.1;
        //         const color = new THREE.Color(
        //             `rgb(${145 - (scale * 10)}, ${151 - (scale * 10)}, ${194 - (scale * 10)})`
        //         );
        //         item.scale.setX(scale)
        //         item.material.color = color
        //     }
        // }
    }
    // Math.cos(((j + 1 - this.count) + 0.5) )

    const changeScale = ()=>{
        console.log("change scale func start", map)
        for (const group of map.children){
            console.log(group.name == select.subjCode, group.name, select.subjCode)
            if (group.name == select.subjCode){
                console.log("change scale", group.name, select.subjCode)
                for (const item of group.children){
                    item.scale.setX(subjList[group.name].defaultScale * subjList[group.name].scale)
                }
            }
        }
    }

    const onVisibleSun = () => {
        if (light1.children.length === 0) {
            light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0xffcf48})));
        } else {
            light1.remove(light1.children[0])
        }
    }

    const changeTime = (str) => {
        if (str === '+') {
            timeUTC = (timeUTC + 1 > 23 ? 0 : (timeUTC + 1))
        }
        if (str === '-') {
            timeUTC = (timeUTC - 1 < 0 ? 23 : (timeUTC - 1))
        }

        let y = Math.sin(0.2 * timeUTC + 9.5) + 1.37
        let x = 0.135 * (timeUTC - 10);

        // console.log("x = " + x)

        document.querySelector("." + Time.styledComponentId).innerHTML = timeUTC;
    }

    //onClick={(e)=>{
    //                 mouse.x = ((e.clientX - e.target.offsetLeft) / widthCanvas) * 2 - 1;
    //                 mouse.y = -((e.clientY - e.target.offsetTop) / heightCanvas) * 2 + 1;
    //             }}

    return (
        <>
            <div style={{display: "flex", height: "100%"}}>
                <div className={"map"} style={{height: "100%", minHeight: '65vh', flex: '2 2 300px', width: "50%"}}
                     ref={mount}/>
                <div style={{
                    background: "#F7F7FA",
                    borderRadius: "10px",
                    width: "30%",
                    marginTop: "20px",
                    marginRight: "20px"
                }}>
                    <div style={{fontSize: "20px", padding: "20px"}}>{select.name}</div>
                    <Wrap>
                        <Btn2>
                            Отменить
                        </Btn2>
                        <InputContainer>
                            <Input defaultValue={select.scale} onChange={(e)=>{
                                console.log(e)
                                e.value = e.target.value
                                // setSelect({subjCode: select.subjCode, scale: e.target.value, name:select.name})
                            }}></Input>
                        </InputContainer>
                        <Btn2 onClick={(e)=>{
                            console.log("btn", e, subjList);
                            subjList[select.subjCode]["scale"] = e.target.parentElement.querySelector("input").value;

                            subjList.changed = [select.subjCode]
                            setSubjState(subjList)
                            console.log("btn finish", subjList)
                        }}>
                            Применить
                        </Btn2>
                    </Wrap>

                </div>
            </div>

            <div style={{
                position: "absolute",
                top: "4vmax",
                left: "50vw",
                cursor: "pointer",
                background: "#9197C2",
                padding: "20px 40px",
                borderRadius: "40px",
                color: "#fff",
                fontSize: "0.5vmax",
                zIndex: 2
            }} onClick={onRenderScaleMap}>Перерендерить
            </div>
            <Btn onClick={onVisibleSun}>{svg}</Btn>
            <Btn1 onClick={() => changeTime("+")}>+</Btn1>
            <Time>{timeUTC}</Time>
            <Btn1 onClick={() => changeTime("-")}>-</Btn1>
        </>
    )
}

const svg = (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
         viewBox="0 0 22.006 22.006">
        <path fill="#f5f5f5" d="M4.63,6.045c0.394,0.393,1.028,0.399,1.421,0.006c0.39-0.39,0.393-1.021-0.007-1.421l-1.4-1.4
			C4.249,2.835,3.617,2.829,3.223,3.223c-0.391,0.39-0.394,1.02,0.007,1.421L4.63,6.045z"/>
        <path fill="#f5f5f5" d="M20.997,10.003h-1.98c-0.559,0-1.011,0.444-1.011,1c0,0.553,0.443,1,1.011,1h1.98
			c0.559,0,1.009-0.443,1.009-1C22.006,10.451,21.562,10.003,20.997,10.003z"/>
        <path fill="#f5f5f5" d="M4,11.003c0-0.552-0.444-1-1.01-1H1.009c-0.558,0-1.009,0.444-1.009,1c0,0.553,0.443,1,1.009,1
			H2.99C3.548,12.003,4,11.56,4,11.003z"/>
        <path fill="#f5f5f5" d="M11.003,5c-3.313,0-6,2.687-6,6s2.687,6,6,6c3.312,0,6-2.687,6-6S14.315,5,11.003,5z M11.003,15
			c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S13.212,15,11.003,15z"/>
        <path fill="#f5f5f5" d="M4.63,15.962l-1.4,1.4c-0.395,0.395-0.401,1.027-0.007,1.421c0.391,0.39,1.021,0.393,1.421-0.007
			l1.4-1.4c0.395-0.395,0.401-1.027,0.007-1.421C5.66,15.563,5.03,15.562,4.63,15.962z"/>
        <path fill="#f5f5f5" d="M17.376,6.045l1.4-1.401c0.395-0.395,0.399-1.027,0.007-1.421c-0.392-0.39-1.021-0.393-1.421,0.007
			l-1.4,1.4c-0.395,0.395-0.4,1.028-0.007,1.421C16.347,6.441,16.976,6.444,17.376,6.045z"/>
        <path fill="#f5f5f5" d="M11.003,18.006c-0.553,0-1,0.444-1,1.011v1.98c0,0.559,0.444,1.009,1,1.009
			c0.553,0,1-0.442,1-1.009v-1.98C12.003,18.458,11.56,18.006,11.003,18.006z"/>
        <path fill="#f5f5f5" d="M17.376,15.962c-0.395-0.395-1.027-0.4-1.421-0.007c-0.39,0.392-0.394,1.021,0.007,1.421l1.4,1.4
			c0.395,0.395,1.027,0.399,1.421,0.007c0.391-0.39,0.394-1.021-0.007-1.421L17.376,15.962z"/>
        <path fill="#f5f5f5" d="M11.003,4c0.553,0,1-0.443,1-1.01V1.01c0-0.558-0.443-1.01-1-1.01c-0.553,0-1,0.444-1,1.01v1.98
			C10.003,3.548,10.447,4,11.003,4z"/>

    </svg>
)

export default Map3D
