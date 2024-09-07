import { Injectable } from '@angular/core';
import { API } from '../../_models/API';
import { WebAPIService } from '../web-api.service';
import { RawMaterialModel, RawMaterialSaveModel } from 'src/app/_models/RawMaterial.model';
import { ComponentModal } from '../../_models/Component.model';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {
  constructor(private webApiService: WebAPIService) { }
  APIName = API.product.APIName + '/' + API.product.rawMaterial.APIName;

  public list(productId: number, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.get(this.APIName.replace('{id}', productId.toString()), null,
      // successCallback
      (response: RawMaterialModel[]) => {
        successCallback(response);
      },
      // errorCallback
      (error: any) => {
        if (errorCallback && typeof (errorCallback) === 'function') {
          errorCallback(error);
        }
      }
    );
  }

  public save(productId: number, rawMaterials: RawMaterialSaveModel[], successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.post(this.APIName.replace('{id}', productId.toString()), rawMaterials,
      // successCallback
      () => {
        successCallback();
      },
      // errorCallback
      (error: any) => {
        if (errorCallback && typeof (errorCallback) === 'function') {
          errorCallback(error);
        }
      }
    );
  }

  public update(productId: number, rowId: number, rawMaterial: RawMaterialSaveModel, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.put(`${this.APIName.replace('{id}', productId.toString())}/${rowId}`, rawMaterial,
      // successCallback
      () => {
        successCallback();
      },
      // errorCallback
      (error: any) => {
        if (errorCallback && typeof (errorCallback) === 'function') {
          errorCallback(error);
        }
      }
    );
  }

  public delete(productId: number, rowIds: number[], successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.Delete(`${this.APIName.replace('{id}', productId.toString())}`, rowIds, null,
      // successCallback
      () => {
        successCallback();
      },
      // errorCallback
      (error: any) => {
        if (errorCallback && typeof (errorCallback) === 'function') {
          errorCallback(error);
        }
      }
    );
  }


  public totalInHouseCost(RawMaterials: RawMaterialModel[], Components: ComponentModal[]): number {
    let total: number = 0

    RawMaterials.filter(x => x.isOutSourced === false).forEach(item => {
      let componentItem = Components.filter(comp => comp.id === item.componentId)[0];
      if (componentItem !== undefined) {
        total += (componentItem.unitPrice + componentItem.componentManufacturingCostTotal) * item.quantity;
      }
    })
    return total;
  }

  public totalOutSourcedCost(RawMaterials: RawMaterialModel[], Components: ComponentModal[]): number {
    let total: number = 0

    RawMaterials.filter(x => x.isOutSourced === true).forEach(item => {
      let componentItem = Components.filter(comp => comp.id === item.componentId)[0];
      if (componentItem !== undefined) {
        total += componentItem.unitPrice * item.quantity;
      }
    })
    return total;
  }

  public inHousePercent(RawMaterials: RawMaterialModel[], Components: ComponentModal[]): number {
    let totalInHouse = this.totalInHouseCost(RawMaterials, Components);
    let totalOutsource = this.totalOutSourcedCost(RawMaterials, Components);

    let total = totalInHouse + totalOutsource;

    let percent = (totalInHouse * 100) / total;
    if (Number.isInteger(percent)) {
      return percent;
    }
    else {
      return +percent.toFixed(2);
    }
  }

  public outSourcePercent(RawMaterials: RawMaterialModel[], Components: ComponentModal[]): number {
    let totalInHouse = this.totalInHouseCost(RawMaterials, Components);
    let totalOutsource = this.totalOutSourcedCost(RawMaterials, Components);

    let total = totalInHouse + totalOutsource;

    let percent = (totalOutsource * 100) / total;
    if (Number.isInteger(percent)) {
      return percent;
    }
    else {
      return +percent.toFixed(2);
    }
  }

  public totalCostByCategoryID(categoryId: number, RawMaterials: RawMaterialModel[], Components: ComponentModal[]): number {
    let total: number = 0

    RawMaterials.filter(x => x.categoryId === categoryId).forEach(item => {
      let componentItem = Components.filter(comp => comp.id === item.componentId)[0];
      if (item.isOutSourced) {
        total += componentItem.unitPrice * item.quantity;
      }
      else {
        total += (componentItem.unitPrice + componentItem.componentManufacturingCostTotal) * item.quantity;
      }
    })
    return total;
  }

  public totalCost(RawMaterials: RawMaterialModel[], Components: ComponentModal[]): number {
    let total: number = 0

    RawMaterials.forEach(item => {
      let componentItem = Components.filter(comp => comp.id === item.componentId)[0];
      if (componentItem !== undefined) {
        if (item.isOutSourced) {
          total += componentItem.unitPrice * item.quantity;
        }
        else {
          total += (componentItem.unitPrice + componentItem.componentManufacturingCostTotal) * item.quantity;
        }
      }
    })
    return total;
  }

  public totalOutsourcedComponentCount(RawMaterials: RawMaterialModel[]): number {
    const uniqueIds: Set<number> = new Set();

    RawMaterials.filter(x => x.isOutSourced === true && x.quantity > 0).forEach((item) => {
      uniqueIds.add(item.componentId);
    });

    return Array.from(uniqueIds).length;
  }

  public totalInHouseComponentCount(RawMaterials: RawMaterialModel[]): number {
    const uniqueIds: Set<number> = new Set();

    RawMaterials.filter(x => x.isOutSourced === false && x.quantity > 0).forEach((item) => {
      uniqueIds.add(item.componentId);
    });

    return Array.from(uniqueIds).length;
  }

  public totalComponentCount(RawMaterials: RawMaterialModel[]): number {
    const uniqueIds: Set<number> = new Set();

    RawMaterials.filter(x => x.quantity > 0).forEach((item) => {
      uniqueIds.add(item.componentId);
    });

    return Array.from(uniqueIds).length;
  }

  public totalOutsourcedComponentQuantity(RawMaterials: RawMaterialModel[]): number {
    const quantityMap = new Map<number, number>();

    // Calculate the sum of quantities
    RawMaterials.filter(x=> x.isOutSourced === true).forEach(item => {
      const { componentId, quantity } = item;
      quantityMap.set(componentId, (quantityMap.get(componentId) || 0) + quantity);
    });

    // Calculate the total quantity across all items
    const totalQuantity = Array.from(quantityMap.values()).reduce((sum, quantity) => sum + quantity, 0);
    return totalQuantity;
  }

  public totalInHouseComponentQuantity(RawMaterials: RawMaterialModel[]): number {
    const quantityMap = new Map<number, number>();

    // Calculate the sum of quantities
    RawMaterials.filter(x=> x.isOutSourced === false).forEach(item => {
      const { componentId, quantity } = item;
      quantityMap.set(componentId, (quantityMap.get(componentId) || 0) + quantity);
    });

    // Calculate the total quantity across all items
    const totalQuantity = Array.from(quantityMap.values()).reduce((sum, quantity) => sum + quantity, 0);
    return totalQuantity;
  }

  public totalComponentQuantity(RawMaterials: RawMaterialModel[]): number {
    const quantityMap = new Map<number, number>();

    // Calculate the sum of quantities
    RawMaterials.forEach(item => {
      const { componentId, quantity } = item;
      quantityMap.set(componentId, (quantityMap.get(componentId) || 0) + quantity);
    });

    // Calculate the total quantity across all items
    const totalQuantity = Array.from(quantityMap.values()).reduce((sum, quantity) => sum + quantity, 0);
    return totalQuantity;
  }
}
