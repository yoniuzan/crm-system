export class MenuItem {
    public IconName: string;
    public Text: string;
    public RouterLink: string;
    public IsActive: boolean;
   
    constructor(iconName: string, text: string, routerLink: string, isActive: boolean) {
        this.IconName = iconName;
        this.Text = text;
        this.RouterLink = routerLink;
        this.IsActive = isActive;
    }
}