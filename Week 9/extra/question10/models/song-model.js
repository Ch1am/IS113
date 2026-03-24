// Week 9 - Extra Exercises Solutions - Question 10 - models/song-model.js
// -----------------------------------------------------------------------

const fs = require("fs/promises");
const path = require("path");

// Path to the JSON data file. 
// We use path.join() to create an absolute path. 
// Safer if someone runs your app from another directory than the project root directory
const filePath = path.join(__dirname, "../data/songs-data.json");

// Helper function: Read all songs from file
async function getAll() {
  try {
    const rawData = await fs.readFile(filePath, "utf8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Error reading songs data:", error);
    return [];
  }
}

// Helper function: Write updated songs array to file
async function writeAll(songs) {
  try {
    await fs.writeFile(filePath, JSON.stringify(songs, null, 2));
  } catch (error) {
    console.error("Error writing songs data:", error);
  }
}

// Helper function: Get unique, alphabetically sorted list of artists
async function getArtists() {
  const songs = await getAll();
  const artists = [];
  songs.forEach(song => {
    if (!artists.includes(song.artist)) {
      artists.push(song.artist);
    }
  });
  return artists.sort((a, b) => a.localeCompare(b));
}

// Helper function: Find all songs by a given artist
async function findByArtist(artist) {
  const songs = await getAll();
  return songs.filter(s => s.artist === artist);
}

// Helper function: Add a new song (if not duplicate)
async function add(newSong) {
  const songs = await getAll();

  const duplicate = songs.find(
    s => s.artist === newSong.artist && s.title === newSong.title
  );

  if (duplicate) {
    return { success: false, message: "This song already exists." };
  }

  songs.push(newSong);
  await writeAll(songs);

  console.log(
    `Added: "${newSong.title}" by "${newSong.artist}" - Lyrics "${newSong.lyrics}" (total songs: ${songs.length})`
  );

  return { success: true, message: "Song added successfully." };
}

// Question 10:
// -----------
// Update an existing song's title and/or lyrics.
// Returns true on success, false if the song was not found.
async function update({ artist, originalTitle, newTitle, newLyrics }) {
  const songs = await getAll();

  const index = songs.findIndex(
    s => s.artist === artist && s.title === originalTitle
  );
  if (index === -1) return false;

  // Apply updates (trim if provided)
  if (typeof newTitle === "string" && newTitle.trim()) {
    songs[index].title = newTitle.trim();
  }
  if (typeof newLyrics === "string" && newLyrics.trim()) {
    songs[index].lyrics = newLyrics.trim();
  }

  await writeAll(songs);

  console.log(
    `Updated song:\n` +
    `Artist: ${artist}\n` +
    `Title:  ${songs[index].title}\n` +
    `Lyrics:\n${songs[index].lyrics}\n`
  );

  return true;
}

// Remove a song by artist and title.
// Returns the deleted song object on success, or false if not found.
async function remove({ artist, title }) {
  const songs = await getAll();

  const index = songs.findIndex(
    s => s.artist === artist && s.title === title
  );
  if (index === -1) return false;

  const [deleted] = songs.splice(index, 1);
  await writeAll(songs);

  console.log(
    `Deleted song:\n` +
    `Artist: ${deleted.artist}\n` +
    `Title:  ${deleted.title}\n`
  );

  return deleted;
}


// Export all model functions
module.exports = {
  getAll,
  writeAll,
  getArtists,
  findByArtist,
  add,
  // added for question 10
  update,
  remove
};