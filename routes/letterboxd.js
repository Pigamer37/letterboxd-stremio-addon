require('dotenv').config()
/* This whole file is still useless because we don't have access to the API, so it's just
 scaffolding at the moment */
/** 
 * Gets auth headers for Letterboxd API requests
 * @return {Object} { "Authorization": `Bearer ${process.env.LETTERBOXD_API_TOKEN}` }
 */
GetLetterboxdAuthToken = function () {
  return { "Authorization": `Bearer ${process.env.LETTERBOXD_API_TOKEN}` }
}
/**
 * Gets LID from a TMDB ID
 * @see GetTMDBMeta for more details on this
 * @param {number} tmdbID - ID of the film in TMDB
 * @returns {string} LID of the item
 */
function GetLID_FromTMDB_ID(tmdbID) {
  const reqURL = `${process.env.LETTERBOXD_API_BASE}/film/tmdb:${tmdbID}`
  const options = { headers: GetLetterboxdAuthToken() }
  return new Promise((resolve, reject) => {
    fetch(reqURL, options).then((resp) => {
      if ((!resp.ok) || resp.status !== 200) reject(new Error(`HTTP error! Status: ${resp.status}`))
      if (resp === undefined) reject(new Error(`undefined response!`))
      return resp.json()
    }).then((data) => {
      if ((data?.id === undefined)) reject(new Error("Invalid response!"))
      resolve(data.id)
    }).catch(e => {
      reject(new Error(e))
    })
  })
}
/**
 * An object type defined by the Letterboxd API
 * @external FilmRelationship
 * Important! an array of LIDs for log entries for the movie is stored in .diaryEntries
 * @see {@link https://api-docs.letterboxd.com/#/schemas/FilmRelationship}
 */
/**
 * Gets a Letterboxd defined {@link FilmRelationship} object from a TMDB ID
 * @see GetTMDBMeta for more details on this
 * @param {number} tmdbID - ID of the film in TMDB
 * @returns {FilmRelationship} a Letterboxd defined {@link FilmRelationship} object
 */
exports.GetFilmRelationship = function (tmdbID) {
  //we may need to invoke GetLID_FromTMDB_ID before to "translate" from TMDB ID to LID
  //this endpoint may not work with a tmdb: tag
  const reqURL = `${process.env.LETTERBOXD_API_BASE}/film/tmdb:${tmdbID}/me`
  const options = { headers: GetLetterboxdAuthToken() }
  return new Promise((resolve, reject) => {
    fetch(reqURL, options).then((resp) => {
      if ((!resp.ok) || resp.status !== 200) reject(new Error(`HTTP error! Status: ${resp.status}`))
      if (resp === undefined) reject(new Error(`undefined response!`))
      return resp.json()
    }).then((data) => {
      if (data === undefined) reject(new Error("Invalid response!"))
      resolve(data)
    }).catch(e => {
      reject(new Error(e))
    })
  })
}
exports.UpdateFilmRelationship = function (tmdbID) {
  //we may need to invoke GetLID_FromTMDB_ID before to "translate" from TMDB ID to LID
  //this endpoint may not work with a tmdb: tag
  const reqURL = `${process.env.LETTERBOXD_API_BASE}/film/tmdb:${tmdbID}/me`
  const options = { headers: GetLetterboxdAuthToken(), method: "PATCH", body: '{"watched":"true"}' }
  return new Promise((resolve, reject) => {
    fetch(reqURL, options).then((resp) => {
      if ((!resp.ok) || resp.status !== 200) reject(new Error(`HTTP error! Status: ${resp.status}`))
      if (resp === undefined) reject(new Error(`undefined response!`))
      return resp.json()
    }).then((updateResp) => {//we get the new FilmRelationship back in .data
      if (updateResp?.data === undefined) reject(new Error("Invalid response!"))
      if (updateResp.messages[0] !== "Success") reject(new Error(updateResp.messages[0].title))
      resolve(updateResp)
    }).catch(e => {
      reject(new Error(e))
    })
  })
}