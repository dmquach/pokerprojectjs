function comparePokerHands(hand1, hand2) {
    if (hand1.length !== 5 || hand2.length !== 5) {
      return "Invalid input: Each hand must contain exactly 5 cards.";
    }

    const hand1Type = getPokerHandType(hand1);
    const hand2Type = getPokerHandType(hand2);

    if (hand1Type !== hand2Type) {
      return `Hand 1 (${hand1Type}) beats Hand 2 (${hand2Type})`;
    }

    // If both hands have the same type, we need to compare them based on hand type.
    switch (hand1Type) {
      case "Straight Flush":
      case "Flush":
      case "Straight":
        return compareHighCard(hand1, hand2);

      case "Four of a Kind":
      case "Three of a Kind":
        return compareOfAKind(hand1, hand2, 3);

      case "Full House":
        return compareFullHouse(hand1, hand2);

      case "Two Pair":
        return compareTwoPair(hand1, hand2);

      case "One Pair":
        return compareOfAKind(hand1, hand2, 2);

      case "High Card":
        return compareHighCard(hand1, hand2);

      default:
        return "Invalid hand type.";
    }
  }
