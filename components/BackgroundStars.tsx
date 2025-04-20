"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function BackgroundStars() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const particleOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: false,
        zIndex: 0,
      },
      background: { color: { value: "transparent" } },
      fpsLimit: 120,
      interactivity: {
        events: { onClick: { enable: false }, onHover: { enable: false } },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#ffffff" },
        move: {
          direction: MoveDirection.top,
          enable: true,
          speed: { min: 0.1, max: 0.6 },
          straight: true,
          outModes: {
            default: OutMode.out,
          },
        },
        number: { density: { enable: true, area: 800 }, value: 200 },
        opacity: {
          value: { min: 0.15, max: 0.8 },
          animation: {
            enable: true,
            speed: 0.5,
            sync: false,
            minimumValue: 0.1,
          },
        },
        shape: { type: "circle" },
        size: { value: { min: 0.5, max: 1.5 } },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <div className='absolute inset-0 z-[-1]'>
      {init && (
        <Particles
          id='tsparticles'
          particlesLoaded={particlesLoaded}
          options={particleOptions}
          className='absolute inset-0'
        />
      )}
    </div>
  );
}
