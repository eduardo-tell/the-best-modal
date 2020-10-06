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
		this.modal = document.querySelectorAll('#' + alvo)[0]
		this.main = document.getElementsByTagName('main')[0]
		this.modal.alvo = alvo
	}

	abre (data) {
		
		this.conteudoEscolhido = data

		// Verifica se ja esta aberto
		if ($("#modal").hasClass('md-show')) {
			this.removeConteudo()

			// // Requisita novo conteudo
			this.conteudoModal()

		} else {
			this.montaModal()
		}
	}

	removeConteudo() {
		$("#modal > div").hide()
	}

	fecha () {
		console.log('Inicia: fecha...');

		this.desfoque()
		$("#modal").removeClass('md-show')
	}

	EscondeConteudos () {
		console.log('Inicia: EscondeConteudos...');

		$("#modal > div").hide()
	}

	desfoque () {
		console.log('Inicia: desfoque...');

		$("main").addClass('blur')
	}

	exibeModal () {
		this.EscondeConteudos()

		// Adiciona desfoquer e escurecimento ao conteudo
		this.desfoque()

		// Exibe modal
		setTimeout(() => { 
			$("#modal").addClass('md-show') 
			console.log(this.conteudoEscolhido);
			$("." + this.conteudoEscolhido).show()
		}, 100);
	}

	montaModal () {
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

	conteudoModal () {

		console.log('Inicia: conteudoModal...');

		// Verifica se conteudo existe
		const existeConteudo = () => {

			console.log('Inicia: existeConteudo...');

			if (this.conteudoEscolhido) {
				return $('.' + this.conteudoEscolhido).length
			} else {
				return document.querySelectorAll('#modal > div').length != 0
			}
			
		}

		const requisicao = () => {
	
			console.log('Inicia: requisicao...');
	
			var url = ''
			const httpRequest = new XMLHttpRequest();

			if (!httpRequest) {
				alert('Giving up :( Cannot create an XMLHTTP instance');
				return false;
			}

			url = 'modal/' + this.conteudoEscolhido + '.html'
			httpRequest.open('GET', url);
			httpRequest.send();

			httpRequest.onreadystatechange = () => {
				if (httpRequest.readyState === XMLHttpRequest.DONE) {
					if (httpRequest.status === 200 ) {
						var content = document.createElement('div');
						content.innerHTML = httpRequest.responseText;
						$("#modal").append(content.firstChild);
						this.conteudoModal()
					} else {
						alert('There was a problem with the request.')
					}
				}
			};
		}

		console.log(existeConteudo());

		if (existeConteudo()) {
			this.exibeModal()
		} else {
			requisicao()
		}
	}
}
