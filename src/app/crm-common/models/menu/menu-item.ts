export class MenuItem {
    public IconName: string;
    public Text: string;
    public RouterLink: string;
   
    constructor(iconName: string, text: string, routerLink: string) {
        this.IconName = iconName;
        this.Text = text;
        this.RouterLink = routerLink;
    }
}