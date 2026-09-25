const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();

document.getElementById('diagnostic-form')?.addEventListener('submit',event=>{
  event.preventDefault();
  const data=new FormData(event.currentTarget);
  const english=document.documentElement.lang==='en';
  const subject=english?`AI assessment request — ${data.get('company')}`:`Demande de diagnostic IA — ${data.get('company')}`;
  const body=(english?[
    `Name: ${data.get('name')}`,
    `Company: ${data.get('company')}`,
    `Email: ${data.get('email')}`,
    `Phone: ${data.get('phone')||'Not provided'}`,
    `Priority: ${data.get('priority')}`,
    '',
    'Process to automate:',
    data.get('need')
  ]:[
    `Nom : ${data.get('name')}`,
    `Entreprise : ${data.get('company')}`,
    `E-mail : ${data.get('email')}`,
    `Téléphone : ${data.get('phone')||'Non renseigné'}`,
    `Priorité : ${data.get('priority')}`,
    '',
    'Processus à automatiser :',
    data.get('need')
  ]).join('\n');
  window.location.href=`mailto:contact@aiworkpay.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
