import React, { useRef, useEffect } from "react";
import "./Background.scss";

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // ✅ 保证 canvas 存在

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // ✅ 保证 ctx 存在

    // 设置画布大小
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 生成星星数据
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5, // 半径
      d: Math.random() * 0.5  // 移动速度
    }));

    function drawStars() {
        if (!ctx ||!canvas) return; // ✅ 保证 ctx 存在
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function animate() {
        if (!ctx ||!canvas) return; // ✅ 保证 ctx 存在
        stars.forEach(s => {
        s.x += s.d;
        if (s.x > canvas.width) s.x = 0;
      });
      drawStars();
      requestAnimationFrame(animate);
    }

    animate();

    // 窗口变化时重新调整大小
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas className="starfield"
      ref={canvasRef}
    />
  );
};

export default Background;
