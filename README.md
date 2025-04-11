# Cine World - A Modern Movie Discovery Platform

![MovieDB Banner](https://i.imgur.com/JqYeZ0l.png)

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [API Integration](#api-integration)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
cineworld is a responsive web application built with React that allows users to discover, explore, and save their favorite movies. Leveraging the TMDB (The Movie Database) API, the platform provides comprehensive movie information including details, cast, trailers, and recommendations.

The application features a modern UI with intuitive navigation, personalized recommendations, and robust search functionality, offering cinema enthusiasts an immersive movie discovery experience.

## Key Features

🎬 **Movie Discovery**
- Trending, popular, top-rated, and upcoming movie sections
- Genre-based browsing with visual category cards
- Advanced search with filters

📺 **Detailed Movie Pages**
- Comprehensive movie information (plot, runtime, release date)
- Cast and crew details with profile links
- Embedded trailers and related videos
- Similar movie recommendations

❤️ **Personalization**
- Favorite movie saving functionality
- Local storage for persistent user preferences
- Responsive design for all devices

🔍 **Smart Search**
- Real-time search suggestions
- Filter by genre, year, and rating
- Paginated results for better performance

## Technologies Used

### Frontend
- **React** (v18+) - Component-based UI library
- **React Router** (v6) - Client-side routing
- **React Icons** - Comprehensive icon library
- **CSS Modules** - Scoped styling
- **Axios** - HTTP client for API requests

### API
- **TMDB API** - Comprehensive movie database
- **YouTube API** - For trailer embedding

### Development Tools
- **Vite** - Next-generation frontend tooling
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting

## API Integration

MovieDB integrates with the following TMDB API endpoints:

```
- /movie/popular
- /movie/top_rated
- /movie/upcoming
- /trending/movie/week
- /movie/{movie_id}
- /movie/{movie_id}/credits
- /movie/{movie_id}/videos
- /movie/{movie_id}/similar
- /search/movie
- /genre/movie/list
```

API keys are securely stored using environment variables.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/BadavathArjun/cineworld.git
   cd cineworld
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
moviedb/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, fonts, etc.
│   ├── components/          # Reusable components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── MovieCard/
│   │   ├── Search/
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── Home/
│   │   ├── MovieDetails/
│   │   ├── Search/
│   │   └── ...
│   ├── styles/              # Global styles
│   ├── utils/               # Helper functions
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── .env.example             # Environment variables template
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## Screenshots

![Home Page]![image](https://github.com/user-attachments/assets/6546d6cf-a613-4a81-83f1-b0c56c4d771a)

*Home page featuring trending movies*

![Movie Details]![image](https://github.com/user-attachments/assets/fa4d5845-b6b4-467b-8987-43a4ffeba9cc)

*Detailed movie view with cast information*

![Search Results]![image](https://github.com/user-attachments/assets/c6ee8859-91a7-41dd-8d7e-ada98d1a0b39)

*Search functionality with filters*

## Contributing

We welcome contributions to improve MovieDB! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**cineworld** © 2023 - A React-powered movie discovery platform using TMDB API.
