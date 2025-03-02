export class Piece{//valid for all types piece except king
    constructor(color, type, position){
        this.color = color;
        this.type = type;
        this.position = position;
    }
    move(){
    
    }
}

export class King{
    constructor(color, position){
        super(color, 'king', position);
    }
    move(){
        //move king according to rules
    }
}