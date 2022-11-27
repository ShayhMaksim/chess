export class Chess {
    name;
    constructor(name) {
        this.name = name;
    }
    step() {

    }
    name() {
        return this.name;
    }
}

export class Pawn extends Chess {
    position;
    constructor(name, position) {
        super(name);
        this.position = position;
    }

    step() {
      
    }
}

export class King extends Chess {
    step() {

    }
}

export class Bishop extends Chess {
    step() {

    }
}

export class Queen extends Chess {
    step() {

    }
}

export class Knight extends Chess {
    step() {

    }
}

export class Rook extends Chess {
    step() {

    }
}