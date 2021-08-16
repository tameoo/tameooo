const cursor = document.querySelector(".home__typing .cursor"),
  menu = document.querySelector(".menu__wrapper"),
  closeBtn = document.querySelector(".menu__close"),
  menuBtn = document.querySelector(".header__burger"),
  overlay = document.querySelector(".menu__overlay");
let i = 0;
let index = 0;
const txt = ["Frontend developer"];
const speed = 200;
let words = txt[index].split("");

function typeWriter() {
  if (i < txt[index].length) {
    document.querySelector(".home__typing .writer").innerHTML +=
      txt[index].charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    setTimeout(deleteWriter, 1000);
    i = 0;
  }
}

function deleteWriter() {
  if (words.length > 0) {
    words.pop();
    document.querySelector(".home__typing .writer").innerHTML = words.join("");
    setTimeout(deleteWriter, 100);
  } else {
    setTimeout(typeWriter, 1000);
    incrementText();
    words = txt[index].split("");
  }
}

function incrementText() {
  if (index < txt.length) {
    index++;
  }
  if (index == txt.length) {
    index = 0;
  }
}

function cursorOpacity() {
  cursor.classList.toggle("cursor_active-opacity");
}

setTimeout(typeWriter, 600);
setInterval(cursorOpacity, 500);

menuBtn.addEventListener("click", () => {
  openMenu();
});

closeBtn.addEventListener("click", () => {
  closeMenu();
});

function openMenu() {
  menu.style.transform = "translateX(0%)";
  closeBtn.style.transform = "rotate(360deg)";
  overlay.style.display = "block";
}

function closeMenu() {
  menu.style.transform = "translateX(-100%)";
  closeBtn.style.transform = "rotate(-360deg)";
  overlay.style.display = "none";
}

const menuLink = document.querySelectorAll(".menu__link");

menuLink.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

const skillsRate = document.querySelectorAll(".about__skill-number span"),
  skillsRange = document.querySelectorAll(".about__skill-progress"),
  skillBox = document.querySelector(".about__skills");

let number;
let j = 0;
let rate = 0;
const setOfnumber = [];

for (let i = 0; i < skillsRate.length; i++) {
  setOfnumber[i] = skillsRate[i].innerHTML.substring(0, 2);
  skillsRate[i].innerHTML = "0";
}

function setRange() {
  if (j <= setOfnumber[rate]) {
    skillsRange[rate].style.width = `${j}%`;
    skillsRate[rate].innerHTML = j;
    j++;
    setTimeout(setRange, 8);
  } else {
    j = 0;
    rate++;
    setTimeout(setRange, 50);
  }
}

const serviceRange = document.querySelectorAll(".service__pointer"),
  serviceItem = document.querySelectorAll(".service__upper-item"),
  serviceUpperContainer = document.querySelector(".service__upper-container"),
  serviceLowerContainer = document.querySelector(".service__lower-inner");

let pointer = 0;
let point = 0;
const setOfPointer = [];

for (let i = 0; i < serviceRange.length; i++) {
  setOfPointer[i] = serviceRange[i].innerHTML;
  serviceRange[i].innerHTML = " ";
}

function showPointer() {
  if (pointer <= setOfPointer[point]) {
    serviceRange[point].innerHTML = " ";
    serviceRange[point].innerHTML += pointer;
    if (point == 0) {
      pointer++;
    }
    if (point >= 1 && point < 3) {
      pointer += 25;
    }
    if (point == 3) {
      pointer += 250;
    }
    setTimeout(showPointer, 10);
  } else {
    point++;
    pointer = 0;
    if (point < setOfPointer.length) {
      setTimeout(showPointer, 10);
    }
  }
}

if (window.innerWidth < 569) {
  serviceItem.forEach((service) => {
    service.removeAttribute("class");
    service.classList.add("service__upper-item");
  });
}

let service = 0;

function showService() {
  if (service < serviceItem.length) {
    serviceItem[service].style.display = "block";
    service++;
    setTimeout(showService, 200);
  }
}

let togglerForSkill = true;
let togglerForService = true;
let togglerForContainer = true;

window.addEventListener("scroll", () => {
  if (isVisible(skillBox) && togglerForSkill) {
    setRange();
    togglerForSkill = false;
  }

  if (isVisible(serviceUpperContainer) && togglerForService) {
    showService();
    togglerForService = false;
  }

  if (isVisible(serviceLowerContainer) && togglerForContainer) {
    showPointer();
    togglerForContainer = false;
  }
});

function isVisible(element) {
  const { top, bottom } = element.getBoundingClientRect();
  const vHeight = window.innerHeight || document.documentElement.clientHeight;

  return (top > 0 || bottom > 0) && top < vHeight;
}

const form = document.querySelector(".form"),
  formInputs = document.querySelectorAll(".form__input"),
  formTextArea = document.querySelector(".form__textarea"),
  errorName = document.querySelector(".error__text_name"),
  errorEmail = document.querySelector(".error__text_email"),
  errorPhone = document.querySelector(".error__text_phone"),
  modal = document.querySelector(".modal"),
  modalSuccess = document.querySelector(".modal__success"),
  modalWarning = document.querySelector(".modal__warning"),
  modalError = document.querySelector(".modal__error"),
  modalClose = document.querySelector(".modal__close"),
  contactBtn = document.querySelector(".contact__btn span"),
  loadingIcon = document.querySelector(".loading__wrapper");

let checkName, checkEmail, checkPhone;

formInputs.forEach((input) => {
  input.addEventListener("blur", (e) => {
    const value = e.target.value;
    const id = e.target.id;

    switch (id) {
      case "name":
        if (value.length < 2) {
          checkName = false;
          errorName.style.display = "block";
        } else {
          checkName = true;
          errorName.style.display = "none";
        }
        break;
      case "email":
        const regex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!value.match(regex)) {
          checkEmail = false;
          1;
          errorEmail.style.display = "block";
        } else {
          checkEmail = true;
          errorEmail.style.display = "none";
        }
        break;
      case "phone":
        if (isNaN(value) || value.length < 3) {
          checkPhone = false;
          errorPhone.style.display = "block";
        } else {
          checkPhone = true;
          errorPhone.style.display = "none";
        }
        break;
      default:
        break;
    }
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  loadingIcon.classList.remove("loading__hidden");
  contactBtn.classList.add("loading__hidden");

  const emailData = {
    name: e.target["name"].value,
    phone: e.target["phone"].value,
    email: e.target["email"].value,
    message: e.target["message"].value,
  };
  if (checkName && checkEmail && checkPhone) {
    fetch("https://stark-coast-72605.herokuapp.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })
      .then((res) => {
        if (res.status === 200) {
          checkEmail = false;
          checkName = false;
          checkPhone = false;
          e.target.reset();
          onToggleItemClasses(modalSuccess, modalWarning, modalError);
        }

        if (res.status === 404) {
          onToggleItemClasses(modalError, modalSuccess, modalWarning);
        }
      })
      .catch((err) => {
        onToggleItemClasses(modalError, modalSuccess, modalWarning);
      });
  } else {
    onToggleItemClasses(modalWarning, modalSuccess, modalError);
  }
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("modal_open");
});

function onToggleItemClasses(addItem, ...removeItem) {
  loadingIcon.classList.add("loading__hidden");
  contactBtn.classList.remove("loading__hidden");

  removeItem.forEach((item) => {
    item.classList.remove("modal__inner_open");
  });

  modal.classList.add("modal_open");
  addItem.classList.add("modal__inner_open");
}
