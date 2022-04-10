btn = document.querySelector(".j-btn-test");

btn.addEventListener("click", () => {
    alert(`Размеры экрана: ширина = ${window.screen.width}, высота - ${window.screen.height}`);
});