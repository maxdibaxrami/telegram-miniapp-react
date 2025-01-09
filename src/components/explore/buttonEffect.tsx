import confetti from "canvas-confetti";

const heartConfetti = () => {
  if (typeof window !== "undefined") {
    const scalar = 2;
    const unicorn = confetti.shapeFromText({ text: "😍", scalar });
    const unicorn2 = confetti.shapeFromText({ text: "❤️", scalar });
    const unicorn3 = confetti.shapeFromText({ text: "🥰", scalar });

    const defaults = {
      startVelocity: 40,
      scalar,
      particleCount: 5,
      spread: 40,
      origin: { y: 0.8, x: 0.6 },
    };

    confetti({
      ...defaults,
      particleCount: 5,
      shapes: [unicorn3],
    });

    confetti({
      ...defaults,
      particleCount: 5,
      shapes: [unicorn2],
    });

    confetti({
      ...defaults,
      particleCount: 5,
      flat: true,
      shapes: [unicorn],
      scalar: scalar * 1.4,
    });
  }
};

const MatchConfetti = () => {
  const colors = ["#016fee", "#FFFFFF"];
  const end = Date.now() + 1 * 1000;

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

const LikeConfetti = (event) => {
  // Get the button's position in the viewport
  const rect = event.target.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth; // Calculate the horizontal center
  const y = (rect.top + rect.height / 2) / window.innerHeight; // Calculate the vertical center

  // Trigger confetti with a smaller "pump" and fewer particles
  confetti({
    particleCount: 30, // Reduced particle count
    spread: 50, // Narrower spread
    startVelocity: 30, // Slower initial velocity for a smaller effect
    gravity: 0.7, // More gravity to bring the particles down faster
    origin: { x, y }, // Confetti originates from the center of the button
    colors: ["#f5f242", "#ffdf00", "#ffd700"],
    shapes: ["circle"],
    scalar: 0.6, // Slightly smaller particle size
  });
};

export { heartConfetti, MatchConfetti, LikeConfetti };
