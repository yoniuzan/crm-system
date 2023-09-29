// import { environment } from "src/environments/environment";

Date.prototype.addMonths = function (this: Date, months: number): Date {

    const d = new Date(this);
    const years = Math.floor(months / 12);
    const nmonths = months - (years * 12);
    if (years) d.setFullYear(d.getFullYear() + years);
    if (nmonths) d.setMonth(d.getMonth() + nmonths);

    return d;
};

Date.prototype.diffFromNow = function (this: Date): number {
    return this.getTime() - new Date().getTime();
};

Date.prototype.addDays = function (this: Date, days: number): Date {
    const d = new Date(this);
    d.setDate(d.getDate() + days);

    return d;
};

Date.prototype.LanguageVersion = function (this: Date): string {
    
    // if (!environment.production)
    //     return Date.now().toString();
    
    return this.toISOString().substring(0, 10).replaceAll('-', '');

};

Date.prototype.ConfigVersion = function (this: Date): string {

    // if (!environment.production)
    //     return Date.now().toString();

    return this.toISOString().substring(0, 10).replaceAll('-', '');
};

Date.prototype.WeekandYear = function (this: Date): string {
    return this.getWeekNumber().toString() + this.getFullYear();
};

Date.prototype.getWeekNumber = function (this: Date): number {
    const onejan = new Date(this.getFullYear(), 0, 1);

    return Math.ceil((((this.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);

};

Date.prototype.addMilliseconds = function (this: Date, miliSeconds: number): Date {
    return new Date(this.valueOf() + miliSeconds);
};

Date.prototype.dateToLeftConvert = function (this: Date, milliSecondsLeft: number): { days: number, hours: number, minutes: number, seconds: number } {
    let h, m, s;
    s = Math.floor(milliSecondsLeft / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    const d = Math.floor(h / 24);
    h = h % 24;

    return { days: d, hours: h, minutes: m, seconds: s };
};
