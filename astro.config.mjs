import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://terraform-study.shinkeonkim.com',
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
          label: 'Terraform 004 Study on GitHub',
          href: 'https://github.com/kokoa-study-room/terraform-associate-004-study-notes',
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
          items: [{ slug: 'index' }, { slug: 'guide/learning-path' }, { slug: 'guide/content-status' }],
        },
        {
          label: '개념 / Concepts',
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
          label: 'Lab으로 공부 / Learn with Labs',
          items: [
            { slug: 'labs' },
            {
              label: '기초 / Beginner',
              items: [{ slug: 'labs/01-first-project' }, { slug: 'labs/02-variables-outputs' }, { slug: 'labs/03-data-sources' }],
            },
            {
              label: '중급 / Intermediate',
              items: [
                { slug: 'labs/04-count-for-each' },
                { slug: 'labs/05-modules' },
                { slug: 'labs/06-remote-state' },
                { slug: 'labs/07-lifecycle' },
              ],
            },
            {
              label: '심화 / Advanced',
              items: [
                { slug: 'labs/08-custom-conditions' },
                { slug: 'labs/09-dynamic-blocks' },
                { slug: 'labs/10-state-operations' },
                { slug: 'labs/11-registry-modules' },
                { slug: 'labs/12-hcp-terraform' },
              ],
            },
          ],
        },
        {
          label: '시험 대비 정리 / Exam Review',
          items: [
            { slug: 'review/exam-readiness' },
            { slug: 'reference/exam-objectives' },
            { slug: 'reference/terraform-1-12-deep-dive' },
            { slug: 'reference/command-behavior-matrix' },
            { slug: 'reference/hcp-boundaries' },
            { slug: 'reference/corrections' },
            { slug: 'reference/glossary' },
          ],
        },
        {
          label: '시험 대비 문제 풀이 / Practice',
          items: [
            { slug: 'practice/bank-200' },
            { slug: 'practice/strategy' },
            { slug: 'practice/foundations' },
            { slug: 'practice/operations' },
            { slug: 'practice/research-notes' },
          ],
        },
        {
          label: '참고 자료 / References',
          collapsed: true,
          items: [
            { slug: 'reference/official-sources' },
            { slug: 'guide/labs-and-practice' },
            { slug: 'practice/research-notes' },
            { slug: 'reference/authoring-workflow' },
          ],
        },
      ],
    }),
  ],
});
