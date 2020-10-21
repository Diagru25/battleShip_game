/* eslint-disable no-lone-blocks */
const model = {
    sizeBoard: 7,
    numShip: 3,
    shipLength: 3,
    shipSunk: 0,
    guesses: 0,
    ships: [
        { positions: [], hit: ["", "", ""] },
        { positions: [], hit: ["", "", ""] },
        { positions: [], hit: ["", "", ""] }
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
    },
    generateShip: function () {
        let direction = Math.floor(Math.random() * 2);
        let row, col;
        let location = [];

        if (direction === 1) {
            row = Math.floor(Math.random() * (this.sizeBoard - 3));
            col = Math.floor(Math.random() * this.sizeBoard);
        }
        else {
            col = Math.floor(Math.random() * (this.sizeBoard - 3));
            row = Math.floor(Math.random() * this.sizeBoard);
        }

        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                location.push("" + row + (col + i));
            }
            else {
                location.push("" + (row + i) + col)
            }
        }
        return location;
    },
    collision: function (locations) {
        for (var i = 0; i < this.numShip; i++) {
            for (var j = 0; j < locations.length; j++) {
                if(this.ships[i].positions.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    },
    init: function () {
        let locations;
        for (var i = 0; i < this.numShip; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations)) {
                locations = this.generateShip();
            }
            this.ships[i].positions = locations;
        }
        console.log("all ship: ", this.ships);
    }
};

export default model;