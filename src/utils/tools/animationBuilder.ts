import {createAnimation} from "@ionic/react";

const animationBuilder = (baseEl: any, opts: any) => {

    const leavingAnimation = createAnimation('leaving-animation')
    const enteringAnimation = createAnimation('entering-animation');

    if (opts.direction === "forward") {
        enteringAnimation
            .addElement(opts.enteringEl)
            .beforeRemoveClass('ion-page-invisible')
            .fromTo("transform", "translateX(100%)", "translateX(0%)")
        leavingAnimation
            .addElement(opts.leavingEl)
            .fromTo("transform", "translateX(0%)", "translateX(-100%)")
    } else {
        enteringAnimation
            .addElement(opts.enteringEl)
            .beforeRemoveClass('ion-page-invisible')
            .fromTo("transform", "translateX(-100%)", "translateX(0%)")

        leavingAnimation
            .addElement(opts.leavingEl)
            .fromTo("transform", "translateX(0%)", "translateX(100%)")
    }

    const animation = createAnimation('group-animation')
        .addAnimation([enteringAnimation, leavingAnimation])
        .easing('ease-in-out')
        .duration(150)
        .fill('both');

    return animation;
}
export default animationBuilder;