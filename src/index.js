// import {ProductBundles} from "./modules/ProductBundles";
import './styles/main.scss';
import loadSVGs from './modules/svg-replace';
import 'popper.js';
import 'bootstrap';

document.addEventListener('DOMContentLoaded', () => {
  loadSVGs();
});

const wistiaVideoContainer = document.querySelector('#play-button-overlay-zwflowymel')
const videoOverlay = document.querySelector('.play-button-overlay')
wistiaVideoContainer.addEventListener('click', function(){

  window._wq = window._wq || [];
  _wq.push({ id: 'zwflowymel', onReady: function(video) {
    videoOverlay.setAttribute("style", "z-index: 0");
    console.log('VIDEO STATE', video.state())
    if (video.state() === "playing") {
      video.pause();
    } else if(video.state() === "pause" || video.state() === "beforePlay") {
      video.play();
    }
  }});

})