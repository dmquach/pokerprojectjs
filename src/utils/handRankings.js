// Take in hand and see what type

// Royal flush
// Straight flush
// Four of a Kind
// Full house
// Flush
// Straight
// Three of a kind
// Two pair

// takes in array of cards
function isStraight(ranksCount) {
    const cardRanks = "23456789TJQKA";
    const straightIndices = "0123456789TJQKA";

    let consecutiveCount = 0;

    for (let i = 0; i < cardRanks.length; i++) {
      if (ranksCount[cardRanks.indexOf(straightIndices[i])] > 0) {
        consecutiveCount++;
        if (consecutiveCount === 5) {
          return true;
        }
      } else {
        consecutiveCount = 0;
      }
    }

    // Check for the special case of Ace (A, 1) as a low card
    if (consecutiveCount === 4 && ranksCount[0] > 0 && ranksCount[12] > 0) {
      return true;
    }

    return false;
  }
// takes in an array of cards
function isFlush(cards) {
for (const card of cards) {
    const suitIndex = cardSuits.indexOf(card[1]);
    suitsCount[suitIndex]++;
}

return suitsCount.some(count => count === 5);
}

function hasThreeOfAKind(cards) {
    if (cards.length !== 5) {
      return false; // A poker hand must contain exactly 5 cards.
    }

    const rankCounts = countCardRanks(cards);

    // Check if any rank occurs three times
    return Object.values(rankCounts).some(count => count === 3);
  }
  
  function countCardRanks(cards) {
    const rankCounts = {};

    for (const card of cards) {
      const rank = card[0];
      if (rankCounts[rank]) {
        rankCounts[rank]++;
      } else {
        rankCounts[rank] = 1;
      }
    }

    return rankCounts;
  }
