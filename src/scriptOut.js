import {get, post, put, del } from "./api/api.js";
//import { login } from "./api/api.js";


let nav = 0;
let clicked = null;
const events = await get("/classes/ReservationOut?limit=10000");

let shoDate = document.createElement("h2");
shoDate.setAttribute("id", "shoDate");

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
const pices = document.getElementById('pices');
const price = document.getElementById('prise');
const kidsNumber = document.getElementById('kidsNumber');
const kaparoTime = document.getElementById('kaparoTime');



const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', ];

function openModal(event, date, reservationsArr) {

    // if(localStorage.getItem('1') != null){
    //    // login('Miro', '123456')

    // }else{
    // // if(localStorage.userData == undefined){
        
           
    //   // alert("Не сте Логнати!")
    //   // window.location.href = 'https://reservations-makkuin.github.io/loginOut.html';
    // }
    
    
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
        document.getElementById('shoDate').textContent = `За Дата: ${reverseDate}г.`;

    // if (reservationsArr.length > 0) {
    //     let index = 0;
    //     for (let current of [...time.children]) {
 
    //         if (reservationsArr.includes(current.textContent)) {
    //             // current.style.display = "none";
    //             current.disabled = true;
 
    //             let endIndex = index + 5;
    //             let startIndex = index - 4;
 
    //             if (startIndex < 0) {
    //                 startIndex = 0;
    //             };
    //             if (endIndex > [...time.children].length) {
    //                 endIndex = [...time.children].length;
    //             };
 
    //             for (let i = startIndex; i < endIndex; i++) {
    //                 // [...time.children][i].style.display = 'none';
    //                 [...time.children][i].disabled = true;
    //             };
    //         };
    //         index++;
    //     };
    // };


    if (event.target.className == 'event' && localStorage.getItem('1') != null) {

        newEventModal.style.display = 'none';
        deleteEventModal.style.display = 'block';

        let splitted = event.target.textContent.trim().split(' ');
        console.log(splitted);
        let reservationTime = splitted.shift().slice(0, -2);
        let years = splitted.pop().slice(0, -2);
        let name = splitted.join(' ')
        const currentEvent = events.results.find(e => e.name == name && e.age == years && e.time == reservationTime && clicked == e.date);
        document.getElementById('покажиДата').textContent = reverseDate;
        document.getElementById('име').textContent = currentEvent.name;
        document.getElementById('години').textContent = currentEvent.age;
        document.getElementById('час').textContent = currentEvent.time;
        document.getElementById('телефон').textContent = currentEvent.phone;
        document.getElementById('капаро').textContent = currentEvent.kaparo;
        document.getElementById('капароНомер').textContent = currentEvent.kaparoNumber;
        document.getElementById('парчета').textContent = currentEvent.pices;
        document.getElementById('цена').textContent = currentEvent.cakePrice;
        document.getElementById('бройДеца').textContent = currentEvent.kidsNumber;
        document.getElementById('друго').textContent = currentEvent.other;
        document.getElementById('коментар').textContent = currentEvent.komentar;
        document.getElementById('адрес').textContent = currentEvent.adres;
        document.getElementById('капароТиме').textContent = currentEvent.kaparoTime;

        document.getElementById('deleteBtn').addEventListener('click', deleteReservation)
        document.getElementById('editBtn').addEventListener('click', () => {
        
           
        let currentEventDate = currentEvent.createdAt.split('-')
        let currentEventDate2 = currentEventDate[2].split('T')
        document.getElementById('reservTime').textContent = currentEventDate2[0] + '/' + currentEventDate[1] + '/' + currentEventDate[0];    

            let editIndex = 0;
            for (let current of [...time.children]) {
         
                if (currentEvent.time == current.textContent) {
                    // current.style.display = "block";
                  //  current.disabled = false;
         
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
                       // [...time.children][j].disabled = false;
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
                     //   current.disabled = true;
         
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
                           // [...time.children][i].disabled = true;
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
            pices.value = currentEvent.pices;
            price.value = currentEvent.cakePrice;
            kidsNumber.value = currentEvent.kidsNumber;

            
            other.value = currentEvent.other;
            adres.value = currentEvent.adres;

            komentar.value = currentEvent.komentar;

            document.getElementById('saveButton').style.display = 'none';
            document.getElementById('deleteButton').style.display = 'inline-block';
            document.querySelector('#newEventModal h2').textContent = 'Редакция на резервация';
            const editBtn = document.getElementById('editButton');
            editBtn.style.display = 'inline-block';
            editBtn.addEventListener('click', editReservation);
            deleteButton.addEventListener('click', deleteReservation);


            async function editReservation() {
                if (!time.value || !names.value || !phone.value || !age.value || !kaparoTime.value) {
                    names.classList.add('error');
                    age.classList.add('error');
                    time.classList.add('error');
                    phone.classList.add('error');
                    kaparoTime.classList.add('error');
                    return alert('Не са попълнени всички задължителни полета!');
                };
              
                await put("/classes/ReservationOut/" + currentEvent.objectId, {
                    "date": clicked.trim(),
                    "name": names.value.trim(),
                    "age": Number(age.value.trim()),
                    "phone": phone.value.trim(),
                    "kaparo": Number(kaparo.value.trim()),
                    "kaparoNumber": Number(kaparoNumber.value.trim()),
                    "time": time.value.trim(),
                    "pices": pices.value.trim(),
                    "cakePrice": Number(price.value.trim()),
                    "other": other.value.trim(),
                    "adres": adres.value.trim(),
                    "kidsNumber": kidsNumber.value.trim(),
                    "komentar": komentar.value.trim(),
                    "kaparoTime": kaparoTime.value.trim(),
                    

                });

                phone.value = '';
                names.value = '';
                time.value = '';
                kaparo.value = '';
                age.value = '';
                other.value = '';
                adres.value = '';
                komentar.value = '';
                price.value = '';
                pices.value = '';
                kidsNumber.value = '';
                kaparoTime.value = '';
                               
                calendar.style.display = '';
                location.reload()
            };
        });

        async function deleteReservation() {

            if (confirm('Сигурен ли си че искаш да изстриеш планираното събитие?')) {

                await del("/classes/ReservationOut/" + currentEvent.objectId);

                phone.value = '';
                names.value = '';
                time.value = '';
                kaparo.value = '';
                age.value = '';
                other.value = '';
                adres.value = '';
                komentar.value = '';
                price.value = '';
                pices.value = '';
                kidsNumber.value = '';
                kaparoTime.value = '';
             
                calendar.style.display = '';
                location.reload();
            };
        };
        
    } else {
        if (event.target.children.length !== 4 && localStorage.getItem('1') != null) {

            document.querySelector('#newEventModal h2').textContent = 'Нова Резервация';
            newEventModal.style.display = 'block';
            deleteEventModal.style.display = 'none';
            document.getElementById('editButton').style.display = 'none';
            document.getElementById('saveButton').style.display = 'inline-block';
            document.getElementById('deleteButton').style.display = 'none';
        } else if (event.target.children.length !== 4 && localStorage.getItem('1') == null){
           // return alert('Достигнат Максимум на резервации за ден!');
            document.querySelector('#blockEventModal h2').textContent = 'Не сте логнати!';
            blockEventModal.style.display = 'block';
            deleteEventModal.style.display = 'none';
            document.getElementById('editButton').style.display = 'inline-block';
            window.location.href = 'https://reservations-makkuin.github.io/loginOut.html';

        }else{
            document.querySelector('#blockEventModal h2').textContent = 'Достигнат е максимум на резервации за ден!';
            blockEventModal.style.display = 'block';
            deleteEventModal.style.display = 'none';
            document.getElementById('editButton').style.display = 'inline-block';

        }
    };
    
};

let dt = new Date();
let day = dt.getDate();
let month = dt.getMonth();
let year = dt.getYear() + 1900;

function load() {
    // const dt = new Date();

    // if (nav !== 0) {
    //     dt.setMonth(new Date().getMonth() + nav);
    // };

    // const day = dt.getDate();
    // const month = dt.getMonth();
    // const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    const monthName = dt.toLocaleDateString('bg-BG', {month: 'long'});
    console.log(dt);
    document.getElementById("monthDisplay").innerText =
    `${monthName.toUpperCase()} ${year}`
    // document.getElementById('monthDisplay').innerText =
    //     `${dt.toLocaleDateString('bg-BG', { month: 'long' }).toUpperCase()} ${year}`;

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
                       

                    if(ev.kaparoTime == 'Оставено' || ev.kaparoTime == 'Грабо Ваучер' ){
                       
                        eventDiv.classList.add('event');
                       

                        eventDiv.innerText = ev.time + "ч." + " " + ev.name + " " + ev.age + "г.";
                        console.log(reservationsOnTheDay);
                    }else{
                        eventDiv.classList.add('event');
                        eventDiv.style="background-color:red;"
                        eventDiv.innerText = ev.time + "ч." + " " + ev.name + " " + ev.age + "г.";
                    }
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
    age.value = '';
    other.value = '';
    adres.value = '';
    komentar.value = '';
    price.value = '';
    pices.value = '';
    kidsNumber.value = '';
    kaparoTime.value = '';
       
    clicked = null;

    calendar.style.display = '';
    location.reload();
}

async function saveEvent() {


    if (names.value && time.value && age.value && (phone.value.length >= 10 && phone.value.length <= 10  )  &&  kaparoTime.value) {
        names.classList.remove('error');
        time.classList.remove('error');
        age.classList.remove('error');
        phone.classList.remove('error');
        kaparoTime.classList.add('error'); 

             
        await post("/classes/ReservationOut", {
            "date": clicked.trim(),
            "name": names.value.trim(),
            "age": Number(age.value.trim()),
            "phone": phone.value.trim(),
            "kaparo": Number(kaparo.value.trim()),
            "kaparoNumber": Number(kaparoNumber.value.trim()),
            "time": time.value.trim(),
            "pices": pices.value.trim(),
            "cakePrice": Number(price.value.trim()),
            "kidsNumber": kidsNumber.value.trim(),
            "other": other.value.trim(),
            "adres": adres.value.trim(),
            "komentar": komentar.value.trim(),
            "kaparoTime": kaparoTime.value.trim(),

        });

        closeModal();
    } else {
        names.classList.add('error');
        age.classList.add('error');
        time.classList.add('error');
        phone.classList.add('error');
        kaparoTime.classList.add('error');
        

        return alert(' Не са попълнени всички задължителни полета!\n ЧАС! \n ИМЕ! \n ГОДИНИ! \n Телефонният номер трябва да е 10 цифри! \n Информацията за КАПАРОТО!');
    };
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        //nav++;
        if(month == 11){
            dt.setMonth(month = 0);
            year++;
          }else{
            dt.setMonth(++month);
          }
          dt.setMonth(month)
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        //nav--;
        if(month == 0){
            dt.setMonth(month = 11);
            year--;
          }else{
            dt.setMonth(--month);
          }
          dt.setMonth(month)
        load();
    });
    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('closeButton').addEventListener('click', closeModal);
    document.getElementById('closeButton2').addEventListener('click', closeModal);

}
initButtons();
load();
