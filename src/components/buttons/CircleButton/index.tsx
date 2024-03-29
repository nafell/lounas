"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

type CircleButtonProps = {
  title: string;
  value: React.ButtonHTMLAttributes<HTMLButtonElement>["value"];
  size?: number;
  x?: number;
  y?: number;
  position?: "absolute" | "relative";
  gradient?: {
    start: string;
    end: string;
    direction: number;
  };
  animation?: {
    delay: number;
    stiffness: number;
    damping: number;
  };
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

/**
 *
 * @param {string} title Title
 * @param {number} size Size in `rem`
 * @param {number} x Horizontal position `%` or ratio (1-100 or 0-1)
 * @param {number} y Vertical position `%` or ratio (1-100 or 0-1)
 * @param {string} position Position of the button `absolute` or `relative` (default `absolute`)
 * @param {string} gradient.start Start color of the gradient (default `#fff`)
 * @param {string} gradient.end End color of the gradient (default `#fff`)
 * @param {number} gradient.direction Direction of the gradient in `deg` (default `180`)
 * @param {number} animation.delay Delay of the animation in `s` (default `Math.random() * 0.6969`)
 * @param {number} animation.stiffness Stiffness of the animation (default `80`)
 * @param {number} animation.damping Damping of the animation (default `8`)
 * @param {(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void} onClick Function to be called when clicked
 *    `(React.MouseEvent<HTMLButtonElement, MouseEvent>) => void`
 */
export function CircleButton({
  title,
  value,
  size = 0,
  x = 0,
  y = 0,
  position = "absolute",
  gradient = {
    start: "#fff",
    end: "#fff",
    direction: 180,
  },
  animation = {
    delay: 9999,
    stiffness: 80,
    damping: 8,
  },
  onClick,
}: CircleButtonProps) {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [delay, setDelay] = useState(animation.delay);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    /** rem to px */
    const remToPx = (rem: number) => {
      return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    };
    /** ratio to px of target(px) */
    const ratioToPx = (ratio: number, targetPx: number) => {
      ratio = ratio > 1 ? ratio / 100 : ratio; // if ratio is over 1 (means percentage), convert to ratio
      return ratio * targetPx;
    };
    const styles: React.CSSProperties = {
      position: position,
      height: size ? `${size}rem` : "100%",
      fontSize: size ? `${size / 4}rem` : "unset",
      background: `linear-gradient(${gradient.direction}deg, ${gradient.start}, ${gradient.end})`,
      left: `${ratioToPx(x, window.innerWidth) - remToPx(size / 2)}px`,
      top: `${ratioToPx(y, window.innerHeight) - remToPx(size / 2)}px`,
    };
    /** set styles */
    setStyle(styles);
    /** set delay if unset-status */
    if (animation.delay >= 9999) setDelay(Math.random() * 0.6969);
    /** set mounted */
    setMounted(true);
  }, [position, size, gradient, x, y, animation.delay]);

  return (
    <>
      {gradient.start === "#fff" && gradient.end === "#fff"
        ? mounted && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: delay,
                type: "spring",
                stiffness: animation.stiffness,
                damping: animation.damping,
              }}
              drag={true}
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragTransition={{
                bounceStiffness: 100,
                bounceDamping: 8,
              }}
              onClick={(e) => onClick(e)}
              value={value}
              className={styles.circleBorder}
              style={style}
            >
              <span className={styles.title}>{title}</span>
            </motion.button>
          )
        : mounted && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: delay,
                type: "spring",
                stiffness: animation.stiffness,
                damping: animation.damping,
              }}
              drag={true}
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragTransition={{
                bounceStiffness: 100,
                bounceDamping: 8,
              }}
              onClick={(e) => onClick(e)}
              value={value}
              className={styles.circle}
              style={style}
            >
              <span className={styles.title}>{title}</span>
            </motion.button>
          )}
    </>
  );
}
