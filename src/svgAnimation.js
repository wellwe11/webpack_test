import animationData from "./menuIcon.json";
import lottie from "lottie-web";
import { svgDiv } from "./UI";

// svg animation
export const loadAnimation = () => {
  const animation = lottie.loadAnimation({
    container: svgDiv,
    renderer: "svg",
    loop: false,
    autoplay: false,
    animationData: animationData,
  });

  const totalFrames = animationData.op;
  const halfAnimation = totalFrames / 2;

  const startFrame = () => {
    animation.goToAndPlay(0, true);
    animation.addEventListener("enterFrame", () => {
      if (animation.currentFrame >= halfAnimation) {
        animation.pause();
        animation.removeEventListener("enterFrame");
      }
    });
  };

  const endFrame = () => {
    animation.goToAndPlay(halfAnimation, true);
  };

  return {
    startFrame,
    endFrame,
  };
};
