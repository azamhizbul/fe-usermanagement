/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    TOKEN: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaXBwb3MiOiI5NzIzMjU5MzEiLCJlbWFpbCI6ImFhYUBocy5jb2EiLCJleHAiOjE2NjExNDk3NzF9.tkh9qwedilNOo908srzVhdw7gb-M2yhW1PipItTNvLY',
    URLUSERMANAGE : 'http://localhost:8001'
  },
}

module.exports = nextConfig
