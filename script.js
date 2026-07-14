
const menu=document.querySelector('.menu');
const nav=document.querySelector('.navlinks');
if(menu){menu.addEventListener('click',()=>nav.classList.toggle('open'));}
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const slider=document.querySelector('#slider');
const before=document.querySelector('#beforeWrap');
if(slider && before){slider.addEventListener('input',e=>before.style.width=e.target.value+'%');}

const form=document.querySelector('#quoteForm');
if(form){
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(form);
  const name=data.get('name')||'there';
  alert(`Thanks, ${name}! This form is ready to connect to QuoteIQ or your business email.`);
 });
}
