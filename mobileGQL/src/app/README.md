# Это общая инициализирующая логика приложения

Именно здесь, согласно методологии, стоит располагать всю подготовительную логику:

- подключение глобальных стилей (`/app/styles/**` + `/app/index.css`)
- провайдеры и HOCs с инициализирующей логикой (`/app/providers/**`)

Может импортировать всё, что угодно.
Сама никуда не экспортируется.

```
# Структура 'app' уникальна для каждого проекта и не регламентируется методологией
|
├── app/providers                # Layer: Инициализация приложения (HOCs провайдеры)
|        ├── withAuth.tsx        #    HOC: Инициализация контекста авторизации
|        |   ...                 #
|   ...
```