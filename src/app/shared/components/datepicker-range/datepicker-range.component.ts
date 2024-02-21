import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.css']
})

export class DatepickerRangeComponent {
  @Input() public searchFormGroup: FormGroup;
  @Input() public click: any;
  @Input() public isSubmitted: boolean;
  @Input() public isSearchPage: boolean;
  @Input() public name;

  @ViewChild('datepicker', { static: false }) private inputDatepicker;

  @HostListener('mousedown', ['$event'])
  mouseEvent(event) {
    if (event.target.offsetParent.tagName !== 'NGB-DATEPICKER') {
      if (this.inputDatepicker != null) {
        if (this.searchFormGroup.value.end == '') {
          let json = this.searchFormGroup.value;
          json.end = this.getNextDate(json.start);
          this.toDate = this.calendar.getNext(this.fromDate, 'd', 1);
          this.searchFormGroup.patchValue(json);
        }
        this.close();
        this.startDateChange(null);
        this.endDateChange(null);
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "Escape") {
      if (this.inputDatepicker != null) {
        if (this.searchFormGroup.value.end == '') {
          let json = this.searchFormGroup.value;
          json.end = this.getNextDate(json.start);
          this.toDate = this.calendar.getNext(this.fromDate, 'd', 1);
          this.searchFormGroup.patchValue(json);
        }
        this.close();
        this.startDateChange(null);
        this.endDateChange(null);
      }
    }
  }
  
  
  private excludedIds = ["dFlex", "startDate", "startLabel", "startValue", "startDateInput", "endDate", "endLabel", "endValue", "endDateInput"];
  private excludedClasses = ["fa-calendar-alt", "custom-select", "ngb-dp"];
  private docClickSubscription: any;
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  minDate: NgbDate | null;
  readonly DELIMITER = '-';

  constructor(private calendar: NgbCalendar, private renderer: Renderer2, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);
    this.minDate = calendar.getToday();
  }

  ngOnInit(): void {
    this.docClickSubscription = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
    let fromDate = this.fromModel(this.searchFormGroup.value.start);
    this.fromDate = fromDate == null ? this.calendar.getToday() : fromDate;
    let endDate = this.fromModel(this.searchFormGroup.value.end);
    this.toDate = endDate == null ? this.calendar.getNext(this.calendar.getToday(), 'd', 1) : endDate;
  }

  public ngOnDestroy(): void {
    this.docClickSubscription();
  }

  private onDocumentClick(event: any): void {
    //console.log(event.target.id);
    //console.log(event.target.className);
    if (event.target.className.indexOf("custom-day") != -1) {
      // console.log("mat-calendar clicks");
      if (this.fromDate && this.toDate) {
        this.startDateChange(null);
        this.endDateChange(null);
      }
    } else if (event.target.className.indexOf("cdk-overlay-backdrop") != -1) {
      // console.log("overlay clicks");
      this.startDateChange(null);
      this.endDateChange(null);
    } else {
        if (!this.click.start || !this.click.end) {
          if (this.excludedIds.indexOf(event.target.id) == -1 && !this.isExcludedClass(event.target.className)) {
            this.changeEndValue();
            this.startDateChange(null);
            this.endDateChange(null);
          }
        }
    }
  }

  private detectClickChanges() {
    let isChanged = false;
    for (let key in this.click) {
      if (key != 'start' && key != 'end') {
        isChanged = this.click[key] ? false : true;
        if (isChanged) {
          break;
        }
      }
    }
    return isChanged;
  }

  private changeEndValue() {
    if (this.searchFormGroup.value.end == '' && this.searchFormGroup.value.start != '') {
      let json = this.searchFormGroup.value;
      json.end = this.getNextDate(json.start);
      this.toDate = this.calendar.getNext(this.fromDate, 'd', 1);
      this.searchFormGroup.patchValue(json);
    }
  }

  private isExcludedClass(className) {
    let isExcluded = false;
    for (let excldClass of this.excludedClasses) {
      isExcluded = className.indexOf(excldClass) != -1;
      if (isExcluded) {
        break;
      }
    }
    return isExcluded;
  }

  private getNextDate(date) {
    return date ? new Date(date.getTime() + 1000 * 60 * 60 * 24) : null;
  }

  public toggle() {
    this.inputDatepicker.toggle();
  }

  public close() {
    this.inputDatepicker.close();
  }

  public open() {
    let self = this;
    setTimeout(
      () => {
        if (self.inputDatepicker != null) {
          self.inputDatepicker.open();
        }
      },
      50
    );
  }

  onDateSelection(date: NgbDate) {
    let json = this.searchFormGroup.value;
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      json.start = this.toModel(date);
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      json.end = this.toModel(date);
      this.changeView();
    } else {
      this.toDate = null;
      this.fromDate = date;
      json.end = '';
      json.start = this.toModel(date);
    }
    this.searchFormGroup.patchValue(json);
  }

  changeView() {
    this.click.start = true;
    this.click.end = true;
    this.close();
  }

  fromModel(date: Date): NgbDate {
    date = typeof(date) == "object" ? date : new Date(date);
    return date ? new NgbDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ) : null;
  }

  toModel(date: NgbDateStruct): Date {
    return date ? new Date(date.year, date.month - 1, date.day, 0, 0, 0) : null;
  }

  startDateChange(type: string) {
    if (!this.searchFormGroup.get('start').hasError('required')) {
      this.click.start = true;
    }
  }

  endDateChange(type: string) {
    if (!this.searchFormGroup.get('end').hasError('required')) {
      this.click.end = true;
    }
  }

  clickChange(objType, isOpen = true) {
    if (isOpen) {
      // console.log('clickChange');
      if (this.click.start && this.click.end) {
        this.click.start = false;
        this.click.end = false;
        this.open();
      }
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  format(date: NgbDateStruct | null): string {
    console.log(new Date(date.year, date.month - 1, date.day))
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}
