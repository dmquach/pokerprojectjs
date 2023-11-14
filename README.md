# PLO Hand Visualizer

# Background
Pot Limit Omaha (PLO) is a 4 card variant of poker played against opponents where the winner of the hand is the person with the best 5 cards out of the community cards and hole cards with no more and no less than 2 cards coming from hand.

The aim of this tool is to visualize the equity these hands control against each other on specific board types. Hand should be able to be generated randonly in a practice mode.
# Functionality & MVPs
In PLO Hand Visualizer a user will be able to:
* View all **270,725** starting hand combinations
* Generate odds of hitting certain combinations for a specific hand

In Trainiing mode a user can:
* Generate or select hands to compare
* Generate or select different boards to compare the equity of each hand
* Be able to select which hand has more equity based on intuitiong
* View guessing stats for a session

# Wireframes
https://wireframe.cc/uTyGW4

# Technologies, Libraries, APIs
This project is considering the implementation of the following technologies:

* Webpack to transpile JavaScript code

# Implementation Timeline
NB:
* Thursday Morning: Setup project, including getting webpack up and running. Create grid representing possible poker hands. Understand logic for visualizing hands.

* Friday Afternoon & Weekend: Finish fixing the logic for card equities. Start adding buttons to add players

* Monday: Create practice mode that can interact with selected hands. Add styling of board.

* Tuesday: Finish implementing logic for practice mode. Add styling of project.

* Wednesday: Finish implementing styling. Rewrite this proposal as a production README.


# Bonus features
* add possible nut hands (best possible hand) on the board
* add No Limit Holdem support
* add dead cards
* add message to add players
* add button to clear all
