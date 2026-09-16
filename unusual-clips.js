/* =========================================
   SURAKSHANETRA — UNUSUAL CLIPS
========================================= */


/* =========================================
   CONFIGURATION
========================================= */

const CLIPS_API =
    "http://localhost:8000/api/unusual-clips";


/* =========================================
   DEFAULT PROFILE IMAGE
========================================= */

const DEFAULT_AVATAR =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg"
             width="200"
             height="200"
             viewBox="0 0 200 200">

            <rect
                width="200"
                height="200"
                fill="#465735"/>

            <circle
                cx="100"
                cy="75"
                r="38"
                fill="#d9ded2"/>

            <path
                d="M35 180
                   C38 135 64 112 100 112
                   C136 112 162 135 165 180 Z"
                fill="#d9ded2"/>

        </svg>
    `);


/* =========================================
   ELEMENTS
========================================= */

const menuBtn =
    document.getElementById("menuBtn");

const sideNav =
    document.getElementById("sideNav");

const mainContent =
    document.getElementById("mainContent");


const notificationBtn =
    document.getElementById("notificationBtn");

const notificationPanel =
    document.getElementById("notificationPanel");

const notificationList =
    document.getElementById("notificationList");

const notificationCount =
    document.getElementById("notificationCount");


const profileImage =
    document.getElementById("profileImage");

const officerName =
    document.getElementById("officerName");

const officerRank =
    document.getElementById("officerRank");


const totalClips =
    document.getElementById("totalClips");

const criticalClips =
    document.getElementById("criticalClips");

const warningClips =
    document.getElementById("warningClips");

const cameraCount =
    document.getElementById("cameraCount");


const visibleClipCount =
    document.getElementById("visibleClipCount");

const archiveContainer =
    document.getElementById("archiveContainer");

const emptyState =
    document.getElementById("emptyState");


const severityFilter =
    document.getElementById("severityFilter");

const areaFilter =
    document.getElementById("areaFilter");

const refreshClips =
    document.getElementById("refreshClips");


const videoModal =
    document.getElementById("videoModal");

const closeVideo =
    document.getElementById("closeVideo");

const clipVideo =
    document.getElementById("clipVideo");

const videoPlaceholder =
    document.getElementById("videoPlaceholder");

const videoModalTitle =
    document.getElementById("videoModalTitle");

const videoArea =
    document.getElementById("videoArea");

const videoCamera =
    document.getElementById("videoCamera");

const videoType =
    document.getElementById("videoType");

const videoSeverity =
    document.getElementById("videoSeverity");

const videoTimestamp =
    document.getElementById("videoTimestamp");


/* =========================================
   STATE
========================================= */

let allClips = [];

let currentFilter = "day";


/* =========================================
   PROFILE
========================================= */

function loadProfile() {

    const savedName =
        localStorage.getItem("officerName");

    const savedRank =
        localStorage.getItem("officerRank");

    const savedImage =
        localStorage.getItem("profileImage");


    if (savedName) {
        officerName.textContent = savedName;
    } else {
        officerName.textContent = "Officer";
    }


    if (savedRank) {
        officerRank.textContent = savedRank;
    } else {
        officerRank.textContent = "Rank not set";
    }


    profileImage.src =
        savedImage || DEFAULT_AVATAR;
}


loadProfile();


/* =========================================
   SIDEBAR
========================================= */

menuBtn.addEventListener(
    "click",
    function () {

        sideNav.classList.toggle("closed");

        mainContent.classList.toggle("expanded");

    }
);


/* =========================================
   NOTIFICATION PANEL
========================================= */

notificationBtn.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        notificationPanel.classList.toggle("show");

        renderNotifications();

    }
);


document.addEventListener(
    "click",
    function (event) {

        if (
            !notificationPanel.contains(event.target) &&
            !notificationBtn.contains(event.target)
        ) {

            notificationPanel.classList.remove("show");

        }

    }
);


/* =========================================
   GLOBAL ALARMS
========================================= */

function getCurrentAlarms() {

    if (
        typeof getGlobalActiveAlarms === "function"
    ) {

        return getGlobalActiveAlarms();

    }

    return [];

}


function renderNotifications() {

    const alarms =
        getCurrentAlarms();


    notificationCount.textContent =
        alarms.length;


    if (!alarms.length) {

        notificationList.innerHTML = `
            <p class="no-notifications">
                No active alarms
            </p>
        `;

        return;

    }


    notificationList.innerHTML =
        alarms.map(function (alarm) {

            const type =
                alarm.type ||
                alarm.event_type ||
                "Security Breach";


            const area =
                alarm.area ||
                alarm.area_name ||
                "Unknown Area";


            const camera =
                alarm.camera ||
                alarm.camera_id ||
                "Unknown Camera";


            const severity =
                alarm.severity ||
                "CRITICAL";


            const timestamp =
                formatDate(alarm.timestamp);


            return `
                <div class="notification-item">

                    <div class="notification-icon">
                        ⚠
                    </div>

                    <div class="notification-content">

                        <strong>
                            ${escapeHTML(type)}
                        </strong>

                        <span>
                            ${escapeHTML(area)}
                            •
                            ${escapeHTML(camera)}
                        </span>

                        <small>
                            ${escapeHTML(severity)}
                            •
                            ${escapeHTML(timestamp)}
                        </small>

                    </div>

                </div>
            `;

        }).join("");

}


window.addEventListener(
    "surakshaNetraAlarm",
    function () {

        renderNotifications();

    }
);


window.addEventListener(
    "surakshaNetraAlarmRemoved",
    function () {

        renderNotifications();

    }
);


renderNotifications();


/* =========================================
   FILTER BUTTONS
========================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");


filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (btn) {
                        btn.classList.remove("active");
                    }
                );


                button.classList.add("active");


                currentFilter =
                    button.dataset.filter;


                applyFilters();

            }
        );

    }
);


/* =========================================
   DATE FILTER
========================================= */

function matchesDateFilter(
    timestamp,
    filter
) {

    if (!timestamp) {
        return false;
    }


    const date =
        new Date(timestamp);


    if (Number.isNaN(date.getTime())) {
        return false;
    }


    const now =
        new Date();


    if (filter === "all") {
        return true;
    }


    if (filter === "day") {

        return (
            date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth() &&
            date.getDate() === now.getDate()
        );

    }


    if (filter === "week") {

        const current =
            new Date(now);

        current.setHours(
            0,
            0,
            0,
            0
        );


        const day =
            current.getDay();


        const difference =
            day === 0 ? 6 : day - 1;


        const startOfWeek =
            new Date(current);

        startOfWeek.setDate(
            current.getDate() - difference
        );


        const endOfWeek =
            new Date(startOfWeek);

        endOfWeek.setDate(
            startOfWeek.getDate() + 7
        );


        return (
            date >= startOfWeek &&
            date < endOfWeek
        );

    }


    if (filter === "month") {

        return (
            date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth()
        );

    }


    if (filter === "year") {

        return (
            date.getFullYear() === now.getFullYear()
        );

    }


    return true;
}


/* =========================================
   SEVERITY FILTER
========================================= */

function matchesSeverityFilter(
    clip
) {

    const selected =
        severityFilter.value;


    if (selected === "all") {
        return true;
    }


    const severity =
        (
            clip.severity ||
            "medium"
        ).toLowerCase();


    return severity === selected;
}


/* =========================================
   AREA FILTER
========================================= */

function matchesAreaFilter(
    clip
) {

    const selected =
        areaFilter.value;


    if (selected === "all") {
        return true;
    }


    const area =
        clip.area ||
        clip.area_name ||
        "Unknown Area";


    return area === selected;
}


/* =========================================
   APPLY ALL FILTERS
========================================= */

function applyFilters() {

    let filtered =
        allClips.filter(
            function (clip) {

                return (
                    matchesDateFilter(
                        clip.timestamp,
                        currentFilter
                    ) &&
                    matchesSeverityFilter(clip) &&
                    matchesAreaFilter(clip)
                );

            }
        );


    /*
       Newest events first.
    */

    filtered.sort(
        function (a, b) {

            return (
                new Date(b.timestamp) -
                new Date(a.timestamp)
            );

        }
    );


    renderClips(filtered);

}


/* =========================================
   LOAD CLIPS
========================================= */

async function fetchUnusualClips() {

    setLoadingState();


    try {

        const response =
            await fetch(CLIPS_API);


        if (!response.ok) {

            throw new Error(
                `Server returned ${response.status}`
            );

        }


        const data =
            await response.json();


        if (!Array.isArray(data)) {

            throw new Error(
                "Invalid clips response"
            );

        }


        allClips = data;


        saveClipsLocally(data);

    }

    catch (error) {

        console.warn(
            "Unusual clips API unavailable:",
            error
        );


        /*
           If backend is unavailable,
           use locally saved archive.
        */

        allClips =
            loadLocalClips();

    }


    populateAreaFilter();

    updateStatistics();

    applyFilters();

}


/* =========================================
   LOCAL ARCHIVE
========================================= */

const LOCAL_CLIPS_KEY =
    "surakshaNetraUnusualClips";


function saveClipsLocally(
    clips
) {

    try {

        localStorage.setItem(
            LOCAL_CLIPS_KEY,
            JSON.stringify(clips)
        );

    }

    catch (error) {

        console.warn(
            "Unable to save clips locally:",
            error
        );

    }

}


function loadLocalClips() {

    try {

        const data =
            localStorage.getItem(
                LOCAL_CLIPS_KEY
            );


        if (!data) {
            return [];
        }


        const clips =
            JSON.parse(data);


        return Array.isArray(clips)
            ? clips
            : [];

    }

    catch (error) {

        console.warn(
            "Unable to load local clips:",
            error
        );

        return [];

    }

}


/* =========================================
   LOADING STATE
========================================= */

function setLoadingState() {

    archiveContainer.innerHTML = `
        <div class="empty-state">

            <div class="empty-icon">
                ↻
            </div>

            <h3>
                Loading Archive
            </h3>

            <p>
                Retrieving unusual security events...
            </p>

        </div>
    `;

}


/* =========================================
   AREA FILTER OPTIONS
========================================= */

function populateAreaFilter() {

    const areas =
        new Set();


    allClips.forEach(
        function (clip) {

            const area =
                clip.area ||
                clip.area_name;


            if (area) {
                areas.add(area);
            }

        }
    );


    const sortedAreas =
        Array.from(areas).sort();


    areaFilter.innerHTML = `
        <option value="all">
            All Areas
        </option>
    `;


    sortedAreas.forEach(
        function (area) {

            const option =
                document.createElement("option");

            option.value = area;

            option.textContent = area;

            areaFilter.appendChild(option);

        }
    );

}


/* =========================================
   STATISTICS
========================================= */

function updateStatistics() {

    totalClips.textContent =
        allClips.length;


    const critical =
        allClips.filter(
            function (clip) {

                return (
                    (
                        clip.severity ||
                        ""
                    ).toLowerCase() ===
                    "critical"
                );

            }
        );


    criticalClips.textContent =
        critical.length;


    const warning =
        allClips.filter(
            function (clip) {

                const severity =
                    (
                        clip.severity ||
                        ""
                    ).toLowerCase();


                return (
                    severity === "high" ||
                    severity === "warning"
                );

            }
        );


    warningClips.textContent =
        warning.length;


    const cameras =
        new Set();


    allClips.forEach(
        function (clip) {

            const camera =
                clip.camera ||
                clip.camera_id;


            if (camera) {
                cameras.add(camera);
            }

        }
    );


    cameraCount.textContent =
        cameras.size;

}


/* =========================================
   RENDER CLIPS
========================================= */

function renderClips(
    clips
) {

    visibleClipCount.textContent =
        clips.length;


    if (!clips.length) {

        archiveContainer.innerHTML = "";

        emptyState.style.display =
            "flex";

        return;

    }


    emptyState.style.display =
        "none";


    /*
       Group by date.
    */

    const groups =
        groupClips(clips);


    archiveContainer.innerHTML =
        "";


    Object.keys(groups).forEach(
        function (groupName) {

            const group =
                document.createElement("section");


            group.className =
                "clip-group";


            group.innerHTML = `
                <div class="clip-group-header">

                    <h2>
                        ${escapeHTML(groupName)}
                    </h2>

                    <span>
                        ${groups[groupName].length}
                        event(s)
                    </span>

                </div>

                <div class="clip-grid"></div>
            `;


            const grid =
                group.querySelector(".clip-grid");


            groups[groupName].forEach(
                function (clip) {

                    grid.appendChild(
                        createClipCard(clip)
                    );

                }
            );


            archiveContainer.appendChild(
                group
            );

        }
    );

}


/* =========================================
   GROUP CLIPS
========================================= */

function groupClips(
    clips
) {

    const groups = {};


    clips.forEach(
        function (clip) {

            const date =
                new Date(clip.timestamp);


            let groupName;


            if (
                Number.isNaN(
                    date.getTime()
                )
            ) {

                groupName =
                    "Unknown Date";

            }

            else {

                groupName =
                    date.toLocaleDateString(
                        "en-IN",
                        {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        }
                    );

            }


            if (!groups[groupName]) {
                groups[groupName] = [];
            }


            groups[groupName].push(clip);

        }
    );


    return groups;

}


/* =========================================
   CREATE CLIP CARD
========================================= */

function createClipCard(
    clip
) {

    const card =
        document.createElement("article");


    card.className =
        "clip-card";


    const camera =
        clip.camera ||
        clip.camera_id ||
        "Unknown Camera";


    const area =
        clip.area ||
        clip.area_name ||
        "Unknown Area";


    const type =
        clip.type ||
        clip.event_type ||
        "Unusual Event";


    const severity =
        (
            clip.severity ||
            "medium"
        ).toLowerCase();


    const timestamp =
        formatDate(
            clip.timestamp
        );


    const thumbnail =
        clip.thumbnail ||
        clip.thumbnail_url ||
        "";


    const videoUrl =
        clip.video_url ||
        clip.video ||
        clip.clip_url ||
        "";


    const thumbnailHTML =
        thumbnail
            ? `
                <img
                    src="${escapeAttribute(thumbnail)}"
                    alt="Security event thumbnail"
                    loading="lazy"
                    onerror="this.parentElement.classList.add('no-image'); this.style.display='none';">
              `
            : "";


    card.innerHTML = `

        <div class="
            clip-thumbnail
            ${thumbnail ? "" : "no-image"}
        ">

            ${thumbnailHTML}

            <div class="clip-overlay"></div>


            <div class="clip-top">

                <span class="clip-type">
                    ${escapeHTML(type)}
                </span>


                <span class="
                    clip-severity
                    ${escapeHTML(severity)}
                ">
                    ${escapeHTML(
                        (clip.severity || "MEDIUM").toUpperCase()
                    )}
                </span>

            </div>


            <button
                class="clip-play"
                type="button"
                aria-label="Play archived clip">

                ▶

            </button>

        </div>


        <div class="clip-details">

            <h3>
                ${escapeHTML(type)}
            </h3>


            <div class="clip-meta">

                <span>
                    ◉
                    ${escapeHTML(camera)}
                </span>


                <span>
                    ▣
                    ${escapeHTML(area)}
                </span>

            </div>


            <div class="clip-footer">

                <span class="clip-time">
                    ${escapeHTML(timestamp)}
                </span>


                <button
                    class="view-clip-btn"
                    type="button">

                    VIEW CLIP

                </button>

            </div>

        </div>
    `;


    const playButton =
        card.querySelector(".clip-play");


    const viewButton =
        card.querySelector(".view-clip-btn");


    playButton.addEventListener(
        "click",
        function () {

            openVideoModal(clip);

        }
    );


    viewButton.addEventListener(
        "click",
        function () {

            openVideoModal(clip);

        }
    );


    return card;

}


/* =========================================
   OPEN VIDEO MODAL
========================================= */

function openVideoModal(
    clip
) {

    const camera =
        clip.camera ||
        clip.camera_id ||
        "Unknown Camera";


    const area =
        clip.area ||
        clip.area_name ||
        "Unknown Area";


    const type =
        clip.type ||
        clip.event_type ||
        "Unusual Event";


    const severity =
        clip.severity ||
        "Medium";


    const videoUrl =
        clip.video_url ||
        clip.video ||
        clip.clip_url ||
        "";


    videoModalTitle.textContent =
        type;


    videoArea.textContent =
        area;


    videoCamera.textContent =
        camera;


    videoType.textContent =
        type;


    videoSeverity.textContent =
        severity.toUpperCase();


    videoTimestamp.textContent =
        formatDate(
            clip.timestamp
        );


    /*
       If a video exists,
       load it into the player.
    */

    if (videoUrl) {

        clipVideo.src =
            videoUrl;

        clipVideo.style.display =
            "block";

        videoPlaceholder.classList.remove(
            "show"
        );

        clipVideo.load();

    }

    else {

        clipVideo.pause();

        clipVideo.removeAttribute(
            "src"
        );

        clipVideo.load();

        clipVideo.style.display =
            "none";

        videoPlaceholder.classList.add(
            "show"
        );

    }


    videoModal.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================
   CLOSE VIDEO MODAL
========================================= */

function closeVideoModal() {

    videoModal.classList.remove(
        "show"
    );


    clipVideo.pause();

    clipVideo.removeAttribute(
        "src"
    );


    document.body.style.overflow =
        "";

}


closeVideo.addEventListener(
    "click",
    closeVideoModal
);


videoModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            videoModal
        ) {

            closeVideoModal();

        }

    }
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeVideoModal();

            notificationPanel.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================
   VIDEO ERROR HANDLING
========================================= */

clipVideo.addEventListener(
    "error",
    function () {

        clipVideo.style.display =
            "none";

        videoPlaceholder.classList.add(
            "show"
        );

    }
);


/* =========================================
   FILTER EVENTS
========================================= */

severityFilter.addEventListener(
    "change",
    applyFilters
);


areaFilter.addEventListener(
    "change",
    applyFilters
);


/* =========================================
   REFRESH
========================================= */

refreshClips.addEventListener(
    "click",
    async function () {

        refreshClips.disabled =
            true;


        refreshClips.textContent =
            "↻ LOADING";


        await fetchUnusualClips();


        refreshClips.disabled =
            false;


        refreshClips.textContent =
            "↻ REFRESH";

    }
);


/* =========================================
   DATE FORMATTING
========================================= */

function formatDate(
    timestamp
) {

    if (!timestamp) {
        return "Unknown time";
    }


    const date =
        new Date(timestamp);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return String(timestamp);

    }


    return date.toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }
    );

}


/* =========================================
   HTML SAFETY
========================================= */

function escapeHTML(
    value
) {

    return String(value ?? "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function escapeAttribute(
    value
) {

    return escapeHTML(value);

}


/* =========================================
   START
========================================= */

fetchUnusualClips();
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