export function slideFromLeft(delay) {
  return {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay,
      },
    },
  };
}
export function slideFromRight(delay) {
  return {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay,
      },
    },
  };
}

export const slideFromTop = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y:1,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
};

export const slideFromBottom = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
};
