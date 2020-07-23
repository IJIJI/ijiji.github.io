
const toggleSwitch = document.querySelector('.darkModeSwitch input[type="checkbox"]');
// const toggleSwitch2 = document.querySelector('.mobDarkModeSwitch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme == 'dark') {
        toggleSwitch.checked = true;
        // toggleSwitch2.checked = true;
    }
}else{
  
  document.documentElement.setAttribute('data-theme', "dark");
  toggleSwitch.checked = true;
  // toggleSwitch2.checked = true;
  
}

function switchTheme(e) {
  if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', "dark");
      localStorage.setItem('theme', "dark"); //add this
  }
  else {
      document.documentElement.setAttribute('data-theme', "light");
      localStorage.setItem('theme', "light"); //add this
  }    
}

toggleSwitch.addEventListener('change', switchTheme, false);
// toggleSwitch2.addEventListener('change', switchTheme, false);
