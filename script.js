const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');}));

if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

// Native POST remains available if JavaScript is disabled or the AJAX request fails.
const diagnosticForm=document.getElementById('diagnostic-form');
diagnosticForm?.addEventListener('submit',async event=>{
  if(!diagnosticForm.reportValidity())return;
  event.preventDefault();
  const english=document.documentElement.lang==='en';
  const status=document.getElementById('form-status');
  const submit=diagnosticForm.querySelector('button[type="submit"]');
  const data=new FormData(diagnosticForm);
  if(data.get('_honey'))return;
  submit.disabled=true;
  if(status)status.textContent=english?'Sending your request…':'Envoi de votre demande…';
  try{
    const response=await fetch('https://formsubmit.co/ajax/contact@aiworkpay.fr',{
      method:'POST',body:data,headers:{Accept:'application/json'}
    });
    const result=await response.json();
    if(!response.ok||result.success===false||result.success==='false')throw new Error('Delivery not confirmed');
    diagnosticForm.reset();
    if(status)status.textContent=english?'Request submitted. If this is the first submission, email activation may be required before delivery.':'Demande transmise. Une activation par e-mail peut être nécessaire avant la première réception.';
  }catch(error){
    if(status)status.textContent=english?'Unable to confirm delivery. Please email contact@aiworkpay.fr directly.':'Envoi non confirmé. Écrivez directement à contact@aiworkpay.fr.';
  }finally{submit.disabled=false;}
});


// Carry the selected offer into the quote form without third-party tracking.
document.querySelectorAll('[data-service]').forEach(link=>{
  link.addEventListener('click',()=>{
    const field=document.getElementById('requested-service');
    if(field){field.value=link.dataset.service;field.dispatchEvent(new Event('change',{bubbles:true}));}
  });
});
