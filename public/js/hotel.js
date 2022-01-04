// radio buttons for check in/out
const rb_in = document.querySelector("#check_in");
const rb_out = document.querySelector("#check_out");

rb_in.addEventListener("click", () => {
    document.querySelector(".puerto h3").innerHTML = "Desde:";
});
rb_out.addEventListener("click", () => {
    document.querySelector(".puerto h3").innerHTML = "Hacia:";
});

// form validation and clear after submit success
function submitForm() {
    // validate check in/out
    const rb_check = document.querySelectorAll('.check input[type=radio]');
    if (!radioButtons(rb_check)) {
        alert('Seleccione Entrada/Salida');
        return;
    };
    // validate puerto origen/destino
    const rb_puerto = document.querySelectorAll('.puerto input[type=radio]');
    if (!radioButtons(rb_puerto)) {
        alert('Seleccione Origen/Destino');
        return;
    };

    const fecha = document.querySelector('#ingresos input[type=date]');
    console.log(fecha);

    // validate Nro habitacion
    const habitacion = document.querySelector('#ingresos input[name="nro_habitacion"]').value;
    if (isEmpty(habitacion)) {
        alert('Debe ingresar número de habitación');
        return;
    } else {
        if (!allNumeric(habitacion)) {
            alert('Habitación: Ingrese solo números');
            return;
        }
    }
    // validate Nro huespedes
    const huespedes = document.querySelector('#ingresos input[name="nro_personas"]').value;
    if (isEmpty(huespedes)) {
        alert('Debe ingresar cantidad de personas');
        return;
    } else {
        if (!allNumeric(huespedes)) {
            alert('Cantidad de Personas: Ingrese solo números');
            return;
        }
    }
    // form validated -- submit and clear
    const form = document.querySelector('#ingresos');
    form.submit(); // Submit the form
    form.reset();  // Reset all form data
    return true; // Refresh the page
}
//-*/-*/-*/-*/-*/-*/-*/-*/*/~~~/~*/-~~/~/~~/+-~/~*~~~~~~~/+~*-
//*^^~^~+*+^/*+/^~´/{*~^~^~-{^´^/~^~^~^-´~^*/-}}

function isEmpty(form_input) {
    if (!form_input) {
        return true;
    }
    return false;
}

function allNumeric(form_input) {
    const numbers = /^[0-9]+$/;
    if (form_input.match(numbers)) {
        return true;
    }
    return false;
};

function radioButtons(radio_list) {
    let out = false;
    for (let i = 0; i < radio_list.length; i++) {
        if (radio_list[i].checked) {
            out = true;
        }
    }
    return out;
}