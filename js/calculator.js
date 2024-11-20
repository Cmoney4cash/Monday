document.getElementById('calculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form validation
    if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
        return;
    }

    // Get form values
    const grossPay = parseFloat(document.getElementById('grossPay').value);
    const payPeriod = document.getElementById('payPeriod').value;
    const hoursPerWeek = parseFloat(document.getElementById('hoursPerWeek').value);

    // Convert to annual gross pay
    let annualGrossPay;
    switch(payPeriod) {
        case 'hour':
            annualGrossPay = grossPay * hoursPerWeek * 52;
            break;
        case 'week':
            annualGrossPay = grossPay * 52;
            break;
        case 'month':
            annualGrossPay = grossPay * 12;
            break;
        default:
            annualGrossPay = grossPay;
    }

    // Calculate tax and NI
    const personalAllowance = 12570;
    let taxableIncome = Math.max(0, annualGrossPay - personalAllowance);
    let incomeTax = 0;

    // Calculate Income Tax
    if (taxableIncome > 0) {
        if (taxableIncome > 50270) {
            incomeTax += (taxableIncome - 50270) * 0.40; // 40% on earnings over \u00a350,270
            incomeTax += (50270 - 12570) * 0.20; // 20% on earnings between \u00a312,571 and \u00a350,270
        } else {
            incomeTax += taxableIncome * 0.20; // 20% on earnings up to \u00a350,270
        }
    }

    // Calculate National Insurance
    let ni = 0;
    const weeklyPay = annualGrossPay / 52;
    if (weeklyPay > 242) {
        if (weeklyPay > 967) {
            ni += (weeklyPay - 967) * 0.02 * 52; // 2% on earnings over \u00a3967/week
            ni += (967 - 242) * 0.12 * 52; // 12% on earnings between \u00a3242 and \u00a3967/week
        } else {
            ni += (weeklyPay - 242) * 0.12 * 52; // 12% on earnings between \u00a3242 and \u00a3967/week
        }
    }

    // Calculate take-home pay
    const annualTakeHome = annualGrossPay - incomeTax - ni;
    const monthlyTakeHome = annualTakeHome / 12;
    const weeklyTakeHome = annualTakeHome / 52;
    const hourlyTakeHome = weeklyTakeHome / hoursPerWeek;

    // Update results
    document.getElementById('yearlyPay').textContent = `£${annualTakeHome.toFixed(2)}`;
    document.getElementById('monthlyPay').textContent = `£${monthlyTakeHome.toFixed(2)}`;
    document.getElementById('weeklyPay').textContent = `£${weeklyTakeHome.toFixed(2)}`;
    document.getElementById('hourlyPay').textContent = `£${hourlyTakeHome.toFixed(2)}`;
    document.getElementById('incomeTax').textContent = `£${incomeTax.toFixed(2)}`;
    document.getElementById('nationalInsurance').textContent = `\u00a3${ni.toFixed(2)}`;

    // Show results
    document.getElementById('resultCard').style.display = 'block';
});