import React from 'react';
import * as THREE from "three";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";

const Russia3D = (props)=>{
    const mount = useRef(null)
    let subjList = props.data
    const widthCanvas = (window.innerWidth / 2);
    const heightCanvas = (window.innerHeight / 1.5);

    let map = null;
    let mouse = {position: new THREE.Vector2()};
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, widthCanvas / heightCanvas, 0.1, 10000);
    const light = new THREE.AmbientLight(0x424040, 4);
    const loader = new OBJLoader();
    const loaderGltf = new GLTFLoader();
    const renderer = new THREE.WebGLRenderer({alpha: true});
    const controls = new OrbitControls(camera, renderer.domElement);
    const light1 = new THREE.PointLight(0xffcf48, 0.5, 1.5);
    const sphere = new THREE.SphereGeometry(0.05, 16, 8);//?
    let spotLight1 = new THREE.SpotLight(0xFFCC33, 5, 7);
    let spotLight = new THREE.SpotLight(0xffffff, 0.3);

    spotLight1.angle = Math.PI / 11;
    spotLight1.penumbra = 0.2;
    spotLight1.decay = 1;
    spotLight1.shadow.focus = 1;
    spotLight1.position.set(6, 1, 2.3);
    spotLight1.target.position.setZ(2.3);
    spotLight1.target.updateMatrixWorld();
    scene.add(spotLight1);

    renderer.setSize(widthCanvas, heightCanvas);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mount.current.appendChild(renderer.domElement);
    camera.position.set(1.1, 0, 0);
    light.position.set(3, 0, 0)

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
    spotLight.rotation.set(0, 20, 0);
    scene.add(spotLight);

    useEffect(()=>{
        loaderGltf.load("models/map1.glb", (gltf) => {
            map = gltf.scene;

            for (const group of map.children) {
                for (const i of group.children)
                    if (i instanceof THREE.Mesh) {
                        subjList[group.name].defaultScale = i.scale.x

                        i.material = new THREE.MeshPhongMaterial({
                            color: THREE.Color(subjList[group.name].color),
                            dithering: true,
                        })
                        i.castShadow = true;
                        i.receiveShadow = true;
                        i.scale.setX(subjList[group.name].defaultScale * subjList[group.name].scale)
                    }
            }
            map.rotateY(Math.PI)
            map.rotateZ(-0.15)
            map.position.setY(-0.7)

            scene.add(map);
        })





    })

}