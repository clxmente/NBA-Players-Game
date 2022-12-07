# How It Works

The raw data comes from [nba.com/players](https://nba.com/players). By using the developer tools and inspecting the HTML, we can find the JSON data under the script tag with the id `__NEXT_DATA__`.

> Note: Firefox is the best browser to use for this since Chrome seems to truncate the JSON data and not allow you to copy the full text.

This JSON data includes a lot of information we don't need so we use `remake_players.py` to format the data and save it under the `data` directory.
