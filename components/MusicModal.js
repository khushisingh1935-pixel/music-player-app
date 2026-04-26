const MusicModal = ({ song, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-green-300 p-6 rounded-md w-[90%] md:w-[400px] text-center">
        
        <img
          src={song.artworkUrl100}
          alt={song.trackName}
          className="w-full rounded mb-3"
        />

        <h2 className="font-bold text-black text-xl mb-2">{song.trackName}</h2>
        <p className="mb-2 text-black">{song.artistName}</p>
        <p className="mb-4 text-gray-600">{song.collectionName}</p>

        <audio controls src={song.previewUrl} className="w-full mb-4"></audio>

        <button
          onClick={onClose}
          className="bg-green-600 text-black px-4 py-2 cursor-pointer rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MusicModal; 