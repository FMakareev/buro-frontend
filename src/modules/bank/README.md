# bank

## Маршруты

* /app/bank/clients - список клиентов банка
* /app/bank/documents - список достыпных кредитных историй
* /app/bank/notifications - список запросов направленных клиентам

## Страницы

### 1. clients

Список клиентов, в нем отображаются все клиенты для которых в системе есть доступные кредитные истории 
и этих кредитных историй нет у авторизованного банка.

Для получения списка клиентов используется запрос `userdocumentlist(excludeowner: String,excludeownerrole: String)`,
где `excludeowner` - id авторизованного банка, нужно чтобы исключить его из выборки пользовательских кредитных историй 
, `excludeownerrole` - передается роль owner`а которая не должна быть в выборке, нужно чтобы не отдавать пользовательские 
кредитные истории доступные другим банкам.

Первая колонка с назваинием `Client token` отображает md5 хеш id клиента, md5 хеш генерируется 
в методе `accessor` колонки.

Поддерживает querystring параметр `client` - содержит md5 хэш id клиента, ***пример**: /app/bank/clients?client=6d51beffdcd58b8858a55b236fc8675a*

### 2. documents

Список докуемнтов доступных банку. 

Запрашивается с помощью запроса `userdocumentlist(bankid: String)`, 
где bankid - id текущего авторизованного банка, берется из `redux`.

Имеет querystring параметр `document`, он содержит `md5` хэш `id` документа 
и нужен для автоматического открытия окна скачивания документа при переходе по ссылке в письме. 
Т.к. отправляется на бекенд у нас не хеш `id` Документа, а оригинал то в `initialState` в свойство `id` 
мы присваиваем `id` из `querystring`, а свойство `isOpen` не переводим в true, вместо этого 
вызываем метод `onOpenFormUploadDoc` в свойстве `accessor` последней колонки, там преобразуем в `md5` id документа текущей строки 
и сравнивем его с `id` из `state` если все ок то метод вызывается и в `state` у нас оригинальный `id` и окно открыто.

 
По клику на кнопку Download вызывается метод `onOpenFormUploadDoc` который принимает `id` (не md5) документа и открывает
 окно в котором необходимо ввести код для расшифровки файла, сам код находится в письме. 






### 3. notifications
