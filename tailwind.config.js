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
        neutral: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#171717',
            maxWidth: 'none',
            a: { color: '#171717', textDecoration: 'underline', textUnderlineOffset: '3px' },
            'h1,h2,h3,h4': { color: '#0a0a0a', fontWeight: '600' },
            code: { color: '#171717', background: '#f5f5f5', padding: '2px 5px', borderRadius: '3px', fontSize: '0.875em', fontWeight: '400' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: { background: '#f5f5f5', border: '1px solid #e5e5e5' },
            blockquote: { borderLeftColor: '#d4d4d4', color: '#525252' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
