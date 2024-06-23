import { API } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { renderPlayingInfo, updateTitle } from "./js/ui.js";

const api = new API(); //class dan bir obje  tanımladık

//form gönderildiği anda api' ye istek at ve gelen cevabı ekrana yazdır
elements.form.addEventListener("submit",(e)=>{
    e.preventDefault();// form gönderildiği anda sayfanın yenilenmesini engelledik
  const query = e.target[0].value; // inputun içerisindeki değere ulaştık.
  

    //inputa girilen değer boş ise fonk burda durdur,return ile bunu sağladık
  if(!query){
    alert("lütfen bir müzik ismi giriniz");
    return;
    
  }
  updateTitle(` ${query} için sonuçlar`);
  api.searchMusic(query);

});

//sayfa yüklendiği anda api ye istek atıp müzikleri getir.
document.addEventListener("DOMContentLoaded",async() => {
    
   await  api.topPopular()

});

const playMusic = (url)=> {
  //müziğin urlsini html aktarma
  elements.audioSource.src=url;
  
  //audio elemtininin müziğin yüklmemesini sağladık
  elements.audio.load();
  //audio elemntinin müziği oynatmasını sağlar.
  elements.audio.play();

}


//listede tıklamalarda çalışır
const handleClick = (e) =>{
 if(e.target.id === "play-btn"){
 const parent =e.target.closest(".card");//parent elementi 3 sefer yazmamız gerekecekti closest en yakın card clasına (ebebeyne)götürdü
 renderPlayingInfo(parent.dataset);
 //müziği çalar 
 playMusic(parent.dataset.url);
 };


  
  
  }
//liste alanındaki tıklamaları izler
document.addEventListener("click",handleClick);

//fotoğrafı döndürür
const animatePhoto = () =>{
  const img = document.querySelector(".info img");

  img.className="animate"
 
};
//img etiketine ekledğimiz animate clasını kaldırır dönmeyi durdur.
const stopAnimation = ()=>{
  const img = document.querySelector(".info img");

  img.classList.remove("animate");
}
//müziği çalma ve durdurma olaylarını izler
elements.audio.addEventListener("play",animatePhoto);
elements.audio.addEventListener("pause",stopAnimation)