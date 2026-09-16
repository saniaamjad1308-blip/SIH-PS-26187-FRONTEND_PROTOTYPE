/* =========================================================
   SURAKSHANETRA
   GLOBAL NOTIFICATION SYSTEM
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const SURAKSHANETRA_WS =
    "ws://localhost:8000/ws/alarms";

const ACTIVE_ALARMS_API =
    "http://localhost:8000/api/alarms/active";


/* =========================================================
   STORAGE KEYS
========================================================= */

const ACTIVE_ALARMS_KEY =
    "surakshaNetraActiveAlarms";

const LAST_ALARM_KEY =
    "surakshaNetraLastAlarm";


/* =========================================================
   SHARED CHANNEL
========================================================= */

let alarmChannel = null;

if ("BroadcastChannel" in window) {

    alarmChannel =
        new BroadcastChannel("surakshaNetraAlarms");

}


/* =========================================================
   LOCAL STORAGE HELPERS
========================================================= */

function getStoredAlarms() {

    try {

        const data =
            localStorage.getItem(ACTIVE_ALARMS_KEY);

        return data ? JSON.parse(data) : [];

    } catch (error) {

        console.error(
            "Unable to read stored alarms:",
            error
        );

        return [];

    }

}


function saveStoredAlarms(alarms) {

    localStorage.setItem(
        ACTIVE_ALARMS_KEY,
        JSON.stringify(alarms)
    );

}


/* =========================================================
   ADD ALARM
========================================================= */

function addGlobalAlarm(alarm, broadcast = true) {

    if (!alarm) {
        return;
    }


    const alarms = getStoredAlarms();


    const alarmId =
        alarm.alarm_id ||
        alarm.id ||
        alarm.timestamp;


    const alreadyExists =
        alarms.some(function (item) {

            const itemId =
                item.alarm_id ||
                item.id ||
                item.timestamp;

            return String(itemId) === String(alarmId);

        });


    if (alreadyExists) {
        return;
    }


    alarms.unshift(alarm);


    saveStoredAlarms(alarms);


    localStorage.setItem(
        LAST_ALARM_KEY,
        JSON.stringify(alarm)
    );


    if (broadcast && alarmChannel) {

        alarmChannel.postMessage({
            type: "NEW_ALARM",
            alarm: alarm
        });

    }


    window.dispatchEvent(
        new CustomEvent(
            "surakshaNetraAlarm",
            {
                detail: alarm
            }
        )
    );

}


/* =========================================================
   REMOVE / RESOLVE ALARM
========================================================= */

function removeGlobalAlarm(alarmId, broadcast = true) {

    const alarms = getStoredAlarms();


    const filtered =
        alarms.filter(function (alarm) {

            const id =
                alarm.alarm_id ||
                alarm.id;

            return String(id) !== String(alarmId);

        });


    saveStoredAlarms(filtered);


    if (broadcast && alarmChannel) {

        alarmChannel.postMessage({
            type: "REMOVE_ALARM",
            alarmId: alarmId
        });

    }


    window.dispatchEvent(
        new CustomEvent(
            "surakshaNetraAlarmRemoved",
            {
                detail: {
                    alarmId: alarmId
                }
            }
        )
    );

}


/* =========================================================
   CHANNEL EVENTS
========================================================= */

if (alarmChannel) {

    alarmChannel.onmessage = function (event) {

        const data = event.data;


        if (data.type === "NEW_ALARM") {

            addGlobalAlarm(
                data.alarm,
                false
            );

        }


        if (data.type === "REMOVE_ALARM") {

            removeGlobalAlarm(
                data.alarmId,
                false
            );

        }

    };

}


/* =========================================================
   BROWSER NOTIFICATION
========================================================= */

async function requestBrowserNotificationPermission() {

    if (!("Notification" in window)) {
        return;
    }


    if (Notification.permission === "default") {

        try {

            await Notification.requestPermission();

        } catch (error) {

            console.warn(
                "Notification permission unavailable."
            );

        }

    }

}


function sendBrowserAlarmNotification(alarm) {

    if (!("Notification" in window)) {
        return;
    }


    if (Notification.permission !== "granted") {
        return;
    }


    const area =
        alarm.area ||
        alarm.area_name ||
        "Unknown Area";


    const camera =
        alarm.camera ||
        alarm.camera_id ||
        "Unknown Camera";


    const type =
        alarm.type ||
        alarm.event_type ||
        "Security Breach";


    try {

        new Notification(
            "SurakshaNetra — Security Alert",
            {
                body:
                    `${type}\n` +
                    `Area: ${area}\n` +
                    `Camera: ${camera}`,

                tag:
                    String(
                        alarm.alarm_id ||
                        alarm.id ||
                        Date.now()
                    )
            }
        );

    } catch (error) {

        console.warn(
            "Browser notification failed:",
            error
        );

    }

}


/* =========================================================
   ALARM SOUND
========================================================= */

let audioContext = null;


function initializeAlarmAudio() {

    if (audioContext) {
        return;
    }


    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;


    if (!AudioContext) {
        return;
    }


    audioContext =
        new AudioContext();

}


function playGlobalAlarmSound() {

    if (!audioContext) {

        initializeAlarmAudio();

    }


    if (!audioContext) {
        return;
    }


    if (audioContext.state === "suspended") {

        audioContext.resume();

    }


    const now =
        audioContext.currentTime;


    const oscillator =
        audioContext.createOscillator();


    const gain =
        audioContext.createGain();


    oscillator.type = "square";


    oscillator.frequency.setValueAtTime(
        700,
        now
    );


    oscillator.frequency.setValueAtTime(
        950,
        now + 0.18
    );


    oscillator.frequency.setValueAtTime(
        700,
        now + 0.36
    );


    gain.gain.setValueAtTime(
        0.0001,
        now
    );


    gain.gain.exponentialRampToValueAtTime(
        0.18,
        now + 0.03
    );


    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + 0.45
    );


    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );


    oscillator.start(now);

    oscillator.stop(now + 0.5);

}


/* =========================================================
   WEBSOCKET
========================================================= */

let alarmSocket = null;

let socketReconnectTimer = null;


function connectGlobalAlarmSocket() {

    if (!("WebSocket" in window)) {

        console.warn(
            "WebSocket is not supported by this browser."
        );

        return;

    }


    try {

        alarmSocket =
            new WebSocket(
                SURAKSHANETRA_WS
            );


        alarmSocket.onopen = function () {

            console.log(
                "SurakshaNetra alarm channel connected."
            );

        };


        alarmSocket.onmessage = function (event) {

            try {

                const alarm =
                    JSON.parse(event.data);


                addGlobalAlarm(
                    alarm,
                    true
                );


                sendBrowserAlarmNotification(
                    alarm
                );


                playGlobalAlarmSound();


            } catch (error) {

                console.error(
                    "Invalid alarm data:",
                    error
                );

            }

        };


        alarmSocket.onerror = function (error) {

            console.warn(
                "Alarm WebSocket connection error."
            );

        };


        alarmSocket.onclose = function () {

            console.warn(
                "Alarm WebSocket disconnected."
            );


            clearTimeout(
                socketReconnectTimer
            );


            socketReconnectTimer =
                setTimeout(
                    connectGlobalAlarmSocket,
                    5000
                );

        };

    } catch (error) {

        console.warn(
            "Unable to connect to alarm server:",
            error
        );

    }

}


/* =========================================================
   FETCH ACTIVE ALARMS FROM BACKEND
========================================================= */

async function loadActiveAlarms() {

    try {

        const response =
            await fetch(
                ACTIVE_ALARMS_API
            );


        if (!response.ok) {
            throw new Error(
                `Server returned ${response.status}`
            );
        }


        const alarms =
            await response.json();


        if (Array.isArray(alarms)) {

            saveStoredAlarms(
                alarms
            );

        }

    } catch (error) {

        console.warn(
            "Active alarm API unavailable.",
            error
        );

        /*
            This is intentional.

            During frontend development, the page
            continues using localStorage.

            Once the Python backend is running,
            the API will automatically provide
            the real active alarms.
        */

    }

}


/* =========================================================
   PUBLIC HELPERS
========================================================= */

function getGlobalActiveAlarms() {

    return getStoredAlarms();

}


function clearAllGlobalAlarms() {

    saveStoredAlarms([]);

    localStorage.removeItem(
        LAST_ALARM_KEY
    );

}


/* =========================================================
   USER INTERACTION INITIALIZATION
========================================================= */

document.addEventListener(
    "click",
    function () {

        initializeAlarmAudio();

        if (
            audioContext &&
            audioContext.state === "suspended"
        ) {

            audioContext.resume();

        }

    },
    {
        once: true
    }
);


/* =========================================================
   START SYSTEM
========================================================= */

requestBrowserNotificationPermission();

loadActiveAlarms();

connectGlobalAlarmSocket();