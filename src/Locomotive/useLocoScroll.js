import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useRef } from "react";
import "./locobasic.css";

export default function useLocoScroll() {
  const scrollEl = useRef(null);
  const locoScroll = useRef(null);

  useEffect(() => {
    locoScroll.current = new LocomotiveScroll({
      el: scrollEl.current,
      smooth: true,
      multiplier: 0.5,
    });

    return () => {
      locoScroll.current.destroy();
    };
  }, []);

  // Call update on Locomotive Scroll after this component is mounted
  useEffect(() => {
    if (locoScroll.current) {
      locoScroll.current.update();
    }
  }, []);

  return scrollEl;
}
