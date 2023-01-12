export class MenuItem {
    IconName: string;
    Text: string;
    RouterLink: string;
   
    constructor(iconName: string, text: string, routerLink: string) {
        this.IconName = iconName;
        this.Text = text;
        this.RouterLink = routerLink;
    }
}