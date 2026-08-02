import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  integrations: [
    starlight({
      title: 'Terraform 004 Study',
      description: 'Terraform Associate 004 bilingual study guide based on official HashiCorp sources.',
      locales: {
        root: {
          label: '한국어',
          lang: 'ko-KR',
        },
      },
      logo: {
        src: './src/assets/terraform-study.svg',
      },
      social: [
        {
          icon: 'github',
          label: 'HashiCorp web-unified-docs',
          href: 'https://github.com/hashicorp/web-unified-docs',
        },
      ],
      lastUpdated: true,
      customCss: ['./src/styles/custom.css'],
      components: {
        MobileMenuToggle: './src/components/MobileMenuToggle.astro',
      },
      sidebar: [
        {
          label: '시작 / Start',
          items: [{ slug: 'index' }, { slug: 'guide/learning-path' }, { slug: 'guide/labs-and-practice' }],
        },
        {
          label: '시험 도메인 / Exam domains',
          items: [
            { slug: 'domains/01-iac' },
            { slug: 'domains/02-fundamentals' },
            { slug: 'domains/03-workflow' },
            { slug: 'domains/04-configuration' },
            { slug: 'domains/05-modules' },
            { slug: 'domains/06-state' },
            { slug: 'domains/07-maintain' },
            { slug: 'domains/08-hcp-terraform' },
          ],
        },
        {
          label: '공식 기준 / Official baseline',
          items: [
            { slug: 'reference/exam-objectives' },
            { slug: 'reference/official-sources' },
            { slug: 'reference/terraform-1-12-deep-dive' },
            { slug: 'reference/command-behavior-matrix' },
            { slug: 'reference/hcp-boundaries' },
            { slug: 'reference/authoring-workflow' },
            { slug: 'reference/corrections' },
            { slug: 'reference/glossary' },
          ],
        },
        {
          label: '문제 풀이 / Practice',
          items: [
            { slug: 'practice/strategy' },
            { slug: 'practice/foundations' },
            { slug: 'practice/operations' },
            { slug: 'practice/research-notes' },
          ],
        },
        {
          label: '기존 상세 자료 / Detailed archive',
          collapsed: true,
          items: [{ autogenerate: { directory: 'archive' } }],
        },
      ],
    }),
  ],
});
