import { Game } from "../index";


describe("Tic-Tac-Toe Game", () => {
  console.log(process.env.NODE_ENV);
  it("should work correctly", () => {
    expect(true).toBe(true);
  });

  describe("given a full board with X as the winner", () => {
    const game = new Game();
    game.makeMove({ player: "X", coord: [0, 0] });
    game.makeMove({ player: "O", coord: [1, 0] });
    game.makeMove({ player: "X", coord: [2, 0] });
    game.makeMove({ player: "O", coord: [0, 1] });
    game.makeMove({ player: "X", coord: [1, 1] });
    game.makeMove({ player: "O", coord: [2, 1] });
    game.makeMove({ player: "X", coord: [1, 2] });
    game.makeMove({ player: "O", coord: [0, 2] });
    game.makeMove({ player: "X", coord: [2, 2] });

    it("should report X as the winner", () => {
      const winner = game.getWinner();
      expect(winner).toBe("X");
    });

    it("should report no moves are left", () => {
      const movesLeft = game.anyMovesLeft();
      expect(movesLeft).toBe(false);
    });
  });

  describe("given a full board with no winner", () => {
    const game = new Game();
    game.makeMove({ player: "X", coord: [0, 0] });
    game.makeMove({ player: "O", coord: [1, 0] });
    game.makeMove({ player: "X", coord: [2, 0] });
    game.makeMove({ player: "O", coord: [1, 1] });
    game.makeMove({ player: "X", coord: [0, 1] });
    game.makeMove({ player: "O", coord: [2, 1] });
    game.makeMove({ player: "X", coord: [1, 2] });
    game.makeMove({ player: "O", coord: [0, 2] });
    game.makeMove({ player: "X", coord: [2, 2] });

    it("should report no winner", () => {
      const winner = game.getWinner();
      expect(winner).toBeNull();
    });

    it("should report no moves are left", () => {
      const movesLeft = game.anyMovesLeft();
      expect(movesLeft).toBe(false);
    });
  });

  describe("given a new game", () => {
    it("should report correct state as the game progresses", () => {
      const game = new Game();
      game.makeMove({ player: "X", coord: [0, 0] });
      expect(game.turn).toBe("O");
      expect(game.anyMovesLeft()).toBe(true);
      expect(game.getWinner()).toBeNull();

      game.makeMove({ player: "O", coord: [0, 1] });
      expect(game.turn).toBe("X");
      expect(game.anyMovesLeft()).toBe(true);
      expect(game.getWinner()).toBeNull();

      game.makeMove({ player: "X", coord: [1, 0] });
      expect(game.turn).toBe("O");
      expect(game.anyMovesLeft()).toBe(true);
      expect(game.getWinner()).toBeNull();

      game.makeMove({ player: "O", coord: [0, 2] });
      expect(game.turn).toBe("X");
      expect(game.anyMovesLeft()).toBe(true);
      expect(game.getWinner()).toBeNull();

      game.makeMove({ player: "X", coord: [2, 0] });
      expect(game.turn).toBe("O");
      expect(game.anyMovesLeft()).toBe(true);
      expect(game.getWinner()).toBe("X");
    });

    it("should reject a move made by a player out of turn", () => {
      const game = new Game();
      expect(() => game.makeMove({ player: "X", coord: [0, 0] })).not.toThrow();
      expect(() => game.makeMove({ player: "X", coord: [0, 1] })).toThrow();
      expect(() => game.makeMove({ player: "O", coord: [0, 1] })).not.toThrow();
    });

    it("should reject a move out of bounds", () => {
      const game = new Game();
      // Need TypeScript to ignore this as it is a compile time error.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(() => game.makeMove({ player: "X", coord: [5, -2] })).toThrow();
    });
  });

});
