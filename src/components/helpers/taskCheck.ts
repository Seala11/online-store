/* eslint-disable no-console */
console.log(`%cOnline-store-task`, 'font-weight: bold; font-size: 18px');
console.log(`https://github.com/rolling-scopes-school/tasks/blob/master/tasks/online-store/README.md\n\n`);
console.log(`%cСамооценка:`, 'font-weight: bold;');
console.log(`
  Выполнены все пункты задания.
  ✔️ 1. Главная страница содержит все товары магазина а также фильтры, строку поиска, поле для сортировки. Выполняются требования к вёрстке +10
  + внешний вид приложения соответствует предложенному образцу или является его улучшенной версией
  + вёрстка адаптирована для планшета и десктопа. Корректность отображения приложения и отсутствие горизонтальной полосы прокрутки проверяется при ширине страницы от 1920рх до 768рх.
  + интерактивность элементов, с которыми пользователи могут взаимодействовать, изменение внешнего вида самого элемента и состояния курсора при наведении, использование разных стилей для активного и неактивного состояния элемента, плавные анимации
  + в футере приложения есть ссылка на гитхаб автора, год создания приложения, логотип курса со ссылкой на курс.

  ✔️ 2. Карточка товара содержит её изображение, название, текстом или условным значком обозначено количество экземпляров, цвет, размер, является ли товар на скидке +10
  
  ✔️ 3. Добавление товара в корзину +20
  + кликая по кнопке с товаром товар можно добавлять в избранное или удалять из корзины. Карточки добавленных в корзину товаров внешне отличаются от остальных +10
  + на странице отображается количество добавленных в избранное итоваров. При попытке добавить в избранное больше 20 товаров, выводится всплывающее уведомление с текстом "Извините, все слоты заполнены" (+10)
  
  ✔️ 4. Сортировка +20
  + сортируются только те товары, которые в данный момент отображаются на странице
  + сортировка товаров по названию в возрастающем и спадающем порядке +10
  + сортировка товаров по цене в возрастающем и спадающем порядке +10
  + сортировка товаров по количеству на складе в возрастающем и спадающем порядке (добавлено)
  
  ✔️ 5. Фильтры в указанном диапазоне от и до +30
  + фильтры по количеству экземпляров +10
  + фильтры по году выпуска на рынок (заменен на фильтр по цене) +10
  + для фильтрации в указанном диапазоне используется range slider с двумя ползунками. При перемещении ползунков отображается их текущее значение, разный цвет слайдера до и после ползунка +10
  
  ✔️ 6. Фильтры по значению +30
  + Выбранные фильтры выделяются стилем.
  + фильтры по производителю (заменен на категории) +5
  + фильтры по цвету +5
  + фильтры по размеру +5
  + можно отобразить только популярные товары (заменен на товары на скидке) +5
  + можно отфильтровать товары по нескольким фильтрам одного типа +10
  + Для нескольких фильтров одного типа отображаются товары, которые соответствуют хоть одному выбранному фильтру. Например, можно отобразить снежинки и колокольчики; или белые, желтые и красные товары; или большие и средние.
  
  ✔️ 7. Можно отфильтровать товары по нескольким фильтрам разного типа +20
  + Для нескольких фильтров разного типа отображаются только те товары, которые соответствуют всем выбранным фильтрам.
  + Если товаров, соответствующих всем выбранным фильтрам нет, на странице выводится уведомление.
  
  ✔️ 8. Сброс фильтров +20
  + есть кнопка reset (reset filters) для сброса фильтров +10
  + Кнопка reset сбрасывает только фильтры, не влияя на порядок сортировки или товары, добавленные в корзину.
  + После использования кнопки reset фильтры остаются работоспособными
  + при сбросе фильтров кнопкой reset, ползунки range slider сдвигаются к краям, значения ползунков возвращаются к первоначальным, range slider закрашивается одним цветом +10
  
  ✔️ 9. Сохранение настроек в local storage +30
  + выбранные пользователем фильтры, порядок сортировки, добавленные в избранное товара сохраняются при перезагрузке страницы. 
    Есть кнопка сброса настроек (reset settings), которая очищает local storage
  
  ✔️ 10. Поиск +30
  + при открытии приложения курсор находится в поле поиска +2
  + автозаполнение поля поиска отключено (нет выпадающего списка с предыдущими запросами) +2
  + есть placeholder +2
  + в поле поиска есть крестик, позволяющий очистить поле поиска +2
  + если нет совпадения последовательности букв в поисковом запросе с названием товара, выводится уведомление. +2
  + при вводе поискового запроса на странице остаются только те товары, в которых есть указанные в поиске буквы в указанном порядке. При этом не обязательно, чтобы буквы были в начале слова. Регистр символов при поиске не учитывается +10
  + Поиск ведётся только среди товаров, которые в данный момент отображаются на странице.
  + если очистить поле поиска, на странице отображаются товары, соответствующие всем выбранным фильтрам и настройкам сортировки +10
  `);
console.log(`%cИтого: 220/220 => 220`, 'font-weight: bold');
