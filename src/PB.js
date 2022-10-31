import {get} from "./api/api.js";

let nav = 0;
const events = await get("/classes/ReservationPB?limit=10000");

let shoDate = document.createElement("h2");
shoDate.setAttribute("id", "shoDate");

const calendar = document.getElementById('calendar');

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', ];

let dt = new Date();
let day = dt.getDate();
let month = dt.getMonth();
let year = dt.getYear() + 1900;



function load() {
// const dt = new Date();
// console.log(dt);
// console.log(nav);
//     if (nav !== 0) {
//         dt.setMonth(new Date().getMonth() + nav);
//         console.log(dt);
//     };

//     const day = dt.getDate();
//     const month = dt.getMonth();
//     const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
   
    const monthName = dt.toLocaleString('bg-BG', {month: 'long'});
    document.getElementById("monthDisplay").innerText =
    monthName.toUpperCase() +
    " " +
    year;

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
                        eventDiv.classList.add('event');
                        eventDiv.innerText = ev.time + "ч." + " " + ev.name + " " + ev.age + "г.";
                        daySquare.appendChild(eventDiv);
                        reservationsOnTheDay.push(ev.time);
                    });
                };
 
            };
           // daySquare.addEventListener('click', (event) => openModal(event, dayString, reservationsOnTheDay));
        } else {
            daySquare.classList.add('padding');
        };
        calendar.appendChild(daySquare);
    };
};

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        //nav++;
        if(month == 11){
            dt.setMonth(month = 0);
            year++;
          }else{
            dt.setMonth(++month);
          }
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
          load();
        });
      }

initButtons();
load();

