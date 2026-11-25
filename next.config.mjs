/**
 * Cabeçalhos de segurança enviados em todas as páginas do site publicado.
 * Em desenvolvimento (`npm run dev`) eles ficam desligados, porque o modo de
 * desenvolvimento do Next precisa de recursos que a política de conteúdo bloqueia.
 *
 * Ao adicionar um serviço externo (medição de visitas, mapa...), libere o domínio
 * dele na diretiva correspondente da CONTENT_SECURITY_POLICY.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  // 'unsafe-inline': o Next usa scripts embutidos na página.
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  // Fotos do Unsplash (também servidas pelo otimizador de imagens do próprio site).
  "img-src 'self' data: blob: https://images.unsplash.com",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Não anunciar "X-Powered-By: Next.js" nas respostas.
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    if (process.env.NODE_ENV !== "production") return [];
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
