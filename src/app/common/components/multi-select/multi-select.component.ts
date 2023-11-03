import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor {
  @Input('data') options!: any[];
  @Input('bindLabel') label!: string;
  @Input('bindValue') bindValue!: string;
  @Input('isShowTag') isShowTag: boolean = false;

  @ViewChild('searchText') searchText!: ElementRef;

  public optionList: any[] = [];
  public selectedOption: any[] = [];
  public selectAllOption: any = {
    id: 0,
    label: 'Select All',
    selected: false,
  };
  public isSearchText: boolean = false;
  public selectFromSearch: any[] = [];

  onChange!: (value: any) => void;
  onTouch!: () => void;

  ngOnInit(): void {
    // Create a shallow copy of options
    this.optionList = [...this.options];
  }

  writeValue(obj: any): void {
    if (obj) {
      // Add "selected: true" to each selected options.
      this.optionList.forEach((option) => {
        if (obj.includes(option.id)) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      });
    }

    this.selectedOption = this.optionList.filter((option) => option.selected);
    this.isAllSelected();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void;

  /**
   * This method called to set "selected: true" to "Select All" option,
   * while all the options in list are selected.
   */
  isAllSelected() {
    this.selectAllOption.selected = this.optionList.every(
      (option) => option.selected
    );
  }

  /**
   * This method called to update the selectedOption value
   * @param option select/unselect option
   */
  updateSelectedOption(option: any) {
    if (this.isSearchText) {
      if (option.id !== 0) {
        this.selectedOption.forEach((opt) => {
          if (opt.id == option.id) {
            option.selected = false;
          }
        });
      }
      this.selectedOption = this.selectedOption.filter(
        (option) => option.selected
      );

      const selectedOptionList = this.optionList.filter(
        (option) => option.selected
      );
      const selectedValue = new Set([
        ...this.selectedOption,
        ...selectedOptionList,
      ]);

      this.selectedOption = [...selectedValue];
    } else {
      this.selectedOption = this.optionList.filter((option) => option.selected);
    }
  }

  /**
   * This method called to emit the selectedOption data
   */
  emitSelectedOption() {
    // Passed the selected option ids to the form
    const options = this.selectedOption.map((option) => option.id);

    this.onChange(options);
    this.onTouch();
  }

  /**
   * This method called to select/unselect the option from the list
   * @param option: selected/unselected option
   */
  toggleOption(option: any) {
    // Toggle other options
    option.selected = !option.selected;

    if (option.id === 0) {
      // Update all options based on the toggle "Select All" option
      this.optionList.forEach((opt) => (opt.selected = option.selected));
    } else {
      // Uncheck "Select All" if any other option is unchecked
      if (!option.selected) {
        this.selectAllOption.selected = false;
      }
      this.isAllSelected();
    }

    this.updateSelectedOption(option);
    this.emitSelectedOption();
  }

  /**
   * This method called to reset all the options and search
   */
  resetSelection() {
    this.selectAllOption.selected = false;

    this.options.forEach((option) => (option['selected'] = false));
    this.optionList = [...this.options];

    this.searchText.nativeElement.value = '';
    this.selectedOption = [];
    this.onChange([]);
    this.onTouch();
  }

  /**
   * This method called while search the option from list
   * @param search Search text
   */
  onSearch(search: string) {
    const searchStr = search.toLowerCase();
    this.isSearchText = !!searchStr;

    const searchResult = this.options.filter((option) =>
      option[this.label].toLowerCase().includes(searchStr)
    );

    this.optionList = [...searchResult];
    this.isAllSelected();
  }
}
