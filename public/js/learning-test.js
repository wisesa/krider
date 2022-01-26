function nextQuestion(answer, AddVak1, AddVak2, Ld1, Ld2, Ld3) {
    //if current question reach total question then show the form
    if ($("#txt-now").val() == $("#txt-total").val()) {
        $("#a" + parseInt($("#txt-now").val())).val(answer);
        $('#section-test').css('display', 'none');
        $('#section-information').css('display', 'block');

        if ($("#referred_by").val() != "") {
            $('#section-test').css('display', 'none');
            $('#section-information').css('display', 'block');
        } //else
        //$("#learning-test-form-data").submit();
    }
    //else move to the next question
    else {
        if ($("#taken_test_foundation").val() == "false")
            var progress = (100 / parseInt($("#txt-total").val()) * (parseInt($("#txt-now").val())));
        else
            var progress = (100 / parseInt($("#txt-total").val() - parseInt($("#txt-mi-vak").val() - 1)) * (parseInt($("#txt-now").val()) - parseInt($("#txt-mi-vak").val() - 1)));

        progress = progress.toFixed(1);

        var divider_md = 199;
        var divider_sm = 223;
        if ($("#taken_test_foundation").val() == "true") {
            divider_md = 139;
            divider_sm = 163;
        }

        if ($("#taken_test_foundation").val() == "true") {
            var progressbar = (100 / divider_md) * (parseInt($("#txt-now").val()) - 60); //60 + (8% -> width of current progress bar) then divide with 1,6 which is 100/60 -> 8/1,6 = 5
        } else {
            var progressbar = (100 / divider_md) * parseInt($("#txt-now").val()); //60 + (8% -> width of current progress bar) then divide with 1,6 which is 100/60 -> 8/1,6 = 5
        }
        progressbar = progressbar + 8;
        $("#progressbar-md").css("width", progressbar + "%");
        $("#label-progressbar-md").text(progress + "%");


        if ($("#taken_test_foundation").val() == "true") {
            var progressbar = (100 / divider_sm) * (parseInt($("#txt-now").val()) - 60); // 20%
        } else {
            var progressbar = (100 / divider_sm) * parseInt($("#txt-now").val()); // 20%
        }
        progressbar = progressbar + 20;
        $("#progressbar-sm").css("width", progressbar + "%");
        $("#label-progressbar-sm").text(progress + "%");

        /*UNCOMMENT LATER*/
        //$("#progressbar").css("width", progress + "%");
        //$("#label-progressbar").text(progress + "%");

        $("#a" + parseInt($("#txt-now").val())).val(answer);
        $("#txt-now").val(parseInt($("#txt-now").val()) + 1);
        $("#p-question").text($("#question-" + $("#txt-now").val()).val());
        //$("#p-question").text($("#txt-now").val() + ". " + $("#question-" + $("#txt-now").val()).val()); //SHOW QUESTION WITH NUMBER

        if ($("#txt-now").val() >= parseInt($("#txt-ld").val())) {
            $('#box-3-options').css('display', 'none');
            $('#box-2-options').css('display', 'block');

            $('#2op-box-1').text(AddVak1);
            $('#2op-box-2').text(AddVak2);
        } else if ($("#txt-now").val() >= parseInt($("#txt-add-vak").val())) {
            $('#box-5-options').css('display', 'none');
            $('#box-3-options').css('display', 'block');

            $('#3op-box-1').text(Ld1);
            $('#3op-box-2').text(Ld2);
            $('#3op-box-3').text(Ld3);
        } else if ($("#txt-now").val() >= parseInt($("#txt-mi-vak").val()) && $("#taken_test_foundation").val() == "false") {
            $('#box-7-options').css('display', 'none');
            $('#box-5-options').css('display', 'block');
        }
    }
}

function rocket() {
    $("#rocket").animate({
        top: "-=20"
    }, 500, function() {
        $("#rocket").animate({
            top: "+=20"
        }, 500, function() {
            rocket();
        });
    });
}

$(document).ready(function() {
    rocket();
});