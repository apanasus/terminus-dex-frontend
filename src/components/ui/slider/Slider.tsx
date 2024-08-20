"use client";

import React, { cloneElement, useCallback, useEffect, useMemo, useState } from "react";
import styles from "./slider.module.css";

type SliderProps = {
  children: React.ReactNode;
};

const Slider = ({ children }: SliderProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [xPosition, setXPosition] = useState(0);
  const [prevXPosition, setPrevXPosition] = useState(0);

  const onTouchStart = useCallback(
    (event: React.TouchEvent) => {
      setPrevXPosition(event.touches[0].clientX);
      setXPosition(event.touches[0].clientX);
    },
    [setXPosition, setPrevXPosition],
  );

  const onTouchMove = useCallback(
    (event: React.TouchEvent) => {
      setXPosition(event.touches[0].clientX - prevXPosition);
    },
    [setXPosition],
  );

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      const lastXPosition = event.changedTouches[0].clientX;
      if (prevXPosition - lastXPosition > 100) {
        leftClick();
      }
      if (prevXPosition - lastXPosition < -100) {
        rightClick();
      }
      setXPosition(0);
      setPrevXPosition(0);
    },
    [setXPosition, setPrevXPosition, xPosition, prevXPosition],
  );

  const leftClick = () => {
    setPrevSlideIndex(currentSlideIndex);
    setCurrentSlideIndex((prev) => prev - 1);
    setDirection("left");
  };
  const rightClick = () => {
    setPrevSlideIndex(currentSlideIndex);
    setCurrentSlideIndex((prev) => prev + 1);
    setDirection("right");
  };

  const childrenCount = React.Children.count(children);

  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return cloneElement(child, {
        // @ts-ignore
        leftClick:
          childrenCount > 1
            ? (event: any) => {
                leftClick();
                if (child.props.leftClick) child.props.leftClick(event);
              }
            : null,
        // @ts-ignore
        rightClick:
          childrenCount > 1
            ? (event: any) => {
                rightClick();
                if (child.props.rightClick) child.props.rightClick(event);
              }
            : null,
      });
    }
  });

  const childrenArray = React.Children.toArray(clonedChildren);

  const prevSlideAnimation = direction === "left" ? styles.slide_left_prev : styles.slide_right_prev;
  const currentSlideAnimation = direction === "left" ? styles.slide_left_current : styles.slide_right_current;

  useEffect(() => {
    if (currentSlideIndex < 0) setCurrentSlideIndex(childrenArray.length - 1);
    if (currentSlideIndex >= childrenArray.length) setCurrentSlideIndex(0);
  }, [currentSlideIndex]);

  return (
    <section
      className="mb-36 overflow-hidden px-8"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative flex h-[645px] w-full flex-row self-start">
        {prevSlideIndex !== currentSlideIndex && (
          <div
            key={prevSlideIndex}
            className={`absolute left-0 top-0 -z-10 w-full opacity-0 ${direction && prevSlideAnimation}`}
          >
            {childrenArray[prevSlideIndex]}
          </div>
        )}
        <div key={currentSlideIndex} className={`absolute left-0 top-0 w-full  ${direction && currentSlideAnimation}`}>
          {childrenArray[currentSlideIndex]}
        </div>
      </div>
    </section>
  );
};

export default Slider;
