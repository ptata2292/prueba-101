import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ArrayHelperService {

  constructor() { }

  sum(data: Array<number>){
    let total = 0;
    if(data){
      data.forEach(i => total += i);
    }
    return total;
  }
  
  groupBy<El,Res,TOT>(data:Array<El>, key: string | ((element:El) => string), value?: (element:El) => Res, total?: (element:Array<El>) => TOT){
    let isKeyFunction = key && typeof(key) === 'function';
    let isValueFunction = value && typeof(value) === 'function';
    let isTotalFunction = total && typeof(total) === 'function';
    let keyFunc = <(element:El) => any>key; 
    const groupedObj = data.reduce((prev, cur)=> {
      if(isKeyFunction){
        (prev[keyFunc(cur)] = prev[keyFunc(cur)] || []).push(cur);
      }
      else {
        (prev[cur[<string>key]] = prev[cur[<string>key]] || []).push(cur);
      }
      
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => ({ key, value: isValueFunction ? (<Array<El>>groupedObj[key]).map(el => value(el)) : (<Array<El>>groupedObj[key]), total: isTotalFunction ? total((<Array<El>>groupedObj[key])) : null }));
  }
  
  sortBy<El>(data: Array<El>, valFunc: Array<(el: El) => number>, dir?: 'asc' | 'desc'): Array<El> {
    let multiplier = (dir || "asc") === "asc" ? 1 : -1;
    return data.sort((a, b) => {
      let aValue = 0;
      let bValue = 0;
      valFunc.every(val => {
        aValue = val(a) * multiplier;
        bValue = val(b) * multiplier;
        if (aValue !== bValue){
          return false;
        }
      });
      let result = aValue > bValue ? 1 : aValue === bValue ? 0 : -1 
      return result;
    });
  }
  
  removeMatching<El>(data: Array<El>, match: (item: El) => Boolean): Array<El>{
    let result: Array<El> = data.reduce((p,c) => (!match(c) && p.push(c),p),[]);
    return result;
  }
}
