import anime from 'animejs/lib/anime.es.js';

const startAnimation = () => {
    anime({
        targets: '#general',
        easing: 'easeInOutQuad',
        opacity: [0, 1],
        duration: 500,
    });

    var smoke_tl = anime.timeline({
        autoplay: true,
        loop: true
    });

    smoke_tl
        .add({
            targets: '#smoke_b',
            opacity: [0, 1],
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutQuad',
            duration: 1500,
        }, 0)
        .add({
            targets: '#smoke_w',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutQuart',
            duration: 1500,
        }, '-=700')
        .add({
            targets: '#smoke_b2',
            opacity: [0, 1],
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutQuad',
            duration: 1500,
        }, 600)
        .add({
            targets: '#smoke_w2',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutQuart',
            endDelay: 2000,
            duration: 1500,
        }, '-=1000');

    var hands_and_pong_tl = anime.timeline({
        autoplay: true,
        loop: true
    });

    hands_and_pong_tl
        .add({
            targets: '#pong_ball',
            transformOrigin: ['50% 50% 0px', '50% 50% 0px'],
            translateY: [1, 30],
            translateX: [1, 103],
            easing: 'linear',
            duration: 1000,
        }, 0)
        .add({
            targets: '#pong_red_bar',
            transformOrigin: ['50% 50% 0px', '50% 50% 0px'],
            translateY: [-25, 1],
            easing: 'easeInOutCubic',
            duration: 1000,
        }, '-=900')
        .add({
            targets: '#pong_ball',
            transformOrigin: ['50% 50% 0px', '50% 50% 0px'],
            translateY: [30, 25],
            translateX: [103, 1],
            easing: 'linear',
            duration: 1000,
        }, '-=100')
        .add({
            targets: '#pong_black_bar',
            transformOrigin: ['50% 50% 0px', '50% 50% 0px'],
            translateY: [1, 25],
            easing: 'easeInOutCubic',
            duration: 1000,
            changeBegin: function (anim) {
                hand1();
            },
        }, '-=900')
        .add({
            targets: '#pong_ball',
            transformOrigin: ['50% 50% 0px', '50% 50% 0px'],
            translateY: [25, 1],
            translateX: [1, 103],
            easing: 'linear',
            duration: 1000,
        }, '-=100')
        .add({
            targets: '#pong_red_bar',
            transformOrigin: ['50% 50% 0px', '50% 50% 0px'],
            translateY: [1, -25],
            easing: 'easeInOutCubic',
            duration: 1000,
        }, '-=900')
        .add({
            targets: '#pong_ball',
            transformOrigin: ['50% 50% 0px', '50% 50% 0px'],
            translateY: [1, 1],
            translateX: [103, 1],
            easing: 'linear',
            duration: 1000,
        }, '-=100')
        .add({
            targets: '#pong_black_bar',
            transformOrigin: ['50% 50% 0px', '50% 50% 0px'],
            translateY: [25, 1],
            easing: 'easeInOutCubic',
            duration: 1000,
            changeBegin: function (anim) {
                hand1();
            },
        }, '-=900');

    const hand1 = () => {
        var hand1_tl = anime.timeline({
            autoplay: true,
        });

        hand1_tl
            .add({
                targets: '#hand1',
                easing: 'easeOutQuad',
                translateY: [1, -5],
                duration: 150,
            })
            .add({
                targets: '#hand1',
                easing: 'easeOutQuad',
                translateY: [-5, 1],
                duration: 350,
            });
    };

    anime({
        targets: '#btn',
        easing: 'easeInOutQuad',
        stroke: '#000000',
        duration: 500,
        loop: true,
        direction: 'alternate',
    });

    var dots_tl = anime.timeline({
        autoplay: true,
        loop: true,
    });

    dots_tl
        .add({
            targets: '#dot1',
            easing: 'easeInOutCubic',
            translateY: [0, -5],
            rotate: 90,
            duration: 500,
        }, 0)
        .add({
            targets: '#dot1',
            easing: 'easeInOutCubic',
            translateY: [-5, 0],
            duration: 500,
        })
        .add({
            targets: '#dot2',
            easing: 'easeInOutCubic',
            translateY: [0, -5],
            rotate: 90,
            duration: 500,
        }, 100)
        .add({
            targets: '#dot2',
            easing: 'easeInOutCubic',
            translateY: [-5, 0],
            duration: 500,
        }, '-=400')
        .add({
            targets: '#dot3',
            easing: 'easeInOutCubic',
            translateY: [0, -5],
            rotate: 90,
            duration: 500,
        }, 200)
        .add({
            targets: '#dot3',
            easing: 'easeInOutCubic',
            translateY: [-5, 0],
            duration: 500,
            endDelay: 500,
        }, '-=400');
};

export default startAnimation;
