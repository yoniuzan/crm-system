import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Constants } from 'src/app/crm-common/constants/languages/contstans';
import { Language } from 'src/app/crm-common/enums';
import { LanguageService } from 'src/app/services/common/language.service';

@Component({
    selector: 'preloader-dialog',
    standalone: true,
    imports: [MatProgressSpinnerModule, CommonModule],
    templateUrl: './preloader-dialog.component.html',
    styleUrls: ['./preloader-dialog.component.scss']
})
export class PreloaderDialogComponent implements OnInit {
    public isRTL: boolean;
    public RTLLanguage: Language[] = Constants.RTLLanguage;

    constructor(private _langService: LanguageService, private renderer: Renderer2, private el: ElementRef) {
        const selectedLanguage = this._langService.getLang();
        this.isRTL = this.RTLLanguage.includes(selectedLanguage);
    }

    public ngOnInit(): void {

        // Apply the custom class to the mat-spinner element
        this.isRTL ? this.renderer.addClass(this.el.nativeElement, 'rtl-spinner') : this.renderer.removeClass(this.el.nativeElement, 'rtl-spinner');
    }
}
