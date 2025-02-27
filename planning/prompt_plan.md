# Prompt 1: Bootstrapping the Project with Expo

We need to create a new Expo project that will serve as the foundation for our chess app. This project should support both mobile and web using React Native Web.

Task:

1. Initialize a new Expo project (using Expo CLI).
2. Set up the basic project structure with a minimal App component that displays "Hello, Chess App" on both mobile and web.
3. Ensure the project is configured to support both platforms.

At the end, the code should render a single view with a simple text message that confirms the project bootstrapping is complete.

---

# Prompt 2: Create the Board Component

We need a Board component that renders an 8x8 grid representing the chessboard. Each square should be a clickable element that cycles through the following states on each tap:
Empty → Pawn → Knight → Bishop → Rook → Queen → King → (back to) Empty.

Task:

1. Create a Board component that renders an 8x8 grid.
2. Each square is its own component (e.g., BoardSquare) that maintains its piece state.
3. Implement the tap-to-cycle mechanism for piece selection.
4. Use a simple state (for example, an integer index for the current piece) and a mapping from index to piece type.
5. Display the square with appropriate labels (or simple text for now).

The final Board component should be exportable and ready to be integrated into the main App component.

---

# Prompt 3: Build the Control Panel Component

We need a Control Panel that includes the following elements:

- An "Evaluate" button to initiate analysis.
- A fixed dropdown for depth selection with fixed options: 8, 12, 16, 20.
- An "Undo" button.

Task:

1. Create a ControlPanel component that renders these three controls.
2. The depth dropdown should display the current selection and allow the user to change it.
3. Wire up basic onPress/onChange events that log actions (evaluation request, depth change, undo action) to the console for now.
4. Ensure the UI is minimal and ready for future wiring with evaluation logic.

At the end, the ControlPanel component should be exportable and ready to integrate with the rest of the app.

---

# Prompt 4: Stockfish Engine Integration Module

We need to integrate Stockfish as a local chess engine. For now, create a module that will simulate calling Stockfish locally. This module should expose a function that:

- Takes the current board state (in FEN or another format) and the selected depth.
- Returns a Promise that resolves to an object containing:
  - The current evaluation score.
  - The best move (in algebraic notation, e.g., "Nf3").
  - The evaluation score after the best move.
- Implements a timeout of 10 seconds. If the evaluation takes longer, it rejects with an error message.

Task:

1. Create a module (e.g., stockfishEngine.js) with the evaluation function.
2. Simulate the Stockfish behavior (you can return hard-coded values for this MVP) while ensuring the function's interface is clear.
3. Include the 10-second timeout mechanism and error handling.

---

# Prompt 5: Wire the Evaluate Button

Now, integrate the Control Panel with the Stockfish engine module:

- When the user presses the "Evaluate" button, the app should:
  1. Display a loading indicator.
  2. Call the Stockfish evaluation function with the current board state and selected depth.
  3. Upon successful evaluation, display:
     - The current evaluation score.
     - The best move as a clickable hyperlink.
     - The evaluation after the best move.
  4. If the evaluation exceeds 10 seconds, display an alert: "Evaluation took too long. Try a lower depth."
  5. Trigger haptic feedback (simulate this for now, e.g., console log) when results are returned.

Task:

1. Update the Control Panel and main App component to include this logic.
2. Ensure that the Evaluate button's onPress event wires into the evaluation function and updates a result display component.
3. Create a simple Loading component and an EvaluationResult component to show the returned data.

---

# Prompt 6: Best Move Click Handling and Board Update

Once the evaluation results are displayed, the best move should be rendered as a clickable hyperlink. When clicked, it should:

- Update the board state according to the best move.
- Toggle the player's turn (from White to Black or vice versa).
- Not automatically trigger a new evaluation (the user must press Evaluate again).

Task:

1. Modify the EvaluationResult component to render the best move as a clickable element.
2. Implement an event handler that, when the best move is clicked, updates the Board component's state to reflect the move.
3. Ensure that the board's internal state (FEN notation or equivalent) is updated and that the turn is toggled.
4. Wire this change so that it integrates with the existing board state and is reflected in the UI.

---

# Prompt 7: Persist Depth Selection

We need to ensure that the selected depth value is persisted between sessions:

- On mobile, use AsyncStorage.
- On web, use localStorage.
- When the app loads, the last selected depth should be preselected.

Task:

1. Add persistence logic to the Control Panel’s depth dropdown.
2. On depth change, save the selected depth to storage.
3. On app initialization, read from storage to set the initial depth value.

---

# Prompt 8: Main App Integration

Now, integrate all components into a single App component:

- The App should render the Board component and the Control Panel component.
- It should manage the global state (board state, evaluation results, selected depth) using React’s Context API or a simple state lifting strategy.
- Ensure that the Evaluate button triggers evaluation, and board updates occur when the best move is clicked.
- Wire all components together so that they work as an integrated whole.

Task:

1. Create a Main App component that imports and renders the Board, Control Panel, and EvaluationResult components.
2. Use Context or props drilling to manage shared state.
3. Ensure that state changes in one component (e.g., board update) are reflected across the app.

---

# Prompt 9: Implement Global Error Handling

Enhance the application by adding global error handling:

- Show basic text alerts for errors such as:
  - Evaluation timeout (if the engine takes longer than 10 seconds).
  - Image upload issues (for future integration).
- Ensure that alerts are displayed in a user-friendly manner.

Task:

1. Create an ErrorAlert component that displays error messages.
2. Integrate error handling into the Evaluate workflow (e.g., catch timeout errors and display the alert).
3. Ensure that the ErrorAlert is wired into the main App component and can be triggered by any component.

---

# Prompt 10: Final Integration and Testing Setup

Finalize the project by ensuring all components work together seamlessly. Also, set up a basic testing framework:

- Integrate unit tests for:
  - Board component (piece cycling, rendering).
  - Evaluation module (simulate Stockfish responses).
  - Control Panel interactions (button presses, depth selection persistence).
- Use Jest and React Testing Library (or Expo's built-in testing tools) for unit tests.
- Prepare integration tests that simulate the full user flow: board setup → evaluation → move click → board update.

Task:

1. Provide an example test file for the Board component.
2. Provide an example test file for the evaluation function integration.
3. Ensure that the CI/CD pipeline can run these tests.
4. Wire up any final adjustments needed in the main App component so that all features are integrated.
