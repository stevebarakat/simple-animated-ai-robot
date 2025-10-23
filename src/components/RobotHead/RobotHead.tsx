import { motion } from "motion/react";

const MOUTH_PATHS = {
  closed: "M 4,10 A 3,2 0 0 0 12,10 L 4,10",
  open: "M 4,10 A 3,3 0 0 0 12,10 L 4,10",
};

interface RobotHeadProps {
  isSpeaking: boolean;
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
}: {
  config: (typeof TOOTH_CONFIGS)[0];
  isSpeaking: boolean;
}) {
  return (
    <motion.g
      animate={{
        y: isSpeaking ? SPEAKING_OFFSET : 0,
      }}
      transition={{
        duration: 0.3,
        repeat: isSpeaking ? Infinity : 0,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <line
        className="tooth"
        x1={config.x}
        y1={config.topY}
        x2={config.x}
        y2={config.topYEnd}
      />
      <line
        className="tooth"
        x1={config.x}
        y1={config.bottomY}
        x2={config.x}
        y2={config.bottomYEnd}
      />
    </motion.g>
  );
}

export function RobotHead({ isSpeaking }: RobotHeadProps) {
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
          d: isSpeaking ? MOUTH_PATHS.open : MOUTH_PATHS.closed,
        }}
        transition={{
          duration: 0.3,
          repeat: isSpeaking ? Infinity : 0,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {TOOTH_CONFIGS.map((config, index) => (
        <Tooth key={index} config={config} isSpeaking={isSpeaking} />
      ))}

      <motion.path
        className="lips"
        initial={{ d: MOUTH_PATHS.closed }}
        animate={{
          d: isSpeaking ? MOUTH_PATHS.open : MOUTH_PATHS.closed,
        }}
        transition={{
          duration: 0.3,
          repeat: isSpeaking ? Infinity : 0,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
