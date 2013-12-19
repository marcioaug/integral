(function ($) {
    'use strict';

    $(function () {

        $('#n').change(function () {
            $('#n-value').empty().html($('#n').val());
        });

        $('#n-t').change(function () {
            $('#n-value-t').empty().html($('#n-t').val());
        });


        $('#calculate').click(function () {
            var result, f, xn, xm, yn, ym, n, tipo;

            tipo = $('#tipo option:selected').val();
            f = $('#f').val();
            xn = $('#xn').val();
            xm = $('#xm').val();
            yn = $('#yn').val();
            ym = $('#ym').val();
            n = $('#n').val();

            switch (tipo) {
            case "1":
                result = integralDuplaTipo1(f, xn, xm, yn, ym, n);
                break;
            case "2":
                result = integralDuplaTipo2(f, xn, xm, yn, ym, n);
                break;
            case "3":
                result = integralDuplaPolar(f, xn, xm, yn, ym, n);
                break;
            }

            $('#result').empty().append(" = " + result.toFixed(6));
        });

        $('#calculate-t').click(function () {
            var result, f, xn, xm, yn, ym, zn, zm, n, tipo;

            tipo = $('#tipo-t option:selected').val();
            f = $('#f-t').val();
            xn = $('#xn-t').val();
            xm = $('#xm-t').val();
            yn = $('#yn-t').val();
            ym = $('#ym-t').val();
            zn = $('#zn-t').val();
            zm = $('#zm-t').val();
            n = $('#n-t').val();

            switch (tipo) {
                case "1":
                    result = integralTriplaZYX(f, xn, xm, yn, ym, zn, zm, n);
                    break;
                case "2":
                    result = integralTriplaZXY(f, xn, xm, yn, ym, zn, zm, n);
                    break;
                case "3":
                    result = integralTriplaXYZ(f, xn, xm, yn, ym, zn, zm, n);
                    break;
                case "4":
                    result = integralTriplaXZY(f, xn, xm, yn, ym, zn, zm, n);
                    break;
                case "5":
                    result = integralTriplaYZX(f, xn, xm, yn, ym, zn, zm, n);
                    break;
                case "6":
                    result = integralTriplaYXZ(f, xn, xm, yn, ym, zn, zm, n);
                    break;
            }

            $('#result-t').empty().append(" = " + result.toFixed(6));
        });

    });
}(window.jQuery));