const DEMO_PASSWORD = "admin123";

const passwordModal =
    document.getElementById("passwordModal");

const passwordForm =
    document.getElementById("passwordForm");

const passwordInput =
    document.getElementById("managementPassword");

const passwordError =
    document.getElementById("passwordError");

const closePasswordModal =
    document.getElementById("closePasswordModal");

const managementContent =
    document.getElementById("mainContent");

const managementNav =
    document.getElementById("managementNav");

const profileImage =
    document.getElementById("profileImage");

const officerName =
    document.getElementById("officerName");

const officerRank =
    document.getElementById("officerRank");

const systemClock =
    document.getElementById("systemClock");

const authorizationStatus =
    document.getElementById("authorizationStatus");


function showPasswordModal() {

    if (managementContent) {

        managementContent.style.display =
            "none";

    }

    if (passwordModal) {

        passwordModal.style.display =
            "flex";

    }

    if (passwordInput) {

        passwordInput.value = "";

        setTimeout(
            function () {

                passwordInput.focus();

            },
            100
        );

    }

    if (passwordError) {

        passwordError.textContent = "";

    }

}


function hidePasswordModal() {

    if (passwordModal) {

        passwordModal.style.display =
            "none";

    }

}


function showAccessDenied() {

    if (managementContent) {

        managementContent.style.display =
            "none";

    }

    if (passwordError) {

        passwordError.textContent =
            "ACCESS DENIED";

    }

    if (passwordModal) {

        passwordModal.style.display =
            "flex";

    }

}


function grantManagementAccess() {

    hidePasswordModal();

    if (managementContent) {

        managementContent.style.display =
            "block";

    }

    if (authorizationStatus) {

        authorizationStatus.textContent =
            "AUTHORIZED";

    }

}


if (passwordForm) {

    passwordForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const enteredPassword =
                passwordInput
                    ? passwordInput.value.trim()
                    : "";


            if (enteredPassword === "") {

                showAccessDenied();

                return;

            }


            if (
                enteredPassword ===
                DEMO_PASSWORD
            ) {

                grantManagementAccess();

            } else {

                showAccessDenied();

            }

        }
    );

}


if (closePasswordModal) {

    closePasswordModal.addEventListener(
        "click",
        function () {

            showAccessDenied();

        }
    );

}


if (managementNav) {

    managementNav.addEventListener(
        "click",
        function () {

            showPasswordModal();

        }
    );

}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (managementContent) {

            managementContent.style.display =
                "none";

        }

        showPasswordModal();


        const savedName =
            localStorage.getItem(
                "officerName"
            );


        const savedRank =
            localStorage.getItem(
                "officerRank"
            );


        const savedProfileImage =
            localStorage.getItem(
                "profileImage"
            );


        if (
            officerName &&
            savedName
        ) {

            officerName.textContent =
                savedName.toUpperCase();

        }


        if (
            officerRank &&
            savedRank
        ) {

            officerRank.textContent =
                savedRank.toUpperCase();

        }


        if (
            profileImage &&
            savedProfileImage
        ) {

            profileImage.src =
                savedProfileImage;

        }


        if (systemClock) {

            updateClock();

            setInterval(
                updateClock,
                1000
            );

        }

    }
);


function updateClock() {

    if (!systemClock) {
        return;
    }

    const now =
        new Date();


    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");


    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");


    systemClock.textContent =
        `${hours}:${minutes}:${seconds}`;

}


const addCameraBtn =
    document.getElementById("addCameraBtn");

if (addCameraBtn) {

    addCameraBtn.addEventListener(
        "click",
        function () {

            alert(
                "Add Camera management option selected."
            );

        }
    );

}


const editCameraBtn =
    document.getElementById("editCameraBtn");

if (editCameraBtn) {

    editCameraBtn.addEventListener(
        "click",
        function () {

            alert(
                "Edit Camera management option selected."
            );

        }
    );

}


const deleteCameraBtn =
    document.getElementById("deleteCameraBtn");

if (deleteCameraBtn) {

    deleteCameraBtn.addEventListener(
        "click",
        function () {

            alert(
                "Delete Camera management option selected."
            );

        }
    );

}


const addAreaBtn =
    document.getElementById("addAreaBtn");

if (addAreaBtn) {

    addAreaBtn.addEventListener(
        "click",
        function () {

            alert(
                "Add Area management option selected."
            );

        }
    );

}


const editAreaBtn =
    document.getElementById("editAreaBtn");

if (editAreaBtn) {

    editAreaBtn.addEventListener(
        "click",
        function () {

            alert(
                "Edit Area management option selected."
            );

        }
    );

}


const deleteAreaBtn =
    document.getElementById("deleteAreaBtn");

if (deleteAreaBtn) {

    deleteAreaBtn.addEventListener(
        "click",
        function () {

            alert(
                "Delete Area management option selected."
            );

        }
    );

}


const deleteClipsBtn =
    document.getElementById("deleteClipsBtn");

if (deleteClipsBtn) {

    deleteClipsBtn.addEventListener(
        "click",
        function () {

            alert(
                "Delete Unusual Clips option selected."
            );

        }
    );

}


const authorizeUidBtn =
    document.getElementById("authorizeUidBtn");

if (authorizeUidBtn) {

    authorizeUidBtn.addEventListener(
        "click",
        function () {

            alert(
                "Authorize UID option selected."
            );

        }
    );

}


const revokeUidBtn =
    document.getElementById("revokeUidBtn");

if (revokeUidBtn) {

    revokeUidBtn.addEventListener(
        "click",
        function () {

            alert(
                "Revoke UID option selected."
            );

        }
    );

}