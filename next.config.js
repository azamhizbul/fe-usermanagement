/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    TOKEN: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaXBwb3MiOiI5NzIzMjU5MzEiLCJlbWFpbCI6Ijk3MjMyNTkzMUBwb3NpbmRvbmVzaWEuY28uaWQiLCJleHAiOjE2NjE1ODQwMjN9.oW9QFznBQVdtP7vPpHoJV24xKeX2XaYz7gV5hhkMjLc',
    URLUSERMANAGE : 'http://localhost:8001'
  },
}

module.exports = nextConfig
