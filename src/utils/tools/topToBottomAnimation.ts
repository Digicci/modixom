import {createAnimation} from "@ionic/react";

const topToBottomAnimation = (baseEl: any, opts: any) => {
    const enteringAnimation = createAnimation('entering-animation');
    const leavingAnimation = createAnimation('leaving-animation');

    if (opts.direction === "forward") {
        enteringAnimation
            .addElement(opts.enteringEl)
            .beforeRemoveClass('ion-page-invisible')
            .fromTo("transform", "translateY(-100%)", "translateY(0%)")

        leavingAnimation
            .addElement(opts.leavingEl);
    } else {
        enteringAnimation
            .addElement(opts.enteringEl)
            .beforeRemoveClass('ion-page-invisible');
        leavingAnimation
            .addElement(opts.leavingEl)
            .fromTo("transform", "translateY(0%)", "translateY(-100%)")
    }

    return createAnimation('group-animation-popup')
        .addAnimation([enteringAnimation, leavingAnimation])
        .easing('ease-in-out')
        .duration(150)
        .fill('both');
}

export default topToBottomAnimation;