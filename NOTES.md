This test was quite a challenge, if I were to be doing this at work there would be a significant amount of time set aside for system design, I didnt feel like I had much chance to look into this as deeply as I would have liked - you'll see me change from an MVC like pattern to a more functional style about halfway through as it fit the data so much better.

I wasnt very happy with how I solved the issue with the escaped pipes, i imagine a better regex would be able to solve this.

I wrote my own buffer handler, but I would bet theres is a much better designed library I could have used instead.

Im writing to the DB for every single create + update event, I dont think this would scale well, but I didnt have time to look at grouping these.

I dont think I've added much resilience into the system here, especially around the feed/db connection dropping, the api wont attempt to reconnect these, again due to time.

Im using babel-register in development, so I added an extra step (server.js) in order to use import. If this were going into production I would add a build step as babel-register has a significant performance impact.
