document.addEventListener("DOMContentLoaded", function () {
    // Ініціалізація змінних - отримання посилань на елементи DOM
    const carBrandSelect = document.getElementById("brand");                  // Селект для вибору марки авто
    const carModelSelect = document.getElementById("model");                   // Селект для вибору моделі авто
    const purchaseYearInput = document.getElementById("purchaseYear");         // Поле для введення року придбання
    const purchasePriceInput = document.getElementById("purchasePrice");       // Поле для введення ціни придбання
    const depreciationPeriodInput = document.getElementById("depreciationPeriod"); // Поле для періоду амортизації (в роках)
    const calculateBtn = document.getElementById("calculate");                 // Кнопка розрахунку
    const resultsContainer = document.getElementById("results");               // Контейнер для результатів
    const currentValueSpan = document.getElementById("currentValue");          // Елемент для виведення поточної вартості
    const totalDepreciationSpan = document.getElementById("totalDepreciation"); // Елемент для виведення загальної амортизації
    const yearlyDepreciationSpan = document.getElementById("yearlyDepreciation"); // Елемент для виведення річної амортизації
    const depreciationChart = document.getElementById("depreciationChart");    // Елемент для графіка амортизації
    const resetBtn = document.getElementById("reset");                         // Кнопка скидання

    // Дані автомобілів - об'єкт, що містить марки та моделі
    // Кожна марка є ключем, а значенням є масив доступних моделей
    const carData = {
        "Acura": ["ILX", "MDX", "RDX", "RLX", "TLX", "NSX", "Integra", "ZDX", "TSX", "RSX"],
        "Alfa Romeo": ["Giulia", "Stelvio", "Tonale", "4C", "Giulietta", "MiTo", "159", "Brera", "Spider", "Disco Volante"],
        "Aston Martin": ["DB11", "Vantage", "DBS Superleggera", "Valkyrie", "DBX", "Rapide", "Vanquish", "DB9", "Virage", "One-77"],
        "Audi": ["A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q5", "Q7", "Q8", "e-tron", "R8", "TT", "RS3", "RS4", "RS5", "RS6", "RS7", "S3", "S4", "S5", "S6", "S7", "S8", "Q2", "Q4", "SQ5", "SQ7", "SQ8", "e-tron GT"],
        "Bentley": ["Bentayga", "Continental GT", "Flying Spur", "Mulsanne", "Azure", "Arnage", "Brooklands", "Bacalar", "Continental GTC", "Continental GT Speed"],
        "BMW": ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7", "i3", "i4", "i7", "i8", "iX", "M2", "M3", "M4", "M5", "M8", "X2", "X4", "X6", "Z4", "8 Series", "6 Series", "X3 M", "X5 M", "X6 M", "iX3"],
        "Buick": ["Enclave", "Encore", "Envision", "LaCrosse", "Regal", "Verano", "Cascada", "Lucerne", "Riviera", "Park Avenue"],
        "Cadillac": ["CT4", "CT5", "Escalade", "XT4", "XT5", "XT6", "CT6", "ATS", "CTS", "SRX", "XTS", "ELR", "Escalade ESV", "DTS", "STS"],
        "Chevrolet": ["Blazer", "Camaro", "Equinox", "Malibu", "Silverado", "Tahoe", "Traverse", "Bolt", "Corvette", "Spark", "Trax", "Impala", "Suburban", "Colorado", "Cruze", "Volt", "Express", "Trailblazer", "Aveo", "Sonic"],
        "Chrysler": ["300", "Pacifica", "Voyager", "200", "Town & Country", "PT Cruiser", "Sebring", "Aspen", "Crossfire", "Concorde"],
        "Citroen": ["C3", "C4", "C5 Aircross", "C1", "C2", "Berlingo", "Jumpy", "Jumper", "C-Elysée", "DS3", "DS4", "DS5", "Grand C4 Picasso", "C3 Aircross", "C4 Cactus", "Saxo", "Xsara", "Xantia", "ZX"],
        "Dodge": ["Challenger", "Charger", "Durango", "Journey", "Grand Caravan", "Viper", "Nitro", "Avenger", "Dart", "Caliber", "Ram", "Magnum", "Neon", "Dakota", "Intrepid"],
        "Ferrari": ["488", "Portofino", "Roma", "F8 Tributo", "SF90 Stradale", "812 Superfast", "296 GTB", "Daytona SP3", "Purosangue", "Monza", "LaFerrari", "Enzo", "F12berlinetta", "458 Italia", "California"],
        "Fiat": ["500", "Panda", "Tipo", "500X", "500L", "124 Spider", "Doblo", "Ducato", "Qubo", "Multipla", "Punto", "Bravo", "Linea", "Freemont", "Stilo"],
        "Ford": ["Bronco", "Edge", "Escape", "Explorer", "F-150", "Mustang", "Fusion", "Focus", "Ranger", "Expedition", "EcoSport", "Transit", "Fiesta", "Taurus", "Flex", "C-Max", "GT", "Mondeo", "Maverick", "F-250"],
        "Genesis": ["G70", "G80", "G90", "GV70", "GV80", "GV60", "G60", "Essentia", "X", "Mint"],
        "GMC": ["Acadia", "Sierra", "Terrain", "Yukon", "Canyon", "Savana", "Hummer EV", "Yukon XL", "Sierra HD", "Jimmy"],
        "Honda": ["Accord", "Civic", "CR-V", "HR-V", "Pilot", "Fit", "Odyssey", "Ridgeline", "Passport", "Insight", "Element", "S2000", "Clarity", "City", "CR-Z", "Legend", "Prelude", "NSX", "Jazz", "Elysion"],
        "Hyundai": ["Elantra", "Kona", "Palisade", "Santa Fe", "Sonata", "Tucson", "Accent", "Veloster", "Venue", "Ioniq", "i10", "i20", "i30", "Azera", "Genesis", "Nexo", "Equus", "Veracruz", "Entourage", "Ioniq 5"],
        "Infiniti": ["Q50", "Q60", "QX50", "QX60", "QX80", "Q70", "QX30", "QX55", "QX70", "G37", "FX35", "FX45", "EX35", "JX35", "M35"],
        "Jaguar": ["E-Pace", "F-Pace", "XE", "XF", "XJ", "F-Type", "I-Pace", "XK", "S-Type", "X-Type"],
        "Jeep": ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Wrangler", "Renegade", "Grand Wagoneer", "Commander", "Patriot", "Liberty", "Wagoneer", "Grand Cherokee L", "Wrangler 4xe", "Gladiator Mojave", "Grand Cherokee Trackhawk"],
        "Kia": ["Carnival", "K5", "Seltos", "Sorento", "Sportage", "Telluride", "Forte", "Soul", "Rio", "Niro", "Stinger", "Cadenza", "Optima", "Sedona", "EV6", "Picanto", "Cerato", "Mohave", "Quoris", "Stonic"],
        "Lamborghini": ["Aventador", "Huracán", "Urus", "Sián", "Countach", "Gallardo", "Murciélago", "Diablo", "Reventón", "Centenario"],
        "Land Rover": ["Defender", "Discovery", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar", "Discovery Sport", "Freelander", "Range Rover Autobiography", "Range Rover Fifty"],
        "Lexus": ["ES", "GX", "IS", "LS", "LX", "NX", "RX", "UX", "RC", "LC", "GS", "CT", "HS", "LFA", "SC", "RZ", "TX"],
        "Lincoln": ["Aviator", "Corsair", "Nautilus", "Navigator", "Continental", "MKZ", "MKC", "MKX", "MKT", "MKS", "Blackwood", "Mark LT", "Zephyr", "LS", "Town Car"],
        "Maserati": ["Ghibli", "Levante", "Quattroporte", "MC20", "Grecale", "GranTurismo", "GranCabrio", "Alfieri", "Barchetta", "Shamal", "Biturbo", "Coupe", "Spyder", "3200 GT", "Khamsin"],
        "Mazda": ["CX-3", "CX-30", "CX-5", "CX-9", "Mazda3", "Mazda6", "MX-5 Miata", "CX-50", "CX-60", "CX-90", "RX-7", "RX-8", "MX-30", "CX-8", "MPV", "Tribute", "Millenia", "626", "323", "Protegé"],
        "McLaren": ["720S", "Artura", "GT", "765LT", "Elva", "Senna", "Speedtail", "570S", "600LT", "P1", "F1", "MP4-12C", "650S", "675LT", "540C"],
        "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "G-Class", "GLA", "GLC", "GLE", "S-Class", "CLA", "CLS", "GLS", "GLB", "EQA", "EQB", "EQC", "EQE", "EQS", "AMG GT", "B-Class", "Sprinter", "Maybach S-Class", "SL", "SLC", "V-Class", "X-Class", "ML-Class", "GL-Class", "CLK", "SLK", "CL-Class"],
        "MINI": ["Clubman", "Cooper", "Countryman", "Convertible", "Paceman", "Roadster", "Coupe", "Cooper S", "John Cooper Works", "Electric"],
        "Mitsubishi": ["ASX", "Eclipse Cross", "Outlander", "Pajero", "Mirage", "L200", "Lancer", "Montero", "Galant", "Endeavor", "Evo", "3000GT", "Sigma", "Eclipse", "Space Star"],
        "Nissan": ["Altima", "Juke", "Murano", "Pathfinder", "Qashqai", "Rogue", "Sentra", "Ariya", "370Z", "GT-R", "Leaf", "Titan", "Frontier", "Maxima", "Armada", "X-Trail", "Note", "Kicks", "Versa", "Xterra"],
        "Peugeot": ["2008", "3008", "5008", "208", "308", "508", "108", "Rifter", "Traveller", "Partner", "Expert", "Boxer", "iOn", "RCZ", "4007", "4008", "Ion", "Bipper", "807", "107"],
        "Porsche": ["911", "Cayenne", "Macan", "Panamera", "Taycan", "718 Cayman", "718 Boxster", "Carrera GT", "918 Spyder", "944", "928", "968", "914", "924", "959", "Cayman", "Boxster", "Cayenne Coupe", "Taycan Cross Turismo", "Panamera Sport Turismo"],
        "Renault": ["Arkana", "Captur", "Clio", "Duster", "Megane", "Kadjar", "Koleos", "Scenic", "Twingo", "Zoe", "Espace", "Talisman", "Fluence", "Symbol", "Laguna", "Latitude", "Vel Satis", "Modus", "Wind", "Safrane"],
        "Rolls-Royce": ["Phantom", "Ghost", "Wraith", "Dawn", "Cullinan", "Silver Shadow", "Silver Seraph", "Silver Spirit", "Corniche", "Camargue"],
        "Saab": ["9-3", "9-5", "9-2X", "9-7X", "9-4X", "900", "9000", "96", "95", "Sonett"],
        "Subaru": ["Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "WRX", "BRZ", "Ascent", "XV", "Tribeca", "Baja", "SVX", "Justy", "Leone", "BRAT"],
        "Suzuki": ["Swift", "Vitara", "Jimny", "SX4", "S-Cross", "Ignis", "Baleno", "Grand Vitara", "Splash", "Alto", "Kizashi", "Celerio", "Wagon R", "Ciaz", "APV"],
        "Tesla": ["Model 3", "Model S", "Model X", "Model Y", "Cybertruck", "Roadster", "Semi"],
        "Toyota": ["4Runner", "Camry", "Corolla", "Highlander", "Land Cruiser", "RAV4", "Tacoma", "Prius", "Sienna", "Avalon", "Yaris", "Sequoia", "Venza", "C-HR", "Supra", "Tundra", "86", "Crown", "bZ4X", "Mirai", "Solara", "Matrix", "Echo", "FJ Cruiser", "MR2"],
        "Volkswagen": ["Atlas", "Golf", "ID.4", "Jetta", "Passat", "Tiguan", "Arteon", "Polo", "T-Roc", "Touareg", "ID.3", "Taos", "T-Cross", "Caddy", "Sharan", "Transporter", "Touran", "Beetle", "Phaeton", "CC", "Scirocco", "EOS", "ID.Buzz", "ID.5", "ID.6"],
        "Volvo": ["S60", "S90", "V60", "XC40", "XC60", "XC90", "C40 Recharge", "V90", "V40", "S40", "C30", "C70", "S70", "V70", "S80", "XC70", "240", "850", "940", "960"]

    };

    // Функція для заповнення випадаючого списку марок автомобілів
    function populateBrands() {
        for (const brand in carData) {
            const option = document.createElement("option"); // Створюємо новий елемент option
            option.value = brand;                          // Встановлюємо значення
            option.textContent = brand;                    // Встановлюємо текст, який бачить користувач
            carBrandSelect.appendChild(option);            // Додаємо опцію до селекту марок
        }
    }

    // Функція для заповнення випадаючого списку моделей на основі вибраної марки
    function populateModels(brand) {
        // Очищаємо існуючі опції
        carModelSelect.innerHTML = '<option value="">Оберіть модель</option>';

        // Додаємо нові опції на основі вибраної марки
        if (brand in carData) {
            carData[brand].forEach(model => {
                const option = document.createElement("option"); // Створюємо новий елемент option
                option.value = model;                          // Встановлюємо значення
                option.textContent = model;                    // Встановлюємо текст, який бачить користувач
                carModelSelect.appendChild(option);            // Додаємо опцію до селекту моделей
            });
        }
    }

    // Функція для валідації введених даних
    function validateInputs() {
        let isValid = true;  // Прапорець валідності форми

        // Скидаємо всі повідомлення про помилки
        document.querySelectorAll(".error-message").forEach(elem => {
            elem.style.display = "none";
        });

        // Перевіряємо, чи вибрано марку
        if (!carBrandSelect.value) {
            document.getElementById("brand-error").style.display = "block"; // Показуємо повідомлення про помилку
            isValid = false; // Форма невалідна
        }

        // Перевіряємо, чи вибрано модель
        if (!carModelSelect.value) {
            document.getElementById("model-error").style.display = "block"; // Показуємо повідомлення про помилку
            isValid = false; // Форма невалідна
        }

        // Перевіряємо рік придбання (має бути між 1990 і поточним роком)
        const currentYear = new Date().getFullYear(); // Отримуємо поточний рік
        if (!purchaseYearInput.value || purchaseYearInput.value < 1990 || purchaseYearInput.value > currentYear) {
            document.getElementById("purchaseYear-error").style.display = "block"; // Показуємо повідомлення про помилку
            isValid = false; // Форма невалідна
        }

        // Перевіряємо ціну придбання (має бути більше 0)
        if (!purchasePriceInput.value || purchasePriceInput.value <= 0) {
            document.getElementById("purchasePrice-error").style.display = "block"; // Показуємо повідомлення про помилку
            isValid = false; // Форма невалідна
        }

        // Перевіряємо період амортизації (має бути більше 0)
        if (!depreciationPeriodInput.value || depreciationPeriodInput.value <= 0) {
            document.getElementById("depreciationPeriod-error").style.display = "block"; // Показуємо повідомлення про помилку
            isValid = false; // Форма невалідна
        }

        return isValid; // Повертаємо результат валідації
    }

    // Функція розрахунку амортизації автомобіля
    function calculateDepreciation() {
        // Отримуємо введені користувачем дані
        const brand = carBrandSelect.value;                   // Марка автомобіля
        const model = carModelSelect.value;                   // Модель автомобіля
        const purchaseYear = parseInt(purchaseYearInput.value);   // Рік придбання
        const purchasePrice = parseFloat(purchasePriceInput.value); // Ціна придбання
        const depreciationPeriod = parseInt(depreciationPeriodInput.value); // Період амортизації в роках
        const currentYear = new Date().getFullYear();         // Поточний рік
        const yearsOwned = Math.min(depreciationPeriod, currentYear - purchaseYear); // Кількість років володіння або період амортизації, що менше

        // Різні марки мають різні коефіцієнти амортизації
        // Чим більше число, тим швидше авто втрачає вартість
        const brandDepreciationRates = {
            "Acura": 0.58,
            "Alfa Romeo": 0.63,
            "Aston Martin": 0.45,
            "Audi": 0.62,
            "Bentley": 0.52,
            "BMW": 0.60,
            "Buick": 0.52,
            "Cadillac": 0.58,
            "Chevrolet": 0.50,
            "Chrysler": 0.55,
            "Citroen": 0.57,
            "Dodge": 0.53,
            "Ferrari": 0.35,
            "Fiat": 0.65,
            "Ford": 0.54,
            "Genesis": 0.56,
            "GMC": 0.51,
            "Honda": 0.46,
            "Hyundai": 0.53,
            "Infiniti": 0.59,
            "Jaguar": 0.64,
            "Jeep": 0.49,
            "Kia": 0.52,
            "Land Rover": 0.61,
            "Lexus": 0.48,
            "Lincoln": 0.58,
            "Maserati": 0.65,
            "Mazda": 0.49,
            "Mercedes-Benz": 0.59,
            "MINI": 0.58,
            "Mitsubishi": 0.56,
            "Nissan": 0.53,
            "Peugeot": 0.56,
            "Porsche": 0.44,
            "Renault": 0.58,
            "Subaru": 0.47,
            "Tesla": 0.45,
            "Toyota": 0.43,
            "Volkswagen": 0.55,
            "Volvo": 0.57
        };

        // Визначаємо люксові марки
        const luxuryBrands = ["Audi", "BMW", "Bentley", "Jaguar", "Land Rover", "Lexus", "Maserati", "Mercedes-Benz", "Porsche", "Aston Martin"];
        const isLuxury = luxuryBrands.includes(brand); // Перевіряємо, чи є марка люксовою

        // Отримуємо коефіцієнт амортизації для марки або використовуємо значення за замовчуванням
        const brandRate = brandDepreciationRates[brand] || 0.55;

        // ВИПРАВЛЕНО: Модифікований коефіцієнт амортизації для більш реалістичних значень
        let yearlyDepreciationRate;

        if (isLuxury) {
            // Люксові авто мають скориговану швидкість амортизації
            yearlyDepreciationRate = 0.92 - (brandRate * 0.08);
        } else {
            // Звичайні авто мають повільнішу амортизацію
            yearlyDepreciationRate = 0.94 - (brandRate * 0.06);
        }

        // Розрахунок поточної вартості з використанням складної амортизації
        // Формула: purchasePrice * (yearlyDepreciationRate ^ yearsOwned)
        const currentValue = purchasePrice * Math.pow(yearlyDepreciationRate, yearsOwned);

        // Розрахунок загальної амортизації
        const totalDepreciation = purchasePrice - currentValue;

        // Розрахунок річної амортизації
        const yearlyDepreciation = totalDepreciation / Math.max(1, yearsOwned);

        // Повертаємо результати розрахунків
        return {
            currentValue,             // Поточна вартість
            totalDepreciation,        // Загальна амортизація
            yearlyDepreciation,       // Річна амортизація
            yearlyDepreciationRate,   // Річний коефіцієнт амортизації
            purchasePrice,            // Ціна придбання
            yearsOwned                // Роки володіння
        };
    }

    // Функція для генерації графіка амортизації
    function generateDepreciationChart(results) {
        // Видаляємо існуючий вміст графіка
        depreciationChart.innerHTML = '';

        const purchaseYear = parseInt(purchaseYearInput.value);   // Рік придбання
        const depreciationPeriod = parseInt(depreciationPeriodInput.value); // Період амортизації в роках
        const valueTrend = [];                                // Масив для зберігання динаміки вартості

        // Додаємо початкову точку (ціна придбання)
        valueTrend.push({ year: purchaseYear, value: results.purchasePrice });

        // Розраховуємо вартість для кожного року в періоді амортизації
        for (let i = 1; i <= depreciationPeriod; i++) {
            const value = results.purchasePrice * Math.pow(results.yearlyDepreciationRate, i);
            valueTrend.push({ year: purchaseYear + i, value: value });
        }

        // Створюємо SVG графік з відступами
        const margin = { top: 30, right: 40, bottom: 50, left: 70 };
        const width = depreciationChart.clientWidth - margin.left - margin.right;
        const height = depreciationChart.clientHeight - margin.top - margin.bottom;

        // Створюємо кореневий SVG елемент
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);
        depreciationChart.appendChild(svg);

        // Створюємо групу для всіх елементів графіка з трансформацією для відступів
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("transform", `translate(${margin.left},${margin.top})`);
        svg.appendChild(g);

        // Розраховуємо масштаби для осей
        const years = valueTrend.map(d => d.year);
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        const xScale = (x) => ((x - minYear) / (maxYear - minYear)) * width;

        const values = valueTrend.map(d => d.value);
        const maxValue = Math.max(...values);
        const yScale = (y) => height - (y / maxValue) * height;

        // Створюємо лінію графіка
        let pathD = "";
        valueTrend.forEach((point, i) => {
            const x = xScale(point.year);
            const y = yScale(point.value);
            if (i === 0) {
                pathD += `M${x},${y}`; // Починаємо шлях
            } else {
                pathD += `L${x},${y}`; // Продовжуємо шлях
            }
        });

        // Додаємо шлях до графіка
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathD);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "#3498db");
        path.setAttribute("stroke-width", "2");
        g.appendChild(path);

        // Створюємо точки для кожного значення на графіку
        valueTrend.forEach(point => {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", xScale(point.year));
            circle.setAttribute("cy", yScale(point.value));
            circle.setAttribute("r", "4");
            circle.setAttribute("fill", "#3498db");
            g.appendChild(circle);

            // Створюємо підказку для кожної точки
            const tooltip = document.createElementNS("http://www.w3.org/2000/svg", "title");
            tooltip.textContent = `${point.year}: $${Math.round(point.value).toLocaleString()}`;
            circle.appendChild(tooltip);
        });

        // Додаємо поточний рік як вертикальну лінію (якщо він у межах періоду)
        const currentYear = new Date().getFullYear();
        if (currentYear >= purchaseYear && currentYear <= purchaseYear + depreciationPeriod) {
            const currentX = xScale(currentYear);

            const currentYearLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
            currentYearLine.setAttribute("x1", currentX);
            currentYearLine.setAttribute("y1", "0");
            currentYearLine.setAttribute("x2", currentX);
            currentYearLine.setAttribute("y2", height);
            currentYearLine.setAttribute("stroke", "#e74c3c");
            currentYearLine.setAttribute("stroke-width", "1.5");
            currentYearLine.setAttribute("stroke-dasharray", "5,5");
            g.appendChild(currentYearLine);

            const currentYearLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
            currentYearLabel.setAttribute("x", currentX);
            currentYearLabel.setAttribute("y", "0");
            currentYearLabel.setAttribute("text-anchor", "middle");
            currentYearLabel.setAttribute("font-size", "11");
            currentYearLabel.setAttribute("fill", "#e74c3c");
            currentYearLabel.textContent = "Зараз";
            g.appendChild(currentYearLabel);
        }

        // Створюємо вісь X
        const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "g");
        xAxis.setAttribute("transform", `translate(0,${height})`);
        g.appendChild(xAxis);

        // Створюємо лінію осі X
        const xAxisLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        xAxisLine.setAttribute("x1", "0");
        xAxisLine.setAttribute("y1", "0");
        xAxisLine.setAttribute("x2", width);
        xAxisLine.setAttribute("y2", "0");
        xAxisLine.setAttribute("stroke", "#aaa");
        xAxis.appendChild(xAxisLine);

        // Створюємо відмітки на осі X (роки)
        for (let i = 0; i < valueTrend.length; i += Math.ceil(valueTrend.length / 5)) {
            const point = valueTrend[i];
            const x = xScale(point.year);

            // Створюємо відмітку
            const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
            tick.setAttribute("x1", x);
            tick.setAttribute("y1", "0");
            tick.setAttribute("x2", x);
            tick.setAttribute("y2", "5");
            tick.setAttribute("stroke", "#aaa");
            xAxis.appendChild(tick);

            // Додаємо підпис до відмітки
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", x);
            text.setAttribute("y", "20");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("font-size", "11");
            text.textContent = point.year;
            xAxis.appendChild(text);
        }

        // Створюємо вісь Y
        const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.appendChild(yAxis);

        // Створюємо лінію осі Y
        const yAxisLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        yAxisLine.setAttribute("x1", "0");
        yAxisLine.setAttribute("y1", "0");
        yAxisLine.setAttribute("x2", "0");
        yAxisLine.setAttribute("y2", height);
        yAxisLine.setAttribute("stroke", "#aaa");
        yAxis.appendChild(yAxisLine);

        // Створюємо відмітки на осі Y (вартість)
        const numTicks = 5; // Кількість відміток
        for (let i = 0; i <= numTicks; i++) {
            const value = maxValue * (i / numTicks);
            const y = yScale(value);

            // Створюємо відмітку
            const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
            tick.setAttribute("x1", "-5");
            tick.setAttribute("y1", y);
            tick.setAttribute("x2", "0");
            tick.setAttribute("y2", y);
            tick.setAttribute("stroke", "#aaa");
            yAxis.appendChild(tick);

            // Додаємо підпис до відмітки
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", "-10");
            text.setAttribute("y", y + 4);
            text.setAttribute("text-anchor", "end");
            text.setAttribute("font-size", "11");
            text.textContent = `$${Math.round(value).toLocaleString()}`;
            yAxis.appendChild(text);
        }

        // Додаємо заголовок графіка
        const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
        title.setAttribute("x", width / 2);
        title.setAttribute("y", -10);
        title.setAttribute("text-anchor", "middle");
        title.setAttribute("font-size", "14");
        title.setAttribute("font-weight", "bold");
        title.textContent = "Динаміка амортизації автомобіля за роками";
        g.appendChild(title);

        // Додаємо підпис осі X
        const xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        xLabel.setAttribute("x", width / 2);
        xLabel.setAttribute("y", height + 40);
        xLabel.setAttribute("text-anchor", "middle");
        xLabel.setAttribute("font-size", "12");
        xLabel.textContent = "Рік";
        g.appendChild(xLabel);

        // Додаємо підпис осі Y
        const yLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        yLabel.setAttribute("transform", `translate(-50, ${height / 2}) rotate(-90)`);
        yLabel.setAttribute("text-anchor", "middle");
        yLabel.setAttribute("font-size", "12");
        yLabel.textContent = "Вартість ($)";
        g.appendChild(yLabel);
    }

    // Функція для відображення результатів розрахунку
    function displayResults(results) {
        // Активуємо контейнер з результатами
        resultsContainer.classList.add("active");

        // Відображаємо результати розрахунків
        currentValueSpan.textContent = `${Math.round(results.currentValue).toLocaleString()} $`; // Поточна вартість
        totalDepreciationSpan.textContent = `${Math.round(results.totalDepreciation).toLocaleString()} $`; // Загальна амортизація
        yearlyDepreciationSpan.textContent = `${Math.round(results.yearlyDepreciation).toLocaleString()} $`; // Річна амортизація

        // Генеруємо графік на основі розрахованих даних
        generateDepreciationChart(results);
    }

    // Функція скидання калькулятора
    function resetCalculator() {
        console.log("Reset function called"); // Для відладки

        // Скидаємо випадаючі списки
        carBrandSelect.selectedIndex = 0; // Встановлюємо перший елемент (пустий)
        carModelSelect.innerHTML = '<option value="">Оберіть модель</option>'; // Очищаємо список моделей

        // Очищаємо поля введення
        purchaseYearInput.value = '';
        purchasePriceInput.value = '';
        depreciationPeriodInput.value = '';

        // Скидаємо значення результатів
        currentValueSpan.textContent = "- $";
        totalDepreciationSpan.textContent = "- $";
        yearlyDepreciationSpan.textContent = "- $";

        // Видаляємо активний клас з контейнера результатів
        resultsContainer.classList.remove('active');

        // Очищаємо графік
        depreciationChart.innerHTML = '<div class="chart-placeholder">Графік амортизації з\'явиться після розрахунку</div>';

        // Приховуємо всі повідомлення про помилки
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });

        console.log("Reset completed"); // Для відладки
    }

    // Ініціалізація - заповнюємо список марок при завантаженні сторінки
    populateBrands();

    // Встановлюємо обробники подій
    // Обробник зміни марки - заповнює моделі при виборі марки
    carBrandSelect.addEventListener("change", function () {
        populateModels(this.value);
    });

    // Обробник кнопки розрахунку
    calculateBtn.addEventListener("click", function () {
        if (validateInputs()) { // Якщо всі дані валідні
            const results = calculateDepreciation(); // Виконуємо розрахунок
            displayResults(results); // Відображаємо результати
        }
    });

    // Обробник кнопки скидання
    if (resetBtn) {
        resetBtn.addEventListener("click", resetCalculator);
        console.log("Reset button listener attached");
    } else {
        console.error("Reset button not found in the DOM");
    }
});