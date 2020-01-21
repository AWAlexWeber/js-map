class Terrain extends Unit {

    constructor(name, type, icon, x, y, moveCost) {
        super(name, type, icon, x, y);

        this.moveCost = moveCost;
    }
}