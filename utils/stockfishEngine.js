/**
 * Simulates a Stockfish chess engine evaluation
 * This is a placeholder implementation that returns mock data
 * In a real implementation, this would connect to an actual Stockfish instance
 */

// Timeout duration in milliseconds (10 seconds)
const EVALUATION_TIMEOUT = 10000

/**
 * Evaluates a chess position using Stockfish (simulated)
 * @param {string} boardState - The current board state (FEN notation or equivalent)
 * @param {number} depth - The depth to search
 * @returns {Promise} - Resolves with evaluation data or rejects with an error
 */
export const evaluatePosition = (boardState, depth) => {
  return new Promise((resolve, reject) => {
    // Create a timeout that will reject the promise if evaluation takes too long
    const timeoutId = setTimeout(() => {
      reject(new Error('Evaluation took too long. Try a lower depth.'))
    }, EVALUATION_TIMEOUT)

    // Simulate the time it takes to evaluate based on depth
    // Higher depths take longer
    const simulatedEvalTime = Math.min(depth * 500, 9000) // Max 9 seconds to avoid timeout

    setTimeout(() => {
      clearTimeout(timeoutId) // Clear the timeout since we're resolving

      // For now, return simulated data
      // In a real implementation, this would call the actual Stockfish engine
      const simulatedResult = {
        currentEval: Math.random() * 2 - 1, // Random value between -1 and 1
        bestMove: generateRandomMove(),
        evalAfterMove: Math.random() * 2 - 1, // Random value between -1 and 1
      }

      resolve(simulatedResult)
    }, simulatedEvalTime)
  })
}

// Helper function to generate a random chess move in algebraic notation
function generateRandomMove() {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const ranks = ['1', '2', '3', '4', '5', '6', '7', '8']
  const pieces = ['', 'N', 'B', 'R', 'Q', 'K'] // Empty string for pawn moves

  const piece = pieces[Math.floor(Math.random() * pieces.length)]
  const fromFile = files[Math.floor(Math.random() * files.length)]
  const fromRank = ranks[Math.floor(Math.random() * ranks.length)]
  const toFile = files[Math.floor(Math.random() * files.length)]
  const toRank = ranks[Math.floor(Math.random() * ranks.length)]

  // For simplicity, just return a basic move format
  // In a real implementation, this would be a valid chess move
  return `${piece}${fromFile}${fromRank}${toFile}${toRank}`
}

/**
 * Converts a raw evaluation score to a human-readable format
 * @param {number} score - The evaluation score
 * @returns {string} - A formatted string representation of the score
 */
export const formatEvaluationScore = (score) => {
  if (score > 100) {
    return `Mate in ${Math.ceil((1000 - score) / 10)}`
  } else if (score < -100) {
    return `Mate in ${Math.ceil((1000 + score) / 10)}`
  } else {
    const sign = score > 0 ? '+' : ''
    return `${sign}${score.toFixed(2)}`
  }
}
