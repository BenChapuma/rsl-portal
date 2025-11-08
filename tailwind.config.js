/** @type {import('tailwindcss').Config} */
module.exports = {
  // Shadcn/UI default setting for dark mode
  darkMode: ["class"],
  
  // Use your current content configuration (Next.js default shown)
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Optional: Keep the container utility if you are using it
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    // The main area where brand changes and shadcn specs are mixed
    extend: {
      // 1. Rydberg Starck Font Family (Brand Change)
      fontFamily: {
        // Body text (Regular)
        sans: ['var(--font-gilroy-regular)', 'sans-serif'],
        // Header text (Bold)
        heading: ['var(--font-gilroy-bold)', 'sans-serif'],
      },
      
      // 2. Rydberg Starck Color Palette & Shadcn Mapping (Brand Change)
      colors: {
        // Base brand color names (Teal-Green Palette)
        'rs-dark': 'hsl(var(--rs-dark))',             // Dark Blue/Gray (17-28-36 RGB)
        'rs-teal-light': 'hsl(var(--rs-teal-light))', // Lighter Teal (14-130-133 RGB)
        'rs-teal-dark': 'hsl(var(--rs-teal-dark))',   // Darker Teal (18-98-98 RGB)
        
        // Shadcn/UI default colors mapped to brand colors/defaults
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        primary: {
          DEFAULT: 'hsl(var(--primary))',      // Maps to rs-teal-dark (18-98-98 RGB)
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',    // Maps to rs-teal-light (14-130-133 RGB)
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      
      // 3. Shadcn/UI Border Radius (Shadcn Default - DO NOT REMOVE)
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      
      // 4. Shadcn/UI Keyframes (Shadcn Default - DO NOT REMOVE)
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      
      // 5. Shadcn/UI Animations (Shadcn Default - DO NOT REMOVE)
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  
  // Shadcn/UI default plugin (DO NOT REMOVE)
  plugins: [require("tailwindcss-animate")],
}