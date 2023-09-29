String.prototype.isValidEmail = function (this: string): boolean {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return regex.test(this);
};

String.prototype.minLength = function(this: string, len: number): boolean {
    return this.length >= len;
};

String.prototype.onlyLetters = function(this: string): string {
    return this.replace(/['\- ]/gi, '');
};

// String.prototype.replaceAll = function(this: any, search: any, replacement: string): string {
//     return this.replace(new RegExp(search, 'g'), replacement);
// };

String.prototype.titleCase = function(this: string): string {
    const str = this.toLowerCase().split(' ');
    for (let i = 0; i < str.length; i++) 
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    
    return str.join(' ');
};

String.prototype.toVersion = function(this: string): number {

    /*  
        converting the version a.b.c to value.
        value = c * 100^1 + b * 100^2 + a * 100^3
    */
    const arr = this.split('.');
    const reverseArray = arr.slice(0).reverse();
    let versionValue = 0;

    for (let i = 0; i < reverseArray.length; i++) 
        versionValue += parseInt(reverseArray[i]) * (Math.pow(100, i + 1));

    return versionValue;
};
