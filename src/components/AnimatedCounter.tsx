import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export function parseMetric(val: string | number): {
  target: number;
  decimals: number;
  isThousandGroup: boolean;
  prefix: string;
  suffix: string;
} {
  const str = String(val).trim();
  const match = str.match(/^([^0-9]*)([\d.,]+)(.*)$/);
  if (!match) {
    return { target: 0, decimals: 0, isThousandGroup: false, prefix: '', suffix: str };
  }

  const prefix = match[1] || '';
  const numPart = match[2];
  const suffix = match[3] || '';

  // Check if numPart is formatted as Brazilian thousand (e.g. 1.012 or 5.550)
  if (/^\d{1,3}\.\d{3}$/.test(numPart)) {
    const target = parseInt(numPart.replace(/\./g, ''), 10);
    return { target, decimals: 0, isThousandGroup: true, prefix, suffix };
  }

  // Check if numPart has comma decimal (e.g. 11,1)
  if (numPart.includes(',')) {
    const parts = numPart.split(',');
    const decimals = parts[1] ? parts[1].length : 0;
    const target = parseFloat(parts[0].replace(/\./g, '') + '.' + parts[1]);
    return { target, decimals, isThousandGroup: false, prefix, suffix };
  }

  // Standard float or integer
  const target = parseFloat(numPart);
  return { target: isNaN(target) ? 0 : target, decimals: 0, isThousandGroup: false, prefix, suffix };
}

function formatValue(
  current: number,
  decimals: number,
  isThousandGroup: boolean,
  prefix: string,
  suffix: string
): string {
  if (isThousandGroup) {
    const rounded = Math.round(current);
    const formatted = rounded.toLocaleString('pt-BR');
    return `${prefix}${formatted}${suffix}`;
  }

  if (decimals > 0) {
    const factor = Math.pow(10, decimals);
    const rounded = (Math.round(current * factor) / factor).toFixed(decimals);
    const formatted = rounded.replace('.', ',');
    return `${prefix}${formatted}${suffix}`;
  }

  const rounded = Math.round(current);
  return `${prefix}${rounded}${suffix}`;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1600,
  className = ''
}) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  // Parse target metrics
  const { target, decimals, isThousandGroup, prefix, suffix } = parseMetric(value);

  // Trigger on intersection with viewport
  useEffect(() => {
    const el = elementRef.current;
    if (!el) {
      setHasStarted(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Run animation when hasStarted is true or when value changes
  useEffect(() => {
    if (!hasStarted) {
      setDisplayValue(formatValue(0, decimals, isThousandGroup, prefix, suffix));
      return;
    }

    setIsFinished(false);
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out exponential curve
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = ease * target;

      setDisplayValue(formatValue(currentVal, decimals, isThousandGroup, prefix, suffix));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(formatValue(target, decimals, isThousandGroup, prefix, suffix));
        setIsFinished(true);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hasStarted, value, target, decimals, isThousandGroup, prefix, suffix, duration]);

  return (
    <span
      ref={elementRef}
      className={`inline-block tabular-nums transition-transform duration-300 ${
        isFinished ? 'scale-100' : 'scale-[0.98]'
      } ${className}`}
      aria-label={String(value)}
    >
      {displayValue}
    </span>
  );
};
