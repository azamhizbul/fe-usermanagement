/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  env: {
    TOKEN: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaXBwb3MiOiI5NzIzMjU5MzEiLCJlbWFpbCI6Ijk3MjMyNTkzMUBwb3NpbmRvbmVzaWEuY28uaWQiLCJleHAiOjE2NjIwOTEyMDN9.HKBDWTPdOWYYYaLn7N9nPls0_KdhZi1k2tWAL4C9jgc',
    URLUSERMANAGE : 'http://20.198.213.153:8001'
  },
}

module.exports = nextConfig
