import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  @Input() placeholder: string = "Input text";
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchText: string = "";

  constructor() {}

  ngOnInit(): void {}

  onSearch(): void {
    this.search.emit(this.searchText);
  }
}
