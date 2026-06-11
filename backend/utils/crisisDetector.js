const crisisKeywords = [
  "want to die",
  "kill myself",
  "end my life",
  "suicide",
  "want to end everything",
  "no reason to live",
  "better off dead",
  "hurt myself",
  "self harm",
  "i am done with life",
  "i don't want to live",
  "i want to disappear",
  "nobody cares about me",
  "everyone would be better without me",
];

function detectCrisis(message) {

  const text =
    message.toLowerCase();

  return crisisKeywords.some(
    keyword =>
      text.includes(keyword)
  );
}

module.exports =
  detectCrisis;