'use client';
import axios from 'axios';
import { useState } from 'react';
import Navbar from './Navbar';
import MusicModal from './MusicModal';

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);

  const getSongs = async () => {
  if (!search.trim()) {
    console.log("Empty search");
    return;
  }

  try {
    const res = await axios.get(
      `https://itunes.apple.com/search?term=${search}&media=music`
    );

    console.log("API DATA:", res.data);

    setSongs(res.data.results || []);
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
};

  return (
    <>
      <Navbar />
      <div className="p-6 text-center">
        <div className="flex justify-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search songs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-green-600 rounded-md p-2 w-1/2"
          />

          <button
            onClick={getSongs}
            className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-md shadow-lg hover:bg-green-700"
          >
            Search
          </button>
        </div>
        {search && songs.length === 0 ? (
          <p>No Songs Found</p>
        ) : (
         <div className="mt-6 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {songs.map((song) => (
              <div
                key={song.trackId}
                className="bg-green-300 text-black shadow-md rounded-md p-4 cursor-pointer hover:scale-105 transition"
                onClick={() => setSelectedSong(song)}
              >
                <img
                  src={song.artworkUrl100}
                  alt={song.trackName}
                  className="w-full rounded mb-2"
                />

                <h3 className="text-lg font-bold">{song.trackName}</h3>
                <p className="text-black">{song.artistName}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedSong && (
        <MusicModal
          song={selectedSong}
          onClose={() => setSelectedSong(null)}
        />
      )}
    </>
  );
};

export default MusicPlayer;