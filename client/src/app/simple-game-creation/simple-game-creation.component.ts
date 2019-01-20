import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-simple-game-creation',
  templateUrl: './simple-game-creation.component.html',
  styleUrls: ['./simple-game-creation.component.css']
})
export class SimpleGameCreationComponent implements OnInit {

  constructor() { }
  
  @Output() public closeForm=new EventEmitter();
  
  ngOnInit() {
  }

  close(){
    this.closeForm.emit(false);
  }

}
