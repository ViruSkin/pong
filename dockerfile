# Используем официальный образ Bun
# Смотрите все версии на https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и bun.lockb для установки зависимостей
COPY package.json bun.lockb ./

# Устанавливаем зависимости
RUN bun install --frozen-lockfile

# Копируем исходный код проекта
COPY . .

# Устанавливаем пользователя bun
USER bun

# Открываем порт, на котором будет работать приложение
EXPOSE 2024

# Запускаем приложение
ENTRYPOINT [ "bun", "run", "start" ]