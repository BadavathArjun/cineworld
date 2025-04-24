import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage/HomePage'
import MovieDetails from './components/MovieDetails/MovieDetails'
import Favorites from './pages/Favorites/Favorites'
import GenreList from './components/GenreList/GenreList'
import GenrePage from './pages/GenrePage/GenrePage'
import SearchResults from './pages/SearchResults/SearchResults'
import './App.css'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<HomePage />} />
                <Route path="/movie/:movieId" element={<MovieDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/genre/:genreId" element={<GenrePage />} />
                <Route path="/search" element={<SearchResults />} />
            </Routes>
            <GenreList />
        </Layout>
    )
}

export default App 