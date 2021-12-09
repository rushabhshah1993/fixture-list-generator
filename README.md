# fixture-list-generator
A quick and easy-to-use generator for creating fixtures.
<br /><br />
It doesn't matter if it's a football or a cricket tournament or even an inter-collegiate debate competition, our `fixture-list-generator` will help you create meaningful fixtures for every type of competition.
Using `fixture-list-generator` is fairly simple - all you need to provide is a list of names and an optional configuration and our package will handle the rest.

<br />

## USAGE
1. Install this package in your code using the following npm command:
    ```
    npm install fixture-list-generator
    ```

2. Import the named method `generate` from our package in the file where you need to generate fixtures.
    ```
    import { generate } from 'fixture-list-generator';
    ```

3. Provide a simple array with the names of the participants to the `generate` method.
    ```
    let teams = [
        'Manchester United',
        'Arsenal',
        'Liverpool',
        'Chelsea'
    ];

    generate(teams);
    ```

4. The `generate` method also takes an optional second parameter for configurations. A list of configurations and their definitions are provided below. 
<br />
    >Currently, as of v2.0.0, you can only provide a configuration to randomise the list.

    ```
    let config = {
        randomise: false
    }

    generate(teams, config);
    ```

<br /><br />

## OUTPUT

The `generate` method will return two values in response:
1. `participants`: It will return a list of participants and the opponents it should face over the entire tournament.
2. `rounds`: It will return a list of all rounds and the pariticipants for every round. 

A sample output for the above input will look as follows:
```
{
    "participants": {
        "Manchester United": [
            "Arsenal",
            "Chelsea",
            "Liverpool"
        ],
        "Arsenal": [
            "Manchester United",
            "Liverpool",
            "Chelsea"
        ],
        "Liverpool": [
            "Chelsea",
            "Arsenal",
            "Manchester United"
        ],
        "Chelsea": [
            "Liverpool",
            "Manchester United",
            "Arsenal"
        ]
    },
    "rounds": {
        "round1": {
            "players": [
                {
                    "player1": "Arsenal",
                    "player2": "Manchester United"
                },
                {
                    "player1": "Liverpool",
                    "player2": "Chelsea"
                }
            ]
        },
        "round2": {
            "players": [
                {
                    "player1": "Manchester United",
                    "player2": "Chelsea"
                },
                {
                    "player1": "Arsenal",
                    "player2": "Liverpool"
                }
            ]
        },
        "round3": {
            "players": [
                {
                    "player1": "Liverpool",
                    "player2": "Manchester United"
                },
                {
                    "player1": "Chelsea",
                    "player2": "Arsenal"
                }
            ]
        }
    }
}
```

<br /><br />

## CONFIGURATIONS

Configurations are useful to guide our code to give you the best results possible. Here are a list of configurations available:

> As of v2.0.0, configurations are optional.  

| Configuration name | Description | Values |
| ---------- | ------ | ----- |
| randomise | It is used for randomising the list of teams provided as a parameter. It is useful for scenarios where teams need to be randomly selected and not in the order that they are provided. | <ul> <li>*true* (default value): It will randomise the list of teams/participants provided. </li> <li> *false*: It will generate fixtures in the order in which they are provided.</li></ul> |
| 

<br /><br />

## CHANGE LOG

We are continuously changing and modifying our package for faster operations and better results. Keep checking this changelog for the latest changes:

### **v2.0.0**
**Date**: December 9, 2021 19:45:00 GMT+0530 (Indian Standard Time)
**Description**:
A major update involving a brand new algorithm and introduction to configurations.

### **v1.0.1**
**Date**: September 17, 2021 <br />
**Description**: Bug resolution of the first participant in every tournament.

### **v1.0.0**
**Date**: September 17, 2021 <br />
**Description**: Initial release of the package

<br />

## DEVELOPER INFORMATION
This code is developed by Rushabh Mulraj Shah. <br />
To get in touch with the developer, you can contact him at shahrushabh1993@gmail.com.
