// set date input from today on
const date_field = document.getElementById('fecha');
const date = new Date();
let y = date.getFullYear();
let m = date.getMonth() + 1;
let d = date.getDate();
if (d < 10) {
    d = '0' + d;
}
if (m < 10) {
    m = '0' + m;
}

const today = y + '-' + m + '-' + d;
date_field.setAttribute('min', today);

// radio buttons for check in/out
const rb_in = document.querySelector("#check_in");
const rb_out = document.querySelector("#check_out");
// valijas
const valijas_label = document.querySelector("#valijas_label");
const valijas_input = document.querySelector("#valijas_input");

function inoutCheck(x) {
    if (x == 1) {
        valijas_label.style.display = 'block';
        valijas_input.style.display = 'block';
    } else {
        valijas_label.style.display = 'none';
        valijas_input.style.display = 'none';
    }
    return;
}

rb_in.addEventListener("click", () => {
    document.querySelector("#puerto h3").innerHTML = "Desde:";
});
rb_out.addEventListener("click", () => {
    document.querySelector("#puerto h3").innerHTML = "Hacia:";
});

// form validation and clear after submit success
function submitForm() {
    // validate check in/out
    const rb_check = document.querySelectorAll('#check input[type=radio]');
    if (!radioButtons(rb_check)) {
        alert('Seleccione Entrada/Salida');
        return;
    };
    // validate puerto origen/destino
    const rb_puerto = document.querySelectorAll('#puerto input[type=radio]');
    if (!radioButtons(rb_puerto)) {
        alert('Seleccione Origen/Destino');
        return;
    };

    //validate fecha
    const date_field = document.getElementById('fecha').value;
    if (!date_field) {
        alert('Debe elegir una fecha');
        return;
    }

    //validate hora
    const time_field = document.querySelector('input[type=time]').value;
    if (!time_field) {
        alert('Seleccione una hora');
        return;
    }

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
