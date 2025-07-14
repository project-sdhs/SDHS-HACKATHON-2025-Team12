import { useEffect, useRef } from "react";
import styled from "styled-components";

const HeroAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.6; // 화면 높이 60%
    };
    setSize();
    window.addEventListener("resize", setSize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = this.getRandomColor();
      }
      getRandomColor() {
        const colors = [
          "rgba(229, 251, 255, 0.8)",
          "rgba(197, 255, 236, 0.5)",
          "rgb(242, 255, 253)",
          "rgba(246, 255, 254, 0.94)",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = Math.min(
      100,
      Math.floor((window.innerWidth * (window.innerHeight * 0.6)) / 10000)
    );
    const particles = [];
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function connectParticles() {
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.strokeStyle = `rgba(16,185,129,${(1 - dist / maxDistance) * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return <CanvasStyled ref={canvasRef} />;
};

const CanvasStyled = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100vw;
  height: 60vh; /* 화면 높이 60% */
  opacity: 0.5;
  pointer-events: none;
`;

export default HeroAnimation;
