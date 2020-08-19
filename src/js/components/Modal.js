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

	abre = (data) => {

		// Verifica se ja esta aberto
		if (this.modal.classList.contains('aberto')) {

			console.log('Ops! Isto não foi desenvolvido!');

			// // Remove conteudo exibido
			// this.removeConteudo()

			// // Requisita novo conteudo
			// this.requisicao(data)

		} else {
			this.modal.conteudoEscolhido = data
			this.montaModal()
		}
	}

	fecha = () => {

		console.log('Inicia: fecha...');

		this.desfoque()
		this.modal.classList.remove('md-show')
	}

	removeConteudo = () => {

		console.log('Inicia: removeConteudo...');

		document.querySelector('#' + this.modal + '> div').remove()
	}

	desfoque = () => {

		console.log('Inicia: desfoque...');

		this.main.classList.toggle('blur')
	}

	exibeModal = () => {
		// Adiciona desfoquer e escurecimento ao conteudo
		this.desfoque()

		// Exibe modal
		setTimeout(function(){ this.modal.classList.add('md-show') }, 100);
	}

	montaModal = () => {
		const montaBotaoFechar = () => {

			console.log('Inicia: montaBotaoFechar...');

			if (!document.querySelectorAll(".md-overlay").length) {
				const overlay = document.createElement('div');
				overlay.classList.add("md-overlay")
				this.modal.parentNode.insertBefore(overlay, this.modal.nextSibling);
			}

			// Monta botão fechar
			if (!document.querySelectorAll(".fecha-modal").length) {
				var botaoFechar = document.createElement('button');
				botaoFechar.innerHTML = 'Fechar'
				botaoFechar.classList.add('btn', 'fecha-modal')
				this.modal.after(botaoFechar);

				// Adiciona funcionalidade ao botao
				const botoesFechar = document.querySelectorAll('.fecha-modal');

				for (let index = 0; index < botoesFechar.length; index++) {
					const element = botoesFechar[index];
					element.addEventListener('click', () => {
						this.fecha()
					})
				}
			}

			return this.conteudoModal()
		}

		montaBotaoFechar()
	}

	conteudoModal = () => {

		console.log('Inicia: conteudoModal...');

		// Verifica se conteudo existe
		const existeConteudo = () => {

			console.log('Inicia: existeConteudo...');

			if (this.modal.conteudoEscolhido) {
				return document.querySelectorAll('.' + this.modal.conteudoEscolhido).length != 0
			} else {
				return document.querySelectorAll('#modal > div').length != 0
			}
			
		}

		const requisicao = () => {
	
			console.log('Inicia: requisicao...');
	
			var url = ''
			const httpRequest = new XMLHttpRequest();
	
			const aplicaConteudo = () => {
				var contaueod = document.createElement('div');
				contaueod.innerHTML = httpRequest.responseText;
				this.modal.appendChild(contaueod.firstChild);
				this.conteudoModal(this.modal.conteudoEscolhido)
			}

			if (!httpRequest) {
				alert('Giving up :( Cannot create an XMLHTTP instance');
				return false;
			}

			url = 'modal/' + this.modal.conteudoEscolhido + '.html'
			httpRequest.open('GET', url);
			httpRequest.send();

			httpRequest.onreadystatechange = () => {
				if (httpRequest.readyState === XMLHttpRequest.DONE) {
					httpRequest.status === 200 ? aplicaConteudo(this.modal.conteudoEscolhido) : alert('There was a problem with the request.');
				}
			};
	
		}

		if (existeConteudo()) {

			this.exibeModal()

		} else {
			// Requisita conteudo
			requisicao()
		}
	}
}
