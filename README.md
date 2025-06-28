# 🧠 LeetCode Stats Card

Display your LeetCode progress with customizable cards — perfect for GitHub profiles and personal sites.

## 🚀 Features

- 📊 3 Card Types:
  - Main Stats
  - Daily Activity
  - Latest Contributions
- 🎨 Customization Options:
  - 4 Themes
  - Show/hide icons, borders, links
  - Adjustable detail color & border radius
- 🧩 3 Layout Designs for Main Card

## 🔧 Usage

Embed your card:

```md
![LeetCode Stats](https://your-deployment.com/api/card?username=your_username&type=main&theme=dark)
```

### Available Params

- `username`: Your LeetCode username
- `type`: `main`, `activity`, `contributions`
- `design`: `1`, `2`, `3` (for main card)
- `theme`: `dark`, `light`, `classic`, `minimal`
- `showIcons`, `showLinks`, `showBorder`: `true` / `false`
- `color`: Custom detail color (hex or name)
- `radius`: Border radius (`8px`, `1rem`, etc.)

## 📦 Built With

- Next.js
- TypeScript
- LeetCode GraphQL API
- Dynamic SVG rendering

## 📄 License

MIT — free to use and modify.
