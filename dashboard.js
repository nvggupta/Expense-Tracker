document.addEventListener('DOMContentLoaded', (event) => {
    const addIncome = document.querySelector("#Add-income");
    const addExpense = document.querySelector("#Expence");
    const closeIn = document.querySelector("#closeIn");
    const closeEx = document.querySelector("#closeEx");
    const exCard = document.querySelector("#expense-card");
    const inCard = document.querySelector("#income-card");
    const source = document.querySelector("#income-source");
    const totalIncome = document.querySelector("#total-income");
    const dateOfAdd = document.querySelector("#dateIn");
    const item = document.querySelector("#Expence-item");
    const expenseAm = document.querySelector("#expense-am");
    const exDate = document.querySelector("#exDate");
    const total = document.querySelector("#total");
    const spending = document.querySelector("#spending");
    const saving = document.querySelector("#Savings");
    const createInc = document.querySelector("#createInc");
    const createEx = document.querySelector("#createEx");
    const expenseItem = document.querySelector("#expenseItem");
    const addHistory = document.querySelector("#tableBody");

    let historyData = JSON.parse(localStorage.getItem('historyData')) || [];
    let items = JSON.parse(localStorage.getItem('items')) || [];
    let totalSpending = parseFloat(localStorage.getItem('totalSpending')) || 0;
    let totalSaving = parseFloat(localStorage.getItem('totalSaving')) || 0;

    const saveData = () => {
        localStorage.setItem('historyData', JSON.stringify(historyData));
        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('totalSpending', totalSpending.toString());
        localStorage.setItem('totalSaving', totalSaving.toString());
    };

    const addRecords = () => {
        const data = {
            sources: source.value,
            totalIncomes: parseFloat(totalIncome.value),
            dateOfAdds: dateOfAdd.value
        };
        historyData.push(data);
        totalSaving += data.totalIncomes;
        saveData();
        updateHistory(data.sources, data.totalIncomes, data.dateOfAdds);
        updateBarChart(data.totalIncomes, 'income');
        updateTotals();
    };

    const addExpenseRecords = () => {
        const data = {
            sources: item.value,
            totalIncomes: parseFloat(expenseAm.value),
            dateOfAdds: exDate.value
        };
        items.push(data);
        myPieChart.data.datasets[0].data.push(data.totalIncomes);
        myPieChart.data.labels.push(data.sources);
        myPieChart.update();
        totalSpending += data.totalIncomes;
        saveData();
        updateExpenses(data.sources, data.totalIncomes, data.dateOfAdds);
        updateHistory(data.sources, data.totalIncomes, data.dateOfAdds);
        updateBarChart(data.totalIncomes, 'expense');
        updateTotals();
    };

    const createRow = (source, income, date) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${source}</td>
            <td>${income}</td>
            <td>${date}</td>
        `;
        return row;
    };

    const newExpense = (source, income, date) => {
        const list = document.createElement("li");
        list.innerHTML = `
            <span style="font-weight: bolder">${source}</span>
            <span style="font-weight: bolder">${income}</span>
            <span style="font-weight: bolder">${date}</span>
        `;
        return list;
    };

    const updateExpenses = (source, income, date) => {
        const newListItem = newExpense(source, income, date);
        expenseItem.appendChild(newListItem);
    };

    const updateHistory = (source, income, date) => {
        const newRow = createRow(source, income, date);
        addHistory.appendChild(newRow);
    };

    const updateBarChart = (amount, type) => {
        const currentMonth = new Date().getMonth();
        const dataset = myBarChart.data.datasets.find(ds => ds.label.toLowerCase() === type);
        dataset.data[currentMonth] += amount;
        myBarChart.update();
    };

    const updateTotals = () => {
        total.textContent = (totalSaving - totalSpending).toFixed(2);
        spending.textContent = totalSpending.toFixed(2);
        saving.textContent = totalSaving.toFixed(2);
    };

    const loadInitialData = () => {
        historyData.forEach(record => {
            updateHistory(record.sources, record.totalIncomes, record.dateOfAdds);
            if (record.sources) {
                updateBarChart(record.totalIncomes, 'income');
            }
        });

        items.forEach(record => {
            myPieChart.data.datasets[0].data.push(record.totalIncomes);
            myPieChart.data.labels.push(record.sources);
            myPieChart.update();
            updateExpenses(record.sources, record.totalIncomes, record.dateOfAdds);
            updateHistory(record.sources, record.totalIncomes, record.dateOfAdds);
            if (record.sources) {
                updateBarChart(record.totalIncomes, 'expense');
            }
        });

        updateTotals();
    };

    createInc.addEventListener('click', (e) => {
        e.preventDefault();
        addRecords();
    });

    createEx.addEventListener('click', (e) => {
        e.preventDefault();
        addExpenseRecords();
    });

    addExpense.addEventListener('click', () => {
        exCard.style.display = "block";
    });

    closeIn.addEventListener('click', () => {
        inCard.style.display = "none";
    });

    closeEx.addEventListener("click", () => {
        exCard.style.display = "none";
    });

    addIncome.addEventListener('click', () => {
        inCard.style.display = "block";
    });

    const hamburgerMenu = document.getElementById('hamburger-menu');
    const sidebar = document.querySelector('.sidebar');

    hamburgerMenu.addEventListener('click', function () {
        sidebar.classList.toggle('open');
    });

    const ctxBar = document.getElementById('myChart').getContext('2d');
    const myBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Income',
                    data: Array(12).fill(0), // Initialize with 0s
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Expense',
                    data: Array(12).fill(0), // Initialize with 0s
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ctxPie = document.getElementById('myPieChart').getContext('2d');
    const myPieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(199, 199, 199, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': $' + tooltipItem.raw;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            },
            hover: {
                onHover: function (event, elements) {
                    event.native.target.style.cursor = elements.length ? 'pointer' : 'default';
                }
            }
        }
    });

    loadInitialData();
});
