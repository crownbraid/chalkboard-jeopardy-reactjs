# Chalkboard Jeopardy
A chalkboard quiz game SPA. Each round presents a random question from a past Jeopardy episode. 

To facilitate a multiple-choice format, false choices are generated by a series of calls to a dictionary API (after categorizing the correct answer, dummy answers are selected from that category). This process is slow, so a store of question-and-answer data is prepared and maintained by the server. This allows clients to instantly receive all data needed for a new game from a single GET request.

note: *Due to service costs, the gh-pages demo has been disconnected from the API and serves preset questions.*

### Major Tools
Node.js, Express, Unirest, jQuery, jService Jeopardy API, Mashape WordsAPI
