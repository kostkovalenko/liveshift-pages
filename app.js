document.querySelector('.print').addEventListener('click', () => window.print());
const sections = [...document.querySelectorAll('article section')];
const links = [...document.querySelectorAll('.toc a')];
function markSection() {
  const current = [...sections].reverse().find(section => section.getBoundingClientRect().top <= 180) || sections[0];
  links.forEach(link => {
    if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
let pending = false;
window.addEventListener('scroll', () => {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => { markSection(); pending = false; });
}, {passive: true});
document.querySelectorAll('.language a').forEach(link => {
  link.addEventListener('click', () => { if (window.location.hash) link.href += window.location.hash; });
});
markSection();
