# Chess App MVP – TODO Checklist

This checklist outlines all the tasks needed to build the Chess App MVP, based on the detailed specifications. Each item is broken down into manageable steps.

---

## 1. Project Bootstrapping

- [x] **Initialize Project**
  - [x] Use Expo CLI to create a new Expo project.
  - [x] Configure project to support both mobile and web (React Native Web integration).
- [x] **Basic App Setup**
  - [x] Create a minimal `App` component that renders "Hello, Chess App" on both mobile and web.
  - [x] Verify that the app runs on both platforms.

---

## 2. Board Component

- [x] **Create Board Layout**
  - [x] Develop a `Board` component that renders an 8x8 grid.
  - [x] Create a `BoardSquare` component for individual squares.
- [x] **Implement Piece Cycling**
  - [x] On tap, cycle each square through:  
         Empty → Pawn → Knight → Bishop → Rook → Queen → King → Empty.
  - [x] Use a simple state (e.g., an integer index) to track current piece.
  - [x] Map the index to piece type/symbol.
- [x] **Display Enhancements**
  - [x] Optionally add text labels or icons for pieces.
  - [x] Integrate the `Board` component into the main app view.

---

## 3. Control Panel Component

- [x] **Build UI Elements**
  - [x] Create a `ControlPanel` component.
  - [x] Add an "Evaluate" button.
  - [x] Add a dropdown for depth selection with fixed options: 8, 12, 16, 20.
  - [x] Add an "Undo" button.
- [x] **Wire Basic Actions**
  - [x] Implement onPress/onChange events that log actions to the console.
  - [x] Ensure UI elements are minimal and styled consistently.

---

## 4. Stockfish Engine Integration Module

- [ ] **Create Engine Module**
  - [ ] Create a module file (e.g., `stockfishEngine.js`).
  - [ ] Implement an evaluation function that:
    - [ ] Accepts the current board state (FEN or similar) and selected depth.
    - [ ] Returns a Promise that resolves with:
      - Current evaluation score.
      - Best move (algebraic notation, e.g., "Nf3").
      - Evaluation after the best move.
  - [ ] Simulate Stockfish responses with hard-coded values for MVP.
  - [ ] Add a 10-second timeout; if exceeded, reject the Promise with an error message.

---

## 5. Wiring the Evaluate Button

- [ ] **Connect Evaluation Logic**
  - [ ] Update the Control Panel to call the Stockfish evaluation function on "Evaluate" button press.
  - [ ] Display a loading indicator (spinner or "Calculating…") during evaluation.
- [ ] **Result Display**
  - [ ] Create a `Loading` component for visual feedback.
  - [ ] Create an `EvaluationResult` component to show:
    - Current evaluation score.
    - Best move as a clickable hyperlink.
    - Evaluation after the best move.
- [ ] **Error Handling in Evaluation**
  - [ ] Handle timeout errors and display an alert:  
         "Evaluation took too long. Try a lower depth."
  - [ ] Simulate haptic feedback on evaluation completion (log to console).

---

## 6. Best Move Click Handling and Board Update

- [ ] **Clickable Best Move**
  - [ ] Modify `EvaluationResult` to render the best move as a clickable element.
- [ ] **Update Board on Click**
  - [ ] Implement an event handler that updates the board state with the best move when clicked.
  - [ ] Toggle the player's turn (White ↔ Black).
  - [ ] Ensure the board state (using FEN or similar) is updated and reflected in the UI.

---

## 7. Persist Depth Selection

- [ ] **Implement Persistence**
  - [ ] Integrate persistence for the depth dropdown:
    - [ ] Use AsyncStorage for mobile.
    - [ ] Use localStorage for web.
  - [ ] Save the selected depth on change.
  - [ ] On app initialization, load the last selected depth and preselect it.

---

## 8. Main App Integration

- [ ] **Combine Components**
  - [ ] Import and render `Board`, `ControlPanel`, and `EvaluationResult` in the main `App` component.
- [ ] **Global State Management**
  - [ ] Use React's Context API (or prop drilling) to manage:
    - Board state.
    - Evaluation results.
    - Selected depth.
  - [ ] Ensure that changes in one component (e.g., board updates) reflect across the app.

---

## 9. Global Error Handling

- [ ] **Create Error Alert Component**
  - [ ] Develop an `ErrorAlert` component to display error messages.
- [ ] **Integrate Error Handling**
  - [ ] Hook error handling into the Evaluate workflow.
  - [ ] Display alerts for:
    - Evaluation timeout errors.
    - (Future) Image processing errors.
  - [ ] Ensure alerts are clear and user-friendly.

---

## 10. Testing Setup

- [ ] **Unit Testing**
  - [ ] Set up Jest and React Testing Library (or Expo's built-in tools).
  - [ ] Write tests for:
    - `Board` component (verify piece cycling and rendering).
    - Stockfish engine module (simulate responses).
    - `ControlPanel` interactions (button presses, dropdown persistence).
- [ ] **Integration Testing**
  - [ ] Simulate the full user flow:
    - Board setup → Evaluation → Best move click → Board update.
- [ ] **End-to-End Testing**
  - [ ] Prepare E2E tests using Detox (mobile) and Cypress (web).
  - [ ] Validate offline functionality and error handling.
- [ ] **CI/CD Pipeline**
  - [ ] Configure CI/CD to run the tests automatically.

---

## 11. Final Integration and Deployment

- [ ] **Manual Testing**
  - [ ] Perform manual testing on both mobile (Expo) and web.
- [ ] **Deployment Preparation**
  - [ ] Use Expo's build service for iOS and Android.
  - [ ] Deploy the web version on a platform like Vercel or Netlify.
- [ ] **Documentation**
  - [ ] Document any future enhancements (e.g., image-based board detection).
