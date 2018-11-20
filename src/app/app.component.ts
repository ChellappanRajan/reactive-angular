import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { fromEvent, Observable, merge } from 'rxjs';
import { map, filter, scan, startWith ,mapTo} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'drag';
  move: number = 0;
  @ViewChild('LeftBtn') LeftBtn: ElementRef;
  position;
  @ViewChild('RightBtn') RightBtn: ElementRef;

  elementSelector(element) {
    return element.nativeElement;
  }

  decrement(obj,prop,value){

    return Object.assign({},obj,{[prop]:obj[prop] - value})
  }

  increment(obj,prop,value){
    return Object.assign({},obj,{[prop]:obj[prop] + value})
  }
  constructor() {}

  ngOnInit() {
    const leftBtn$ = fromEvent(document, 'keydown').pipe(
      filter(event => event['key'] == 'ArrowLeft'),
      mapTo(position=>this.decrement(position,'x',10))
    )

    const rightBtn$ = fromEvent(
      document,
      'keydown'
    ).pipe(
      filter(event => event['key'] === 'ArrowRight'),
      mapTo(position=>{
        // console.log('position==>',position);
        return this.increment(position,'x',10)
      })
    );
   merge(leftBtn$,rightBtn$)
   .pipe(startWith({x:100,y:100}),
    scan((acc,curr)=> {
      // console.log('Scan==>',acc);
      // console.log("Current",curr)
      return curr(acc);
    })
   ).subscribe(pos=>this.position=pos);





    // //Change the event data into something else in my case change to i am learning rxjs string
    // clkBtn.pipe( map((event)=> 'I am Learning Rxjs' ) ).subscribe((event)=>{
    //   this.move+=10;
    //   console.log(event);
    // });

    //Filter the event
    // rightBtn
    //   .pipe(
    //     // filter(event => event['shiftKey']),
    //     map(event => 10),
    //     startWith({ x: 100, y: 200 }),
    //     scan((acc, curr) => {
    //       return { x: acc['x'] + curr, y: acc['y'] };
    //     })
    //   )
    //   .subscribe(data => {
    //     this.position = data;
    //     console.log(this.position);
    //   });
  }
}
