// import {ProductBundles} from "./modules/ProductBundles";
import './styles/main.scss';
import loadSVGs from './modules/svg-replace';
import 'popper.js';
import 'bootstrap';

document.addEventListener('DOMContentLoaded', () => {
  
  loadSVGs();

  const discountPercentageBubbles = document.querySelectorAll('[data-original-savings]')

  discountPercentageBubbles.forEach((bubble) => {
    const bubbleValue = bubble.attributes[1].value
    if(bubbleValue < 1){
      bubble.parentNode.parentNode.style = 'display:none'
    }
  })

  const guaranteeModalTitle = document.querySelector('#guaranteeTitle');
  const guaranteeModalBody = document.querySelector('#guaranteeBody');
  
  fetch('https://www.algaecal.com/wp-json/acf/v3/options/options').then((res) => {
	  return res.json()
  }).then((res) => {
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



});

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