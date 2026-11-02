// MOBILE MENU SECTION: open and close the navigation menu on small screens
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});
// Close the mobile menu after a navigation link is selected
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

// BOOKING FORM SECTION: show a second office field when a different return office is selected
const differentOffice = document.getElementById('differentOffice');
const returnLocationWrap = document.getElementById('returnLocationWrap');
differentOffice.addEventListener('change', () => {
  returnLocationWrap.hidden = !differentOffice.checked;
});

// BOOKING FORM SECTION: set sensible default dates (today and three days later)
const today = new Date();
const dateToInput = date => {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};
const pickupDate = document.getElementById('pickupDate');
const returnDate = document.getElementById('returnDate');
pickupDate.min = dateToInput(today);
pickupDate.value = dateToInput(today);
const threeDaysLater = new Date(today);
threeDaysLater.setDate(today.getDate() + 3);
returnDate.min = dateToInput(threeDaysLater);
returnDate.value = dateToInput(threeDaysLater);
pickupDate.addEventListener('change', () => {
  const nextDay = new Date(`${pickupDate.value}T12:00:00`);
  nextDay.setDate(nextDay.getDate() + 1);
  returnDate.min = dateToInput(nextDay);
  if (returnDate.value < returnDate.min) returnDate.value = returnDate.min;
});

// BOOKING FORM SECTION: validate the form and show a demo search confirmation
const bookingForm = document.getElementById('bookingForm');
const formMessage = document.getElementById('formMessage');
bookingForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;
  const place = document.getElementById('pickup').value.trim();
  const age = document.querySelector('input[name="age"]:checked').value;
  formMessage.textContent = `Search details ready for ${place} · Driver age: ${age}. This is a front-end demo.`;
});
bookingForm.addEventListener('reset', () => {
  setTimeout(() => {
    returnLocationWrap.hidden = true;
    formMessage.textContent = '';
    differentOffice.checked = false;
  }, 0);
});

// NEWSLETTER SECTION: check email input and show a demo subscription message
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!newsletterForm.reportValidity()) return;
  document.getElementById('newsletterMessage').textContent = 'Thank you! Your email has been added in this demo.';
  newsletterForm.reset();
});

// HEADER BUTTONS SECTION: simple demonstration messages for language and account buttons
// A real website would connect these controls to language and account services.
document.getElementById('languageBtn').addEventListener('click', () => {
  alert('Language selector demo: English is currently selected.');
});
document.getElementById('accountBtn').addEventListener('click', () => {
  alert('Account sign-in would open here on a complete website.');
});
