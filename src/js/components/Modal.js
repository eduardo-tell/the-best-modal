class Modal {
	teste () {
		console.log('teste');
	}

	abre (tipoDeConteudo) {
		desfoque()
		requisicao(tipoDeConteudo)

		var conteudo = document.querySelector(tipoDeConteudo)[0];
		conteudo.classList.add('abre')
	}

	fecha () {
		modal.desfoque()

		var conteudo = document.querySelector('#modal > section')[0];
		conteudo.classList.add('abre')
	}

	desfoque () {
		main.classList.toggle('blur')
	}

	requisicao (tipoDeConteudo) {
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
			httpRequest.onreadystatechange = alertContents();
			alvo = 'modal/' + tipoDeConteudo + '.html'
			httpRequest.open('GET', alvo);
			httpRequest.send();
		}
	
		function alertContents () {
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
