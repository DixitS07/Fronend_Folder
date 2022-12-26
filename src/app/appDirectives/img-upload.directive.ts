import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appImgUpload]'
})
export class ImgUploadDirective {
  imgdiv!:any;
  constructor() { }
  @HostListener('mouseenter',['$event']) onChanges(event:any){
    console.log(event,'mouse enter')
    this.imgUploadfn(event)
  }
  @HostListener('mouseleave',['$event']) onOut(event:any){
    console.log(event,'on release')
    this.imgdiv = event.target
    this.imgdiv.style.backgroundColor= 'white';
    this.imgdiv.style.zIndex= 0; 
  }
  imgUploadfn(event:any){
    this.imgdiv = event.target
    console.log(this.imgdiv,'from img files div')
    this.imgdiv.style.backgroundColor= 'rgba(0, 0, 0, 0.5)';
    this.imgdiv.style.zIndex= 1; 
  }
}
