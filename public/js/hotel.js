// enviar button
/* const btn = document.querySelector("#enviar"); */

// radio buttons for check in/out
const rb_in = document.querySelector("#check_in");
const rb_out = document.querySelector("#check_out");

rb_in.addEventListener("click", () => {
    document.querySelector(".puerto h3").innerHTML = "Desde:";
});

rb_out.addEventListener("click", () => {
    document.querySelector(".puerto h3").innerHTML = "Hacia:";
});

function submitForm() {
    const form = document.querySelector("#ingresos");
    form.submit(); // Submit the form
    form.reset();  // Reset all form data
    return true; // Refresh the page
}

// create object with key/value pairs from form
/* btn.onclick = function () {
    let my_obj = {};
    const form_data = Array.from(document.querySelectorAll("#ingresos input[type=text]"));

    for (var input of form_data) {
        my_obj[input.id] = input.value;
    }

    const radio_button = Array.from(document.querySelectorAll("#ingresos input[type=radio]"));

    for (let i = 0; i < radio_button.length; i++) {
        if (radio_button[i].checked) {
            my_obj[radio_button[i].name] = radio_button[i].value;
        }
    }
    console.log(my_obj);
} */