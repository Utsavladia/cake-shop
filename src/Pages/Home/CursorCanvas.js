import React, { useRef, useEffect } from "react";
import "./Cursor.css";

const CursorCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseMove = (event) => {
      handleParticles(event.clientX, event.clientY);
    };

    document.addEventListener("mousemove", handleMouseMove);

    const spots = [];
    let hue = 0;

    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 15 + 2;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = `hsl(${hue}, 100%, 50%)`;
    }

    function handleParticles(mouseX, mouseY) {
      spots.push(new Particle(mouseX, mouseY));
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = spots.length - 1; i >= 0; i--) {
        const particle = spots[i];
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.size -= 0.1;

        if (particle.size <= 0.2) {
          spots.splice(i, 1);
        }

        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      hue += 2;
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }, []);

  return <canvas ref={canvasRef} className="cursor-canvas" />;
};

export default CursorCanvas;
