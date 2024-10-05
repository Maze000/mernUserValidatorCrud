# Usar una imagen base de Node.js, ajustada a tu versión 22.5.1
FROM node:22.5.1

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar todo el contenido del proyecto a la carpeta de trabajo
COPY . .

# Exponer el puerto que usa la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
