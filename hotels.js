const btn = document.querySelector("#enviar");

const rb_in = document.querySelector("#check_in");
const rb_out = document.querySelector("#check_out");

rb_in.addEventListener("click", () => {
    document.querySelector("h3").innerHTML = "Desde:";
});

rb_out.addEventListener("click", () => {
    document.querySelector("h3").innerHTML = "Hacia:";
});

// create object with key/value pairs from form
btn.onclick = function () {
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

    localStorage["form_hotels"] = JSON.stringify(my_obj);
    console.log(my_obj);
}



// check if a form field is empty
/* function any(form_data) {
    for (var input of form_data) {
        if (input.value == "") {
            return true;
        }
        else {
            continue;
        }
    }
    return false;
} */

// enable/disable button based on form fields empty/full
/* btn.addEventListener("change", stateHandle);

function stateHandle() {
    if (any(form_data)) {
        btn.disabled = true;
    }
    else {
        btn.disabled = false;
    }
} */

