import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import readLineSync from "readline-sync";

type Player = "X" | "O";
type Index = 0 | 1 | 2;
type Coord = [Index, Index];

interface Move {
  player: Player;
  coord: Coord;
}

type Board = [
  [Player | null, Player | null, Player | null],
  [Player | null, Player | null, Player | null],
  [Player | null, Player | null, Player | null],
];

class MoveInputError extends Error { }

/**
 * Handles the game's state.
 */
export class Game {
  turn: Player = "X";
  boardState: Board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];


  /**
   * Makes a move on the game's board.
   * @param move
   */
  makeMove(move: Move) {
    // Is a move valid?
    const valid = this.isMoveValid(move);
    const { player, coord: [x, y] } = move;

    // Set the player's mark to this spot on the board.
    if (valid) {
      this.boardState[y][x] = player;
    }

    // Flip the turn.
    this.turn = this.turn === "X" ? "O" : "X";
  }


  /**
   * Helper function confirms if a move that is being made is acceptable.
   * Throws MoveInputError with reasons if not.
   * @param Move
   * @throws MoveInputError
   * @returns boolean
   */
  isMoveValid({ player, coord: [x, y] }: Move) {
    const errors: string[] = [];

    if (player !== this.turn) {
      errors.push(`${player} cannot play, it is ${this.turn}'s turn`);
    }
    if (x > 2 || x < 0 || y > 2 || y < 0) {
      errors.push(`Coordinates ${x} ${y} are not valid!`);
    }
    if (this.boardState[y][x] !== null) {
      errors.push(`Player ${this.boardState[y][x]} already selected ${x} ${y}!`);
    }

    if (errors.length !== 0) {
      throw new MoveInputError(`Move not accepted:\n  ${errors.join("\n  ")}`);
    }

    return true;
  }


  /**
   * Checks the boardState for a potential winner. If there is none, it will
   * return null. If there is a winner, it'll return the Player.
   * @returns the Player who won; else null
   */
  getWinner() {
    const winning = [
      // Horizontal streaks.
      this.checkStreak([0, 0], [1, 0], [2, 0]),
      this.checkStreak([0, 1], [1, 1], [2, 1]),
      this.checkStreak([0, 2], [1, 2], [2, 2]),

      // Vertical streaks.
      this.checkStreak([0, 0], [0, 1], [0, 2]),
      this.checkStreak([1, 0], [1, 1], [1, 2]),
      this.checkStreak([2, 0], [2, 1], [2, 2]),

      // Diagonal streaks.
      this.checkStreak([0, 0], [1, 1], [2, 2]),
      this.checkStreak([2, 0], [1, 1], [0, 2]),
    ];

    for (const check of winning) {
      if (typeof check !== "boolean") {
        return check;
      }
    }
    return null;
  }


  /**
   * Takes three spots and checks to see if they're made by the same player.
   * @param param0 first spot
   * @param param1 second spot
   * @param param2 third spot
   * @returns If a player won they will be returned; else false.
   */
  checkStreak([x0, y0]: Coord, [x1, y1]: Coord, [x2, y2]: Coord) {
    // Get the three moves we're checking.
    const m0 = this.boardState[y0][x0];
    const m1 = this.boardState[y1][x1];
    const m2 = this.boardState[y2][x2];

    if (m0 !== null && m0 === m1 && m1 === m2) {
      return m0;
    }
    return false;
  }


  /**
   * Determines if there are any moves remaining (blank spots on the board)
   * @returns
   */
  anyMovesLeft() {
    return this.boardState.some(row => row.some(col => col === null));
  }

  renderBoard() {
    let render = "";
    this.boardState.forEach(row => {
      render += `${row.map(s => s ?? "-").join(" , ")}\n`;
    });
    return render;
  }
}

/**
 * Contains functions for the UX.
 */
class UI {
  /**
   * We name each player, going of the X or O.
   * @param player
   * @returns
   */
  static getPlayerName(player: Player) {
    return player === "X" ? "Player 1" : "Player 2";
  }

  /**
   * Using readLineSync we're able to parse the input of a user easily and return
   * their desired Move.
   * @param game
   * @returns
   */
  static promptInput(game: Game): Move {
    const playerName = this.getPlayerName(game.turn);
    console.info(`${playerName} (${game.turn}) where would you like to move?`);
    console.info("");
    const moveInput = readLineSync.question(">", {
      limit: /[012] [012]/,
      limitMessage: "Write \"<COL> <ROW>\" with 0, 1, or 2.\n  Ex: \"1 2\" or \"0 0\"",
    });
    console.info("");

    // A little coercion never hurt anyone.
    const coord: Coord = [<Index>Number(moveInput[0]), <Index>Number(moveInput[2])];

    return { player: game.turn, coord };
  }

  /**
   * Takes a Move and performs it.
   * Any errors thrown during this action will print output.
   * @param game
   * @param move
   */
  static performMove(game: Game, move: Move) {
    try {
      game.makeMove(move);
    } catch (error: unknown) {
      if (error instanceof MoveInputError) {
        console.error(chalk.red(error.message + "\n"));
      } else {
        throw error;
      }
    }
  }

  /**
   * When a winner has been found, report it!
   * @param winner
   */
  static printWinner(winner: Player) {
    console.log(chalk.yellow(`Congrats ${this.getPlayerName(winner)}, you won!\n\n`));
  }

  /**
   * When all moves have been exhausted and there is no winner, we can call "cat's game".
   */
  static printCatsGame() {
    console.log(chalk.blueBright("Cat's game! No one wins!\n\n"));
  }

  /**
   * Render and print the board to the console.
   * @param game
   */
  static drawBoard(game: Game) {
    // Render and print the board.
    console.log(game.renderBoard());
  }

  static welcomeScreen(game: Game) {
    clear();
    console.log(chalk.red(figlet.textSync("Tic-Tac-Toe", { horizontalLayout: "full" })));
    console.log("Welcome! Here is your board:\n\n");
    this.drawBoard(game);
  }
}


/**
 * It's main! We all love main, don't we folks!
 */
function main() {
  const game = new Game();

  UI.welcomeScreen(game);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const winner = game.getWinner();
    if (winner !== null) {
      UI.printWinner(winner);
      process.exit(0);
    }

    if (!game.anyMovesLeft()) {
      UI.printCatsGame();
      process.exit(0);
    }

    // Get the user's input and perform the move.
    const coord = UI.promptInput(game);
    UI.performMove(game, coord);

    // Show the updated board.
    UI.drawBoard(game);
  }

}

/**
 * Do not run main() when jest is testing.
 */
if (process.env.NODE_ENV !== "test") {
  main();
}
