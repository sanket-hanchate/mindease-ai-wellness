/**
 * LivePortrait Controller
 * Generates lip-sync coefficients (keyframes) from text for real-time avatar animation.
 */

exports.generateKeyframes = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const keyframes = [];
    const chars = text.split("");

    // Map characters to mouth openness values (0 = closed, 1 = fully open)
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i].toLowerCase();
      let value = 0.35; // Default speaking openness

      if (/[aeiou]/.test(char)) {
        value = 0.85; // Vowels: wide open
      } else if (/[pbm]/.test(char)) {
        value = 0.05; // Bilabials: closed mouth
      } else if (/[fv]/.test(char)) {
        value = 0.2; // Labiodentals: partially closed
      } else if (/[sztdkglrnh]/.test(char)) {
        value = 0.45; // Consonants: medium open
      } else if (/[\s.,\/#!$%\^&\*;:{}=\-_`~()?]/.test(char)) {
        value = 0.0; // Punctuation/spaces: pause
      }

      // Add a couple of frames per character to control speaking speed (e.g. 50ms per frame)
      if (char === " ") {
        keyframes.push(0.0, 0.0, 0.0); // Longer pause between words
      } else {
        keyframes.push(value, value);
      }
    }

    // Apply moving average filter to smooth transitions (simulating natural jaw inertia)
    const smoothed = [];
    const windowSize = 5;
    const halfWindow = Math.floor(windowSize / 2);

    for (let i = 0; i < keyframes.length; i++) {
      let sum = 0;
      let count = 0;
      for (let w = -halfWindow; w <= halfWindow; w++) {
        const val = keyframes[i + w];
        if (val !== undefined) {
          sum += val;
          count++;
        }
      }
      smoothed.push(parseFloat((sum / count).toFixed(3)));
    }

    // Return the generated keyframes representing the facial mouth animation path
    return res.status(200).json({
      success: true,
      keyframes: smoothed,
    });
  } catch (error) {
    console.error("LivePortrait keyframes generation failed:", error);
    return res.status(500).json({
      message: "Keyframe generation failed",
      error: error.message,
    });
  }
};
