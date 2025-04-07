# 🎵 K i d i f y - Music Discovery App

A React-based music player that connects to the Deezer API, allowing users to search, preview, and discover new tracks.

## 🚀 Live Demo
Check out the live demo of the app:  
[Live Demo](https://k-i-d-i-f-dikwmarbr-kidus-projects-93a77139.vercel.app)

### 🚨 **Important: CORS Handling for API Requests**
To use the Deezer API in this app, **CORS must be handled**. To avoid CORS issues, the app uses a CORS proxy.

- You need to request temporary access to the CORS proxy by visiting [CORS Anywhere Demo](https://cors-anywhere.herokuapp.com/corsdemo).
- Once access is granted, the app will be able to make requests to the Deezer API through the proxy.

## ✨ Features
- 🔍 **Search** any track, artist, or album via the Deezer API
- 🎧 **Play 30-second song previews**
- 📱 **Responsive design** (mobile and desktop views)
- 🎨 **Tailwind CSS styling**
- ⚡ **Fast Vite-powered React app**
- 🖥️ Clear and user-friendly interface
- 🌐 **CORS-enabled**: Uses CORS proxy to fetch data from Deezer API

## 🛠️ Tech Stack
- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **API**: Deezer REST API
- **Audio**: HTML5 Audio
- **Deployment**: Vercel
- **CORS**: Proxy server used to handle CORS restrictions when making API requests

## 🚀 Quick Start

Clone the repository and get started locally:

```bash
git clone https://github.com/your-username/k-i-d-i-f-y.git
cd k-i-d-i-f-y
npm install
npm run dev
