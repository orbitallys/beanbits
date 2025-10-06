const TEXT = {
  en: {
    title: "Clipperton Bean Bits Sweepstakes",
    intro: "Bring your legumes! Bring your beans! Bring your BITS! Clipperton Island's seasonal Bean Bits Sweepstakes return this season.\nInscribe your identity and possessions and anticipate, wait, and see if you luck out this year's Clipperton Island Bean Bits Sweepstakes!",
    mailbox: "Mailbox No.",
    alaeses: "Alaeses",
    submit: "Submit",
    copyright: "Clipperton Bean Sweepstakes Foundation © 1000-2021"
  },
  es: {
    title: "Sorteo de Granos Clipperton Bean Bits",
    intro: "¡Trae tus legumbres! ¡Trae tus frijoles! ¡Trae tus BITS! El sorteo estacional de Bean Bits de la Isla Clipperton vuelve esta temporada.\nInscribe tu identidad y tus posesiones y anticipa, espera, y vea si te la suerte con este año el Sorteo de Bean Bits de Clipperton!",
    mailbox: "Número de Buzón",
    alaeses: "Alaeses",
    submit: "Enviar",
    copyright: "Fundación Clipperton Bean Sweepstakes © 1000-2021"
  }
};

function jorTransform(text){
  return text.replace(/a/gi, match => match + 'j')
             .replace(/i/gi, match => match + 'b')
             .replace(/u/gi, match => match + 'or');
}

const siteTitle = document.getElementById('siteTitle');
const introText = document.getElementById('introText');
 mailbox = document.getElementById('mailbox');
 alaeses = document.getElementById('alaeses');
const submitBtn = document.getElementById('submitBtn');
const langSelect = document.getElementById('langSelect');
const eggBean = document.getElementById('eggBean');
const deadPixel = document.getElementById('deadPixel');
const copyrightText = document.getElementById('copyrightText');

function applyLanguage(lang){
  if(lang === 'en'){
    siteTitle.textContent = TEXT.en.title;
    introText.textContent = TEXT.en.intro;
    mailbox.placeholder = TEXT.en.mailbox;
    alaeses.placeholder = TEXT.en.alaeses;
    submitBtn.textContent = TEXT.en.submit;
    copyrightText.textContent = TEXT.en.copyright;
    eggBean.classList.add('hidden');
  } else if(lang === 'es'){
    siteTitle.textContent = TEXT.es.title;
    introText.textContent = TEXT.es.intro;
    mailbox.placeholder = TEXT.es.mailbox;
    alaeses.placeholder = TEXT.es.alaeses;
    submitBtn.textContent = TEXT.es.submit;
    copyrightText.textContent = TEXT.es.copyright;
    eggBean.classList.add('hidden');
  } else if(lang === 'jor'){
    siteTitle.textContent = jorTransform(TEXT.en.title);
    introText.textContent = jorTransform(TEXT.en.intro);
    mailbox.placeholder = jorTransform(TEXT.en.mailbox);
    alaeses.placeholder = jorTransform(TEXT.en.alaeses);
    submitBtn.textContent = jorTransform(TEXT.en.submit);
    copyrightText.textContent = jorTransform(TEXT.en.copyright);
    eggBean.classList.remove('hidden');
    
    eggBean.classList.add('bounce-hover');
  }
}

langSelect.addEventListener('change', (e) => applyLanguage(e.target.value));
applyLanguage('en');


function triggerStrongShake(el){
  el.classList.remove('shake-strong');
  void el.offsetWidth;
  el.classList.add('shake-strong');
  setTimeout(()=> el.classList.remove('shake-strong'), 160);
}

[mailbox, alaeses].forEach(inp => {
  inp.addEventListener('keydown', () => triggerStrongShake(inp));
  inp.addEventListener('blur', () => inp.classList.remove('shake-strong'));
});



const resultArea = document.createElement('div');
resultArea.id = 'submissionResult';
resultArea.setAttribute('aria-live','polite');
resultArea.style.marginTop = '14px';
resultArea.style.minHeight = '60px';
document.querySelector('.entries').appendChild(resultArea);


mailbox.setAttribute('maxlength','5');
mailbox.setAttribute('inputmode','numeric');
alaeses.setAttribute('maxlength','50');

mailbox.addEventListener('input', ()=> {
  mailbox.value = mailbox.value.replace(/\D/g,'').slice(0,5);
});


function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function randElem(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function makeReceipt(){
  const a = String(randInt(1000,9999));
  const b = String(randInt(100,999));
  const syms = ['!','@','#','$','%','&','*'];
  const c = randElem(syms);
  return `${a}-${b}-${c}`;
}

function playRetro(durationSec){
  
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'square';
    o.frequency.setValueAtTime(880, ctx.currentTime);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    o.connect(g); g.connect(ctx.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationSec);
    o.stop(ctx.currentTime + durationSec + 0.02);
  }catch(e){
    
    console.warn('audio not available', e);
  }
}

submitBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  
  const mb = mailbox.value.trim();
  const nm = (alaeses.value || '').trim();
  const beanTaxa = ['Phaseolus vulgaris','Vicia faba','Glycine max','Cicer arietinum','Vigna unguiculata','Lupinus albus','Dolichos lablab'];
  let items = randInt(1,500);
  let taxa = randElem(beanTaxa);
  let receipt = makeReceipt();
  let message = '';
  let special = (mb === '1000' && nm.toLowerCase() === 'arthold');
  let oneMatch = (mb === '1000') ^ (nm.toLowerCase() === 'arthold');
  if(special){
    message = `Thank you for your generosity! Your inventory of x1000 Complicitation has been contributed.`;
  } else {
    
    const verbs = ['has been processed.','was catalogued.','was received.','is now registered.'];
    message = `Thank you for your generosity! Your inventory of x${items} of ${taxa} ${randElem(verbs)}`;
  }
  
  resultArea.innerHTML = '';
  const msgP = document.createElement('div');
  msgP.style.fontFamily = 'monospace';
  msgP.style.whiteSpace = 'pre-wrap';
  msgP.textContent = message;
  resultArea.appendChild(msgP);

  const receiptP = document.createElement('div');
  receiptP.style.marginTop = '8px';
  if (special) {
    const a = document.createElement('a');
    a.href = 'https://www.youtube.com/watch?v=qePUsdTmzuc';
    a.textContent = 'https://www.youtube.com/watch?v=qePUsdTmzuc';
    a.target = '_blank';
    a.className = 'wobble-link';
    a.style.display = 'inline-block';
    receiptP.appendChild(a);
  } else {
    receiptP.textContent = `Bean Profile Dignificating Receipt: ${receipt}`;
  }
  resultArea.appendChild(receiptP);

  
  let baseDuration = 0.35;
  if(oneMatch){
    baseDuration *= 1.2;
  }
  if(special){
    baseDuration = Math.min(baseDuration * 666, 10); 
  }
  playRetro(baseDuration);
});



eggBean.addEventListener('mouseenter', () => eggBean.classList.add('enlarged'));
eggBean.addEventListener('mouseleave', () => eggBean.classList.remove('enlarged'));
eggBean.addEventListener('click', () => window.location.href = 'secret.html');


deadPixel.addEventListener('click', () => window.location.href = 'puzzle.html');
