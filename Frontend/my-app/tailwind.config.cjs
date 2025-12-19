module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
        colors: {
          amazonclone: {
            header: '#131921',
            lightgray: '#232F3E',
            orange: '#FF9900',
            yellow: '#FEBD69',
            lightblue: '#00A8E1',
          },
        },
        fontFamily: {
          amazonember: ['Amazon Ember', 'Arial', 'sans-serif'],
        },
        animation: {
          fadeIn: 'fadeIn 0.3s ease-in-out',
          slideUp: 'slideUp 0.3s ease-out',
          slideDown: 'slideDown 0.3s ease-out',
          spin: 'spin 1s linear infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
        },
      },
  },
  plugins: [],
};
