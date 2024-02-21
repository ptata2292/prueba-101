import * as equal from "fast-deep-equal";
import { Observable, combineLatest } from "rxjs";
import { debounceTime, map, startWith } from "rxjs/operators";

export function dirtyCheck<U>(source: Observable<U>) {
  return function<T>(valueChanges: Observable<T>): Observable<boolean> {
    
    const isDirty$ = combineLatest(
      [source,
      valueChanges]
    ).pipe(
      debounceTime(300),
      map(([a, b]) => equal(a, b) === false),
      startWith(false),
    );

    return isDirty$;
  };
}