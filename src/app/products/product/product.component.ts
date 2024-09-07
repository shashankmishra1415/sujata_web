import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  currItem = 0;
  id: number = 0;
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {

        if (params["id"]) {
          this.id = params["id"];
        }
      }
    );
  }

  stepActivated(e: boolean, num: number) {
    if (e) {
      this.currItem = num;
    }
  }
}
