import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // GitHub Pages 배포를 위해 리포지토리 이름을 basePath로 설정합니다.
  // https://<username>.github.io/<repository-name>/ 형식을 따릅니다.
  basePath: '/macSell2',
  assetPrefix: '/macSell2',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
