import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import ToolbarView from '@ckeditor/ckeditor5-ui/src/toolbar/toolbarview';
import { File } from '@ionic-native/file/ngx';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
declare var CKEDITOR:any;
//import { CKEDITOR } from 'ckeditor4';
declare var require:any;
import {PdfHandlingService} from "../services/pdf-handling.service";
import {LineSeparatorService} from "../services/line-separator.service";
import {Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import 'hammerjs/hammer';
import PendingActions from '@ckeditor/ckeditor5-core/src/pendingactions';
import PinchZoom from 'pinch-zoom-js'

import * as Editor from 'ckeditor';
import { Platform } from '@ionic/angular';
import { Directive, Inject, ViewContainerRef,ComponentFactoryResolver }
 from '@angular/core';
import { PinchZoomComponent } from 'ngx-pinch-zoom';
//import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave'
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  name = 'ng2-ckeditor';
  ckeConfig: any;
  numberOfLinesPerPage=15;
  log: string = '';
  @ViewChild("editor1") myckeditor: any;
  command: string;
  maxTextWidth=0;
  myGroup:any;
  public Editor = Editor;
  ckEditorInstance:any;
  bodyZoom:any; 
  pageHeight=0;
  screenSize=null;
  textForCurrentPage='';
  mycontent: string='';
  numberOfTimes=0;

  constructor(
        public menuCtrl: MenuController,
        private filePicker: IOSFilePicker,
        private lineSeparatorService: LineSeparatorService,
        private pdfHandlingService:PdfHandlingService,
        private fileTransfer: FileTransfer,
        private file:File,
        public platform:Platform,
        private screenOrientation: ScreenOrientation,
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.myGroup = new FormGroup({
      myckeditor: new FormControl()
   });
   this.screenSize=platform;//.width();
   //this.screenHeight=platform.height();
   
   this.maxTextWidth=this.platform.width()/2;

   this.lineSeparatorService.pageHeight=this.platform.width()*1.1;
   this.screenOrientation.onChange().subscribe(
    () => {
        this.onOrientationChanged();
    }
 );
  }
  onOrientationChanged(){
    if(this.screenOrientation.type=='landscape-primary'){
      this.ckEditorInstance.resize( '100%',''+this.screenSize.height() );
    }else{
      this.ckEditorInstance.resize( '100%', ''+this.screenSize.width() );
    }
  }  
  ngOnInit() {
    //var newText=this.openLocalPdf();//'assets/TestPdf1.pdf'
    var newText='2 Aaaaaaaaaaaaaaaaaa Aaaaaaaaaaaaaaaaaa\\\nBbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb\\\nCcccccccccccc Ccccccccccccc Ccccccccccccc Ccccccccccccc Ccccccccccccc Ccccccccccccc';
    //'2 Aaaaaaaaaaaaaaaaaa Aaaaaaaaaaaaaaaaaa\\\nBbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb\\\nCcccccccccccc Ccccccccccccc Ccccccccccccc Ccccccccccccc Ccccccccccccc Ccccccccccccc';
    this.mycontent=this.lineSeparatorService.displayTextContent(newText,this.maxTextWidth);
    //this.mycontent=this.pdfHandlingService.finalString;
    this.setupCKEditor(); 
  }
  openLocalPdf() {
    let filePath = //this.file.applicationDirectory + 
    'assets';
    this.pdfHandlingService.loadPdf(`${filePath}/TestPdf1.pdf`);
    setTimeout(() => {
      //console.log('this.pdfHandlingService.finalString= '+
      //return
      var newText=this.pdfHandlingService.finalString;
      //this.lineSeparatorService.loadTextContent(newText,0,this.maxTextWidth);
      this.lineSeparatorService.loadTextContent(newText,0,this.maxTextWidth);
      //this.mycontent=this.lineSeparatorService.displayTextContent(newText,this.maxTextWidth);
    }, 1500);
    
      /*.then(finalString => {
        console.log('finalString= '+finalString);
        
      });*/
      
      //'assets/testPdf.pdf');//url
      //this.documentViewer.viewDocument(`${filePath}/TestPdf1.pdf`, 'application/pdf', options);    
  }
  setupCKEditor(){
    var myckeditor=document.getElementById("editor1");
    myckeditor.style.backgroundColor='yellow';//'rgb(134, 170, 234)';
    myckeditor.style.margin='0px';
    
    CKEDITOR.plugins.
    addExternal( 'autosave', '/assets/autosave/autosave/', 'plugin.js' );
    CKEDITOR.plugins.
    addExternal( 'zoom', '/assets/zoom/', 'plugin.js' );
    //myckeditor.style.left='0%';
    this.ckeConfig = { 
      //width:this.platform.width(),
      margin:0,
      //skin:'moono-dark',
      height: this.screenSize.height(),//this.getCurrentHeight(),//
      resize_enabled :true,
      autosave: {
        //messageType: "none"
        autoLoad: true
      },
      allowedContent : true,
      removePlugins:'elementspath,resize',
      extraPlugins: 'divarea,zoom,pagebreak,autosave',// horizontalrule,
      uiColor: '#696969',//kalo'#808080',
      toolbarGroups: [{
                "name": "basicstyles",
                "items":"changeColorButton",
                "groups": ['openMenuButton',"basicstyles",
                "changeColorButton",'cke_18'],
              }],
      toolbar: [
                //Scayt, 'Find', 'Replace', 'SelectAll'] },
                {name: 'basicstyles', 
                items: ['openMenu','Bold', 'Italic',
                'changeColorButton','saveToFileButton','cke_18',
                'zoomEditor']
               },'/',
      ]        
    };
    //var globalChatEditor = CKEDITOR.instances.chatContent;

      //if( event.data.getKeystroke() == 13 ) {
         //globalChatEditor.setData("");
         //globalChatEditor.focus();
         //console.log('onenter');
         //ajaxUpdates();
        // event.data.preventDefault();
        
        
    //CKEDITOR.timestamp='50';
    //this.ckeConfig.timestamp='ABCD';
  }
  getCurrentHeight(){
    if(this.screenOrientation.type=='landscape-primary'){
      return 768;
    }
    return 1024;
    /*var screenSize=this.screenSize;
    var maxHeight=screenSize.height();
    var isLandscape=(screenSize.width()>screenSize.height());
    if(isLandscape){
      maxHeight=screenSize.width();
    }
    return maxHeight;*/
  }
  onReady(event) {
    let ckeditor = event.editor;
    this.ckEditorInstance=ckeditor;
    ckeditor.focus();
    var textArea=document.getElementById("textArea");  
    var newText=textArea.textContent;
    //var newText=' ';
    //'3 Aaaaaaaaaaaaaaaaaa Aaaaaaaaaaaaaaaaaa\\\nBbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb\\\nCcccccccccccc Ccccccccccccc Ccccccccccccc Ccccccccccccc Ccccccccccccc Ccccccccccccc';
    this.lineSeparatorService.loadTextContent(newText,0,this.maxTextWidth);
    this.addZoomPossibility();    
 
     //this.runsAlways();

    //newText='1a Aaaaaaaaaaaaaaaaaa Aaaaaaaaaaaaaaaaaa Aaaaaaaaaaaaaaaaaa Aaaaaaaaaaaaaaaaaa';
    //this.loadTextContent(newText,0);
    
    //this.displayTextContent('');
    //this.setupCKEditor();
    //this.addZoomPossibility();
    /*var mutationObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        console.log('mutation= '+JSON.stringify(mutation));
      });
    });
    // Starts listening for changes in the root HTML element of the page.
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true
    });*/
  }
  runsAlways(){
    setTimeout(() => {
      //var firstDiv=document.getElementById('divEditor');
      //var firstDiv=document.getElementById('page0');
      //var firstDiv = this.ckEditorInstance.editable().$;    
      //console.log('div top= '+firstDiv.);
      if(this.numberOfTimes>5){
        //console.log('hei1');
        this.lineSeparatorService.addPageInTheEnd();
      }else{
        //console.log('hei0');
        this.numberOfTimes++;
        this.runsAlways();
      }
    },500);
  }
  myFunction() {
    console.log('working!!!');
    alert("work");
 }
  addZoomPossibility(){
    var body = this.ckEditorInstance.editable().$;    
    body.firstElementChild.style.margin='10%';
    body.style.backgroundColor='red';//'#C0C0C0';//'rgb(134, 170, 234)';
    body.style.margin='0%';
    
    const componentFactory = this.componentFactoryResolver.
    resolveComponentFactory( PinchZoomComponent);
    var component = componentFactory.create(
    this.viewContainerRef.injector,[[body.firstElementChild]], body);

    component.instance.containerHeight = "100%";
    component.instance.hostOverflow = "visible"; // Overflow must be visible to show the scrolled contents

    component.instance.getImageHeight = function() { 
      var element=
      this.element.getElementsByTagName(this.elementTarget)[0];
      var imageHeight=this.element.getElementsByTagName(this.elementTarget)[0].
      scrollHeight;//0.85*
      //var editable = element.editable();
      return imageHeight;
    }
    component.instance.getImageWidth = function() { 
        // override the component's getImageHeight() to take scroll height into account
        this.element.getElementsByTagName(this.elementTarget)[0].
        style.width="100%";
        return this.element.getElementsByTagName(this.elementTarget)[0].
        scrollWidth;
    }
    component.instance.doubleTap=false;
    component.instance.events.subscribe((event) => {
      console.log(event);
      var firstPage1=document.getElementById('page2');
      
      //console.log('firstPage1.scrolltop= '+document.scrollingElement.scrollTop);
      if(event.type=='touchstart'){
        var firstPage=document.getElementById('page0');
        var scrolParag = document.getElementById('divEditor');
        //var touch = event.touches[0] || 
        //event.changedTouches[0];
        //firstPage.offsetTop);
       //console.log('scrolls finally! firstPage= '+body.style.top);
       //body.style.top='50%'; 
       
       //console.log('scrolls finally! firstPage= '+body.firstElementChild.style.top);
       //body.firstElementChild.style.top='50%'; 
            
      }
      if(event.type=='touchmove'){
        console.log('moves finally!');      
      }
    });
    this.blockHorizontalMoving();
    component.changeDetectorRef.detectChanges();
    //this.updateTextContent('2 Aaaaaaaaaaaaaaaaaa Aaaaaaaaaaaaaaaaaa');
    //body.on('scroll', ()=> {alert('I am scrolling!');});
  }
  
  blockHorizontalMoving(){
    var divToZoom=document.getElementById("divToZoom");
    divToZoom.style.position='relative';
    divToZoom.style.overflowX='hidden';
  }
  saveToFile(event){
    this.ckEditorInstance.execCommand("autosave");
  }
  changeColor(event){
    //var myckeditor=document.getElementById("editor1");
    //myckeditor.style.color='blue';    

    //var divEle=document.createElement("DIV");
    //divEle.innerHTML=html;
    //var plainText=(divEle.textContent || divEle.innerText);
    
    //var hr = this.myckeditor.document.createElement( 'hr' );
    //this.myckeditor.insertElement( hr );
    //var element = new CKEDITOR.dom.element( 'hr' );
    //var element = new CKEDITOR.dom.element( 
    //document.getElementById( 'testHr' ) );
    //event.insertText("Go now!");
  }
  
    //if( event.getKeystroke() == 13 ) {
      //console.log('enter');
      //globalChatEditor.setData("");
      //globalChatEditor.focus();
      //event.data.preventDefault();
   //}

    //this.log += new Date() + "<br />";
    //this.ckEditorInstance.execCommand("autosave");
  
  ionViewWillLeave(){
      this.ckEditorInstance.execCommand("autosave");
  }
  onPaste($event: any): void {
    //this.log += new Date() + "<br />";
  }
  //menu methods
  openMenu(event) {
          this.menuCtrl.enable(true, 'first');
          this.menuCtrl.open('first');
  }
  closeMenu() {
        this.menuCtrl.close();
  }
  toggleMenu() {
        this.menuCtrl.toggle();
  }
  downloadAndOpenPdf(currentUrl) {
            let downloadUrl =currentUrl;//'https://devdactic.com/html/5-simple-hacks-LBT.pdf';
            let path = this.file.dataDirectory;
            const transfer = this.fileTransfer.create();

            transfer.download(downloadUrl, path + 'myfile.pdf')
            .then(entry => {
              let url = entry.toURL();
              console.log("url: "+url);

              this.pdfHandlingService.loadPdf(url);//'assets/testPdf.pdf');//url
      
              //this.documentViewer.viewDocument(urlPath, 'application/pdf', {});
              
            });
  }
  //from dropbox
  getTextOfFile(currentUrl:any){
            currentUrl=currentUrl.replace("/private","file://");
            let path = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
            let file = currentUrl.substring(currentUrl.lastIndexOf('/')+1, currentUrl.length);

           //this.downloadAndOpenPdf(currentUrl);
      
            this.file.readAsBinaryString(path, file)//currentUrl,"UTF-8" 'assets/TestPdf1.pdf','utf-8'
            .then(content=>{
              var textContent=content+'';//JSON.stringify();
              console.log("File-Content1: "+ JSON.stringify(textContent));//JSON.stringify(content));
          

              //this.pdfHandlingService.loadPdf(JSON.stringify(content));
              //this.file.writeFile(this.file.dataDirectory, 'test.csv', 'hello,world,', {replace: true})
              //.then(() => {      
                
              //})
              //.catch((err) => {
              //  console.error("Write error= "+err);
              //});
              //this.lineSeparatorService.splitLines(textContent,
              //  this.maxTextWidth);
      
            })
            .catch(err=>{
              console.log('err2= '+JSON.stringify(err));
            });  
  }      
  chooseFile(){
            this.filePicker.pickFile()
            .then(uri =>{
              console.log("uri= "+uri);
              var ending=uri.substring(
                uri.length-3,3);
              console.log("ending= "+ending);
              if(ending =='pdf'){
                //this.downloadAndOpenPdf();
                console.log("ending2= ");

              }else{
                this.getTextOfFile(uri);
              }
            })
            .catch(err => console.log('Error', err));
  }
  
}
