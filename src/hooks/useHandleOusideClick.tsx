import { ReactElement, useEffect, useRef } from "react";

export type Props = {
  clickHandler: () => void;
};

const useHandleOutsideClick = ({ clickHandler }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(event.target as any)) {
      clickHandler();
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("touchend", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("touchend", handleOutsideClick);
    };
  }, [clickHandler]);

  return ref;
};

export default useHandleOutsideClick;
