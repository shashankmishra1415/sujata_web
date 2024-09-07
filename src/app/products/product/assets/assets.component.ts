import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Asset } from 'src/app/_models/assets.model';
import { AssetsService } from 'src/app/_services/products/assets.service';
import { AssetType } from '../../../_models/asset_type.model';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent {
  ProductID: number = 0;
  assetsData: {
    assetTypes: AssetType[],
    data: Asset[]
  } = {
      assetTypes: [],
      data: []
    };
  years = Array(5).fill(0).map((x, i) => i + 1);

  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private assetService: AssetsService, private httpclient: HttpClient) { }

  ngOnInit(): void {
    if (this.route.parent) {
      this.route.parent.params.subscribe(
        (params: Params) => {
          if (params["id"]) {
            this.ProductID = params["id"];
          }
        }
      );
    }
    this.loadData();
  }

  loadData() {
    this.assetService.list(this.ProductID,
      //successCallback
      (data: {
        assetTypes: AssetType[],
        data: Asset[]
      }) => {
        this.assetsData = data;
      }
    )
  }
  // loadData() {
  //   this.assetService.list(
  //     (data: Assets[]) => {
  //       this.assetsData = data;
  //       console.log(this.assetsData)
  //       data.forEach((assetGroup:any) => {
  //         assetGroup.data.forEach((asset:any) => {
  //           const assetType = assetGroup.AssetTypes.find((type: { id: any; }) => type.id === asset.assetTypeID);
  //           const result: { name: string, year: number, value: number }[] = [];
  //           if (assetType) {
  //             result.push({
  //               name: assetType.name,
  //               year: asset.year,
  //               value: asset.value,
  //             });
  //           }
  //           console.log("new array",result);
  //         });
  //       });
  //     }
  //   )
  // }

  getAssetData(assetTypeId: number, year: number): Asset {
    var assets = this.assetsData.data.filter(x => x.assetTypeId === assetTypeId && x.year === year);
    if (assets !== undefined && assets !== null && assets.length > 0) {
      return assets[0];
    }
    else {
      let asset: Asset = {
        assetTypeId: assetTypeId,
        year: year,
        amount: 0
      }
      this.assetsData.data.push(asset);

      return asset;
    }
  }

  getTotalByYear(year: number): number {
    let total = 0;
    let assets = this.assetsData.data.filter(x => x.year === year);
    assets.forEach((asset, assetIndex) => {
      total += +asset.amount;
    })

    return total;
  }

  item_changed(assetTypeId: number, year: number) {
    var assets = this.assetsData.data.filter(x => x.assetTypeId === assetTypeId && x.year === year);
    if (assets !== undefined && assets !== null && assets.length > 0) {
      let asset = assets[0];
      if ((asset.amount !== undefined || null) && asset.amount.toString().trim() !== '' && !Number.isNaN(asset.amount)) {
        this.assetService.save(this.ProductID, asset,
          // successCallback
          () => {
            this.toastr.success('Item successfully updated', 'Assets Process');
            //this.loadData();
          }
        )
      }
    }
  }

  next_click() {
    this.router.navigate(['..', 'depreciation'], { relativeTo: this.route });
  }

  prev_click() {
    this.router.navigate(['..', 'raw-material'], { relativeTo: this.route });
  }
}
