var theCount;
var alarm = document.getElementById("alarm");
var alarm2 = document.getElementById("alarm2");
var panel = document.getElementById("panel");
var turnOff = document.getElementById("turn-off");
var turnOffHor = document.getElementById("closing");
var detonate = document.getElementById("detonate");
var time = document.getElementById("time");
var abort = document.getElementById("abort");
var cover = document.getElementById("cover");
var btn = document.getElementById("activate");
var reload = document.getElementById("reload");
var mute = document.getElementById("mute");

alarm.volume = 0.5;
alarm2.volume = 0.5;

function showCountDown() {
    time.innerText = time.innerText - 1;
    if (time.innerText == 0) {
        clearInterval(theCount);
        time.classList.add("crono");
        abort.classList.add("hide");
        detonate.classList.add("show");
        setTimeout(function () {
            panel.classList.remove("show");
            turnOff.classList.add("close");
            turnOffHor.classList.add("close");
            document.getElementById("restart").classList.add("show");
            alarm.pause();
            if (!mute.classList.contains("muted")) {
                alarm2.play();
            }
        }, 1500);
    }
}

cover.addEventListener("click", function () {
    if (this.classList.contains("opened")) this.classList.remove("opened");
    else this.classList.add("opened");
});

btn.addEventListener("click", function () {
    this.classList.add("pushed");
    alarm.currentTime = 0;
    if (!mute.classList.contains("muted")) {
        alarm.play();
    }
    setTimeout(function () {
        panel.classList.add("show");
        theCount = setInterval(showCountDown, 1000);
    }, 500);
});

abort.addEventListener("click", function () {
    btn.classList.remove("pushed");
    panel.classList.remove("show");
    clearInterval(theCount);
    time.innerText = 9;
    alarm.pause();
    alarm.currentTime = 0;
});

reload.addEventListener("click", function () {
    panel.classList.remove("show");
    turnOff.classList.remove("close");
    turnOffHor.classList.remove("close");
    abort.classList.remove("hide");
    detonate.classList.remove("show");
    cover.classList.add("opened");
    btn.classList.remove("pushed");
    document.getElementById("restart").classList.remove("show");
    time.classList.remove("crono");
    time.innerText = 9;
    alarm2.pause();
    alarm2.currentTime = 0;
});

setTimeout(function () {
    cover.classList.remove("opened");
}, 100);

mute.addEventListener("click", function () {
    if (this.classList.contains("muted")) {
        alarm.muted = false;
        alarm2.muted = false;
        this.classList.remove("muted");
    } else {
        alarm.muted = true;
        alarm2.muted = true;
        this.classList.add("muted");
    }
});