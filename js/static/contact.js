$("#form-contact").on("submit", function(event) {
    event.preventDefault(); // prevent reload
    let name = $("#user_name").val();
    let email = $("#user_email").val();
    let telefono = $("#user_telefono").val();
    // let fecha = $("#user_fecha").val();
    let message = $("#message").val();
    var settings = {
        "url": "../../email-contact.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "user_name": name,
            "user_email": email,
            "user_telefono": telefono,
            // "user_fecha": fecha,
            "message": message
        }
    };

    $.ajax(settings).done(function(response) {
        if (response === "El mensaje ha sido enviado") {
            $("#form-contact")[0].reset();
            $(".response-email").html("!Tu mensaje se ha enviado correctamente, Revisa tu correo!");
            $(".response-email").addClass("sucess");

        }
        // console.log(response);
    });
});