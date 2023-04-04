///создаем функцию в которую передаем тип и массив(values), фильтруем массив сравнивая с типом данных
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	////создаем метод
	hideAllResponseBlocks = () => {
	///создаем переменную вкладываем массив элементов(разные виды блока с результатом)
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		///всем элементам в массиве присваиваем display = 'none' - блоки станут невидимы
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	//////создаем метод в который передаем переменные
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
	///вызываем метод
		hideAllResponseBlocks();
		///переданному классу присваиваем display = 'block' - данный блок станет видимым
		document.querySelector(blockSelector).style.display = 'block';
		///если есть данная переменная
		if (spanSelector) {
			///то присвоить сообщение (msgText) в textContent данной переменной
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	////создаем метод в который передаем сообщение с сервера и вызываем метод в которые передаем класс, сообщение и id
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	////создаем метод в который передаем сообщение с сервера и вызываем метод в которые передаемЖ класс, сообщение и id
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	////создаем метод в нем вызываем метод в который передаем класс
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	//проверка на ошибки
	tryFilterByType = (type, values) => {
	/// отрабатывает если нет ошибок
		try {
			///записываем в переменную результат метода сравнивания типов данных с массивом, обьединяя в строку и разделяя их запятой и пробелом
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			///создаем переменную, в которую записываем результат:
			///если в массиве есть элементы(у массива есть длинна)
			const alertMsg = (valuesArray.length) ?
				///то пишем какой тип данных и сами элементы выводим
				`Данные с типом ${type}: ${valuesArray}` :
				///если нет элементов в массиве, то выдем сообщение о отсутствии данных такого типа
				`Отсутствуют данные типа ${type}`;
			////запускаем метод и передаем переменную
			showResults(alertMsg);
		} catch (e) {
			///отрабатывает если есть ошибка и выводит ее
			showError(`Ошибка: ${e}`);
		}
	};
///записываем в переменную кнопку
const filterButton = document.querySelector('#filter-btn');

////навешиваем слушатель события на кнопку
filterButton.addEventListener('click', e => {
	//Записываем в переменную селект id="type"
	const typeInput = document.querySelector('#type');
	//Записываем в переменную инпут id="data"
	const dataInput = document.querySelector('#data');

	/// если в значениии пустая строка
	if (dataInput.value === '') {
	/// то выводить сообщение
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		///запускаем метод
		showNoResults();
	} else {
		///иначе, сообщение об ошибке будет пустым
		dataInput.setCustomValidity('');
		///отменяем стандартное поведение кнопки
		e.preventDefault();
		///вызываем и передаем в метод переменные и удаляем пробелы
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

