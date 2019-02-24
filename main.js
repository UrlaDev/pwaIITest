//Sevice Worker
if('serviceWorker' in navigator){
    console.log('HOLISSSS PUEDES USAR SERVICE WORKER');
navigator.serviceWorker.register('./sw.js')
                      .then(res => console.log('service WorkerNEEWcargado correctamente', res))
                      .catch(error => console.log('service Worker no se ha podido registrar', error))
}else{
    console.log('No se puede')
}


//Scroll suavizado
$(document).ready(function( ){
    $("#menu a").click(function(e){
          e.preventDefault();
          $("html,body").animate( {
              scrollTop: $($(this).attr('href')).offset().top
          })
          return false;
    })
})