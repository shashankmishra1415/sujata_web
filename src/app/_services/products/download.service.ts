import { Injectable } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  downloadData(data: any, fileName: string, fileType: string) {
    if (fileType === 'application/pdf') {
      this.downloadPDF(data, fileName);
    } else {
      const blob = new Blob([data], { type: fileType });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  }

  private downloadPDF(data: any, fileName: string) {
    const pdf = new jspdf();

    this.convertBackgroundImagesToImgElements(data).then((modifiedData) => {
      html2canvas(modifiedData, { scale: 2, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // Adjust these values based on your PDF layout
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save(fileName);
      });
    });
  }

  private convertBackgroundImagesToImgElements(data: any): Promise<any> {
    // Convert background images to img elements
    const promises:any = [];

    const elementsWithBackgroundImages = data.querySelectorAll('[style*="background-image"]');
    elementsWithBackgroundImages.forEach((element: HTMLElement) => {
      const backgroundImageStyle = element.style.backgroundImage;
      const imageUrl = backgroundImageStyle.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');

      const imgElement = new Image();
      imgElement.src = imageUrl;

      const imgPromise = new Promise<void>((resolve) => {
        imgElement.onload = () => {
          element.style.backgroundImage = `none`;
          element.appendChild(imgElement);
          resolve();
        };
      });

      promises.push(imgPromise);
    });

    return Promise.all(promises).then(() => data);
  }
}
