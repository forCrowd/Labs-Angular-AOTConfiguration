import { Component } from "@angular/core";

@Component({
    selector: "app",
    template: `
        <p>
            <label for="Name">Enter your name:</label>
            <input id="Name" name="Name" type="text" [(ngModel)]="name" />
        </p>
        <hr />
        <p>
            Hello {{ name }}
        </p>
`
})
export class AppComponent {
    name: string = "guest";
}
