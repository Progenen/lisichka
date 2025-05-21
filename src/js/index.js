document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__drop');

    burger.addEventListener("click", () => {
        console.log('click');
        if (burger.classList.contains("is-active")) {
            burger.classList.remove("is-active");
            menu.classList.remove("is-active");
            document.body.style.overflow = "auto";
        } else {
            burger.classList.add("is-active");
            menu.classList.add("is-active");
            document.body.style.overflow = "hidden";
        }
    });

    if (innerWidth <= 768) {
        const headerUi = document.querySelector(".header__ui-links");
        const headerDrop = document.querySelector(".header__drop");

        headerDrop.prepend(headerUi);
    }
})