var modal = {
  main: document.querySelector('main'),

  abre: function(tipoDeConteudo) {
      modal.desfoque()
      modal.requisicao(tipoDeConteudo)

      function mostraConteudo() {
        console.log('Hello');
      }

      var conteudo = document.querySelector(tipoDeConteudo)[0];
      conteudo.classList.add('abre')
  },

  fecha: function() {
      modal.desfoque()

      var conteudo = document.querySelector('#modal > section')[0];
      conteudo.classList.add('abre')
  },

  desfoque: function() {
      main.classList.toggle('blur')
  },

  requisicao: function(tipoDeConteudo) {
    var alvo, httpRequest;
  
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
      alvo = 'modal/' + tipoDeConteudo + '.html'
      httpRequest.open('GET', alvo);
      httpRequest.send();
    }

  
    function alertContents() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            modalContent.innerHTML = httpRequest.responseText;
            alvo.appendChild(modalContent.firstChild);
            modal.abre.mostraConteudo();
        } else {
          alert('There was a problem with the request.');
        }
      }
    }
  }
}