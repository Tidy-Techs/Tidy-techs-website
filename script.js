const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const overlay = document.getElementById('overlay');

function hideMenu() {
  mobileNav.classList.remove('show');
  overlay.classList.remove('show');
}

menuBtn.addEventListener('click', () => {
  mobileNav.classList.add('show');
  overlay.classList.add('show');
});

overlay.addEventListener('click', hideMenu);

document.addEventListener('click', function(event){
  if(!mobileNav.contains(event.target) && !menuBtn.contains(event.target)){
    hideMenu();
  }
});
