(function ($) {
    'use strict';

    window.iD = function (f, xn, xm, yn, ym, n) {
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

    window.iT = function (f, xn, xm, yn, ym, zn, zm, n) {
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
                    z = (((zn(x, y) + k * deltaZ)) + (zn(x, y) + (k - 1) * deltaZ)) / 2;
                    result += f(x, y, z) * deltaV;
                }
            }
        }

        return result;
    };

}(window.jQuery));