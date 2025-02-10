import React, { useState, useEffect, useRef } from 'react';
import { Heart, Stars, Sparkles, Gift, Music, Crown, PartyPopper, SettingsIcon as Confetti, Star, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [stage, setStage] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [showSparkles, setShowSparkles] = useState(false);
  const [mouseTrail, setMouseTrail] = useState<{ x: number; y: number; }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseTrail(prev => [...prev.slice(-20), { x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const phrases = [
    "No 🥺",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart 💔",
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !noButtonRef.current) return;

      const cardRect = cardRef.current.getBoundingClientRect();
      const buttonRect = noButtonRef.current.getBoundingClientRect();
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const buttonCenter = {
        x: buttonRect.left + buttonRect.width / 2,
        y: buttonRect.top + buttonRect.height / 2,
      };

      const distance = Math.sqrt(
        Math.pow(mouseX - buttonCenter.x, 2) + 
        Math.pow(mouseY - buttonCenter.y, 2)
      );

      if (distance < 120) {
        const cardPadding = 20;
        const maxWidth = cardRect.width - buttonRect.width - cardPadding * 2;
        const maxHeight = cardRect.height - buttonRect.height - cardPadding * 2;
        
        const angle = Math.atan2(mouseY - buttonCenter.y, mouseX - buttonCenter.x);
        const pushDistance = 100;
        
        let newX = -Math.cos(angle) * pushDistance;
        let newY = -Math.sin(angle) * pushDistance;
        
        newX = Math.max(Math.min(newX, maxWidth / 2), -maxWidth / 2);
        newY = Math.max(Math.min(newY, maxHeight / 2), -maxHeight / 2);
        
        setPosition({ x: newX, y: newY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    if (cardRef.current && noButtonRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const buttonRect = noButtonRef.current.getBoundingClientRect();
      
      const cardPadding = 20;
      const maxWidth = cardRect.width - buttonRect.width - cardPadding * 2;
      const maxHeight = cardRect.height - buttonRect.height - cardPadding * 2;
      
      const randomAngle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 80;
      
      const newX = Math.cos(randomAngle) * distance;
      const newY = Math.sin(randomAngle) * distance;
      
      setPosition({
        x: Math.max(Math.min(newX, maxWidth / 2), -maxWidth / 2),
        y: Math.max(Math.min(newY, maxHeight / 2), -maxHeight / 2),
      });
    }
  };

  const getNoButtonText = () => phrases[Math.min(noCount, phrases.length - 1)];

  const calculateNoButtonSize = () => `scale-${Math.max(0.7, 1 - noCount * 0.05)}`;

  const stages = [
    {
      title: "Hey Taya! 💖",
      content: "I've got something special to ask you...",
      icon: <Heart className="w-16 h-16 text-pink-500 animate-pulse-fast" />,
      bgColor: "from-pink-400 via-red-300 to-purple-400",
    },
    {
      title: "You know what day is coming up ???? 🌟",
      content: "Yeeeee... Valentine's Day lolol!",
      icon: <Stars className="w-16 h-16 text-yellow-500 animate-spin-slow" />,
      bgColor: "from-yellow-400 via-orange-300 to-red-400",
    },
    {
      title: "And ykwwwww ✨",
      content: "Even though ur kinda crazy I like u a bit lol...",
      icon: <Sparkles className="w-16 h-16 text-purple-500 animate-bounce-slow" />,
      bgColor: "from-purple-400 via-pink-300 to-indigo-400",
    },
    {
      title: "So I wanted to ask fr",
      content: "Will you be my Valentine????",
      icon: <Gift className="w-16 h-16 text-red-500 animate-float" />,
      bgColor: "from-red-400 via-pink-300 to-rose-400",
    },
  ];

  const handleYesClick = () => {
    setShowSparkles(true);
    setShowConfetti(true);
    setTimeout(() => {
      if (stage < stages.length - 1) {
        setStage(stage + 1);
      } else {
        setStage(stages.length);
      }
      setShowSparkles(false);
    }, 500);
  };

  const generateSparkles = (count: number) => {
    return Array(count).fill(null).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          x: [0, (Math.random() - 0.5) * 300],
          y: [0, (Math.random() - 0.5) * 300],
          rotate: [0, Math.random() * 360],
        }}
        transition={{ duration: 0.7 }}
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
          fontSize: `${Math.random() * 20 + 10}px`,
        }}
      >
        {Math.random() > 0.5 ? '✨' : '⭐'}
      </motion.div>
    ));
  };

  const generateHearts = (count: number) => {
    return Array(count).fill(null).map((_, i) => (
      <motion.div
        key={i}
        initial={{ 
          opacity: 0,
          scale: 0,
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 100
        }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          x: Math.random() * window.innerWidth,
          y: -100,
          rotate: [0, Math.random() * 360]
        }}
        transition={{ 
          duration: 10 + Math.random() * 10,
          repeat: Infinity,
          delay: Math.random() * 20
        }}
        className="absolute text-pink-500 pointer-events-none"
        style={{ fontSize: `${Math.random() * 30 + 10}px` }}
      >
        {['❤️', '💖', '💝', '💕', '💗'][Math.floor(Math.random() * 5)]}
      </motion.div>
    ));
  };

  const MouseTrail = () => (
    <>
      {mouseTrail.map((position, index) => (
        <motion.div
          key={index}
          className="fixed pointer-events-none"
          initial={{ scale: 0.5, opacity: 0.7 }}
          animate={{
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.5 }}
          style={{
            left: position.x,
            top: position.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <div className="h-2 w-2 rounded-full bg-pink-400 blur-sm" />
        </motion.div>
      ))}
    </>
  );

  if (stage === stages.length) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-radial from-pink-500 via-red-500 to-purple-500 flex items-center justify-center overflow-hidden relative"
      >
        <MouseTrail />
        {generateHearts(40)}
        {showConfetti && generateSparkles(50)}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: 1, 
            rotate: 0,
            transition: { type: "spring", duration: 1.5 }
          }}
          className="text-center text-white p-12 rounded-2xl backdrop-blur-lg bg-white/20 relative shadow-2xl"
        >
          <motion.div className="absolute inset-0 -z-10">
            {Array(30).fill(null).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 300],
                  y: [0, (Math.random() - 0.5) * 300],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <PartyPopper className="w-8 h-8 text-yellow-300" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="relative"
          >
            <Crown className="w-32 h-32 mx-auto text-yellow-300" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 text-yellow-200 blur-lg"
            >
              <Crown className="w-32 h-32 mx-auto" />
            </motion.div>
          </motion.div>
          
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <motion.h1 
              className="text-6xl font-bold mt-8 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
            >
              YAAAAAAY! 🎉
            </motion.h1>
          </motion.div>

          <motion.p 
            className="text-2xl mb-6 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Thank you for saying yes, Taya! ❤️
          </motion.p>
          <motion.p 
            className="text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            With love, Ashhh 💝
          </motion.p>
          <motion.div 
            className="mt-12 flex justify-center gap-6"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [-10, 10, -10]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
            >
              <Music className="w-10 h-10 text-white" />
            </motion.div>
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [10, -10, 10]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: 0.3
              }}
            >
              <Star className="w-10 h-10 text-yellow-300" />
            </motion.div>
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [-10, 10, -10]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: 0.6
              }}
            >
              <Rocket className="w-10 h-10 text-blue-300" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${stages[stage].bgColor} flex items-center justify-center p-4 overflow-hidden`}>
      <MouseTrail />
      {generateHearts(15)}
      <motion.div 
        ref={cardRef}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden backdrop-blur-sm bg-white/90"
      >
        {showSparkles && generateSparkles(30)}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="relative"
          >
            {stages[stage].icon}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 blur-lg"
            >
              {stages[stage].icon}
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-gray-800 mb-4"
        >
          {stages[stage].title}
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl text-gray-600 mb-8"
        >
          {stages[stage].content}
        </motion.p>

        <div className="flex justify-center gap-4 relative">
          <motion.button
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 30px rgba(255,182,193,0.7)"
            }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0px rgba(255,182,193,0)",
                "0 0 30px rgba(255,182,193,0.7)",
                "0 0 0px rgba(255,182,193,0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold text-lg hover:from-pink-600 hover:to-rose-600 transition-all transform hover:-translate-y-1"
            onClick={handleYesClick}
          >
            Yes! 💖
          </motion.button>

          <motion.button
            ref={noButtonRef}
            initial={false}
            animate={{
              x: position.x,
              y: position.y,
              rotate: position.x * 0.5,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 10
              }
            }}
            whileHover={{ scale: 0.95 }}
            className={`px-8 py-4 bg-gray-400 text-white rounded-full font-bold hover:bg-gray-500 transition-colors transform ${calculateNoButtonSize()}`}
            onClick={handleNoClick}
          >
            {getNoButtonText()}
          </motion.button>
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1581022295087-35e593704911')] opacity-5" />
        </div>
      </motion.div>
    </div>
  );
}

export default App;