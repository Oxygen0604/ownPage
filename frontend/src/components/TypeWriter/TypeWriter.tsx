import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TypewriterProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({
  strings,
  typeSpeed = 80,
  backSpeed = 50,
  loop = true
}) => {
  const el = useRef<HTMLSpanElement>(null); // 显示文本的元素
  const typed = useRef<Typed | null>(null); // Typed.js 实例

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings,
        typeSpeed,
        backSpeed,
        loop
      });
    }

    return () => {
      // 卸载时销毁实例
      typed.current?.destroy();
    };
  }, [strings, typeSpeed, backSpeed, loop]);

  return (
    <span
      style={{
        borderRight: "2px solid white", // 光标效果
        paddingRight: "4px"
      }}
      ref={el}
    />
  );
};

export default Typewriter;
