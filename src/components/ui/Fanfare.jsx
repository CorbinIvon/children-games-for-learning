import React, {
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import confetti from "canvas-confetti";

const Fanfare = forwardRef((props, ref) => {
  const audioContext = useRef(null);

  const playJingle = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    const ctx = audioContext.current;
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;

    // Create a simple retro success melody (Arpeggio)
    const playNote = (freq, start, duration, type = "square") => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.1, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + duration);
    };

    // Sequence: C4, E4, G4, C5 (Classic victory arpeggio)
    playNote(261.63, now, 0.1); // C4
    playNote(329.63, now + 0.1, 0.1); // E4
    playNote(392.0, now + 0.2, 0.1); // G4
    playNote(523.25, now + 0.3, 0.4); // C5
  }, []);

  const trigger = useCallback(() => {
    // 1. Confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 1000,
    };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    // 2. Audio
    playJingle();
  }, [playJingle]);

  // Expose trigger to parent
  useImperativeHandle(ref, () => ({
    trigger,
  }));

  return null; // This component handles effects, it doesn't render anything itself
});

Fanfare.displayName = "Fanfare";

export default Fanfare;
