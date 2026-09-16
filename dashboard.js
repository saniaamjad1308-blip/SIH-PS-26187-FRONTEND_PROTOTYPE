/* =====================================================
   SURAKSHANETRA DASHBOARD
===================================================== */


/* =====================================================
   MENU
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const sideNav =
    document.getElementById("sideNav");

const mainContent =
    document.getElementById("mainContent");


menuBtn.addEventListener("click", function () {

    sideNav.classList.toggle("closed");

    mainContent.classList.toggle("expanded");

});



/* =====================================================
   DEFAULT AVATAR
===================================================== */

const DEFAULT_AVATAR =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 200 200">

            <rect
                width="200"
                height="200"
                fill="#30382c"/>

            <circle
                cx="100"
                cy="72"
                r="38"
                fill="#d7dbd2"/>

            <path
                d="
                M35 180
                C38 137
                65 110
                100 110
                C135 110
                162 137
                165 180
                Z"
                fill="#d7dbd2"/>

        </svg>

    `);



/* =====================================================
   OFFICER DATA
===================================================== */

const officerName =
    localStorage.getItem("officerName")
    || "Officer";


const profileImage =
    localStorage.getItem("profileImage")
    || DEFAULT_AVATAR;


const savedRank =
    localStorage.getItem("officerRank");



/* =====================================================
   NAVBAR PROFILE
===================================================== */

const dashboardOfficerName =
    document.getElementById(
        "dashboardOfficerName"
    );


const dashboardOfficerRank =
    document.getElementById(
        "dashboardOfficerRank"
    );


const profileAvatar =
    document.getElementById(
        "profileAvatar"
    );


dashboardOfficerName.textContent =
    officerName;


dashboardOfficerRank.textContent =
    savedRank || "COMMAND";


profileAvatar.src =
    profileImage;



/* =====================================================
   RANK POPUP
===================================================== */

const rankModal =
    document.getElementById(
        "rankModal"
    );


const rankOfficerName =
    document.getElementById(
        "rankOfficerName"
    );


const rankProfileImage =
    document.getElementById(
        "rankProfileImage"
    );


const officerRankInput =
    document.getElementById(
        "officerRankInput"
    );


const saveRankBtn =
    document.getElementById(
        "saveRankBtn"
    );



rankOfficerName.textContent =
    officerName;


rankProfileImage.src =
    profileImage;



/*
    If rank is already saved,
    don't show popup.

    Otherwise show it.
*/

if (savedRank) {

    rankModal.style.display =
        "none";

} else {

    rankModal.style.display =
        "flex";

    setTimeout(function () {

        officerRankInput.focus();

    }, 300);

}



/* =====================================================
   SAVE RANK
===================================================== */

saveRankBtn.addEventListener(
    "click",
    function () {


        const rank =
            officerRankInput.value.trim();


        if (rank === "") {

            alert(
                "Please enter your officer rank."
            );

            officerRankInput.focus();

            return;

        }


        localStorage.setItem(
            "officerRank",
            rank
        );


        dashboardOfficerRank.textContent =
            rank;


        rankModal.style.display =
            "none";


        addTacticalLog(
            "Officer profile completed.",
            "normal"
        );

    }
);



/* ENTER KEY */

officerRankInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            saveRankBtn.click();

        }

    }
);



/* =====================================================
   CLOCK
===================================================== */

const systemClock =
    document.getElementById(
        "systemClock"
    );


function updateClock() {

    const now =
        new Date();


    const hours =
        String(now.getHours())
        .padStart(2, "0");


    const minutes =
        String(now.getMinutes())
        .padStart(2, "0");


    const seconds =
        String(now.getSeconds())
        .padStart(2, "0");


    systemClock.textContent =
        `${hours}:${minutes}:${seconds}`;

}


updateClock();


setInterval(
    updateClock,
    1000
);



/* =====================================================
   LAST SYNC
===================================================== */

const lastSync =
    document.getElementById(
        "lastSync"
    );


function updateSync() {

    lastSync.textContent =
        new Date().toLocaleTimeString();

}


updateSync();


setInterval(
    updateSync,
    30000
);



/* =====================================================
   STATISTICS
===================================================== */

document.getElementById(
    "sectorTotal"
).textContent = "6";


document.getElementById(
    "cameraTotal"
).textContent = "24";


document.getElementById(
    "clipTotal"
).textContent = "3";


document.getElementById(
    "alarmTotal"
).textContent = "0";



/* =====================================================
   MONITORED AREAS
===================================================== */

const areasContainer =
    document.getElementById(
        "areasContainer"
    );


const monitoredAreas = [

    {
        name: "Sector Alpha",
        cameras: 5
    },

    {
        name: "Sector Bravo",
        cameras: 4
    },

    {
        name: "Sector Charlie",
        cameras: 6
    },

    {
        name: "Sector Delta",
        cameras: 3
    },

    {
        name: "Sector Echo",
        cameras: 4
    },

    {
        name: "Sector Foxtrot",
        cameras: 2
    }

];


function loadAreas() {

    areasContainer.innerHTML = "";


    monitoredAreas.forEach(
        function (area) {


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "area-card";


            card.innerHTML = `

                <div>

                    <div class="area-name">
                        ${area.name}
                    </div>

                    <div class="area-info">
                        ${area.cameras}
                        active cameras
                    </div>

                </div>

                <div class="area-status">
                    ● MONITORING
                </div>

            `;


            areasContainer.appendChild(
                card
            );

        }
    );

}


loadAreas();



/* =====================================================
   TACTICAL LOG
===================================================== */

const tacticalLog =
    document.getElementById(
        "tacticalLog"
    );


function addTacticalLog(
    message,
    type = "normal"
) {


    const entry =
        document.createElement(
            "div"
        );


    entry.className =
        "log-entry";


    if (type === "alarm") {

        entry.classList.add(
            "alarm"
        );

    }


    const time =
        new Date().toLocaleTimeString();


    entry.innerHTML = `

        <div class="log-time">
            ${time}
        </div>

        <div class="log-message">
            ${message}
        </div>

    `;


    tacticalLog.prepend(
        entry
    );

}



addTacticalLog(
    "SurakshaNetra command system initialized."
);


addTacticalLog(
    "All surveillance sectors connected."
);


addTacticalLog(
    "AI video analytics system ready."
);



/* =====================================================
   NOTIFICATIONS
===================================================== */

const notificationBtn =
    document.getElementById(
        "notificationBtn"
    );


const notificationPanel =
    document.getElementById(
        "notificationPanel"
    );


const notificationList =
    document.getElementById(
        "notificationList"
    );


const notificationCount =
    document.getElementById(
        "notificationCount"
    );


const clearNotifications =
    document.getElementById(
        "clearNotifications"
    );


let notificationTotal = 0;



/* OPEN */

notificationBtn.addEventListener(
    "click",
    function () {

        notificationPanel.classList.toggle(
            "show"
        );

    }
);



/* ADD */

function addNotification(
    title,
    message,
    type = "normal"
) {


    const empty =
        notificationList.querySelector(
            ".no-notifications"
        );


    if (empty) {

        empty.remove();

    }


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "notification-item";


    if (type === "alarm") {

        item.classList.add(
            "alarm"
        );

    }


    item.innerHTML = `

        <strong>
            ${title}
        </strong>

        <span>
            ${message}
        </span>

    `;


    notificationList.prepend(
        item
    );


    notificationTotal++;


    notificationCount.textContent =
        notificationTotal;

}



/* CLEAR */

clearNotifications.addEventListener(
    "click",
    function () {


        notificationList.innerHTML = `

            <p class="no-notifications">
                No new notifications
            </p>

        `;


        notificationTotal = 0;


        notificationCount.textContent =
            "0";

    }
);



/* =====================================================
   ALARM SOUND
===================================================== */

function playAlarmSound() {

    try {


        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {

            return;

        }


        const audio =
            new AudioContext();



        function beep(
            frequency,
            start
        ) {


            setTimeout(
                function () {


                    const oscillator =
                        audio.createOscillator();


                    const gain =
                        audio.createGain();


                    oscillator.type =
                        "square";


                    oscillator.frequency.value =
                        frequency;


                    gain.gain.value =
                        0.12;


                    oscillator.connect(
                        gain
                    );


                    gain.connect(
                        audio.destination
                    );


                    oscillator.start();


                    oscillator.stop(
                        audio.currentTime
                        + 0.18
                    );


                },
                start
            );

        }


        beep(850, 0);

        beep(650, 250);

        beep(850, 500);

        beep(650, 750);


    } catch (error) {

        console.log(
            "Alarm sound unavailable."
        );

    }

}



/* =====================================================
   TEST ALARM
===================================================== */

const createAlarmBtn =
    document.getElementById(
        "createAlarmBtn"
    );


createAlarmBtn.addEventListener(
    "click",
    function () {


        const alarmTotal =
            document.getElementById(
                "alarmTotal"
            );


        alarmTotal.textContent =
            Number(
                alarmTotal.textContent
            ) + 1;



        addNotification(
            "CRITICAL ALARM",
            "Unusual activity detected in Sector Alpha.",
            "alarm"
        );



        addTacticalLog(
            "CRITICAL: Unusual activity detected in Sector Alpha.",
            "alarm"
        );



        notificationBtn.classList.add(
            "alarm-shake"
        );


        setTimeout(
            function () {

                notificationBtn.classList.remove(
                    "alarm-shake"
                );

            },
            1600
        );



        playAlarmSound();



        showBrowserNotification();

    }
);



/* =====================================================
   BROWSER NOTIFICATION
===================================================== */

function showBrowserNotification() {


    if (
        !("Notification" in window)
    ) {

        return;

    }


    if (
        Notification.permission ===
        "granted"
    ) {


        new Notification(
            "SURAKSHANETRA — CRITICAL ALARM",
            {

                body:
                    "Unusual activity detected in Sector Alpha.",

                icon:
                    profileImage

            }
        );

    }

}



/* =====================================================
   NOTIFICATION PERMISSION
===================================================== */

if (
    "Notification" in window &&
    Notification.permission === "default"
) {

    Notification.requestPermission();

}



/* =====================================================
   CLICK OUTSIDE NOTIFICATION
===================================================== */

document.addEventListener(
    "click",
    function (event) {


        if (
            !event.target.closest(
                ".notification-wrapper"
            )
        ) {

            notificationPanel.classList.remove(
                "show"
            );

        }

    }
);
/* =========================================
   ACTIVE SIDEBAR PAGE
========================================= */

const navItems =
    document.querySelectorAll(".side-nav a.nav-item");

const currentPage =
    window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

navItems.forEach(function (item) {

    const itemPage =
        item.getAttribute("href")
            .split("/")
            .pop()
            .toLowerCase();

    item.classList.toggle(
        "active",
        itemPage === currentPage
    );

});
/* =========================================
   MANAGEMENT NAVIGATION
========================================= */

const managementNav =
    document.getElementById("managementNav");

if (managementNav) {

    managementNav.addEventListener(
        "click",
        function () {

            window.location.href =
                "management.html";

        }
    );

}