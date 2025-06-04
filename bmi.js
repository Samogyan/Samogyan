const form = document.getElementById('bmi-form');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');

const resultContainer = document.getElementById('result-container');
const bmiValueEl = document.getElementById('bmi-value');
const bmiCategoryEl = document.getElementById('bmi-category');
const bmiMessageEl = document.getElementById('bmi-message');

const resetBtn = document.getElementById('reset-btn');
const popup = document.getElementById('popup');

form.addEventListener('submit', e => {
  e.preventDefault();
  calculateBMI();
});

resetBtn.addEventListener('click', () => {
  resetForm();
});

function calculateBMI() {
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  if (!height || !weight || height <= 0 || weight <= 0) {
    showPopup('Please enter valid positive numbers for height and weight.');
    return;
  }

  const bmi = weight / ((height / 100) ** 2);
  const roundedBmi = bmi.toFixed(2);

  // Determine category and message carefully with separate if-else
  let category = '';
  let message = '';
  let categoryClass = '';

  if (bmi < 18.5) {
    category = 'Underweight';
    message = 'You are under the healthy weight range.⚠️';
    categoryClass = 'underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Healthy';
    message = 'Great! You are within the healthy weight range.✅';
    categoryClass = 'healthy';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    message = 'You are slightly above the healthy weight range.⚠️';
    categoryClass = 'overweight';
  } else if (bmi >= 30 && bmi < 35) {
    category = 'Obese';
    message = 'It is advisable to take steps towards a healthier lifestyle.⚠️⚠️';
    categoryClass = 'obese';
  } else {
    category = 'Extremely Obese';
    message = 'Please consult with a healthcare professional.⚠️⚠️⚠️';
    categoryClass = 'extremely-obese';
  }

  bmiValueEl.textContent = roundedBmi;
  bmiCategoryEl.textContent = category;
  bmiCategoryEl.className = `bmi-category ${categoryClass}`;
  bmiMessageEl.textContent = message;

  resultContainer.classList.remove('hidden');
  resetBtn.classList.remove('hidden');
  form.querySelector('button').disabled = true;
}

function resetForm() {
  form.reset();
  resultContainer.classList.add('hidden');
  resetBtn.classList.add('hidden');
  form.querySelector('button').disabled = false;
  bmiCategoryEl.className = 'bmi-category';
  bmiValueEl.textContent = '--';
  bmiMessageEl.textContent = '';
}

// Popup alert function
function showPopup(message) {
  popup.textContent = message;
  popup.classList.add('show');

  setTimeout(() => {
    popup.classList.remove('show');
  }, 3000);
}



   /* menu in header 🤕*/
 function toggleMenuk() {
            let sidebark = document.getElementById("sidebark");
            let menuIconk = document.getElementById("menu-iconk");

            sidebark.classList.toggle("openk");

            // Change icon based on menu state
            if (sidebark.classList.contains("openk")) {
                menuIconk.innerHTML = "✖"; // Close icon
            } else {
                menuIconk.innerHTML = "☰"; // Menu icon
            }
        }

        function toggleSubmenuk() {
            document.getElementById("submenuk").classList.toggle("showk");
        }



// footer-year.js
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});






