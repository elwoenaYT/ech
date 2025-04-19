
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaGamepad } from "react-icons/fa";

const games = [
  {
    title: "Neon Rush",
    description: "Pierwsza gra Elowena — dynamiczna akcja w neonowym świecie!",
    link: "https://megadb-link-do-gry.com",
    image: "/game1.jpg",
  },
  // Dodasz więcej tu
];

const GameCard = ({ game }: { game: (typeof games)[0] }) => (
  <motion.a
    href={game.link}
    target="_blank"
    whileHover={{ scale: 1.05 }}
    className="transition-transform duration-300"
  >
    <Card className="bg-black/30 border border-cyan-500/20 hover:border-cyan-500/60 overflow-hidden">
      <img
        src={game.image}
        alt={game.title}
        className="w-full h-48 object-cover object-center"
      />
      <CardContent className="text-white p-4">
        <h3 className="text-xl font-bold text-cyan-300">{game.title}</h3>
        <p className="text-sm text-white/70">{game.description}</p>
      </CardContent>
    </Card>
  </motion.a>
);

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.5 + Math.random() * 1.5,
      size: 8 + Math.random() * 6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.font = `${star.size}px Arial`;
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fillText("🎮", star.x, star.y);
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(draw);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-black via-blue-950 to-red-900 min-h-screen text-white relative overflow-hidden">
      <Starfield />

      <div className="relative z-10 p-8 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-cyan-400 drop-shadow-lg"
        >
          Elowena
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-white/80 mt-4 max-w-xl"
        >
          Twórca gier indie — poznaj moje neonowe światy i pobierz gry!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {games.map((game, i) => (
            <GameCard key={i} game={game} />
          ))}
        </motion.div>

        <footer className="mt-20 text-white/50 text-sm text-center">
          © {new Date().getFullYear()} Elowena — All rights reserved
        </footer>
      </div>
    </main>
  );
}
