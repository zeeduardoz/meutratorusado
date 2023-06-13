module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        76: '18.75rem',
        100: '26.75rem',
        120: '30rem',
        150: '36.5rem'
      },
      backgroundImage: () => ({
        header:
          "linear-gradient(to top, var(--gradient) 0%, var(--gradient) 100%), url('/trator-topo-home.png')"
      }),
      colors: {
        foreground: 'var(--foreground)',
        primary: 'var(--background-primary)',
        secondary: 'var(--background-secondary)',
        tertiary: 'var(--background-tertiary)',

        'hr-color': 'var(--hr-color)',

        'color-light': 'var(--text-color-light)',
        'color-medium': 'var(--text-color-medium)',
        'color-dark': 'var(--text-color-dark)',

        'color-success': 'var(--btn-color-success)',
        'color-info': 'var(--btn-color-info)',
        'color-warning': 'var(--btn-color-warning)',
        'color-danger': 'var(--btn-color-danger)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/custom-forms')]
}
