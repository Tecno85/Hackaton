// Selección de elementos
const presetButtons = document.querySelectorAll(".preset-amounts button");
const amountInput = document.getElementById("donation-amount");
const customButton = presetButtons[presetButtons.length - 1]; // Último botón ("Personalizado")
const donateButton = document.querySelector(".donate-button");
const donationForm = document.querySelector(".donation-form");
const donationMessage = document.getElementById("donation-message");

// Nueva funcionalidad: Meta de donaciones
let donationGoal = 50000; // Cantidad límite predeterminada
const goalMessageDiv = document.getElementById("goal-message"); // Div para el mensaje

// Función para manejar clics en los botones predefinidos
presetButtons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent.replace(/[^0-9]/g, ""); // Extraer números del texto
        if (button !== customButton) {
            amountInput.value = value; // Actualizar el input con el valor del botón
            amountInput.disabled = true; // Deshabilitar edición manual
        } else {
            amountInput.disabled = false; // Habilitar edición si es personalizado
            amountInput.focus(); // Enfocar para editar
        }
    });
});

// Función para manejar el envío del formulario

// Variable global para el total acumulado
let totalDonations = 0; // Inicializamos en 0

// Con esta hago que la Función maneje el envío del formulario
donationForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado de envío

    // Verificar si el campo de cantidad tiene un valor válido
    const donationAmount = amountInput.value.trim();
    if (donationAmount === "" || isNaN(donationAmount) || Number(donationAmount) <= 0) {
        showMessage("Por favor, introduce un monto válido para donar.", "error");
        return;
    }

    // Convertir el monto ingresado a número y sumarlo al total acumulado
    const donationValue = Number(donationAmount);
    totalDonations += donationValue;

    // Actualizar el texto del total acumulado en el display del acomulado
    const totalDisplay = document.querySelector(".acomulado_display h1");
    totalDisplay.textContent = `Acumulado: $${totalDonations}`;

    // Comprobar si se ha alcanzado la meta de donaciones
    if (totalDonations >= donationGoal) {
        goalMessageDiv.textContent = `¡¡Felicidades!! Hemos alcanzado la meta de $${donationGoal}. ¡Gracias por todo tú apoyo! juntos lograremos un cambio!`;
        goalMessageDiv.style.display = "block"; // Mostrar el div
    }


    // Mostrar un mensaje de confirmación
    showMessage(`Gracias por tu donación de $${donationAmount},  todos los colombianos te lo agradecemos.`, "success");

    // Limpiar el campo de entrada y reestablecer el estado
    amountInput.value = "";
    amountInput.disabled = false; // habilito el campo para las proximas ediciones manuales
});

// Función para mostrar mensajes dinámicos
function showMessage(message, type) {
    donationMessage.textContent = message;
    donationMessage.className = ""; // Resetear clases
    donationMessage.classList.add(type, "success", "hidden"); // Añadir clases según el tipo
    donationMessage.style.display = "block";

    // Ocultar el mensaje después de 10 segundos
    setTimeout(() => {
        donationMessage.style.display = "none";
    }, 10000);
}


//----crear lista ol de donadores con la informacion del input nombre--------//
const donate_Button = document.getElementById('donate-btn');
const donorNameInput = document.getElementById('donor-name');
const donorsList = document.getElementById('donors');

donateButton.addEventListener('click', () => {
    const donorName = donorNameInput.value.trim();
    if (donorName) {
        const listItem = document.createElement('li');
        listItem.textContent = donorName;
        donorsList.appendChild(listItem);
        donorNameInput.value = ''; // Limpiar el campo de entrada
        donorNameInput.focus(); // Volver a enfocar el campo
    } else {
        alert('Por favor, escribe un nombre antes de donar.');
    }
});


//----------------------------------//
//-----boton poara ocultar lista de donadores------//

$(document).ready(function () {
    $("#donor-list").hide();

    $("#toggle_div").click(function () {
        $("#donor-list").toggle();
    });
});
//---------------------------------------

