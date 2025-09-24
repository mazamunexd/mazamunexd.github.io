const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

// For round clock version
const daysCircle = document.getElementById("days-circle");
const hoursCircle = document.getElementById("hours-circle");
const minutesCircle = document.getElementById("minutes-circle");
const secondsCircle = document.getElementById("seconds-circle");

const newYearTime = new Date("Jan 1, 2026 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const gap = newYearTime - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const d = Math.floor(gap / day);
  const h = Math.floor((gap % day) / hour);
  const m = Math.floor((gap % hour) / minute);
  const s = Math.floor((gap % minute) / second);

  dayEl.innerText = d.toString().padStart(2, '0');
  hourEl.innerText = h.toString().padStart(2, '0');
  minuteEl.innerText = m.toString().padStart(2, '0');
  secondEl.innerText = s.toString().padStart(2, '0');

  // Update progress circles (for round clock version)
  if (daysCircle) {
    const daysProgress = ((365 - d) / 365) * 314;
    const hoursProgress = ((24 - h) / 24) * 314;
    const minutesProgress = ((60 - m) / 60) * 314;
    const secondsProgress = ((60 - s) / 60) * 314;

    daysCircle.style.strokeDashoffset = 314 - daysProgress;
    hoursCircle.style.strokeDashoffset = 314 - hoursProgress;
    minutesCircle.style.strokeDashoffset = 314 - minutesProgress;
    secondsCircle.style.strokeDashoffset = 314 - secondsProgress;
  }

  setTimeout(updateCountdown, 1000);
}

updateCountdown();
