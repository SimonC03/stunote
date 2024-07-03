declare module 'pdfobject' {
    const PDFObject: {
      embed: (url: string, target: HTMLElement | string) => void;
    };
    export default PDFObject;
  }
  