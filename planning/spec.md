# Chess App MVP – Developer Specification

## 1. Overview

The chess app is designed for both mobile (using Expo) and web. Its core functionality is to evaluate a chess position and calculate the next best move using Stockfish. Unlike typical chess tools, the app combines both evaluation of the current position and move calculation. The app works fully offline for all features except for image-based board detection, which is processed via a remote server.

## 2. Functional Requirements

### 2.1 Core Features

Dual Functionality:
Evaluation:
Displays a numeric evaluation score (centipawns or mate notation as provided by Stockfish).
Evaluates the current board position.
Move Calculation:
Returns the best move in algebraic notation (e.g., Nf3).
The best move is displayed as a clickable hyperlink; when clicked, it updates the board and toggles the turn (from White to Black or vice versa).
After clicking the move, the user must press Evaluate again for further analysis.
Chess Engine Integration:

Utilizes Stockfish (free, open-source) running locally on the device.
Supports non-legal board states (ignores move legality) to allow flexible input.
Returns only the top move for the MVP.

### 2.2 Board Setup & Interaction

Manual Board Setup:

Users can set up the board manually using a tap-to-cycle mechanism:
Each tap on a square cycles through:
Empty → Pawn → Knight → Bishop → Rook → Queen → King → Empty
A long-press on a square may open a selection menu for quicker piece selection.
Additional control buttons:
"Clear Board": Remove all pieces.
"Reset to Default": Set the board to the standard starting position.
Board Flip: Toggle board perspective (White ↔ Black).
Post-Setup Interactions:

Users can move any piece to any square freely (no legal move restrictions).
The board state is maintained in a standard format (e.g., FEN notation) to support future enhancements such as full move history.
Undo Functionality:
A single-level undo is implemented in the MVP (revert the last move).
The design should allow easy expansion to full move history later.
Image-Based Board Detection (Future Feature):

Users may upload a photo of a real chessboard.

The image is sent to a remote server for processing.

Strict Input Requirements:

The photo must be well-lit, aligned, and include the full board.
If the image is suboptimal (e.g., blurry, misaligned), the app will still display the detected board along with a warning:

“We couldn’t perfectly recognize the board due to image quality. Please verify for accuracy.”

The board can then be manually adjusted by the user.

### 2.3 Evaluation Workflow & UI Controls

Evaluation Process:

A single "Evaluate" button initiates analysis.
On button press:
A loading indicator (spinner or “Calculating…”) is displayed.
Stockfish is run locally using the current board state and user-selected depth.
On completion:
Display the current evaluation score.
Display the best next move as a clickable hyperlink.
Display the evaluation score after the best move.
Haptic Feedback (Mobile Only):
Triggered only when the evaluation results are returned.
Timeout Handling:
If evaluation exceeds 10 seconds, cancel the process and display a text alert:

"Evaluation took too long. Try a lower depth."

Depth Selection:

A fixed dropdown is provided with options: 8, 12, 16, 20.
The selected depth is displayed near the Evaluate button.
The app remembers the last selected depth (using AsyncStorage for mobile and localStorage for web).

### 2.4 UI & Layout

Mobile Version (Expo):

Layout:
The chessboard occupies most of the screen.
The Evaluate button is fixed at the bottom.
Other controls (depth dropdown, undo, move display) are hidden or accessible via scroll.
Portrait mode only.
Design:
Minimalist light theme.
Standard 2D chess pieces.
Classic green & white board with file (a–h) and rank (1–8) labels.
Basic text alerts for errors and feedback.
Web Version:

Layout:
A smaller board is used to leave room for additional UI elements (depth selection, undo button, move display, etc.).
The Evaluate button is positioned naturally within the UI layout.
A fixed layout is acceptable (no dynamic responsiveness required).
Design:
Same light theme, standard 2D pieces, and classic green & white board with labels.

### 2.5 Offline Capability

Offline Mode:
The app works fully offline for all core features (manual board setup, evaluation, move calculation, undo).
Exception: Image-based board detection requires an internet connection.
If used offline, display an alert:

"Image processing requires an internet connection. Please connect to continue."

## 3. Architecture & Framework

### 3.1 Framework Choice

Expo (React Native):
Use Expo to build the mobile version.
Utilize React Native Web (or an Expo web build) to share code between mobile and web.
Maximizes code reuse and ensures a consistent UI across platforms.

### 3.2 Component Structure

Core Components:
Board Component:
Renders the chessboard with standard 2D pieces.
Supports tap-to-cycle for piece placement.
Displays file (a–h) and rank (1–8) labels.
Control Panel:
Contains the Evaluate button, depth dropdown, undo button, and move display.
Mobile: Only Evaluate is fixed; others are hidden or accessible via scroll.
Web: All controls are visible.
Loading & Alert Components:
Loading indicator (spinner or text-based).
Basic text alerts for error messages.
Evaluation Result Component:
Displays:
Numeric evaluation score.
Best move as a clickable hyperlink.
Evaluation score after the best move.

### 3.3 Data Flow & State Management

State Management:

Use React’s Context API or Redux (if needed) to manage global state.
Maintain the board state in FEN notation.
Persist depth selection using AsyncStorage (mobile) or localStorage (web).
Evaluation Data Flow:

Pass the current board state to Stockfish (run locally, potentially in a Web Worker for the web version).
Retrieve evaluation data:
Current evaluation score.
Best move (algebraic notation).
Evaluation after the best move.
Image Upload Handling:

Use a standard REST API (POST) to send images to the remote server.
Expect a JSON response with the detected board state.

## 4. Error Handling Strategies

Evaluation Timeout:

Implement a 10-second timer.

If evaluation exceeds 10 seconds, cancel the operation and display:

"Evaluation took too long. Try a lower depth."

Image Processing Errors:

If offline when attempting to process an image, display:

"Image processing requires an internet connection. Please connect to continue."

If the image quality is poor, display the detected board along with a warning message.

General Errors:

Use basic text alerts to notify users of unexpected errors (network issues, state failures, etc.).
Ensure alerts are user-friendly and instructive.

## 5. Testing Plan

### 5.1 Unit Testing

Component Tests:
Test board rendering and piece placement logic.
Verify that tapping cycles through the correct sequence.
Test undo functionality to ensure the board reverts correctly.
Evaluation Logic:
Unit test integration with Stockfish (using mocks where necessary).
Validate that evaluation returns the correct best move and scores.
State Persistence:
Ensure the selected depth persists across app restarts.

### 5.2 Integration Testing

Core Workflow:
Simulate full user flows:
Board setup → Evaluation → Click best move → Board update → Re-evaluation.
Error Handling:
Simulate delayed responses from Stockfish to test timeout behavior.
Test image upload failure scenarios (offline mode, poor image quality).
Cross-Platform Testing:
Verify consistent UI rendering on both mobile (Expo) and web.

### 5.3 End-to-End (E2E) Testing

User Interaction:
Use Detox (for mobile) and Cypress (for web) to simulate real user interactions.
Validate that the Evaluate button, depth dropdown, and clickable move links function as expected.
Offline Scenarios:
Test offline mode by simulating network disconnections and verifying that offline functionalities work properly.

## 6. Deployment Considerations

### 6.1 Mobile App:

Build using Expo’s build service for iOS and Android.
Prepare for app store submissions once testing is complete.

### 6.2 Web App:

Deploy via static hosting platforms (e.g., Vercel, Netlify) using the Expo web build.

### 6.3 Code Sharing & CI/CD:

Maintain a single codebase using Expo with React Native Web.
Set up CI/CD pipelines to run tests for both mobile and web builds.
