import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Very subtle page fade-in animation
 * Strict rule: No bouncing, no parallax, subtle opacity only.
 */
export const usePageAnimation = (containerRef, dependencies = []) => {
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 6,
        duration: 0.25,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }, containerRef);

    return () => ctx.revert();
  }, dependencies);
};

/**
 * GSAP Number Counter animation for metric cards
 */
export const useCounterAnimation = (ref, targetValue, prefix = '', suffix = '', decimals = 0) => {
  useEffect(() => {
    if (!ref.current) return;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: targetValue,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) {
          const formatted = decimals > 0 
            ? obj.val.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
            : Math.round(obj.val).toLocaleString('en-US');
          ref.current.textContent = `${prefix}${formatted}${suffix}`;
        }
      }
    });

    return () => {
      tween.kill();
    };
  }, [targetValue, prefix, suffix, decimals]);
};
