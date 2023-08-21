import {createAnimation} from "@ionic/react";

const animationBuilder = (baseEl, opts) => {

    const leavingAnimation = createAnimation()
        .addElement(opts.leavingEl);
    const enteringAnimation = createAnimation()
        .addElement(opts.enteringEl);

    if (opts.direction === "forward") {
        enteringAnimation
            .fromTo("transform", "translateX(-100%)", "translateX(0%)")

            .duration(100);
        leavingAnimation
            .fromTo("transform", "translateX(0%)", "translateX(-100%)")
            .duration(250);
    } else {
        enteringAnimation
            .fromTo("opacity", 0, 1)
            .duration(250);
        leavingAnimation
            .fromTo("opacity", 1, 0)
            .duration(250);
    }
    console.log(leavingAnimation,enteringAnimation)
    const animation = createAnimation()
        .addAnimation(leavingAnimation)
        .addAnimation(enteringAnimation);

    return animation;
}
export default animationBuilder;