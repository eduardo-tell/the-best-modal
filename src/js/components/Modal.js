/**
 * ------------------------------------------------------------------------
 * Definicao da Classe
 * ------------------------------------------------------------------------
*/

class Modal {

	/**
	 * ------------------------------------------------------------------------
	 * Variaveis
	 * ------------------------------------------------------------------------
	*/

	constructor(alvo) {
		this.modal = document.querySelectorAll('#' + alvo)[0];
		this.main = document.getElementsByTagName('main')[0];
	}


	abre(data) {

		// Verifica se ja esta aberto
		if (this.modal.classList.contains('aberto')) {

			console.log('Ops! Isto não foi desenvolvido!');

			// // Remove conteudo exibido
			// this.removeConteudo()

			// // Requisita novo conteudo
			// this.requisicao(data)

		} else {
			// Verifica se conteudo já existe
			if (this.conteudoModal(data)) {

				// Adiciona desfoquer e escurecimento ao conteudo
				this.desfoque()

				// Exibe modal
				this.modal.classList.add('aberto')
			}
		}
	}

	fecha() {
		console.log('Inicia: fecha');

		this.desfoque()
		this.modal.classList.remove('aberto')
	}

	removeConteudo() {
		console.log('Inicia: remove conteudo');

		document.querySelector('#' + this.modal + '> div').remove()
	}

	desfoque() {
		console.log('Inicia: desfoque');

		this.main.classList.toggle('blur')
	}

	conteudoModal(conteudoEscolhido) {

		if (conteudoExiste(conteudoEscolhido)) {
			return true
		} else {
			// Requisita conteudo
			this.requisicao(conteudoEscolhido, this)

			// Monta botao de fechar
			montaBotaoFechar(this)
		}

		// Verifica se conteudo existe
		function conteudoExiste(conteudoEscolhido) {
			return document.querySelectorAll('.' + conteudoEscolhido).length != 0
		}

		function montaBotaoFechar(alvo) {
			// Monta botão fechar
			var botaoFechar = document.createElement('button');
			botaoFechar.innerHTML = '<i class="">x</i>'
			botaoFechar.classList.add('fecha-modal')
			alvo.modal.appendChild(botaoFechar)

			// Adiciona funcionalidade ao botao
			const botoesFechar = document.querySelectorAll('.fecha-modal');
			botoesFechar.forEach(botao => botao.addEventListener('click', el => {
				alvo.fecha()
			}))

			return botaoFechar
		}
	}

	requisicao(data, alvo) {
		console.log('Inicia: requisicao');

		var modal = this.modal;
		var url = ''
		const httpRequest = new XMLHttpRequest();
		requisita();

		function requisita() {
			console.log('Inicia: requisita');

			if (!httpRequest) {
				alert('Giving up :( Cannot create an XMLHTTP instance');
				return false;
			}

			url = 'modal/' + data + '.html'
			httpRequest.open('GET', url);
			httpRequest.send();
			httpRequest.onreadystatechange = aplicaConteudo();
		}

		function aplicaConteudo() {
			console.log('Inicia: aplica conteudo');

			var modalContent = document.createElement('div');

			setTimeout(() => {
				if (httpRequest.readyState === XMLHttpRequest.DONE) {
					if (httpRequest.status === 200) {
						modalContent.innerHTML = httpRequest.responseText;
						modal.appendChild(modalContent.firstChild);

						alvo.abre(data)
					} else {
						alert('There was a problem with the request.');
					}
				}
			}, 500);
		}
	}
}
