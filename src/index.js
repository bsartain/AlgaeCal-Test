// import {ProductBundles} from "./modules/ProductBundles";
import './styles/main.scss';
import loadSVGs from './modules/svg-replace';
import 'popper.js';
import 'bootstrap';
// import { createSecureContext } from 'tls';

document.addEventListener('DOMContentLoaded', () => {
  
  loadSVGs();

  const api = fetch('https://www.algaecal.com/wp-json/acf/v3/options/options').then((res) => {
	  return res.json()
  });

  removeZeroPercentDiscountBubble()
  setCopyForGuaranteeModal(api)
  showHideSpeakToCustomerService(api)

});


const removeZeroPercentDiscountBubble = () => {
  const discountPercentageBubbles = document.querySelectorAll('[data-original-savings]')

  discountPercentageBubbles.forEach((bubble) => {
    const bubbleValue = bubble.attributes[1].value
    if(bubbleValue < 1){
      bubble.parentNode.parentNode.style = 'display:none'
    }
  })
}

const setCopyForGuaranteeModal = (api) => {
  const guaranteeModalTitle = document.querySelector('#guaranteeTitle');
  const guaranteeModalBody = document.querySelector('#guaranteeBody');
  api.then((res) => {
    const object = res.acf;
    
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        if(key === '7yr_full_copy'){
          guaranteeModalBody.innerHTML += object[key];
        }
        if(key === '7yr_title'){
          guaranteeModalTitle.innerHTML += object[key];
        }
      }
    }
  })

}

const padNumber = (number) => {
  return (number.toString().length < 2) ? ("0" + number) : number;
}

const showHideSpeakToCustomerService = (api) => {
  const date = new Date()
  let todaysOfficeHours
  let currentDay
  
  const speakToOurSpecialistsMarquee = document.querySelector('.speak-to-our-bone-specialists')
  const pacificTimeZoneDate = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
  
  const pacificTimeZoneHours = pacificTimeZoneDate.getHours()
  const pacificTimeZoneMinutes = pacificTimeZoneDate.getMinutes()
  
  const formatPacificTimeZoneHours = padNumber(pacificTimeZoneHours)
  const formatPacificTimeZoneMinutes = padNumber(pacificTimeZoneMinutes)
  
  const currentTime = `${formatPacificTimeZoneHours}${formatPacificTimeZoneMinutes}`
  console.log('CURRENT', currentTime)

  api.then((res) => {
    
    if(date.getDay() === 0){
      currentDay = date.getDay() + 7
    } else {
      currentDay = date.getDay()
    }

    res.acf.office_hours.forEach(hour => {
      if(parseInt(hour.day) === currentDay){
        todaysOfficeHours = hour 
        if(currentTime >= todaysOfficeHours.starting_time && currentTime <= todaysOfficeHours.closing_time){
          console.log('WE ARE OPEN FOR BUSINESS', currentTime)
          speakToOurSpecialistsMarquee.classList.remove('d-none')
          speakToOurSpecialistsMarquee.classList.add('d-md-block')
        } else {
          console.log('WE ARE CLOSED', currentTime)
          speakToOurSpecialistsMarquee.classList.remove('d-md-block')
          speakToOurSpecialistsMarquee.classList.add('d-none')
        }
      }
    });

  })
}


const wistiaVideoContainer = document.querySelector('#play-button-overlay-zwflowymel')
const videoOverlay = document.querySelector('.play-button-overlay')
wistiaVideoContainer.addEventListener('click', function(){

  window._wq = window._wq || [];
  _wq.push({ id: 'zwflowymel', onReady: function(video) {
    videoOverlay.setAttribute("style", "z-index: 0");
    if (video.state() === "playing") {
      video.pause();
    } else {
      video.play();
    }
  }});

})
