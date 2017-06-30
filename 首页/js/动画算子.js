 var pow = Math.pow,
     BACK_CONST = 1.70158;
Easing = {
        // 匀速运动
        linear: function (t) {
            return t;
        },

        easeIn: function (t) {
            return t * t;
        },

        easeOut: function (t) {
            return (2 - t) * t;
        },

        easeBoth: function (t) {
            return (t *= 2) < 1 ? .5 * t * t : .5 * (1 - (--t) * (t - 2));
        },

        easeInStrong: function (t) {
            return t * t * t * t;
        },

        easeOutStrong: function (t) {
            return 1 - (--t) * t * t * t;
        },

        easeBothStrong: function (t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t : .5 * (2 - (t -= 2) * t * t * t);
        },

        easeOutQuart: function (t) {
            return -(Math.pow((t - 1), 4) - 1)
        },

        easeInOutExpo: function (t) {
            if (t === 0) return 0;
            if (t === 1) return 1;
            if ((t /= 0.5) < 1) return 0.5 *Math.pow(2, 10 * (t - 1));
            return 0.5 * (-Math.pow(2, - 10 * --t) + 2);
        },

        easeOutExpo: function (t) {
            return (t === 1) ? 1 : -Math.pow(2, - 10 * t) + 1;
        },
		// 未出结果
        swingFrom: function (t) {
            return t * t * ((BACK_CONST + 1) * t - BACK_CONST);
        },

		// 未出结果
        swingTo: function (t) {
            return (t -= 1) * t * ((BACK_CONST + 1) * t + BACK_CONST) + 1;
        },

		// 未出结果
        backIn: function (t) {
            if (t === 1) t -= .001;
            return t * t * ((BACK_CONST + 1) * t - BACK_CONST);
        },
		// 未出结果
        backOut: function (t) {
            return (t -= 1) * t * ((BACK_CONST + 1) * t + BACK_CONST) + 1;
        },
		
        bounce: function (t) {
            var s = 7.5625,
                r;

            if (t < (1 / 2.75)) {
                r = s * t * t;
            } else if (t < (2 / 2.75)) {
                r = s * (t -= (1.5 / 2.75)) * t + .75;
            } else if (t < (2.5 / 2.75)) {
                r = s * (t -= (2.25 / 2.75)) * t + .9375;
            } else {
                r = s * (t -= (2.625 / 2.75)) * t + .984375;
            }

            return r;
        }
    };