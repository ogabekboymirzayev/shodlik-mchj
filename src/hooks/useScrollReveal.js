import { useEffect, useRef, useState } from "react";

/**
 * useScrollReveal — Intersection Observer-based reveal hook.
 * Once the element enters the viewport, it stays visible (unobserved after trigger).
 *
 * @param {object} options
 * @param {number} options.threshold  - 0-1 visibility ratio to trigger (default 0.15)
 * @param {string} options.rootMargin - root margin string (default "0px 0px -60px 0px")
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = "0px 0px -60px 0px" } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
