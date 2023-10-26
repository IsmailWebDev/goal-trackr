import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        main: '#333533',
        card: '#202020',
      },

      colors: {
        goal: '#20bf55',
        stat: '#a4161a',
        card: '#d6d6d6',
        season: '#133c55',
        winning_goal: '#e9c46a',
      },
    },
  },
  plugins: [],
};
export default config;
