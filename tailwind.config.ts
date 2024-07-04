import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // darkMode: "class",
  theme: {
    extend: {
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      fontSize: {
        // // make base font size 18px
        // base: "1.125rem",
        // // list of font size, from small to large ,and md is equal to base
        "3xs": "0.5rem",
        "2xs": "0.625rem",
        // xs: "0.75rem",
        // sm: "0.875rem",
        // md: "1.125rem",
        // lg: "1.25rem",
        // xl: "1.5rem",
        // "2xl": "1.875rem",
        // "3xl": "2.25rem",
        // "4xl": "3rem",
        // "5xl": "3.75rem",
        // "6xl": "4.5rem",
        // "7xl": "6rem",
        // "8xl": "8rem",
        // "9xl": "9rem",
      },
      colors: {
        wisdome: {
          purple: {
            DEFAULT: "#856FC2",
            light: "#E9DEEE",
            main: "#856FC2",
            dark: "#785FBB",
          },
          gray: {
            100: "#F6F8F8",
            200: "#CCCCCC",
            300: "#BDBDBD",
            400: "#818181",
            500: "#333333",
            600: "#2F2F2F",
            700: "#232123",
          },
          dark: {
            bg: "#252525",
          },
        },
        test: {
          primary: {
            DEFAULT: "#324DC7",
            dark: "#20317E",
            light: "#D6DBF4",
          },
          secondary: {
            DEFAULT: "#FEDB02",
            dark: "#DABC00",
            light: "#DABC00",
          },
          warning: "#DA0000",
        },
        dashboard: {
          bglight: "#FFFFFF",

          navbar: {
            DEFAULT: "#232123",
            bg: "#232123",
          },
          statusbar: {
            light: "#F6F8F8",
            dark: "#1F1F1F",
          },
        },
      },
      boxShadow: {
        basic: "0px 0px 15px 0px rgba(0, 0, 0, 0.25)",
        blur: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        pp: "0px 0px 3.0999999046325684px 0px rgba(133, 111, 194, 0.8)",
        purple: " 0px 0px 4px 0px rgba(133, 111, 194, 1)",
        signup:
          " 1px 4px 4px 0px rgba(255, 255, 255, 0.25) inset,-4px -4px 4px 0px rgba(149, 149, 149, 0.25) inset, 0px 4px 13.699999809265137px 0px rgba(0, 0, 0, 0.25);",
      },
      dropShadow: {
        pp: "0px 0px 3.0999999046325684px 0px rgba(133, 111, 194, 0.8)",
        purple: " 0px 0px 10px  rgba(144, 160, 233, 1)",

        predictPurple: "2px 1px 3.7px  rgba(133, 111, 194, 0.83)",
      },
      keyframes: {
        slideDown: {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
        predictScoreSpin: {
          "0%": {
            transform: "rotateY(0deg) translateY(100%) ",
          },

          "100%": { transform: "rotateY(360deg) translateY(0%)" },
        },
        dotLoading: {
          "0%": {
            opacity: "1",
          },
          "45%": {
            opacity: "0",
          },
          "90%": {
            opacity: "1",
          },
        },
        reportSummarySlideUp: {
          "0%": {
            top: "120%",
          },
          "100%": {
            top: "50%",
          },
        },
        notificationRing: {
          "0%,45%,65%,100%": {
            transform: "rotate(0deg)",
          },
          "55%": {
            transform: " rotate(25deg)",
          },
          "50%,60%": {
            transform: " rotate(-25deg)",
          },
        },
        hide: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        slideIn: {
          from: {
            transform: "translateY(calc(100% + var(--viewport-padding)))",
          },
          to: { transform: "translateY(0)" },
        },
        slideOut: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(100% + var(--viewport-padding)))" },
        },
        swipeOut: {
          from: { transform: "translateY(var(--radix-toast-swipe-end-y))" },
          to: { transform: "translateY(calc(100% + var(--viewport-padding)))" },
        },
      },
      animation: {
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        predictScoreSpin: "predictScoreSpin .8s ease-in-out ",
        dotLoading: "dotLoading 2s ease-in-out infinite",
        reportSummarySlideUp: "reportSummarySlideUp .3s ease-in-out",
        notificationRing: "notificationRing 2.7s linear infinite ",
        hide: "hide 100ms ease-in",
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideOut: "slideOut 2000ms cubic-bezier(0.16, 1, 0.3, 1)",
        swipeOut: "swipeOut 500ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        homeHero:
          "radial-gradient(112.67% 112.67% at 41.02% 100%, rgba(255,255, 255, 0.651) 11.3%, rgba(208, 201, 250, 0.539268) 25.06%, rgba(101,77, 253, 0.539268) 36.98%, rgba(36, 0, 255, 0.539268) 49.38%, rgba(12,0, 84, 0.614038) 71.88%, rgba(2, 0, 15, 0.7) 88.54%)",
        gradientBluePurple:
          "linear-gradient(90deg, #9747FF 38.93%, #3B5BEC 100%),linear-gradient(180deg, rgba(59, 91, 236, 0.2) 0%, rgba(1, 156, 222, 0.2) 100%)",
        gradientPurpleWhite:
          "linear-gradient(180deg, #785FBB 0%, #FFFFFF 100%)",
        gradientPurpleTransparent:
          "inear-gradient(180deg, #785FBB 0%, rgba(120, 95, 187, 0) 100%)",
        gradientPurpleBlue: "linear-gradient(180deg, #824FFB 0%, #3B60EC 150%)",
        gradoemtPurpleDarkBlue:
          "linear-gradient(180deg, #785FBB 0%, rgba(70, 94, 201, 0.38) 49.48%, #324DC7 100%)",
        gradientGreen: "linear-gradient(180deg, #31A04F 0%, #9AC026 100%);",
        gradientToRightGreen:
          "linear-gradient(270deg, #31A04F 0%, #9AC026 100%);",
        gradientAI:
          "linear-gradient(180deg, #785FBB 0%, rgba(70, 94, 201, 0.38) 49.48%, #324DC7 100%)",
        gradientPosibility: "linear-gradient(180deg, #824FFB 0%, #3B60EC 150%)",
        signupBg:
          "linear-gradient(245deg, #333951 16.41%, rgba(97, 92, 183, 0.90) 39.39%, #D5D3FF 66.24%, #EFF4FF 79.55%, rgba(229, 213, 238, 0.24) 84.18%)",
        // theme switch
        themeSwitchDark:
          "radial-gradient(115.71% 115.71% at 50% 50%, #785FBB 0%, #D4C5FC 100%)",
        themeSwitchLight:
          "radial-gradient(60% 60% at 50% 50%, #FFFFFF 0%, #DEC7E6 100%)",
        subjectOverviewProgressGradient:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.1116) 56.17%, rgba(132, 113, 186, 0.18) 105.66%)",
      },

      transitionDelay: {
        "400": "400ms",
      },
      fontFamily: {
        timesNewRoman: ["Times New Roman", "serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    require("tailwindcss-animate"),
    require("tailwindcss-3d"),
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
  ],
};
export default config;
