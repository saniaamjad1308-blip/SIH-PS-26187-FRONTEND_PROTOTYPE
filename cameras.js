/* =====================================================
   SURAKSHANETRA
   CAMERA MONITORING JAVASCRIPT
===================================================== */


/* =====================================================
   DEFAULT AVATAR
===================================================== */

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
                fill="#30382c"/>

            <circle
                cx="100"
                cy="72"
                r="38"
                fill="#d7dbd2"/>

            <path
                d="M35 180
                   C38 137 65 110 100 110
                   C135 110 162 137 165 180 Z"
                fill="#d7dbd2"/>

        </svg>
    `);


/* =====================================================
   ELEMENTS
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const sideNav =
    document.getElementById("sideNav");

const mainContent =
    document.getElementById("mainContent");


const cameraGrid =
    document.getElementById("cameraGrid");


const areaFilter =
    document.getElementById("areaFilter");

const statusFilter =
    document.getElementById("statusFilter");


const totalCameras =
    document.getElementById("totalCameras");

const onlineCameras =
    document.getElementById("onlineCameras");

const offlineCameras =
    document.getElementById("offlineCameras");


/* =====================================================
   PROFILE
===================================================== */

const officerName =
    localStorage.getItem("officerName") || "Officer";

const officerRank =
    localStorage.getItem("officerRank") || "COMMAND";

const profileImage =
    localStorage.getItem("profileImage") || DEFAULT_AVATAR;


document.getElementById("officerName").textContent =
    officerName;

document.getElementById("officerRank").textContent =
    officerRank;

document.getElementById("profileAvatar").src =
    profileImage;


/* =====================================================
   DEFAULT AREAS
===================================================== */

const defaultAreas = [

    {
        id: 1,
        name: "Sector Alpha",
        description: "Northern perimeter"
    },

    {
        id: 2,
        name: "Sector Bravo",
        description: "Eastern perimeter"
    },

    {
        id: 3,
        name: "Sector Charlie",
        description: "Western perimeter"
    },

    {
        id: 4,
        name: "Sector Delta",
        description: "Southern perimeter"
    },

    {
        id: 5,
        name: "Sector Echo",
        description: "Forward observation zone"
    },

    {
        id: 6,
        name: "Sector Foxtrot",
        description: "Restricted surveillance zone"
    }

];


/* =====================================================
   DEFAULT CAMERAS
===================================================== */

const defaultCameras = [

    {
        id: "CAM-01",
        name: "North Perimeter",
        area: "Sector Alpha",
        location: "Northern Border Gate",
        status: "online",
        image:
            "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80"
    },

    {
        id: "CAM-02",
        name: "Forest Perimeter",
        area: "Sector Alpha",
        location: "Forest Observation Point",
        status: "online",
        image:
            "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80"
    },

    {
        id: "CAM-03",
        name: "Secure Facility",
        area: "Sector Bravo",
        location: "Facility Entrance",
        status: "online",
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80"
    },

    {
        id: "CAM-04",
        name: "Night Perimeter",
        area: "Sector Charlie",
        location: "Night Observation Zone",
        status: "online",
        image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80"
    },

    {
        id: "CAM-05",
        name: "Border Road",
        area: "Sector Delta",
        location: "Patrol Road",
        status: "online",
        image:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80"
    },

    {
        id: "CAM-06",
        name: "Underground Passage",
        area: "Sector Echo",
        location: "Restricted Passage",
        status: "online",
        image:
            "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1000&q=80"
    }

];


/* =====================================================
   LOAD DATA
===================================================== */

let areas =
    JSON.parse(
        localStorage.getItem("surakshaAreas")
    ) || defaultAreas;


let cameras =
    JSON.parse(
        localStorage.getItem("surakshaCameras")
    ) || defaultCameras;


/* =====================================================
   SAVE DATA
===================================================== */

function saveData() {

    localStorage.setItem(
        "surakshaAreas",
        JSON.stringify(areas)
    );


    localStorage.setItem(
        "surakshaCameras",
        JSON.stringify(cameras)
    );

}


/* =====================================================
   MENU
===================================================== */

if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        function () {

            sideNav.classList.toggle("closed");

            mainContent.classList.toggle("expanded");

        }
    );

}


/* =====================================================
   UPDATE AREA FILTER
===================================================== */

function updateAreaFilters() {

    areaFilter.innerHTML = `
        <option value="all">
            All Areas
        </option>
    `;


    const cameraAreaInput =
        document.getElementById("cameraAreaInput");


    if (cameraAreaInput) {

        cameraAreaInput.innerHTML = "";

    }


    areas.forEach(area => {

        areaFilter.innerHTML += `
            <option value="${area.name}">
                ${area.name}
            </option>
        `;


        if (cameraAreaInput) {

            cameraAreaInput.innerHTML += `
                <option value="${area.name}">
                    ${area.name}
                </option>
            `;

        }

    });

}


/* =====================================================
   RENDER CAMERAS
===================================================== */

function renderCameras() {

    cameraGrid.innerHTML = "";


    const selectedArea =
        areaFilter.value;


    const selectedStatus =
        statusFilter.value;


    let filteredCameras =
        cameras.filter(camera => {

            const areaMatch =
                selectedArea === "all" ||
                camera.area === selectedArea;


            const statusMatch =
                selectedStatus === "all" ||
                camera.status === selectedStatus;


            return areaMatch && statusMatch;

        });


    if (filteredCameras.length === 0) {

        cameraGrid.innerHTML = `

            <div class="empty-state">

                <strong>
                    NO CAMERAS FOUND
                </strong>

                <span>
                    No surveillance camera matches the selected filters.
                </span>

            </div>

        `;

        return;

    }


    filteredCameras.forEach(camera => {

        const card =
            document.createElement("div");


        card.className =
            "camera-card " +
            (
                camera.status === "offline"
                    ? "offline"
                    : ""
            );


        const imageHTML =

            camera.image

            ?

            `
            <img
                src="${camera.image}"
                alt="${camera.name}"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            >

            <div
                class="feed-placeholder"
                style="display:none;">

                <div class="feed-placeholder-icon">
                    ◉
                </div>

                <span>
                    CAMERA FEED UNAVAILABLE
                </span>

            </div>
            `

            :

            `
            <div class="feed-placeholder">

                <div class="feed-placeholder-icon">
                    ◉
                </div>

                <span>
                    LIVE CAMERA FEED
                </span>

            </div>
            `;


        card.innerHTML = `

            <div class="camera-feed">

                ${imageHTML}


                <div class="feed-top">

                    <span class="
                        live-badge
                        ${
                            camera.status === "offline"
                                ? "offline"
                                : ""
                        }
                    ">

                        ${
                            camera.status === "online"
                                ? "● LIVE"
                                : "● OFFLINE"
                        }

                    </span>


                    <span class="feed-time">

                        <span class="camera-clock">
                            00:00:00
                        </span>

                    </span>

                </div>

            </div>


            <div class="camera-footer">

                <div class="camera-info">

                    <div class="camera-id">

                        <span class="camera-status-dot">
                        </span>

                        ${camera.id}

                    </div>


                    <div class="camera-name">
                        ${camera.name}
                    </div>

                </div>


                <div class="camera-area">

                    <span>
                        AREA
                    </span>

                    <strong>
                        ${camera.area}
                    </strong>

                </div>

            </div>

        `;


        card.addEventListener(
            "click",
            function () {

                openCameraViewer(camera);

            }
        );


        cameraGrid.appendChild(card);

    });


    updateCameraClock();

}


/* =====================================================
   UPDATE CAMERA COUNTERS
===================================================== */

function updateCounters() {

    const total =
        cameras.length;


    const online =
        cameras.filter(
            camera =>
                camera.status === "online"
        ).length;


    const offline =
        cameras.filter(
            camera =>
                camera.status === "offline"
        ).length;


    totalCameras.textContent =
        total;


    onlineCameras.textContent =
        online;


    offlineCameras.textContent =
        offline;

}


/* =====================================================
   FILTER EVENTS
===================================================== */

areaFilter.addEventListener(
    "change",
    renderCameras
);


statusFilter.addEventListener(
    "change",
    renderCameras
);


/* =====================================================
   CAMERA MODAL
   OPEN BUTTON REMOVED FROM CAMERA PAGE
===================================================== */

const cameraModal =
    document.getElementById("cameraModal");


/* =====================================================
   CLOSE CAMERA MODAL
===================================================== */

const closeCameraModalBtn =
    document.getElementById("closeCameraModal");


if (closeCameraModalBtn) {

    closeCameraModalBtn.addEventListener(
        "click",
        closeCameraModal
    );

}


const cancelCameraBtn =
    document.getElementById("cancelCameraBtn");


if (cancelCameraBtn) {

    cancelCameraBtn.addEventListener(
        "click",
        closeCameraModal
    );

}


function closeCameraModal() {

    if (cameraModal) {

        cameraModal.classList.remove("show");

    }

}


/* =====================================================
   SAVE CAMERA
===================================================== */

const saveCameraBtn =
    document.getElementById("saveCameraBtn");


if (saveCameraBtn) {

    saveCameraBtn.addEventListener(
        "click",
        function () {


            const id =
                document.getElementById(
                    "cameraIdInput"
                ).value.trim();


            const name =
                document.getElementById(
                    "cameraNameInput"
                ).value.trim();


            const area =
                document.getElementById(
                    "cameraAreaInput"
                ).value;


            const location =
                document.getElementById(
                    "cameraLocationInput"
                ).value.trim();


            const image =
                document.getElementById(
                    "cameraImageInput"
                ).value.trim();


            if (
                !id ||
                !name ||
                !area ||
                !location
            ) {

                alert(
                    "Please fill all required camera details."
                );

                return;

            }


            const duplicate =
                cameras.some(
                    camera =>
                        camera.id.toLowerCase() ===
                        id.toLowerCase()
                );


            if (duplicate) {

                alert(
                    "Camera ID already exists."
                );

                return;

            }


            cameras.push({

                id: id,

                name: name,

                area: area,

                location: location,

                status: "online",

                image: image

            });


            saveData();

            updateCounters();

            renderCameras();

            closeCameraModal();

            clearCameraForm();


            addNotification(
                "Camera Added",
                `${id} added to ${area}.`
            );

        }
    );

}


/* =====================================================
   CLEAR CAMERA FORM
===================================================== */

function clearCameraForm() {

    const idInput =
        document.getElementById(
            "cameraIdInput"
        );

    const nameInput =
        document.getElementById(
            "cameraNameInput"
        );

    const locationInput =
        document.getElementById(
            "cameraLocationInput"
        );

    const imageInput =
        document.getElementById(
            "cameraImageInput"
        );


    if (idInput) {

        idInput.value = "";

    }


    if (nameInput) {

        nameInput.value = "";

    }


    if (locationInput) {

        locationInput.value = "";

    }


    if (imageInput) {

        imageInput.value = "";

    }

}


/* =====================================================
   AREA MODAL
   OPEN BUTTON REMOVED FROM CAMERA PAGE
===================================================== */

const areaModal =
    document.getElementById("areaModal");


/* =====================================================
   CLOSE AREA MODAL
===================================================== */

const closeAreaModalBtn =
    document.getElementById("closeAreaModal");


if (closeAreaModalBtn) {

    closeAreaModalBtn.addEventListener(
        "click",
        closeAreaModal
    );

}


const cancelAreaBtn =
    document.getElementById("cancelAreaBtn");


if (cancelAreaBtn) {

    cancelAreaBtn.addEventListener(
        "click",
        closeAreaModal
    );

}


function closeAreaModal() {

    if (areaModal) {

        areaModal.classList.remove("show");

    }

}


/* =====================================================
   SAVE AREA
===================================================== */

const saveAreaBtn =
    document.getElementById("saveAreaBtn");


if (saveAreaBtn) {

    saveAreaBtn.addEventListener(
        "click",
        function () {


            const name =
                document.getElementById(
                    "areaNameInput"
                ).value.trim();


            const description =
                document.getElementById(
                    "areaDescriptionInput"
                ).value.trim();


            if (!name) {

                alert(
                    "Please enter an area name."
                );

                return;

            }


            const exists =
                areas.some(
                    area =>
                        area.name.toLowerCase() ===
                        name.toLowerCase()
                );


            if (exists) {

                alert(
                    "This area already exists."
                );

                return;

            }


            areas.push({

                id:
                    Date.now(),

                name:
                    name,

                description:
                    description ||
                    "Surveillance sector"

            });


            saveData();

            updateAreaFilters();

            closeAreaModal();

            clearAreaForm();


            addNotification(
                "New Area Added",
                `${name} has been added to the surveillance network.`
            );

        }
    );

}


/* =====================================================
   CLEAR AREA FORM
===================================================== */

function clearAreaForm() {

    const nameInput =
        document.getElementById(
            "areaNameInput"
        );


    const descriptionInput =
        document.getElementById(
            "areaDescriptionInput"
        );


    if (nameInput) {

        nameInput.value = "";

    }


    if (descriptionInput) {

        descriptionInput.value = "";

    }

}


/* =====================================================
   CAMERA VIEWER
===================================================== */

const viewerModal =
    document.getElementById(
        "viewerModal"
    );


function openCameraViewer(camera) {


    document.getElementById(
        "viewerTitle"
    ).textContent =
        `${camera.id} — ${camera.name}`;


    document.getElementById(
        "viewerCameraInfo"
    ).textContent =
        `${camera.id} | ${camera.area}`;


    document.getElementById(
        "viewerArea"
    ).textContent =
        camera.area;


    document.getElementById(
        "viewerLocation"
    ).textContent =
        camera.location;


    const viewerImage =
        document.getElementById(
            "viewerImage"
        );


    if (camera.image) {

        viewerImage.src =
            camera.image;

    }


    viewerModal.classList.add("show");

}


/* =====================================================
   CLOSE VIEWER
===================================================== */

const closeViewer =
    document.getElementById(
        "closeViewer"
    );


if (closeViewer) {

    closeViewer.addEventListener(
        "click",
        function () {

            viewerModal.classList.remove(
                "show"
            );

        }
    );

}


/* =====================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
===================================================== */

window.addEventListener(
    "click",
    function (event) {


        if (
            cameraModal &&
            event.target === cameraModal
        ) {

            closeCameraModal();

        }


        if (
            areaModal &&
            event.target === areaModal
        ) {

            closeAreaModal();

        }


        if (
            viewerModal &&
            event.target === viewerModal
        ) {

            viewerModal.classList.remove(
                "show"
            );

        }

    }
);


/* =====================================================
   CLOCK
===================================================== */

function updateCameraClock() {

    const now =
        new Date();


    const time =
        now.toLocaleTimeString(
            [],
            {
                hour12: false
            }
        );


    document
        .querySelectorAll(".camera-clock")
        .forEach(clock => {

            clock.textContent =
                time;

        });


    const viewerTime =
        document.getElementById(
            "viewerTime"
        );


    if (viewerTime) {

        viewerTime.textContent =
            time;

    }

}


setInterval(
    updateCameraClock,
    1000
);


/* =====================================================
   NOTIFICATIONS
===================================================== */

let notifications = [];


const notificationBtn =
    document.getElementById(
        "notificationBtn"
    );


const notificationPanel =
    document.getElementById(
        "notificationPanel"
    );


const notificationCount =
    document.getElementById(
        "notificationCount"
    );


const notificationList =
    document.getElementById(
        "notificationList"
    );


if (notificationBtn) {

    notificationBtn.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            notificationPanel.classList.toggle(
                "show"
            );

        }
    );

}


const clearNotifications =
    document.getElementById(
        "clearNotifications"
    );


if (clearNotifications) {

    clearNotifications.addEventListener(
        "click",
        function () {

            notifications = [];

            renderNotifications();

        }
    );

}


function addNotification(
    title,
    message
) {

    notifications.unshift({

        title: title,

        message: message,

        time:
            new Date().toLocaleTimeString()

    });


    if (notifications.length > 5) {

        notifications.pop();

    }


    renderNotifications();

}


function renderNotifications() {

    if (!notificationCount ||
        !notificationList) {

        return;

    }


    notificationCount.textContent =
        notifications.length;


    if (notifications.length === 0) {

        notificationList.innerHTML = `

            <p class="no-notifications">
                No new notifications
            </p>

        `;

        return;

    }


    notificationList.innerHTML = "";


    notifications.forEach(item => {

        notificationList.innerHTML += `

            <div class="notification-item">

                <strong>
                    ${item.title}
                </strong>

                <span>
                    ${item.message}
                </span>

                <span>
                    ${item.time}
                </span>

            </div>

        `;

    });

}


document.addEventListener(
    "click",
    function () {

        if (notificationPanel) {

            notificationPanel.classList.remove(
                "show"
            );

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

updateAreaFilters();

updateCounters();

renderCameras();

renderNotifications();


/* =====================================================
   ACTIVE SIDEBAR PAGE
===================================================== */

const navItems =
    document.querySelectorAll(
        ".side-nav a.nav-item"
    );


const currentPage =
    window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


navItems.forEach(function (item) {

    const href =
        item.getAttribute("href");


    if (!href) {

        return;

    }


    const itemPage =
        href
            .split("/")
            .pop()
            .toLowerCase();


    item.classList.toggle(
        "active",
        itemPage === currentPage
    );

});


/* =====================================================
   MANAGEMENT NAVIGATION
===================================================== */

const managementNav =
    document.getElementById(
        "managementNav"
    );


if (managementNav) {

    managementNav.addEventListener(
        "click",
        function () {

            window.location.href =
                "management.html";

        }
    );

}