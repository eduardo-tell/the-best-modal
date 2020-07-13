module.exports = {
	start: () => {
		console.log('Inicia');
		return ajaxLista()

		function ajaxLista() {
			console.log('Inicia Ajax...');

			return  fetch('https://www.googleapis.com/books/v1/volumes?q=javascript')
					.then(data => data.json())
					.then(data => data.items.map(item => item))
					.then(data => data.map(item => item.volumeInfo))
					.then(data => data.map(item => item.title))
					.then(data => imprimeLista(data))
					.catch(error => console.log('Opa!', error))
					.finally(() => console.log('Opa!'))
		}

		function imprimeLista(data) {
			console.log('Inicia imprime lista...');

			document.getElementById('list').innerHTML = data.map(title => `<li>${title}</li>`)
		}
	}
}