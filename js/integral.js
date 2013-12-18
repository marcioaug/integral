(function ($) {
    'use strict';

    var iD = function (f, xn, xm, yn, ym, n) {
        var i, j, deltaX, deltaY, deltaA, x, y, result = 0;

        deltaX = ((xm() - xn()) / n);

        for (i = 1; i <= n; i += 1) {
            x = (((xn() + i * deltaX)) + (xn() + (i - 1) * deltaX))  / 2;
            deltaY = ((ym(x) - yn(x)) / n);
            deltaA = deltaX * deltaY;
            for (j = 1; j <= n; j += 1) {
                y = (((yn(x) + j * deltaY)) + (yn(x) + (j - 1) * deltaY)) / 2;
                result += f(x, y) * deltaA;
            }
        }

        return result;
    };

    var iT = function (f, xn, xm, yn, ym, zn, zm, n) {
        var i, j, k, deltaX, deltaY, deltaZ, deltaV, x, y, z, result = 0;

        deltaX = ((xm() - xn()) / n);
        for (i = 1; i <= n; i += 1) {
            x = (((xn() + i * deltaX)) + (xn() + (i - 1) * deltaX))  / 2;
            deltaY = ((ym(x) - yn(x)) / n);
            for (j = 1; j <= n; j += 1) {
                y = (((yn(x) + j * deltaY)) + (yn(x) + (j - 1) * deltaY)) / 2;
                deltaZ = ((zm(x, y) - zn(x, y)) / n);
                deltaV = deltaX * deltaY * deltaZ;
                for (k = 1; k <= n; k += 1) {
                    z = (((zn(x, y) + k * deltaZ)) + (zn(x) + (k - 1) * deltaZ)) / 2;
                    result += f(x, y, z) * deltaV;
                }
            }
        }

        return result;
    };



    $(function () {

        $('#n').change(function () {
            $('#n-value').empty().html($('#n').val());
        });

        $('#calculate').click(function () {
            var result;

            result = integralDuplaTipo1(
                $('#f').val(),
                $('#xn').val(),
                $('#xm').val(),
                $('#yn').val(),
                $('#ym').val(),
                $('#n').val()
            );

            $('#result').empty().append(" = " + result.toFixed(6));
        });

        $('#calculate-polar').click(function () {
            var result, math = new mathjs();

            result = integralDuplaPolar(
                "(" + $('#f-polar').val() + ") * r",
                $('#xn-polar').val(),
                $('#xm-polar').val(),
                $('#yn-polar').val(),
                $('#ym-polar').val(),
                $('#n-polar').val()
            );

            $('#result-polar').empty().append(" = " + result.toFixed(6));
        });
    });

    window.integralDuplaTipo1 = function (f, xn, xm, yn, ym, n) {

        var result, math = new mathjs();

        result = iD(
            function (x, y) { return math.parse(f, {x: x, y: y}).eval(); },
            function () { return math.parse(xn).eval(); },
            function () { return math.parse(xm).eval(); },
            function (x) { return math.parse(yn, {x: x}).eval(); },
            function (x) { return math.parse(ym, {x: x}).eval(); },
            n
        );

        return result;
    };

    window.integralDuplaTipo2 = function (f, xn, xm, yn, ym, n) {

        var result, math = new mathjs();

        result = iD(
            function (x, y) { return math.parse(f, {y: x, x: y}).eval(); },
            function () { return math.parse(xn).eval(); },
            function () { return math.parse(xm).eval(); },
            function (x) { return math.parse(yn, {y: x}).eval(); },
            function (x) { return math.parse(ym, {y: x}).eval(); },
            n
        );

        return result;
    };

    window.integralDuplaPolar = function (f, xn, xm, yn, ym, n) {

        var result, math = new mathjs();

        result = iD(
            function (x, y) { return math.parse("(" + f.toString() + ") * r", {t: x, r: y}).eval(); },
            function () { return math.parse(xn.toString()).eval(); },
            function () { return math.parse(xm.toString()).eval(); },
            function (x) { return math.parse(yn.toString(), {t: x}).eval(); },
            function (x) { return math.parse(ym.toString(), {t: x}).eval(); },
            n
        );

        return result;
    };

    window.integralTriplaZYX = function (f, xn, xm, yn, ym, zn, zm, n) {

        var result, math = new mathjs();

        result = iT(
            function (x, y, z) { return math.parse(f.toString(), {x: x, y: y, z: z}).eval(); },
            function () { return math.parse(xn.toString()).eval(); },
            function () { return math.parse(xm.toString()).eval(); },
            function (x) { return math.parse(yn.toString(), {x: x}).eval(); },
            function (x) { return math.parse(ym.toString(), {x: x}).eval(); },
            function (x, y) { return math.parse(zn.toString(), {x: x, y: y}).eval(); },
            function (x, y) { return math.parse(zm.toString(), {x: x, y: y}).eval(); },
            n
        );

        return result;
    };

    window.integralTriplaZXY = function (f, xn, xm, yn, ym, zn, zm, n) {

        var result, math = new mathjs();

        result = iT(
            function (x, y, z) { return math.parse(f.toString(), {y: x, x: y, z: z}).eval(); },
            function () { return math.parse(xn.toString()).eval(); },
            function () { return math.parse(xm.toString()).eval(); },
            function (x) { return math.parse(yn.toString(), {y: x}).eval(); },
            function (x) { return math.parse(ym.toString(), {y: x}).eval(); },
            function (x, y) { return math.parse(zn.toString(), {y: x, x: y}).eval(); },
            function (x, y) { return math.parse(zm.toString(), {y: x, x: y}).eval(); },
            n
        );

        return result;
    };

    window.integralTriplaXYZ = function (f, xn, xm, yn, ym, zn, zm, n) {

        var result, math = new mathjs();

        result = iT(
            function (x, y, z) { return math.parse(f.toString(), {z: x, y: y, x: z}).eval(); },
            function () { return math.parse(xn.toString()).eval(); },
            function () { return math.parse(xm.toString()).eval(); },
            function (x) { return math.parse(yn.toString(), {z: x}).eval(); },
            function (x) { return math.parse(ym.toString(), {z: x}).eval(); },
            function (x, y) { return math.parse(zn.toString(), {z: x, y: y}).eval(); },
            function (x, y) { return math.parse(zm.toString(), {z: x, y: y}).eval(); },
            n
        );

        return result;
    };

    window.integralTriplaXZY = function (f, xn, xm, yn, ym, zn, zm, n) {

        var result, math = new mathjs();

        result = iT(
            function (x, y, z) { return math.parse(f.toString(), {y: x, z: y, x: z}).eval(); },
            function () { return math.parse(xn.toString()).eval(); },
            function () { return math.parse(xm.toString()).eval(); },
            function (x) { return math.parse(yn.toString(), {y: x}).eval(); },
            function (x) { return math.parse(ym.toString(), {y: x}).eval(); },
            function (x, y) { return math.parse(zn.toString(), {y: x, z: y}).eval(); },
            function (x, y) { return math.parse(zm.toString(), {y: x, z: y}).eval(); },
            n
        );

        return result;
    };

    window.integralTriplaYZX = function (f, xn, xm, yn, ym, zn, zm, n) {

        var result, math = new mathjs();

        result = iT(
            function (x, y, z) { return math.parse(f.toString(), {x: x, z: y, y: z}).eval(); },
            function () { return math.parse(xn.toString()).eval(); },
            function () { return math.parse(xm.toString()).eval(); },
            function (x) { return math.parse(yn.toString(), {x: x}).eval(); },
            function (x) { return math.parse(ym.toString(), {x: x}).eval(); },
            function (x, y) { return math.parse(zn.toString(), {x: x, z: y}).eval(); },
            function (x, y) { return math.parse(zm.toString(), {x: x, z: y}).eval(); },
            n
        );

        return result;
    };

    window.integralTriplaYXZ = function (f, xn, xm, yn, ym, zn, zm, n) {

        var result, math = new mathjs();

        result = iT(
            function (x, y, z) { return math.parse(f.toString(), {z: x, x: y, y: z}).eval(); },
            function () { return math.parse(xn.toString()).eval(); },
            function () { return math.parse(xm.toString()).eval(); },
            function (x) { return math.parse(yn.toString(), {z: x}).eval(); },
            function (x) { return math.parse(ym.toString(), {z: x}).eval(); },
            function (x, y) { return math.parse(zn.toString(), {z: x, x: y}).eval(); },
            function (x, y) { return math.parse(zm.toString(), {z: x, x: y}).eval(); },
            n
        );

        return result;
    };

}(window.jQuery));