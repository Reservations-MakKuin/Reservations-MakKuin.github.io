import {get, post, put, del } from "./api/api.js";


let nav = 0;
let clicked = null;
const events = await get("/classes/ReservationMovie");

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const blockEventModal = document.getElementById('blockEventModal');
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

let shoDate = document.createElement("h2");
shoDate.setAttribute("id", "shoDate");

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', ];

function openModal(event, date, reservationsArr) {
    clicked = date;
    calendar.style.display = 'none';
    let curentDate = clicked;
    curentDate = curentDate.split('/');
    if(curentDate[0] < 10){
        curentDate[0] = `0${curentDate[0]}`
    }
    if(curentDate[1] < 10){
     curentDate[1] = `0${curentDate[1]}`
    }
     let reverseDate = `${curentDate[1]}.${curentDate[0]}.${curentDate[2]}`
         document.getElementById('shoDate').textContent = `???? ????????: ${reverseDate}??.`;

    if (reservationsArr.length > 0) {
        let index = 0;
        for (let current of [...time.children]) {
 
            if (reservationsArr.includes(current.textContent)) {
                // current.style.display = "none";
                current.disabled = true;
 
                let endIndex = index + 5;
                let startIndex = index - 4;
 
                if (startIndex < 0) {
                    startIndex = 0;
                };
                if (endIndex > [...time.children].length) {
                    endIndex = [...time.children].length;
                };
 
                for (let i = startIndex; i < endIndex; i++) {
                    // [...time.children][i].style.display = 'none';
                    [...time.children][i].disabled = true;
                };
            };
            index++;
        };
    };




    if (event.target.className == 'event') {

        newEventModal.style.display = 'none';
        deleteEventModal.style.display = 'block';

       let splitted = event.target.textContent.trim().split(' ');
        let reservationTime = splitted.shift().slice(0, -2);
        let years = splitted.pop().slice(0, -2);
        let name = splitted.join(' ')
        const currentEvent = events.results.find(e => e.name == name && e.age == years && e.time == reservationTime && clicked == e.date);
        document.getElementById('????????????????????').textContent = reverseDate;
        document.getElementById('??????').textContent = currentEvent.name;
        document.getElementById('????????????').textContent = currentEvent.age;
        document.getElementById('??????').textContent = currentEvent.time;
        document.getElementById('??????????????').textContent = currentEvent.phone;
        document.getElementById('????????????').textContent = currentEvent.kaparo;
        document.getElementById('??????????????????????').textContent = currentEvent.kaparoNumber;
        //  document.getElementById('????????????????').textContent = currentEvent.animator;
        // document.getElementById('??????????').textContent = currentEvent.party;
        document.getElementById('??????????').textContent = currentEvent.cake;
        document.getElementById('??????????????').textContent = currentEvent.pices;
        document.getElementById('????????????????').textContent = currentEvent.cakeCode;
        document.getElementById('??????????????????????').textContent = currentEvent.cakeFilling;
        document.getElementById('????????????').textContent = currentEvent.cakeLabel;
        document.getElementById('??????????????????????????').textContent = currentEvent.cakeDescription;
        document.getElementById('????????').textContent = currentEvent.cakePrice;
        document.getElementById('????????????????????').textContent = currentEvent.kidsMenu;
        document.getElementById('????????????????').textContent = currentEvent.kidsNumber;

        let kidsCateringDiv = document.getElementById('????????????????????????');
        console.log(currentEvent.kidsCatering);
        currentEvent.kidsCatering.map(element => {
            let paragraph = document.createElement('p');
            paragraph.textContent = `${element[0]} - ${element[1]} ????. | ${element[2]}`
            kidsCateringDiv.appendChild(paragraph);
        });

        let parentCateringDiv = document.getElementById('????????????????????????????????');
        console.log(currentEvent.parentCatering);
        currentEvent.parentCatering.map(element => {
            let paragraph = document.createElement('p');
            paragraph.textContent = `${element[0]} - ${element[1]} ????. | ${element[2]}`
            parentCateringDiv.appendChild(paragraph);
        });

        if (currentEvent.cakeOrder == true) {
            document.getElementById('????????????????').textContent = "????";
        } else {
            document.getElementById('????????????????').textContent = '????';
        };

        document.getElementById('??????????').textContent = currentEvent.other;
        document.getElementById('????????????????').textContent = currentEvent.komentar;
        document.getElementById('deleteBtn').addEventListener('click', deleteReservation)
        document.getElementById('editBtn').addEventListener('click', () => {
            let editIndex = 0;
            for (let current of [...time.children]) {
         
                if (currentEvent.time == current.textContent) {
                    // current.style.display = "block";
                    current.disabled = false;
         
                    let endEditIndex = editIndex + 5;
                    let startEditIndex = editIndex - 4;
         
                    if (startEditIndex < 0) {
                        startEditIndex = 0;
                    };
                    if (endEditIndex > [...time.children].length) {
                        endEditIndex = [...time.children].length;
                    };
         
                    for (let j = startEditIndex; j < endEditIndex; j++) {
                        // [...time.children][j].style.display = 'block';
                        [...time.children][j].disabled = false;
                    };
                };
                editIndex++;
            };
         
            let filteredReservationArr = reservationsArr.filter(x => x != currentEvent.time);
            if (filteredReservationArr.length > 0) {
                let index = 0;
                for (let current of [...time.children]) {
         
                    if (reservationsArr.includes(current.textContent)) {
                        // current.style.display = "none";
                        current.disabled = true;
         
                        let endIndex = index + 5;
                        let startIndex = index - 4;
         
                        if (startIndex < 0) {
                            startIndex = 0;
                        };
                        if (endIndex > [...time.children].length) {
                            endIndex = [...time.children].length;
                        };
         
                        for (let i = startIndex; i < endIndex; i++) {
                            // [...time.children][i].style.display = 'none';
                            [...time.children][i].disabled = true;
                        };
                    };
                    index++;
                };
            };
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
                    <option value="?????????????????????? ??????????????">?????????????????????? ??????????????</option>
                    <option value="????????????">????????????</option>
                    <option value="???????????? ?? ??????????????">???????????? ?? ??????????????</option>
                    <option value="??????????">??????????</option>
                    <option value="??????????????">??????????????</option>
                    <option value="????????">????????</option>
                    <option value="???????????? ??????????????????">???????????? ??????????????????</option>
                    <input type="number" id="quantity" placeholder="" value=${e[1]}> 
                    <input type="text" id="descript" placeholder="" value="${e[2]}">
                    </select>`;
                    let button = document.createElement('button');
                    button.id = 'deleteBtn';
                    button.textContent = '????????????';
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
                    <option value="???????????? ?? ?????????????? ????????">???????????? ?? ?????????????? ????????</option>
                    <option value="???????? ????????????">???????? ????????????</option>
                    <option value="?????????? ???????? ????????">?????????? ???????? ????????</option>
                    <option value="?????????????? ??????????">?????????????? ??????????</option>
                    <option value="?????????? ?????? ????????">?????????? ?????? ????????</option>
                    <option value="?????????? ?????? ????????????????">?????????? ?????? ????????????????"</option>
                    <option value="?????????? ???????? ????????">?????????? ???????? ????????</option>
                    <option value="?????????? ???????? ????????????????">?????????? ???????? ????????????????</option>
                    <option value="?????????? ???????? ????????">?????????? ???????? ????????</option>
                    <option value="???????????????? ?? ?????????????????? ??????????">???????????????? ?? ?????????????????? ??????????</option>
                    <option value="?????????????? ??????????">?????????????? ??????????</option>
                    <option value="?????????????????????? ??????????">?????????????????????? ??????????</option>
                    <option value="?????????? ???????????????? ?? ???????? ????????????">?????????? ???????????????? ?? ???????? ????????????</option>
                    <option value="???????????? ?????????????????? ?? ???????????? ??????">???????????? ?????????????????? ?? ???????????? ??????</option>
                    <option value="?????????? ??????????????">?????????? ??????????????</option>
                    <option value="?????????? ?????????????????????? ??????????????">?????????? ?????????????????????? ??????????????</option>
                    <option value="?????????? ????????">?????????? ????????</option>
                    <option value="?????????? ?????????????? ????????????">?????????? ?????????????? ????????????</option>
                    <option value="?????????????? ??????????????">?????????????? ??????????????</option>
                    <option value="???????????????? ??????????????">???????????????? ??????????????</option>
                    <option value="?????????????????????? ?????????? ???1">?????????????????????? ?????????? ???1</option>
                    <option value="?????????????????????? ?????????? ???2">?????????????????????? ?????????? ???2</option>
                    <option value="?????????????????????? ?????????? ???3">?????????????????????? ?????????? ???3</option>
                    <option value="?????????? ?????????? ??????????">?????????? ?????????? ??????????</option>
                    <option value="?????????? ???????????? ??????????">?????????? ???????????? ??????????</option>
                    <input type="number" id="quantity" placeholder="" value=${e[1]}> 
                    <input type="text" id="descript" placeholder="" value="${e[2]}">
                    </select>`;
                    let button = document.createElement('button');
                    button.id = 'deleteBtn';
                    button.textContent = '????????????';
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
            komentar.value = currentEvent.komentar;

            document.getElementById('saveButton').style.display = 'none';
            document.getElementById('deleteButton').style.display = 'inline-block';
            document.querySelector('#newEventModal h2').textContent = '???????????????? ???? ????????????????????';
            const editBtn = document.getElementById('editButton');
            editBtn.style.display = 'inline-block';
            editBtn.addEventListener('click', editReservation);
            deleteButton.addEventListener('click', deleteReservation);


            async function editReservation() {
                if (!time.value || !names.value || !phone.value || !age.value) {
                    names.classList.add('error');
                    age.classList.add('error');
                    time.classList.add('error');
                    phone.classList.add('error');
                    return alert('???? ???? ?????????????????? ???????????? ???????????????????????? ????????????!');
                };
                let currentKidsCatering = document.getElementById('cetaring');
                let cateringToPush = [];
                Array.from(currentKidsCatering.children).map(e => cateringToPush.push([e.children[0].value, e.children[1].value, e.children[2].value]));

                let currentParentCatering = document.getElementById('cetaring2');
                let cateringToPush2 = [];
                Array.from(currentParentCatering.children).map(e => cateringToPush2.push([e.children[0].value, e.children[1].value, e.children[2].value]));


                await put("/classes/ReservationMovie/" + currentEvent.objectId, {
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
                    "komentar": komentar.value.trim(),
                });

                phone.value = '';
                names.value = '';
                time.value = '';
                kaparo.value = '';
                age.value = '';
                other.value = '';
                komentar.value = '';
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

            if (confirm('?????????????? ???? ???? ???? ?????????? ???? ???????????????? ?????????????????????? ???????????????')) {

                await del("/classes/ReservationMovie/" + currentEvent.objectId);

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
                komentar.value = '';
                HBDName.value = '';
                kidsMenu.value = '';
                kidsNumber.value = '';

                calendar.style.display = '';
                location.reload();
            };
        };
    } else {
          if (event.target.children.length !== 4) {
              
            document.querySelector('#newEventModal h2').textContent = '???????? ????????????????????';
            newEventModal.style.display = 'block';
            deleteEventModal.style.display = 'none';
            document.getElementById('editButton').style.display = 'none';
            document.getElementById('saveButton').style.display = 'inline-block';
            document.getElementById('deleteButton').style.display = 'none';
        } else {

            document.querySelector('#blockEventModal h2').textContent = '?????????????????? ?? ???????????????? ???? ???????????????????? ???? ??????!';
            blockEventModal.style.display = 'block';
            deleteEventModal.style.display = 'none';
            document.getElementById('editButton').style.display = 'inline-block';

        }
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
        let reservationsOnTheDay = [];

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }
            if (events.results.length > 0) {

                let eventForDay = events.results.filter(e => (e.date == dayString));
                eventForDay = eventForDay.sort((a, b) => a.time.localeCompare(b.time));

                if (eventForDay.length > 0) {
                    eventForDay.map(ev => {
                        const eventDiv = document.createElement('div');
                        eventDiv.classList.add('event');
                        eventDiv.innerText = ev.time + "??." + " " + ev.name + " " + ev.age + "??.";
                        daySquare.appendChild(eventDiv);
                        reservationsOnTheDay.push(ev.time);
                    });
                };
            };
            daySquare.addEventListener('click', (event) => openModal(event, dayString, reservationsOnTheDay));
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
    komentar.value = '';
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

        await post("/classes/ReservationMovie", {
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
            "komentar": komentar.value.trim(),
        });

        closeModal();
    } else {
        names.classList.add('error');
        age.classList.add('error');
        time.classList.add('error');
        phone.classList.add('error');

        return alert('???? ???? ?????????????????? ???????????? ???????????????????????? ????????????!');
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
    document.getElementById('closeButton2').addEventListener('click', closeModal);

}
initButtons();
load();
