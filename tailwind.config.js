/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#f7f3ea',
          hover: '#efe8d8',
          rule: '#e4dccb',
        },
        neutral: {
          0: '#fcfaf4',
          50: '#efe8d8',
          100: '#e6ddcc',
          200: '#d9cdb8',
          300: '#c4b59a',
          400: '#8a8073',
          500: '#6b6358',
          600: '#524c44',
          700: '#3f3a34',
          800: '#2a2622',
          900: '#1c1917',
          950: '#141210',
        },
      },
      fontFamily: {
        sans: ['var(--font-serif)', 'Source Serif 4', 'Georgia', 'Times New Roman', 'serif'],
        serif: ['var(--font-serif)', 'Source Serif 4', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1c1917',
            maxWidth: 'none',
            a: { color: '#1c1917', textDecoration: 'underline', textUnderlineOffset: '3px' },
            'h1,h2,h3,h4': { color: '#1c1917', fontWeight: '600' },
            code: { color: '#1c1917', background: '#efe8d8', padding: '2px 5px', borderRadius: '3px', fontSize: '0.875em', fontWeight: '400' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: { background: '#efe8d8', border: '1px solid #e4dccb' },
            blockquote: { borderLeftColor: '#d9cdb8', color: '#524c44' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
