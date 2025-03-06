"use client"

import FloatingCan from "@/components/FloatingCan"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Content } from "@prismicio/client"
import { Cloud, Clouds, Environment, OrbitControls , Text} from "@react-three/drei"
import { useRef } from "react"
import * as Three from "three"
import { color, distance } from "three/tsl"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all"


gsap.registerPlugin(useGSAP, ScrollTrigger)

type skyDiveProps = {
  sentence: string | null;
  flavor: Content.SkyDiveSliceDefaultPrimary["flavor"]
};

export default function Scene({sentence, flavor}: skyDiveProps) {
  const groupRef = useRef<Three.Group>(null)
  const canRef = useRef<Three.Group>(null)
  const cloudRef = useRef<Three.Group>(null)
  const cloud1Rref = useRef<Three.Group>(null)
  const cloud2Rref = useRef<Three.Group>(null)
  const cloudsRef = useRef<Three.Group>(null)
  const wordsRef = useRef<Three.Group>(null)

  const ANGLE = 75 * (Math.PI / 180)

  const getXPosition = (distance: number) => distance * Math.cos(ANGLE)
  const getYPosition = (distance: number) => distance * Math.sin(ANGLE)

  const getXYPosition = (distance: number) => ({
    x: getXPosition(distance),
    y: getYPosition(distance)
  });

  useGSAP(() => {
    if(!cloudsRef.current || !canRef.current || !cloudRef.current || !cloud1Rref.current || !cloud2Rref.current || !wordsRef.current) 
      return;

    gsap.set(cloudsRef.current.position, {z: 10});
    gsap.set(canRef.current.position, {
      ...getXYPosition(-4),
    });

    gsap.set
      (wordsRef.current.children.map((word) => word.position), 
      { ...getXYPosition(7), z: 2})
    

    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2, 
      duration: 1.7,
      repeat: -1,
      ease: "none",
    })
  });
  
  return (
    <group ref={groupRef}>
      
      <group rotation = {[0, 0, 0.5]}>
        <FloatingCan ref={canRef} flavor={flavor}>
        </FloatingCan>
      </group>

      <Clouds ref={cloudRef}>
        <Cloud ref={cloud1Rref} bounds={[10, 10, 2]}/>
        <Cloud ref={cloud2Rref} bounds={[10, 10, 2]}/>
      </Clouds>
      <OrbitControls />

      <group ref={wordsRef}>
        {sentence && <ThreeText sentence={sentence} color="#F97315"/>}
      </group>

      <ambientLight intensity={2} color= "#9DDEFA" />
      <Environment files="/hdr/field.hdr" environmentIntensity={1.5}/>
    </group>
  );
}

function ThreeText({sentence, color="white"} : {
  sentence: string;
  color?: string
}){
  const words = sentence.toUpperCase().split(" ");

  const material = new Three.MeshLambertMaterial();
  const isDesktop = useMediaQuery("(min-width: 950%)", true)

  return words.map((word: string, wordsIndex: number) => (
    <Text key={'{$wordIndex} - ${word}'}
    scale={isDesktop ? 1 : .5}
    color={color}
    material={material}
    font="/fonts/Alpino-Variable.woff"
    fontWeight={900}
    anchorX={"center"}
    anchorY={"middle"}
    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?'"
    >{word}</Text>));
}