/**
 * O site é publicado como arquivos estáticos (pasta `out/`), servidos pela
 * Cloudflare Pages. Não há servidor: todas as páginas são geradas no build.
 *
 * Os cabeçalhos de segurança ficam em `public/_headers`, que a Cloudflare Pages
 * aplica automaticamente (a função `headers()` do Next não vale em exportação estática).
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Sem servidor não há otimizador de imagens. As fotos do Unsplash já chegam no
  // tamanho certo pela função `photo()` de `lib/data.ts`.
  images: { unoptimized: true },
};

export default nextConfig;
