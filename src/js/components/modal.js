var modal = {

	/**
	 * Função responsável em exibir modais
	 * Para funcionar:
	 * - É preciso no html ter onclick modal.modal.abre('MODALESCOLHIDO')"
	 * - É preciso haver um div com o id "modal" juntamente com a classe "md-modal"
	 * - É preciso haver um arquivo html com o mesmo "MODALESCOLHIDO" com um conteudo unico com a classe de nome 'MODALESCOLHIDO'
	 *
	 * @return	void
	 * @author	Eduardo Tell
	*/
	 
	modal: {
		abre: (data) => {
		
			modal.conteudoEscolhido = data
	
			// Verifica se ja esta aberto
			if ($("#modal").hasClass('md-show')) {
				modal.modal.removeConteudo()
	
				// // Requisita novo conteudo
				modal.modal.conteudoModal()
	
			} else {
				modal.modal.montaModal()
			}
		},
	
		removeConteudo: () => {
			$("#modal > div").hide()
		},
	
		fecha: () => {
			console.log('Inicia: fecha...');
	
			modal.modal.desfoque()

			// Remove modal
			setTimeout(() => { 
				$("#modal > div").removeClass("exibe")
			}, 100);

			setTimeout(() => { 
				$("#modal").removeClass('md-show modal-fixado-topo')
				$("body").removeAttr("style")
				modal.modal.removeConteudo()
			}, 500);
		},
	
		escondeConteudos: () => {
			console.log('Inicia: escondeConteudos...');
	
			$("#modal > div").hide()
		},
	
		desfoque: () => {
			console.log('Inicia: desfoque...');
	
			$("main").addClass('blur')
		},
	
		exibeModal: () => {

			modal.modal.desfoque() // Adiciona desfoquer e escurecimento ao conteudo
			modal.modal.botaoFechar() // 
			modal.modal.verificaPosicaoInicial() // Seta estilo fixo ao topo quando necessário
	
			// Exibe modal
			setTimeout(() => { 
				$("#modal").addClass('md-show') 
				$("." + modal.conteudoEscolhido).removeAttr("style")
			}, 100);

			setTimeout(() => { 
				$("." + modal.conteudoEscolhido).addClass("exibe") 
			}, 500);
		},
	
		montaModal: () => {

			// Aplica overlay
			if (!document.querySelectorAll(".md-overlay").length) {
				$("<div class='md-overlay'></div>").insertAfter("#modal");
			}

			return modal.modal.conteudoModal()
		},

		botaoFechar: () => {

			console.log('Inicia: botaoFechar...');

			// Isere botão fechar
			if (!$('#modal .' + modal.conteudoEscolhido + ' .fecha-modal').length) {
				console.log($('#modal .' + modal.conteudoEscolhido));
				$("#modal").append("<button class='btn fecha-modal'>Fechar</button>");
			}

			// Adiciona funcionalidade ao botao
			$(".fecha-modal").on("click", () => {
				modal.modal.fecha()
			})

		},

		// Verifica se modal deve ser fixado ao topo
		verificaPosicaoInicial: () => {

			if ($("." + modal.conteudoEscolhido).hasClass("fixado-topo")) {
				$("#modal").addClass("modal-fixado-topo")
				$("body").css("height", "100vh")
				$("body").css("overflow", "hidden")
			}
		},
	
		conteudoModal: () => {
	
			console.log('Inicia: conteudoModal.modal...');
	
			// Verifica se conteudo existe
			const existeConteudo = () => {
	
				console.log('Inicia: existeConteudo...');
	
				if (modal.conteudoEscolhido) {
					return $('#modal .' + modal.conteudoEscolhido).length
				} else {
					return document.querySelectorAll('#modal > div').length != 0
				}
				
			}
	
			// Trata da requisilção e inclusão do conteúdo do modal
			const requisicao = () => {
		
				console.log('Inicia: requisicao...');
		
				var url = ''
				const httpRequest = new XMLHttpRequest();
	
				if (!httpRequest) {
					alert('Giving up :( Cannot create an XMLHTTP instance');
					return false;
				}
				url = 'modal/' + modal.conteudoEscolhido + '.html'
				httpRequest.open('GET', url);
				httpRequest.send();
	
				httpRequest.onreadystatechange = () => {
					if (httpRequest.readyState === XMLHttpRequest.DONE) {
						if (httpRequest.status === 200 ) {
							var content = document.createElement('div');
							content.innerHTML = httpRequest.responseText;
							$("#modal").append(content.firstChild);
							modal.modal.verificaPosicaoInicial()
							modal.modal.conteudoModal()
						} else {
							alert('There was a problem with the request.')
						}
					}
				};
			}
	
			// console.log(existeConteudo());
	
			if (existeConteudo()) {
				modal.modal.exibeModal()
			} else {
				requisicao()
			}
		}
	}
}
