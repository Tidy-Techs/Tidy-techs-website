const toggle = document.getElementById('mobile-menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

toggle.addEventListener('click', () => {
  if(mobileNav.style.display==='block'){ 
    mobileNav.style.display='none'; 
  } else { 
    mobileNav.style.display='block'; 
  }
});
