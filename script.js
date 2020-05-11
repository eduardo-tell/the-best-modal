(function() {
    var conteudo, alvo, httpRequest;
    
    alvo = document.getElementById("alvo");
    modalContent = document.createElement('div');
    document.getElementById("ajaxButton").addEventListener('click', makeRequest);
  
    function makeRequest() {
      httpRequest = new XMLHttpRequest();
  
      if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
      }
      httpRequest.onreadystatechange = alertContents;
      httpRequest.open('GET', 'modal.html');
      httpRequest.send();
    }

  
    function alertContents() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            modalContent.innerHTML = httpRequest.responseText;
            alvo.appendChild(modalContent.firstChild);
            modal.abre();
        } else {
          alert('There was a problem with the request.');
        }
      }
    }
})();

modal = {
    main: document.querySelector('main'),

    abre: function() {
        moda.desfoque();
    },

    fecha: function() {
        moda.desfoque();
    },

    desfoque: function() {
        main.classList.toggle('blur');
    }
}