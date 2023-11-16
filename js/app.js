//
let containerSearch = document.querySelector('.container__search');
let containerSearchUsername = document.querySelector('.container__search-username');
let userNameInput = document.querySelector('.username-input');
let userNameBtn = document.querySelector('.container__search-username-button');
let titleMode = document.querySelector('.container__search-title-mode');
let titleModeSpan = document.querySelector('.container__search-title-mode > span');
let titleModeImg = document.querySelector('.container__search-title-mode > img');
let error = document.querySelector(".errormessage");
let root = document.querySelector(':root');

let containerInfo = document.querySelector('.container__info');
let containerInfoBioUser = document.querySelector('.container__info-bio-username');

let userName = document.querySelector('.container__info > .container__info-bio > .container__info-bio-username > h3');
let userNameMain = document.querySelector('.container__info > .container__info-bio > .container__info-bio-username > p:nth-child(2)');
let userNameBio = document.querySelector('.container__info > .container__info-bio > .container__info-bio-username > p:nth-child(3)');
let avatarUrl = document.querySelector('.container__info > .container__info-bio > .container__info-bio-img > img');
let containerInfoDate = document.querySelector('.container__info > .container__info-bio > .container__info-bio-date > p');

function getUserData(user) {
    fetch(`https://api.github.com/users/${user}`)
        .then((Response) => Response.json())
        .then((data) => {
            console.log(data);
            const { avatar_url, name, login, bio, created_at } = data;
            userName.innerHTML = name;
            userNameMain.innerHTML = login;
            userNameBio.innerHTML = bio.substring(0, 29).concat("..");
            avatarUrl.src = avatar_url;
            containerInfoDate.innerHTML = created_at.substring(0, 10).concat(".");
        });
}

userNameInput.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        console.log(userNameInput.value);
        getUserData(userNameInput.value);
    }

});

userNameBtn.addEventListener('click', (e) => {

    if (userNameInput.value.trim() === "" || userNameInput.value == null) {
        error.textContent = 'No results';
        e.preventDefault();
    }
    else {
        getUserData(userNameInput.value);
        error.textContent = '';

    }
})

titleMode.addEventListener('click', (e) => {
    titleMode.classList.toggle('active'); 
    if (titleMode.classList.contains('active')) {
        localStorage.setItem('theme', 'dark');
        root.style.setProperty("--background-main", "#F6F8FF");
        root.style.setProperty("--color-text-title", "#222731");
        root.style.setProperty("--color-mode", "#697C9A");
        root.style.setProperty("--white-bg", "#FEFEFE");
        root.style.setProperty("--white-text", "#FFF");
        root.style.setProperty("--btn-bg", "#0079FF");
        root.style.setProperty("--color-text-name", "#2B3442");
        root.style.setProperty("--color-bio", "#4B6A9B");
        root.style.setProperty("--color-error", "#F74646");
        titleModeSpan.textContent = "DARK";
        titleModeImg.src = "./assets/icons/moon.svg";
    }
    else { 
        localStorage.removeItem('theme');
        titleModeSpan.textContent = "LIGHT";
        titleModeImg.src = "./assets/icons/002-sun-light.svg";
        root.style.setProperty('--background-main', '#141D2F');
        root.style.setProperty("--color-text-title", "#FFF");
        root.style.setProperty("--color-mode", "#FFF");
        root.style.setProperty("--white-bg", "#1E2A47");
        root.style.setProperty("--white-text", "#FFF");
        root.style.setProperty("--btn-bg", "#0079FF");
        root.style.setProperty("--color-text-name", "#FFF");
        root.style.setProperty("--color-bio", "#FFF");
        root.style.setProperty("--color-error", "#F74646");
    }
});


