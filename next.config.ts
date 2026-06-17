import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

import('@opennextjs/cloudflare').then((m) =>
  m.initOpenNextCloudflareForDev({
    environment: process.env.CLOUDFLARE_ENV ?? 'staging',
  })
);