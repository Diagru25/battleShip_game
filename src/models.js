const model = {
    sizeBoard: 7,
    numShip: 3,
    shipLength: 3,
    shipSunk: 0,
    guesses: 0,
    ships: [
        { positions: ["10", "20", "30"], hit: ["", "", ""] },
        { positions: ["11", "21", "31"], hit: ["", "", ""] },
        { positions: ["12", "22", "32"], hit: ["", "", ""] }
    ],
    displayMessage: function (content) {
        let area = document.getElementsByClassName("messageArea");
        area[0].innerHTML = content;
    },
    displayHit: function (id) {
        let item = document.getElementById(id);

        item.setAttribute("class", "hit");
    },
    displayMiss: function (id) {
        let item = document.getElementById(id);

        item.setAttribute("class", "miss");
    },
    standardized: function (guess) {
        let chars = ["A", "B", "C", "D", "E", "F", "G"];

        if (guess.length !== 2) {
            this.displayMessage("Length of input have to equal 2!");
            return null;
        }
        else {
            let row = chars.indexOf(guess.charAt(0).toUpperCase());
            let col = guess.charAt(1);

            if (isNaN(row) || isNaN(col)) {
                this.displayMessage("Input's not correct! example: A0, B1, ...")
                return null;
            }
            else if (row < 0 || row > this.sizeBoard || col < 0 || col > this.sizeBoard) {
                this.displayMessage("Input's out of range!")
                return null;
            }
            else {
                return "" + row + col;
            }
        }
    },
    isSunk: function (ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hit[i] !== "HIT") {
                return false;
            }
        }
        return true;
    },
    fire: function (position) {

        for (var i = 0; i < this.numShip; i++) {
            let ship = this.ships[i];
            let index = ship.positions.indexOf(position);

            if (index >= 0) {

                ship.hit[index] = "HIT";
                this.displayHit(position);
                this.displayMessage("HIT!");

                if (this.isSunk(ship)) {
                    this.shipSunk++;
                    this.displayMessage("You are sunk my battleShip!");
                }

                return true;
            }
        }
        this.displayMiss(position);
        this.displayMessage("MISS!");
        return false;

    },
    run: function (guess) {

        let position = this.standardized(guess);

        if (position) {

            this.fire(position);
            this.guesses++;

            if (this.numShip === this.shipSunk) {
                this.displayMessage("You sunk all my battleShip in " + this.guesses + " guesses!");
            }
        }
    }
};

export default model;