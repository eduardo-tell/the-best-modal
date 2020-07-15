/**
 * ------------------------------------------------------------------------
 * Variaveis
 * ------------------------------------------------------------------------
 */

const main = document.getElementsByTagName('main')[0];
const conteudo = '';
const tipoDeConteudo = '';

/**
 * ------------------------------------------------------------------------
 * Definicao da Classe
 * ------------------------------------------------------------------------
 */

class Modal {

	abre (data) {
		// this.desfoque()
		this.requisicao(data)

		this.conteudo = document.querySelectorAll('#' + data)[0]
		this.conteudo.classList.add('abre')
	}

	fecha () {
		this.desfoque()

		this.conteudo = document.querySelectorAll('#modal > section')[0];
		this.conteudo.classList.add('abre')
	}

	desfoque () {
		this.main.classList.toggle('blur')
	}

	requisicao (data) {
		var url = ''
		const httpRequest = new XMLHttpRequest();
		var alvo = document.getElementById("modal")
		document.getElementById("ajaxButton").addEventListener('click', makeRequest());
		
	
		function makeRequest() {			
			console.log('Inicia make request');

			if (!httpRequest) {
				alert('Giving up :( Cannot create an XMLHTTP instance');
				return false;
			}
			url = 'modal/' + data + '.html'
			httpRequest.open('GET', url);
			httpRequest.send();
			httpRequest.onreadystatechange = alertContents();
		}
	
		function alertContents () {
			console.log('Inicia alert contents');
			var modalContent = document.createElement('div');

			setTimeout(() => {
				if (httpRequest.readyState === XMLHttpRequest.DONE) {
					if (httpRequest.status === 200) {
						modalContent.innerHTML = httpRequest.responseText;
						alvo.appendChild(modalContent.firstChild);
					} else {
						alert('There was a problem with the request.');
					}
				}
			}, 500);
		}
	}
}
