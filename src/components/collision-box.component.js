class CollisionBox extends Component {
    constructor (x, y, width, height, fromCenter) {
        super(null,x,y);
        this.width = width;
        this.height = height;
        this.fromCenter = fromCenter;
    }

    containsX (x, width) {
        if (this.fromCenter) {
            return CollisionBox.betweenCenter(x, width, this.x, this.x + this.width);
        } else {
            return CollisionBox.betweenRectRange(x, width, this.x, this.x + this.width);
        }
    }

    containsY (y, height) {
        if (this.fromCenter) {
            return CollisionBox.betweenCenter(y, height, this.y, this.y + this.height);
        } else {
            return CollisionBox.betweenRectRange(y, height, this.y, this.y + this.height);
        }
    }

    static betweenCenter (target, diameter, bound1, bound2) {
        let rightEdge = target + (diameter / 2);
        if (target - (diameter / 2) < bound1) {
            return false;
        }
        if (rightEdge > bound2) {
            return false;
        }
        return true;
    }

    static betweenRectRange (target, length, bound1, bound2) {
        if (target < bound1) {
            return false;
        }
        if (target + length > bound2) {
            return false;
        }
        return true;
    }

    contains (x, y, width, height) {
        return this.containsX(x, width) && this.containsY(y, height);
    }

    toString () {
        return `Box { ${this.x}, ${this.y}, ${this.width}, ${this.height} }`;
    }
}