import { useEffect, useState, useRef } from "react";
import "./ScrollAnimation.css";

const withScrollAnimation = (WrappedComponent) => {
  return (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.3}
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div ref={elementRef} className={`scroll-item ${isVisible ? "show" : ""}`}>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withScrollAnimation;
