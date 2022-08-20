/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    TOKEN: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaXBwb3MiOiI5NzIzMjU5MzEiLCJlbWFpbCI6ImFhYUBocy5jb2EiLCJleHAiOjE2NjA5NzgyNzh9._ALUv6V4z9AHHDyAs5uVhyFFABwV9gpu_wP6bu7LEuE',
    URLUSERMANAGE : 'http://localhost:8001'
  },
}

module.exports = nextConfig
