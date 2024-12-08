# Gunakan image dasar Node.js
FROM node:18


# Set direktori kerja
WORKDIR /usr/src/app


# Salin package.json dan package-lock.json
COPY package.json package-lock.json ./


# Install dependensi
RUN npm install


# Salin semua file aplikasi ke dalam container
COPY . .


# Ekspose port yang digunakan oleh Expo
EXPOSE 19000 19001 19002


# Jalankan aplikasi
CMD ["npm", "start"]
