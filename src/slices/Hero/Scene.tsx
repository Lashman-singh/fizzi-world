"use client";

import FloatingCan from "@/components/FloatingCan";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

type Props = {}

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Scene({}: Props) {

  const can1Ref = useRef<Group>(null)
  const can2Ref = useRef<Group>(null)
  const can3Ref = useRef<Group>(null)
  const can4Ref = useRef<Group>(null)
  const can5Ref = useRef<Group>(null)

  const Can1GroupRef = useRef<Group>(null)
  const Can2GroupRef = useRef<Group>(null)

  const groupRef = useRef<Group>(null)

  const FLOAT_SPEED = 1.5;

  useGSAP(()=> {
    if (
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !Can1GroupRef.current ||
      !Can2GroupRef.current ||
      !groupRef.current
    ) return;

    gsap.set(can1Ref.current.position, {x: -1.5})
    gsap.set(can1Ref.current.position, {z: -0.5})

    gsap.set(can2Ref.current.position, {x: 1.5})
    gsap.set(can2Ref.current.position, {z: -0.5})

    gsap.set(can3Ref.current.position, {y: 5, z:2})
    gsap.set(can4Ref.current.position, {x: 2, y: 4, z:2})
    gsap.set(can5Ref.current.position, {y: -5})

    const introTl = gsap.timeline({
      defaults: {
        duration: 3,
        ease: "back.out(1.4)"
      }
    })

    introTl
    .from(Can1GroupRef.current.position, {y: -5, x: 1}, 0)
    .from(Can1GroupRef.current.position, {z: 3}, 0)
    .from(Can2GroupRef.current.position, {y: 5, x: 1}, 0)
    .from(Can2GroupRef.current.position, {z: 3}, 0)

    const scrollTl =gsap.timeline({
      defaults: {
        duration: 2,
      },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    })

    scrollTl// Rotate can group
    .to(groupRef.current.rotation, {y: Math.PI * 2}, 0)

    //Can 1 - black cherry
    .to(can1Ref.current.position, {X: -0.5, y: -0.7, z: -2}, 0)
    .to(can1Ref.current.position, {z: 0.3}, 0)

     //Can 2 - Lemone Lime
     .to(can2Ref.current.position, {x: 1, y: -0.2, z: -1 }, 0)
     .to(can2Ref.current.position, {z: 0}, 0)

      //Can 3 - Grape
    .to(can3Ref.current.position, {x: -0.3, y: 0.5, z: -1}, 0)
    .to(can3Ref.current.position, {z: -0.1}, 0)

     //Can 1 - Strawberry
    .to(can4Ref.current.position, {x: 0, y: -0.3, z: 0.5}, 0)
    .to(can4Ref.current.position, {z: 0.3}, 0)

      //Can 1 - Watermelon
    .to(can5Ref.current.position, {x: 0.3, y: 0.5, z: -0.5}, 0)
    .to(can5Ref.current.position, {z: -0.25}, 0)

    .to(groupRef.current.position, {x: 1, duration: 3, ease: "sine.inOut"}, 1.3)


  })
  return (
    <group ref={groupRef}>
      <group ref={Can1GroupRef}>
        <FloatingCan ref={can1Ref} flavor="blackCherry" 
        floatSpeed={FLOAT_SPEED}/>
      </group>

      <group ref={Can2GroupRef}>
        <FloatingCan ref={can2Ref} flavor="lemonLime" 
        floatSpeed={FLOAT_SPEED}/>
      </group>

      <FloatingCan ref={can3Ref} flavor="grape" 
      floatSpeed={FLOAT_SPEED}/>

      <FloatingCan ref={can4Ref} flavor="strawberryLemonade" 
      floatSpeed={FLOAT_SPEED}/>

      <FloatingCan ref={can5Ref} flavor="watermelon" 
      floatSpeed={FLOAT_SPEED}/>

      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5}/>
    </group>
  )
}