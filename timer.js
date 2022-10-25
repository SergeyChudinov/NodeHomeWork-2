import EventEmmiter from 'events';

const emmiter = new EventEmmiter();

const args = process.argv.slice(2);

emmiter.on('timer', (payload) => console.log('Осталось: ', payload));

function timer(deadline) {
    const [hours, days, month, year] = deadline[0].split('-');

    let time = `${year}-${month}-${days} ${hours}:0`;

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / (1000)) % 60);
        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock() {
        const timeInterval = setInterval(updateClock, 1000);                    
        updateClock();

        function updateClock() {
            let t = getTimeRemaining(time),
                days = getZero(t.days),
                hours = getZero(t.hours),
                minutes = getZero(t.minutes),
                seconds = getZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);
                emmiter.emit('timer', 'Время вышло, таймер остановлен!',);
            } else {
                emmiter.emit('timer', `${days}: ${hours}: ${minutes}: ${seconds}`);
            }
            
        }
    }
    setClock(); 
}
timer(args);

// node timer.js 16-25-10-2022