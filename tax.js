document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const sidebar = document.querySelector('.sidebar');

    hamburgerMenu.addEventListener('click', function () {
        sidebar.classList.toggle('open');
    });
    const taxForm = document.getElementById('tax-form');
    const taxableIncomeEl = document.getElementById('taxable-income');
    const taxPayableEl = document.getElementById('tax-payable');

    const calculateTax = (income, deductions) => {
        const taxableIncome = income - deductions;
        let tax = 0;

        if (taxableIncome <= 250000) {
            tax = 0;
        } else if (taxableIncome <= 500000) {
            tax = (taxableIncome - 250000) * 0.05;
        } else if (taxableIncome <= 1000000) {
            tax = 12500 + (taxableIncome - 500000) * 0.2;
        } else {
            tax = 112500 + (taxableIncome - 1000000) * 0.3;
        }

        return { taxableIncome, tax };
    };

    taxForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const income = parseFloat(document.getElementById('income').value);
        const deductions = parseFloat(document.getElementById('deductions').value);

        const { taxableIncome, tax } = calculateTax(income, deductions);

        taxableIncomeEl.textContent = taxableIncome.toFixed(2);
        taxPayableEl.textContent = tax.toFixed(2);
    });
});
