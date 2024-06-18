import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-pdf-view',
  templateUrl: './user-pdf-view.component.html',
  styleUrls: ['./user-pdf-view.component.scss']
})
export class UserPdfViewComponent implements OnInit {
  pdfUrl: SafeResourceUrl | null = null;

  constructor(private userService: UserService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadPdf();
  }

  loadPdf() {
    this.userService.getPdf().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }
}
