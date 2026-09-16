
const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const officerName =
            document.getElementById("officerName")
                .value
                .trim();


        const militaryUID =
            document.getElementById("militaryUID")
                .value
                .trim();


        const officerRank =
            document.getElementById("officerRank")
                .value
                .trim();


        const password =
            document.getElementById("password")
                .value
                .trim();


        if (officerName === "") {

            alert(
                "Please enter your Officer Name."
            );

            return;

        }


        if (militaryUID === "") {

            alert(
                "Please enter your Military UID."
            );

            return;

        }


        if (officerRank === "") {

            alert(
                "Please enter your Rank."
            );

            return;

        }


        if (password === "") {

            alert(
                "Please enter your Special Access Password."
            );

            return;

        }


        localStorage.setItem(
            "officerName",
            officerName
        );


        localStorage.setItem(
            "militaryUID",
            militaryUID
        );


        localStorage.setItem(
            "officerRank",
            officerRank
        );


        localStorage.removeItem(
            "managementAuthorized"
        );


        localStorage.setItem(
            "authToken",
            "frontend-session"
        );


        showProfilePopup();

    }
);


function showProfilePopup() {

    const popup =
        document.createElement("div");


    popup.className =
        "profile-popup";


    popup.innerHTML = `

        <div class="profile-popup-box">

            <h2>Set Your Profile Image</h2>

            <p>
                Add a profile photo for your officer account.
            </p>

            <div class="profile-preview">

                <span>👤</span>

            </div>

            <input
                type="file"
                id="profileImageInput"
                accept="image/*"
            >

            <div class="popup-buttons">

                <button id="skipProfile">
                    SKIP
                </button>

                <button id="continueProfile">
                    CONTINUE
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(popup);


    const imageInput =
        document.getElementById(
            "profileImageInput"
        );


    const preview =
        document.querySelector(
            ".profile-preview"
        );


    imageInput.addEventListener(
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

                    preview.innerHTML = `

                        <img
                            src="${event.target.result}"
                            alt="Profile"
                        >

                    `;


                    localStorage.setItem(
                        "profileImage",
                        event.target.result
                    );

                };


            reader.readAsDataURL(file);

        }
    );


    document
        .getElementById("skipProfile")
        .addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "profileImage"
                );


                window.location.href =
                    "DASHBOARD.html";

            }
        );


    document
        .getElementById("continueProfile")
        .addEventListener(
            "click",
            function () {

                window.location.href =
                    "DASHBOARD.html";

            }
        );

}
