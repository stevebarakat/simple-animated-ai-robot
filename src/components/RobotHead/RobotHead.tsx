import { motion } from "motion/react";

const MOUTH_PATHS = {
  closed: "M 4,10 A 3,2 0 0 0 12,10 L 4,10",
  open: "M 4,10 A 3,3 0 0 0 12,10 L 4,10",
};

interface RobotHeadProps {
  isSpeaking: boolean;
  mouthIntensity?: number;
  currentSyllable?: number;
}

const TOOTH_CONFIGS = [
  { x: 5.1, topY: 10.3, topYEnd: 10.8, bottomY: 11.1, bottomYEnd: 11.9 },
  { x: 6.2, topY: 10.3, topYEnd: 11, bottomY: 11.3, bottomYEnd: 12.5 },
  { x: 7.4, topY: 10.3, topYEnd: 11.2, bottomY: 11.5, bottomYEnd: 12.7 },
  { x: 8.6, topY: 10.3, topYEnd: 11.2, bottomY: 11.5, bottomYEnd: 12.7 },
  { x: 9.8, topY: 10.3, topYEnd: 11, bottomY: 11.3, bottomYEnd: 12.7 },
  { x: 10.9, topY: 10.3, topYEnd: 10.8, bottomY: 11.1, bottomYEnd: 12.1 },
];

const SPEAKING_OFFSET = 0.9;

function Tooth({
  config,
  isSpeaking,
  mouthIntensity = 1,
  currentSyllable = 0,
}: {
  config: (typeof TOOTH_CONFIGS)[0];
  isSpeaking: boolean;
  mouthIntensity?: number;
  currentSyllable?: number;
}) {
  const getAnimationDuration = () => {
    return currentSyllable > 0 ? 0.15 : 0.2;
  };

  const bottomOffset = isSpeaking ? SPEAKING_OFFSET * mouthIntensity : 0;

  return (
    <g>
      <line
        className="tooth"
        x1={config.x}
        y1={config.topY}
        x2={config.x}
        y2={config.topYEnd}
      />
      <motion.line
        className="tooth"
        x1={config.x}
        y1={config.bottomY}
        x2={config.x}
        y2={config.bottomYEnd}
        animate={{
          y1: config.bottomY + bottomOffset,
          y2: config.bottomYEnd + bottomOffset,
        }}
        transition={{
          duration: getAnimationDuration(),
          repeat: isSpeaking ? Infinity : 0,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </g>
  );
}

export function RobotHead({
  isSpeaking,
  mouthIntensity = 1,
  currentSyllable = 0,
}: RobotHeadProps) {
  const getMouthPath = () => {
    if (!isSpeaking) return MOUTH_PATHS.closed;

    const intensity = Math.max(0, Math.min(mouthIntensity, 1));
    const radiusY = 2 + 1 * intensity;
    return `M 4,10 A 3,${radiusY} 0 0 0 12,10 L 4,10`;
  };

  const getAnimationDuration = () => {
    return currentSyllable > 0 ? 0.15 : 0.2;
  };

  return (
    <svg className={`head ${isSpeaking ? "speaking" : ""}`} viewBox="0 0 16 16">
      <circle className="face" cx="8" cy="8" r="7" />
      <ellipse className="eye" cx="5" cy="6.5" rx="1.5" ry="2.5" />
      <ellipse className="pupil" cx="5" cy="7.5" rx="0.375" ry="0.625" />
      <ellipse className="eye" cx="11" cy="6.5" rx="1.5" ry="2.5" />
      <ellipse className="pupil" cx="11" cy="7.5" rx="0.375" ry="0.625" />

      <motion.path
        className="mouth"
        initial={{ d: MOUTH_PATHS.closed }}
        animate={{
          d: getMouthPath(),
        }}
        transition={{
          duration: getAnimationDuration(),
          repeat: isSpeaking ? Infinity : 0,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {TOOTH_CONFIGS.map((config, index) => (
        <Tooth
          key={index}
          config={config}
          isSpeaking={isSpeaking}
          mouthIntensity={mouthIntensity}
          currentSyllable={currentSyllable}
        />
      ))}

      <motion.path
        className="lips"
        initial={{ d: MOUTH_PATHS.closed }}
        animate={{
          d: getMouthPath(),
        }}
        transition={{
          duration: getAnimationDuration(),
          repeat: isSpeaking ? Infinity : 0,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
