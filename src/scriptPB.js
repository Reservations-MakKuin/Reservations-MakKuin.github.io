import {get, post, put, del } from "./api/api.js";


let nav = 0;
let clicked = null;
const events = await get("/classes/ReservationPB");

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const time = document.getElementById('time');
const names = document.getElementById('names');
const phone = document.getElementById('phone');
const kaparo = document.getElementById('kaparo');
const kaparoNumber = document.getElementById('kaparoNumber');
const age = document.getElementById('age');
//const parti = document.getElementById('parti');
//const animator = document.getElementById('animator');
const cake = document.getElementById('cake');
const pices = document.getElementById('pices');
const cakeCode = document.getElementById('cakeCode');
const cakeTaste = document.getElementById('cakeTaste');
const HBDName = document.getElementById('HBDName');
const cakeDescription = document.getElementById('cakeDescription');
const price = document.getElementById('prise');
const order = document.getElementById('order');
const kidsMenu = document.getElementById('kidsMenu');
const kidsNumber = document.getElementById('kidsNumber');

let kidsCatering = document.getElementById('cetaring');
let parentCatering = document.getElementById('cetaring2');


const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', ];

function openModal(event, date) {
    clicked = date;
    calendar.style.display = 'none';

    if (event.target.className == 'event') {

        newEventModal.style.display = 'none';
        deleteEventModal.style.display = 'block';

        let [reservationTime, name, years, ] = event.target.textContent.split(' ');
        years = years.slice(0, -2);
        reservationTime = reservationTime.slice(0, -2);

        const currentEvent = events.results.find(e => e.time == reservationTime && e.name == name && e.age == years);

        document.getElementById('име').textContent = currentEvent.name;
        document.getElementById('години').textContent = currentEvent.age;
        document.getElementById('час').textContent = currentEvent.time;
        document.getElementById('телефон').textContent = currentEvent.phone;
        document.getElementById('капаро').textContent = currentEvent.kaparo;
        document.getElementById('капароНомер').textContent = currentEvent.kaparoNumber;
        //  document.getElementById('аниматор').textContent = currentEvent.animator;
        // document.getElementById('парти').textContent = currentEvent.party;
        document.getElementById('торта').textContent = currentEvent.cake;
        document.getElementById('парчета').textContent = currentEvent.pices;
        document.getElementById('тортаКод').textContent = currentEvent.cakeCode;
        document.getElementById('тортаПълнеж').textContent = currentEvent.cakeFilling;
        document.getElementById('ЧРДИме').textContent = currentEvent.cakeLabel;
        document.getElementById('тортаОписание').textContent = currentEvent.cakeDescription;
        document.getElementById('цена').textContent = currentEvent.cakePrice;
        document.getElementById('детскоМеню').textContent = currentEvent.kidsMenu;
        document.getElementById('бройДеца').textContent = currentEvent.kidsNumber;

        let kidsCateringDiv = document.getElementById('кетарингДеца');
        console.log(currentEvent.kidsCatering);
        currentEvent.kidsCatering.map(element => {
            let paragraph = document.createElement('p');
            paragraph.textContent = `${element[0]} - ${element[1]} бр. | ${element[2]}`
            kidsCateringDiv.appendChild(paragraph);
        });

        let parentCateringDiv = document.getElementById('кетарингРодители');
        console.log(currentEvent.parentCatering);
        currentEvent.parentCatering.map(element => {
            let paragraph = document.createElement('p');
            paragraph.textContent = `${element[0]} - ${element[1]} бр. | ${element[2]}`
            parentCateringDiv.appendChild(paragraph);
        });

        if (currentEvent.cakeOrder == true) {
            document.getElementById('поръчана').textContent = "ДА";
        } else {
            document.getElementById('поръчана').textContent = 'НЕ';
        };

        document.getElementById('друго').textContent = currentEvent.other;
        document.getElementById('deleteBtn').addEventListener('click', deleteReservation)
        document.getElementById('editBtn').addEventListener('click', () => {

            newEventModal.style.display = 'block';
            deleteEventModal.style.display = 'none';

            time.value = currentEvent.time;
            names.value = currentEvent.name;
            phone.value = currentEvent.phone;
            kaparo.value = currentEvent.kaparo;
            kaparoNumber.value = currentEvent.kaparoNumber;
            age.value = currentEvent.age;
            // parti.value = currentEvent.party;
            //animator.value = currentEvent.animator;
            cake.value = currentEvent.cake;
            pices.value = currentEvent.pices;
            price.value = currentEvent.cakePrice;
            cakeCode.value = currentEvent.cakeCode;
            cakeTaste.value = currentEvent.cakeFilling;
            cakeDescription.value = currentEvent.cakeDescription;
            order.checked = currentEvent.cakeOrder;
            HBDName.value = currentEvent.cakeLabel;
            kidsMenu.value = currentEvent.kidsMenu;
            kidsNumber.value = currentEvent.kidsNumber;

            if (currentEvent.kidsCatering.length > 0) {
                currentEvent.kidsCatering.forEach((e) => {
                    let newMenu = document.createElement("kidsMenu");
                    newMenu.innerHTML = `<select class="kidsMenu">
                    <option value="${e[0]}" selected>${e[0]}</option>
                    <option value="Зеленчукови Пръчеци">Зеленчукови Пръчеци</option>
                    <option value="Солети">Солети</option>
                    <option value="Сладки и Соленки">Сладки и Соленки</option>
                    <option value="Снакс">Снакс</option>
                    <option value="Пуканки">Пуканки</option>
                    <option value="Чипс">Чипс</option>
                    <option value="Детско Шампанско">Детско Шампанско</option>
                    <input type="number" id="quantity" placeholder="" value=${e[1]}> 
                    <input type="text" id="descript" placeholder="" value="${e[2]}">
                    </select>`;
                    let button = document.createElement('button');
                    button.id = 'deleteBtn';
                    button.textContent = 'Изтрий';
                    button.addEventListener('click', removeSection)
                    let table = document.querySelector('#cetaring');
                    newMenu.appendChild(button);
                    table.appendChild(newMenu);
                });

                function removeSection(e) {
                    e.target.parentElement.remove();
                };
            };

            if (currentEvent.parentCatering.length > 0) {
                currentEvent.parentCatering.forEach((e) => {
                    let newMenu2 = document.createElement("parentMenu");
                    newMenu2.innerHTML = `<select class="parentMenu">
                    <option value="${e[0]}" selected>${e[0]}</option>
                    <option value="Сладки и Соленки Микс">Сладки и Соленки Микс</option>
                    <option value="Ядки Асорти">Ядки Асорти</option>
                    <option value="Плато Мини Пици">Плато Мини Пици</option>
                    <option value="Арабско Плато">Арабско Плато</option>
                    <option value="Хапки Дуо Микс">Хапки Дуо Микс</option>
                    <option value="Хапки Дуо Италиано">Хапки Дуо Италиано"</option>
                    <option value="Хапки Трио Микс">Хапки Трио Микс</option>
                    <option value="Хапки Трио Италиано">Хапки Трио Италиано</option>
                    <option value="Хапки Трио Чийз">Хапки Трио Чийз</option>
                    <option value="Брускети с маслинова паста">Брускети с маслинова паста</option>
                    <option value="Плодово Плато">Плодово Плато</option>
                    <option value="Зеленчукови Хапки">Зеленчукови Хапки</option>
                    <option value="Бейби моцарела с чери домати">Бейби моцарела с чери домати</option>
                    <option value="Пресни зеленчуци с млечен дип">Пресни зеленчуци с млечен дип</option>
                    <option value="Плато Колбаси">Плато Колбаси</option>
                    <option value="Плато Деликатесни Колбаси">Плато Деликатесни Колбаси</option>
                    <option value="Плато Микс">Плато Микс</option>
                    <option value="Плато Френски Сирена">Плато Френски Сирена</option>
                    <option value="Пържени Картофи">Пържени Картофи</option>
                    <option value="Пикантни Картофи">Пикантни Картофи</option>
                    <option value="Комбинирано Плато №1">Комбинирано Плато №1</option>
                    <option value="Комбинирано Плато №2">Комбинирано Плато №2</option>
                    <option value="Комбинирано Плато №3">Комбинирано Плато №3</option>
                    <option value="Плато Месни Хапки">Плато Месни Хапки</option>
                    <option value="Плато Млечни Хапки">Плато Млечни Хапки</option>
                    <input type="number" id="quantity" placeholder="" value=${e[1]}> 
                    <input type="text" id="descript" placeholder="" value="${e[2]}">
                    </select>`;
                    let button = document.createElement('button');
                    button.id = 'deleteBtn';
                    button.textContent = 'Изтрий';
                    button.addEventListener('click', removeSection)
                    let table = document.querySelector('#cetaring2');
                    newMenu2.appendChild(button);
                    table.appendChild(newMenu2);
                });

                function removeSection(e) {
                    e.target.parentElement.remove();
                };
            };

            other.value = currentEvent.other;

            document.getElementById('saveButton').style.display = 'none';
            document.getElementById('deleteButton').style.display = 'inline-block';
            document.querySelector('#newEventModal h2').textContent = 'Редакция на резервация';
            const editBtn = document.getElementById('editButton');
            editBtn.style.display = 'inline-block';
            editBtn.addEventListener('click', editReservation);
            deleteButton.addEventListener('click', deleteReservation);


            async function editReservation() {
                if (!time.value || !names.value || !phone.value || !age.value) {
                    return alert('Не са попълнени всички задължителни полета!');
                };
                let currentKidsCatering = document.getElementById('cetaring');
                let cateringToPush = [];
                Array.from(currentKidsCatering.children).map(e => cateringToPush.push([e.children[0].value, e.children[1].value, e.children[2].value]));

                let currentParentCatering = document.getElementById('cetaring2');
                let cateringToPush2 = [];
                Array.from(currentParentCatering.children).map(e => cateringToPush2.push([e.children[0].value, e.children[1].value, e.children[2].value]));


                await put("/classes/ReservationPB/" + currentEvent.objectId, {
                    "date": clicked.trim(),
                    "name": names.value.trim(),
                    "age": Number(age.value.trim()),
                    "phone": phone.value.trim(),
                    "kaparo": Number(kaparo.value.trim()),
                    "kaparoNumber": Number(kaparoNumber.value.trim()),
                    "time": time.value.trim(),
                    // "party": parti.value.trim(),
                    // "animator": animator.value.trim(),
                    "cake": cake.value.trim(),
                    "pices": pices.value.trim(),
                    "cakeCode": cakeCode.value.trim(),
                    "cakeFilling": cakeTaste.value.trim(),
                    "cakeLabel": HBDName.value.trim(),
                    "cakeDescription": cakeDescription.value.trim(),
                    "cakePrice": Number(price.value.trim()),
                    "cakeOrder": order.checked,
                    "kidsNumber": Number(kidsNumber.value.trim()),
                    "kidsMenu": kidsMenu.value.trim(),
                    "kidsCatering": cateringToPush,
                    "parentCatering": cateringToPush2,
                    "other": other.value.trim(),
                });

                phone.value = '';
                names.value = '';
                time.value = '';
                kaparo.value = '';
                age.value = '';
                other.value = '';
                // parti.value = '';
                cake.value = '';
                cakeCode.value = '';
                cakeDescription.value = '';
                cakeTaste.value = '';
                price.value = '';
                pices.value = '';
                order.checked = false;
                HBDName.value = '';
                kidsMenu.value = '';
                kidsNumber.value = '';

                calendar.style.display = '';
                location.reload();
            };
        });

        async function deleteReservation() {

            if (confirm('Сигурен ли си че искаш да изстриеш планираното събитие?')) {

                await del("/classes/ReservationPB/" + currentEvent.objectId);

                phone.value = '';
                names.value = '';
                time.value = '';
                kaparo.value = '';
                age.value = '';
                //parti.value = '';
                cake.value = '';
                cakeCode.value = '';
                cakeDescription.value = '';
                cakeTaste.value = '';
                price.value = '';
                pices.value = '';
                order.checked = false;
                other.value = '';
                HBDName.value = '';
                kidsMenu.value = '';
                kidsNumber.value = '';

                calendar.style.display = '';
                location.reload();
            };
        };
    } else {
        document.querySelector('#newEventModal h2').textContent = 'Нова Резервация';
        newEventModal.style.display = 'block';
        deleteEventModal.style.display = 'none';
        document.getElementById('editButton').style.display = 'none';
        document.getElementById('saveButton').style.display = 'inline-block';
        document.getElementById('deleteButton').style.display = 'none';
    };
};

function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    };

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText =
        `${dt.toLocaleDateString('bg-bg', { month: 'long' })} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }
            if (events.results.length > 0) {

                const eventForDay = events.results.filter(e => (e.date == dayString));

                if (eventForDay.length > 0) {
                    eventForDay.map(ev => {
                        const eventDiv = document.createElement('div');
                        eventDiv.classList.add('event');
                        eventDiv.innerText = ev.time + "ч." + " " + ev.name + " " + ev.age + "г.";
                        daySquare.appendChild(eventDiv);
                    });
                };
            };
            daySquare.addEventListener('click', (event) => openModal(event, dayString));
        } else {
            daySquare.classList.add('padding');
        };
        calendar.appendChild(daySquare);
    };
};

function closeModal() {
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';

    phone.value = '';
    names.value = '';
    time.value = '';
    kaparo.value = '';
    kaparoNumber.value = "";
    age.value = '';
    //parti.value = '';
    //animator.value = '';
    cake.value = '';
    cakeCode.value = '';
    cakeDescription.value = '';
    cakeTaste.value = '';
    price.value = '';
    pices.value = '';
    order.checked = false;
    other.value = '';
    HBDName.value = '';
    kidsMenu.value = '';
    kidsNumber.value = '';

    clicked = null;

    calendar.style.display = '';
    location.reload();
}

async function saveEvent() {
    if (names.value && time.value && age.value && phone.value) {
        names.classList.remove('error');
        time.classList.remove('error');
        age.classList.remove('error');
        phone.classList.remove('error');

        kidsCatering = document.getElementById('cetaring');
        parentCatering = document.getElementById('cetaring2');


        let cateringToPush = [];
        Array.from(kidsCatering.children).map(e => cateringToPush.push([e.children[0].value, e.children[1].value, e.children[2].value]))

        let cateringToPush2 = [];
        Array.from(parentCatering.children).map(e => cateringToPush2.push([e.children[0].value, e.children[1].value, e.children[2].value]))

        await post("/classes/ReservationPB", {
            "date": clicked.trim(),
            "name": names.value.trim(),
            "age": Number(age.value.trim()),
            "phone": phone.value.trim(),
            "kaparo": Number(kaparo.value.trim()),
            "kaparoNumber": Number(kaparoNumber.value.trim()),
            "time": time.value.trim(),
            // "party": parti.value.trim(),
            // "animator": animator.value.trim(),
            "cake": cake.value.trim(),
            "pices": pices.value.trim(),
            "cakeCode": cakeCode.value.trim(),
            "cakeFilling": cakeTaste.value.trim(),
            "cakeLabel": HBDName.value.trim(),
            "cakeDescription": cakeDescription.value.trim(),
            "cakePrice": Number(price.value.trim()),
            "cakeOrder": order.checked,
            "kidsNumber": Number(kidsNumber.value.trim()),
            "kidsMenu": kidsMenu.value.trim(),
            "kidsCatering": cateringToPush,
            "parentCatering": cateringToPush2,
            "other": other.value.trim(),
        });

        closeModal();
    } else {
        names.classList.add('error');
        age.classList.add('error');
        time.classList.add('error');
        phone.classList.add('error');

        return alert('Не са попълнени всички задължителни полета!');
    };
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('closeButton').addEventListener('click', closeModal);
}
initButtons();
load();
