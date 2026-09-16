function getStoredValue(key, fallback = "") {

    const value = localStorage.getItem(key);

    return value && value.trim() !== ""
        ? value
        : fallback;
}


let officerName =
    getStoredValue(
        "officerName",
        "Officer"
    );

let officerUID =
    getStoredValue(
        "militaryUID",
        "NOT AVAILABLE"
    );

let officerRank =
    getStoredValue(
        "officerRank",
        "Officer"
    );

let profileImage =
    getStoredValue(
        "profileImage",
        ""
    );


const profileAvatar =
    document.getElementById(
        "profileAvatar"
    );

const settingsProfileImage =
    document.getElementById(
        "settingsProfileImage"
    );

const nameDisplay =
    document.getElementById(
        "nameDisplay"
    );

const rankDisplay =
    document.getElementById(
        "rankDisplay"
    );

const uidDisplay =
    document.getElementById(
        "uidDisplay"
    );

const sessionOfficerName =
    document.getElementById(
        "sessionOfficerName"
    );

const sessionUid =
    document.getElementById(
        "sessionUid"
    );


if (nameDisplay) {

    nameDisplay.textContent =
        officerName;

}


if (rankDisplay) {

    rankDisplay.textContent =
        officerRank;

}


if (uidDisplay) {

    uidDisplay.textContent =
        officerUID;

}


if (sessionOfficerName) {

    sessionOfficerName.textContent =
        officerName;

}


if (sessionUid) {

    sessionUid.textContent =
        "UID: " + officerUID;

}


if (
    profileImage &&
    profileAvatar
) {

    profileAvatar.src =
        profileImage;

}


if (
    profileImage &&
    settingsProfileImage
) {

    settingsProfileImage.src =
        profileImage;

}


const changePictureBtn =
    document.getElementById(
        "changePictureBtn"
    );

const profilePictureInput =
    document.getElementById(
        "profilePictureInput"
    );


if (
    changePictureBtn &&
    profilePictureInput
) {

    changePictureBtn.addEventListener(
        "click",
        function () {

            profilePictureInput.click();

        }
    );


    profilePictureInput.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];

            if (!file) {

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    const imageData =
                        event.target.result;


                    localStorage.setItem(
                        "profileImage",
                        imageData
                    );


                    profileImage =
                        imageData;


                    if (settingsProfileImage) {

                        settingsProfileImage.src =
                            imageData;

                    }


                    if (profileAvatar) {

                        profileAvatar.src =
                            imageData;

                    }

                };


            reader.readAsDataURL(file);

        }
    );

}


const editNameBtn =
    document.getElementById(
        "editNameBtn"
    );

const nameModal =
    document.getElementById(
        "nameModal"
    );

const nameInput =
    document.getElementById(
        "nameInput"
    );

const cancelNameBtn =
    document.getElementById(
        "cancelNameBtn"
    );

const saveNameBtn =
    document.getElementById(
        "saveNameBtn"
    );


if (editNameBtn) {

    editNameBtn.addEventListener(
        "click",
        function () {

            if (nameInput) {

                nameInput.value =
                    officerName;

            }

            if (nameModal) {

                nameModal.style.display =
                    "flex";

            }

        }
    );

}


if (cancelNameBtn) {

    cancelNameBtn.addEventListener(
        "click",
        function () {

            if (nameModal) {

                nameModal.style.display =
                    "none";

            }

        }
    );

}


if (saveNameBtn) {

    saveNameBtn.addEventListener(
        "click",
        function () {

            const newName =
                nameInput
                    ? nameInput.value.trim()
                    : "";

            if (newName === "") {

                alert(
                    "Please enter an officer name."
                );

                return;

            }


            localStorage.setItem(
                "officerName",
                newName
            );


            officerName =
                newName;


            if (nameDisplay) {

                nameDisplay.textContent =
                    newName;

            }


            if (sessionOfficerName) {

                sessionOfficerName.textContent =
                    newName;

            }


            if (nameModal) {

                nameModal.style.display =
                    "none";

            }

        }
    );

}


const editRankBtn =
    document.getElementById(
        "editRankBtn"
    );

const rankModal =
    document.getElementById(
        "rankModal"
    );

const rankInput =
    document.getElementById(
        "rankInput"
    );

const cancelRankBtn =
    document.getElementById(
        "cancelRankBtn"
    );

const saveRankBtn =
    document.getElementById(
        "saveRankBtn"
    );


if (editRankBtn) {

    editRankBtn.addEventListener(
        "click",
        function () {

            if (rankInput) {

                rankInput.value =
                    officerRank;

            }

            if (rankModal) {

                rankModal.style.display =
                    "flex";

            }

        }
    );

}


if (cancelRankBtn) {

    cancelRankBtn.addEventListener(
        "click",
        function () {

            if (rankModal) {

                rankModal.style.display =
                    "none";

            }

        }
    );

}


if (saveRankBtn) {

    saveRankBtn.addEventListener(
        "click",
        function () {

            const newRank =
                rankInput
                    ? rankInput.value.trim()
                    : "";

            if (newRank === "") {

                alert(
                    "Please enter an officer rank."
                );

                return;

            }


            localStorage.setItem(
                "officerRank",
                newRank
            );


            officerRank =
                newRank;


            if (rankDisplay) {

                rankDisplay.textContent =
                    newRank;

            }


            const navbarRank =
                document.getElementById(
                    "dashboardOfficerRank"
                );

            if (navbarRank) {

                navbarRank.textContent =
                    newRank;

            }


            if (rankModal) {

                rankModal.style.display =
                    "none";

            }

        }
    );

}


const changePasswordBtn =
    document.getElementById(
        "changePasswordBtn"
    );

const passwordModal =
    document.getElementById(
        "passwordModal"
    );

const cancelPasswordBtn =
    document.getElementById(
        "cancelPasswordBtn"
    );

const savePasswordBtn =
    document.getElementById(
        "savePasswordBtn"
    );

const currentPassword =
    document.getElementById(
        "currentPassword"
    );

const newPassword =
    document.getElementById(
        "newPassword"
    );

const confirmPassword =
    document.getElementById(
        "confirmPassword"
    );

const passwordMessage =
    document.getElementById(
        "passwordMessage"
    );


if (changePasswordBtn) {

    changePasswordBtn.addEventListener(
        "click",
        function () {

            if (passwordModal) {

                passwordModal.style.display =
                    "flex";

            }

        }
    );

}


if (cancelPasswordBtn) {

    cancelPasswordBtn.addEventListener(
        "click",
        function () {

            if (passwordModal) {

                passwordModal.style.display =
                    "none";

            }

        }
    );

}


if (savePasswordBtn) {

    savePasswordBtn.addEventListener(
        "click",
        function () {

            const current =
                currentPassword
                    ? currentPassword.value.trim()
                    : "";

            const newPass =
                newPassword
                    ? newPassword.value.trim()
                    : "";

            const confirm =
                confirmPassword
                    ? confirmPassword.value.trim()
                    : "";


            if (
                current === "" ||
                newPass === "" ||
                confirm === ""
            ) {

                if (passwordMessage) {

                    passwordMessage.textContent =
                        "Please fill all password fields.";

                }

                return;

            }


            if (newPass !== confirm) {

                if (passwordMessage) {

                    passwordMessage.textContent =
                        "New passwords do not match.";

                }

                return;

            }


            localStorage.setItem(
                "accountPassword",
                newPass
            );


            if (passwordMessage) {

                passwordMessage.textContent =
                    "Password updated successfully.";

            }


            if (currentPassword) {

                currentPassword.value =
                    "";

            }

            if (newPassword) {

                newPassword.value =
                    "";

            }

            if (confirmPassword) {

                confirmPassword.value =
                    "";

            }

        }
    );

}


const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

const logoutModal =
    document.getElementById(
        "logoutModal"
    );

const cancelLogoutBtn =
    document.getElementById(
        "cancelLogoutBtn"
    );

const confirmLogoutBtn =
    document.getElementById(
        "confirmLogoutBtn"
    );


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            if (logoutModal) {

                logoutModal.style.display =
                    "flex";

            }

        }
    );

}


if (cancelLogoutBtn) {

    cancelLogoutBtn.addEventListener(
        "click",
        function () {

            if (logoutModal) {

                logoutModal.style.display =
                    "none";

            }

        }
    );

}


if (confirmLogoutBtn) {

    confirmLogoutBtn.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "officerName"
            );

            localStorage.removeItem(
                "militaryUID"
            );

            localStorage.removeItem(
                "officerRank"
            );

            localStorage.removeItem(
                "profileImage"
            );

            localStorage.removeItem(
                "authToken"
            );

            localStorage.removeItem(
                "managementAuthorized"
            );

            localStorage.removeItem(
                "accountPassword"
            );


            window.location.href =
                "login.html";

        }
    );

}


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


const dashboardNav =
    document.getElementById(
        "dashboardNav"
    );

if (dashboardNav) {

    dashboardNav.addEventListener(
        "click",
        function () {

            window.location.href =
                "DASHBOARD.html";

        }
    );

}


const camerasNav =
    document.getElementById(
        "camerasNav"
    );

if (camerasNav) {

    camerasNav.addEventListener(
        "click",
        function () {

            window.location.href =
                "camera.html";

        }
    );

}


const unusualClipsNav =
    document.getElementById(
        "unusualClipsNav"
    );

if (unusualClipsNav) {

    unusualClipsNav.addEventListener(
        "click",
        function () {

            window.location.href =
                "unusual-clips.html";

        }
    );

}


const settingsNav =
    document.getElementById(
        "settingsNav"
    );

if (settingsNav) {

    settingsNav.addEventListener(
        "click",
        function () {

            window.location.href =
                "setting.html";

        }
    );

}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        const currentName =
            getStoredValue(
                "officerName",
                "Officer"
            );

        const currentUID =
            getStoredValue(
                "militaryUID",
                "NOT AVAILABLE"
            );

        const currentRank =
            getStoredValue(
                "officerRank",
                "Officer"
            );

        const currentProfileImage =
            getStoredValue(
                "profileImage",
                ""
            );


        const nameElements = [
            document.getElementById(
                "nameDisplay"
            ),
            document.getElementById(
                "sessionOfficerName"
            ),
            document.getElementById(
                "profileName"
            )
        ];


        nameElements.forEach(
            function (element) {

                if (element) {

                    element.textContent =
                        currentName;

                }

            }
        );


        const rankElements = [
            document.getElementById(
                "rankDisplay"
            ),
            document.getElementById(
                "profileRank"
            )
        ];


        rankElements.forEach(
            function (element) {

                if (element) {

                    element.textContent =
                        currentRank;

                }

            }
        );


        const uidElements = [
            document.getElementById(
                "uidDisplay"
            ),
            document.getElementById(
                "profileUID"
            ),
            document.getElementById(
                "sidebarUID"
            )
        ];


        uidElements.forEach(
            function (element) {

                if (element) {

                    element.textContent =
                        currentUID;

                }

            }
        );


        const currentSessionUID =
            document.getElementById(
                "sessionUid"
            );

        if (currentSessionUID) {

            currentSessionUID.textContent =
                "UID: " + currentUID;

        }


        const imageElements = [
            document.getElementById(
                "settingsProfileImage"
            ),
            document.getElementById(
                "profileAvatar"
            ),
            document.getElementById(
                "profileImage"
            ),
            document.getElementById(
                "profilePreview"
            )
        ];


        imageElements.forEach(
            function (element) {

                if (
                    element &&
                    currentProfileImage
                ) {

                    element.src =
                        currentProfileImage;

                }

            }
        );

    }
);
/* =====================================================
   SYSTEM CLOCK
===================================================== */

const systemClock =
    document.getElementById(
        "systemClock"
    );


function updateClock() {

    if (!systemClock) {
        return;
    }


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