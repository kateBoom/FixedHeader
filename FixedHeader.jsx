import { useEffect, useRef, useCallback } from 'react';

export const FixedHeader = ({ setFixed }) => {
  const fixedHeader = useRef(null);

  const stickHeader = useCallback(
    (entries) => {
      let rootWindth = entries[0]
        ? entries[0].rootBounds
          ? entries[0].rootBounds.width
          : 0
        : 0;
      const visible = entries[0] ? entries[0].isIntersecting : true;

      if (rootWindth) {
        setFixed(!visible);
      }
    },
    [setFixed]
  );

  useEffect(() => {
    if (window.innerWidth >= 1024 && fixedHeader.current) {
      const observer = new IntersectionObserver(stickHeader);
      observer.observe(fixedHeader.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [stickHeader]);

  return <div ref={fixedHeader}></div>;
};
