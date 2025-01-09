import { CSSProperties, ReactElement, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Sparkle {
  id: string;
  x: number; // Instead of using %, now we'll use relative x and y values
  y: number;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

interface SparklesHeartTextProps {
  text: ReactElement;
  sparklesCount?: number;
  colors?: {
    first: string;
    second: string;
  };
}

const SparklesHeartText: React.FC<SparklesHeartTextProps> = ({
  text,
  colors = { first: "#FF6B6B", second: "#FFC107" },
  sparklesCount = 5,
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generateHeart = (): Sparkle => {
      // Start from the center, move in random direction
      const angle = Math.random() * Math.PI * 2; // Random angle in radians
      const distance = Math.random() * 100; // Random distance from center
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const color = Math.random() > 0.5 ? colors.first : colors.second;
      const delay = Math.random() * 2;
      const scale = Math.random() * 2 + 0.5; // Larger scale
      const lifespan = Math.random() * 10 + 5;
      const id = `${x}-${y}-${Date.now()}`;
      return { id, x, y, color, delay, scale, lifespan };
    };

    const initializeHearts = () => {
      const newSparkles = Array.from({ length: sparklesCount }, generateHeart);
      setSparkles(newSparkles);
    };

    const updateHearts = () => {
      setSparkles((currentSparkles) =>
        currentSparkles.map((heart) => {
          if (heart.lifespan <= 0) {
            return generateHeart();
          } else {
            return { ...heart, lifespan: heart.lifespan - 0.1 };
          }
        }),
      );
    };

    initializeHearts();
    const interval = setInterval(updateHearts, 100);

    return () => clearInterval(interval);
  }, [colors.first, colors.second]);

  return (
    <div
      className="relative"
      style={
        {
          "--sparkles-first-color": `${colors.first}`,
          "--sparkles-second-color": `${colors.second}`,
        } as CSSProperties
      }
    >
      {/* Render the heart sparkles in the background */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        {sparkles.map((sparkle) => (
          <HeartSparkle key={sparkle.id} {...sparkle} />
        ))}
      </div>

      {/* Render the button or any other content */}
      <div className="relative z-10">{text}</div>
    </div>
  );
};

const HeartSparkle: React.FC<Sparkle> = ({ id, x, y, color, delay, scale }) => {
    // Set a maximum scale value to avoid making hearts too large
    const maxScale = 0.5; // You can adjust this to control the maximum size of the hearts
  
    return (
      <motion.svg
        key={id}
        className="pointer-events-none absolute z-0"
        initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0],
          x: [0, x],
          y: [0, y],
          scale: [0, Math.min(scale, maxScale)], // Limit the scale here
          rotate: [0, 360],
        }}
        transition={{ duration: 2, repeat: Infinity, delay }}
        width="35" // Keeping the heart size consistent
        height="35"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill={color}
        />
      </motion.svg>
    );
  };
  

export { SparklesHeartText };
