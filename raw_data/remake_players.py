""" This file takes the data from nba.com and formats into data/players.json"""
import json


def move():
    players = []

    with open("./nba_data.json", "r") as nba_data:
        unformatted_data = json.load(nba_data)

    with open("../data/players.json", "w") as players_data:
        for i in unformatted_data["props"]["pageProps"]["players"]:
            if i["TEAM_ABBREVIATION"] == None or i["JERSEY_NUMBER"] == None:
                continue

            players.append(
                {
                    "NBA_ID": i["PERSON_ID"],
                    "FULL_NAME": i["PLAYER_FIRST_NAME"] + " " + i["PLAYER_LAST_NAME"],
                    "PLAYER_SLUG": i["PLAYER_SLUG"],
                    "HEIGHT": i["HEIGHT"],
                    "JERSEY_NUM": i["JERSEY_NUMBER"],
                    "POS": i["POSITION"],
                    "TEAM": i["TEAM_ABBREVIATION"],
                }
            )
        json.dump(players, players_data, indent=4)


if __name__ == "__main__":
    move()

    max_name_size = 0
    no_of_players = 0
    with open("../data/players.json", "r") as fp:
        data = json.load(fp)
        no_of_players = len(data)
        for obj in data:
            if len(obj["FULL_NAME"]) >= max_name_size:
                max_name_size = len(obj["FULL_NAME"])

    print("Longest name size: " + str(max_name_size))
    print("Number of Players: " + str(no_of_players))
    print("done")
