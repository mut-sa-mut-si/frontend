// src/variants.js
export const defaultEasing = [0.6, -0.05, 0.01, 0.99];

export const staggerTwo = {
    animate: { transition: { staggerChildren: 0.2 } },
};

export const staggerOne = {
    animate: { transition: { staggerChildren: 0.1 } },
};

export const staggerHalf = {
    animate: { transition: { staggerChildren: 0.05 } },
};

export const staggerImmediate = {
    animate: { transition: { staggerChildren: 0.01 } },
};

export const fadeInHalf = {
    initial: {
        opacity: 0.3,
        transition: { duration: 0.3, ease: defaultEasing },
        willChange: 'opacity',
    },
    animate: {
        opacity: 1,
        transition: { duration: 0.3, ease: defaultEasing },
        willChange: 'opacity',
    },
    exit: {
        opacity: 0.3,
        transition: { duration: 0.3, ease: defaultEasing },
        willChange: 'opacity',
    },
};

export const fadeIn = {
    initial: {
        opacity: 0,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: 'opacity',
    },
    animate: {
        opacity: 1,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: 'opacity',
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: 'opacity',
    },
};

export const fadeInUp = {
    initial: {
        opacity: 0,
        y: 30,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: 'opacity, transform',
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: 'opacity, transform',
    },
    exit: {
        opacity: 0,
        y: 30,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: 'opacity, transform',
    },
};

export const fadeInScale = {
    initial: {
        opacity: 0,
        scale: 0.85,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: 'opacity, transform',
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: 'opacity, transform',
    },
    exit: {
        opacity: 0,
        scale: 0.85,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: 'opacity, transform',
    },
};

export const fadeInSlideToRight = {
    initial: {
        opacity: 0,
        x: -30,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: 'opacity, transform',
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: 'opacity, transform',
    },
    exit: {
        opacity: 0,
        x: 30,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: 'opacity, transform',
    },
};

export const fadeInSlideToLeft = {
    initial: {
        opacity: 0,
        x: 30,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: 'opacity, transform',
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: 'opacity, transform',
    },
    exit: {
        opacity: 0,
        x: -30,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: 'opacity, transform',
    },
};

export const cardSwitch = {
    initial: {
        opacity: 0,
        y: 30,
        transition: { duration: 0.5, ease: defaultEasing },
        willChange: 'opacity, transform',
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: defaultEasing },
        willChange: 'opacity, transform',
    },
    exit: {
        opacity: 0,
        y: 30,
        transition: { duration: 0.4, ease: defaultEasing },
        willChange: 'opacity, transform',
    },
};
