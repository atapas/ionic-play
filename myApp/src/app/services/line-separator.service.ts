import { Injectable } from '@angular/core';
import * as math from 'mathjs'; 

@Injectable({
  providedIn: 'root'
})
export class LineSeparatorService {
  lineGroupNumber = 0;
  lineGroupArray: Array<number>=[];  
  currentContent='';
  twoOrThreeFlag=0;
  currentLineArray: Array<String>=[];  
  pageHeight=0;
  linesArray:Array<String>=[]; 
  allLinesArray:Array<String>=[];
  wordsArray:Array<String>=[];
  sumLineHeights=0;
  currentPageIndex=0;
  firstIndex=0;
  lastIndex=0;
  //firstPageArray:Array<String>=[]; 
  //secondPageArray:Array<String>=[]; 
  //thirdPageArray:Array<String>=[]; 
  threePagesArray=[[],[],[]];
  

  constructor() { 
  }
  
  //create methods
  //creates the div/html for the new page.
  createNewPageDiv(pageNumber){
    return '<div id="page'+pageNumber+'" '+
    'style="background-color:white;'+
               'margin-top:2%;padding:2%;overflow-x: hidden;'+
               'top:50%;width:100%"><br><br>';
  }
  //splits the new text in lines and calls the createTextContent method.
  displayTextContent(textContent,maxTextWidth){
    var currentUrl=String(textContent);
    this.currentLineArray=this.splitLines(currentUrl,maxTextWidth);    
    this.twoOrThreeFlag=2;
    return this.createTextContent(0);
  }
  //creates the html for the whole document.
  createTextContent(i){
    var divInit=this.createNewPageDiv(0);
               this.currentContent+=
               `<div id="divToZoom" 
               style="text-align:center;
               margin:2%;padding:2%;'+
               background-color:white;
               width:100%;height:100%">`+divInit;
               this.injectText(i,divInit);
               this.currentContent+='</div></div>';
               return this.currentContent; 
  }
  //creates the html/text content for the whole document 
  //and separates it to divs ,one for each page.
  injectText(i,divInit){
    var pageNumber=0;
    if(this.currentLineArray.length>0){
      console.log('injectText0');
      for(let line of this.currentLineArray){
        this.colorLines(i,line);
        if(i>0){
          this.fillRestOfLastPageWithSpaces(i,'',0,[]);
          pageNumber++;
          divInit=this.createNewPageDiv(pageNumber);
          this.addPageBreak(i,divInit);
        }
        i++;
      }
     }else{
      this.addLine();
     }
  }
//create
  //checks when the text ends.If the end is not at the end of the page,
  //it fills the rest lines with <br>. 
  fillRestOfLastPageWithSpaces(i,line,isOldPage,dummyArray){
      if(i==(this.currentLineArray.length-1)){
        console.log('fillRestOfLastPageWithSpaces this.currentpageindex= '+this.currentPageIndex);
        console.log('this.currentLineArray.length-1= '+
        (this.currentLineArray.length-1));
        dummyArray.push('<br>');  
        this.addLine();
      }
    
  }
  //checks if the height of the lines added ,is bigger than the page height.
  //If so, it adds a page break.
  addPageBreak(i,divInit){
    if(this.sumLineHeights>this.pageHeight){//(this.pageHeight)){
      this.currentContent+='<br><br></div>';
      this.sumLineHeights=0;
      if(i<(this.currentLineArray.length-2)){
        this.currentContent+=divInit;
      }
    }
  }
//fills the rest lines with <br>.
addLine(){
  do{
     var line2='<br>';
     this.sumLineHeights+=
     this.getLineHeight(line2);
     this.currentContent+=line2;
 }while(this.sumLineHeights<(this.pageHeight));
}
colorLines(i,line){
  switch(this.twoOrThreeFlag){
    case 0:{
      this.currentContent+=`<span style="color:red">`
               +line+
             `</span>
             <br>`;
            break;       
    }
    case 1:{
      //2 Colors
      var currentColor='red';
      if((i+1)%2==1)
        currentColor='green';
        this.currentContent+=`<span style="color:`+currentColor+`">`
               +line+
             `</span>
             <br>`;
            break;
    }
    case 2:{
      //3 Colors
      var currentColor='red';
      if((i+1)%3==1)
        currentColor='green';
      else if((i+1)%3==2)
        currentColor='blue';
        this.currentContent+=`<span style="color:`+currentColor+`;`+
      `">`+line+`</span>
            <br>`;
            this.sumLineHeights+=
            this.getLineHeight(line);
            break;
    }
  }
}



  //update methods
  loadTextContent(newText,isInit,maxTextWidth){
    this.allLinesArray=[];
    //console.log('hei0 newText= f'+newText+'f');
    this.currentLineArray=this.splitLines(newText,maxTextWidth);    
    this.updateText(newText,isInit);
  }
  //adds more pages or replaces old ones.
  updateText(newText,isInit){
    this.currentPageIndex=0;
    console.log('updateText');
    this.addMorePages(0);
    var divToZoom=document.getElementById('divToZoom');
    //console.log('divToZoom= '+divToZoom.innerHTML);
      var firstPartIndex=divToZoom.innerHTML.indexOf("</div>");
      //divToZoom.innerHTML=
      //this.removeSpacesAfterFirstPage(divToZoom.innerHTML,firstPartIndex);

      //divToZoom.innerHTML=divToZoom.innerHTML.substring(
        //0,divToZoom.innerHTML.lastIndexOf("<br>"));
        //divToZoom.innerHTML= '<div id="page0" style="background-color: yellow; margin-top: 2%; padding: 2%; overflow-x: hidden; top: 50%; width: 100%;"><br><br><span style="color:green;">2&nbsp;Aaaaaaaaaaaaaaaaaa&nbsp;Aaaaaaaaaaaaaaaaaa\ Bbbbbbbbb&nbsp;Bbbbbbbbb&nbsp;Bbbbbbbbb&nbsp;Bbbbbbbbb&nbsp;Bbbbbbbbb&nbsp;Bbbbbbbbb&nbsp;</span><br><span style="color:blue;">Bbbbbbbbb&nbsp;Bbbbbbbbb\ Ccccccccccccc&nbsp;Ccccccccccccc&nbsp;Ccccccccccccc&nbsp;Ccccccccccccc&nbsp;Ccccccccccccc&nbsp;Ccccccccccc</span><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div>';

  }
  //adds more pages or replaces old ones.
  addMorePages(currentIndex){
    if((this.currentPageIndex<3)&&
    (currentIndex<(this.currentLineArray.length-1))){
        this.addANewPage(currentIndex,this.currentPageIndex); 
        currentIndex=this.createTextForNewPage(currentIndex,0,this.currentPageIndex);
        this.lastIndex=currentIndex;
        this.currentPageIndex++;  
        this.addMorePages(currentIndex);
    }else{
      this.removeRestPages();
    }
  }
  addPageInTheEnd(){
    if(this.lastIndex<(this.currentLineArray.length-1)){
      this.threePagesArray.splice(0,1);
      this.threePagesArray.push([]);
      this.deletesAPage(0);
      this.addANewPage(this.lastIndex,2); 
      this.lastIndex=this.createTextForNewPage(this.lastIndex,0,2);
      this.currentPageIndex++;  
      this.addMorePages(this.lastIndex);
    }
  }
  //on update it adds a new page or replaces the text content of an old one.
  addANewPage(currentIndex,dummyPageIndex){
    var divToZoom=document.getElementById('divToZoom');
    var childDiv=null;
    var isOldPage=0;
    if(divToZoom.children.length>(this.currentPageIndex)){
      //updates an existing page div
      isOldPage=1;
      childDiv =<HTMLDivElement>divToZoom.children[this.currentPageIndex];
      childDiv=document.getElementById('page'+this.currentPageIndex);
      childDiv.style.height='100%';
    }else{
      //creates a new page div
      childDiv =document.createElement("div");
      divToZoom.appendChild(childDiv);
    }
    childDiv.style.backgroundColor='white';
    //childDiv.style.margin='2%';
    childDiv.style.marginTop='2%';
    childDiv.style.padding='2%';
    childDiv.style.overflowX='hidden';
    childDiv.style.top='0%';
    childDiv.style.width='100%';
   currentIndex=this.createTextForNewPage(currentIndex,isOldPage,dummyPageIndex);
   childDiv.innerHTML =''+this.currentContent;     
  }
  //on update it adds a new page or replaces the text content of an old one.
  deletesAPage(dummyPageIndex){
    var divToZoom=document.getElementById('divToZoom');
    var childDiv=null;
    if(divToZoom.children.length>0){
      //deletes an existing page div
      childDiv =<HTMLDivElement>divToZoom.children[this.currentPageIndex];
      childDiv=document.getElementById('page'+dummyPageIndex);
      childDiv.innerHTML='';
      childDiv.remove();
      childDiv=null;
    } 
  }
  //creates the text/html content for the new page.
  createTextForNewPage(i,isOldPage,dummyPageIndex){
    this.currentContent='<br><br>';
    var k=i;
    var arrayToUse=this.threePagesArray[dummyPageIndex];
    if(this.currentLineArray.length>0){
      for(k=i;k< this.currentLineArray.length;k++){
        var line=this.currentLineArray[k];
        switch(this.twoOrThreeFlag){
          case 0:{
            this.currentContent+=`<span style="color:red">`
                     +line+
                   `</span>
                   <br>`;
                  break;       
          }
          case 1:{
            //2 Colors
            var currentColor='red';
            if((i+1)%2==1)
              currentColor='green';
              this.currentContent+=`<span style="color:`+currentColor+`">`
                     +line+
                   `</span>
                   <br>`;
                  break;
          }
          case 2:{
            //3 Colors
            var currentColor='red';
            if((k+1)%3==1)
              currentColor='green';
            else if((k+1)%3==2)
              currentColor='blue';
              this.currentContent+=`<span 
              style="color:`+currentColor+`;`+
            `"   class="user-location">`+line+`</span>
                  <br>`;
                  arrayToUse.push(line);
                  this.sumLineHeights+=
                  this.getLineHeight(line);
                  break;
          }
        }
        if(k>=0){
          this.fillRestOfLastPageWithSpaces(k,line,isOldPage,arrayToUse);
            if(this.currentPageIndex==0){
            }
            //if((isOldPage)){
              if(this.sumLineHeights>this.pageHeight){//(this.pageHeight)){
                if(this.currentPageIndex==0){
                }
                this.sumLineHeights=0;
                this.currentContent+='<br><br>';
                break;
              }
            
          //}
           
          
          //this.addPageBreak(i,divInit);
          
        }
      }
     }else{
      arrayToUse.push('<br>'); 
      this.addLine();
     }     
     return k;
  }

  onClick(){
    console.log('onclick');
  }
  onChange($event){
   
  }
  removeSpacesAfterFirstPage(str, startIndex) {
    return str.substr(0, startIndex) + str.substr(startIndex + 8);
  }
  //if the new document is smaller than the old one, it removes the remaining pages.
  removeRestPages(){
    var divToZoom=document.getElementById('divToZoom');
      for(var i=(divToZoom.children.length-1);i>this.currentPageIndex;i--){
        var subDivRest=<HTMLElement>divToZoom.children[i];
        subDivRest.style.width='0';
        subDivRest.style.height='0';
        subDivRest.style.margin='0';
        subDivRest.style.padding='0';
        subDivRest.style.backgroundColor='red';

        //subDivRest.remove();
        //divToZoom.removeChild(subDivRest);
        //divToZoom.style.backgroundColor='blue';
      }
  }
  //split operations
replaceBigItems(startRange,maxTextWidth){
  for(var i=startRange;i<this.allLinesArray.length;i++){//this.allLinesArray.length
    var thisLine=this.allLinesArray[i];
    thisLine=thisLine.substring(0,thisLine.length-2);
    this.allLinesArray[i]=thisLine;
    if(this.getTextWidth2(thisLine)>maxTextWidth){
      var thisLine1 = thisLine.slice(0, thisLine.length/2);
        var thisLine2 = thisLine.slice(thisLine.length/2);
        this.allLinesArray.splice(i,1);
        this.allLinesArray.splice(i,0,thisLine1);
        this.allLinesArray.splice(i+1,0,thisLine2);
        i++;
    }
  }
}
splitLinesArray(text:string='',maxTextWidth){
  var startPos = 0;//text.indexOf("\cf");
  //text = text.slice(startPos+3);

  //text = text.replace(/\r?\n/g, '<br />');
  //this.allLinesArray=text.split("\\n");
  //var text2=text.replace("\\\n",'');
  //var text2 = text.replace(/\\\n/g,'');
  var text2 = text.replace(/[\\\\n]/g,' ');

  this.cutInLines(text2,maxTextWidth);
  return null;
}
splitLines(text,maxTextWidth) {
  if(text==' '){
    this.allLinesArray.push(' ');
    this.allLinesArray.push(' ');
  }else{
    this.splitLinesArray(text,maxTextWidth);
  }
  //this.replaceBigItems(0,maxTextWidth);
  
  return this.allLinesArray;
}
cutInLines(newText,maxTextWidth){
  //var stringToCut='hello world now';
  //newText='1a Aaaaaaaaaaaaaaaaaa Aaaaaaaaaaaaaaaaaa Aaaaaaaaaaaaaaaaaa Aaaaaaaaaaaaaaaaaa     Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb    Ccccccccccccc Ccccccccccccc Ccccccccccccc Ccccccccccccc Ccccccccccccc Ccccccccccccc    Ddddddddddd Ddddddddddd Ddddddddddd Ddddddddddd Ddddddddddd Ddddddddddd    Eeeeeeee Eeeeeeee Eeeeeeee Eeeeeeee Eeeeeeee Eeeeeeee Eeeeeeee Eeeeeeee Eeeeeeee    Fffffffffffff Fffffffffffff Fffffffffffff Fffffffffffff Fffffffffffff Fffffffffffff Fffffffffffff Fffffffffffff Fffffffffffff Fffffffffffff Fffffffffffff    Gggggggg Gggggggg Gggggggg Gggggggg Gggggggg Gggggggg Gggggggg Gggggggg Gggggggg    Aaaaaaaaaaaaaaaaaa Aaaaaaaaaaaaaaaaaa    2 Aaaaaaaaaaaaaaaaaa Aaaaaaaaaaaaaaaaaa    Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb Bbbbbbbbb';
  //var firstWordIndex= newText.indexOf(' ');
  //var firstWord=newText.substring(0,firstWordIndex);
  

  //this.cutInHalf(newText);
  this.wordsArray=newText.split(" ");
  
  var tempString='';
  var k=0;
  do{
    tempString+=this.wordsArray[k];
    if(this.getTextWidth2(tempString)>maxTextWidth){
      if(tempString!=''){
        this.allLinesArray.push(tempString);
        tempString='';
      }
      //break;
    }
    k++;
  }while(k<this.wordsArray.length);
  this.replaceBigItems(0,maxTextWidth);
}
cutInHalf(protasi){
  var middle = Math.floor(protasi.length / 3);
  var before = protasi.lastIndexOf(' ', middle);
  var after = protasi.indexOf(' ', middle + 1);

  if (middle - before < after - middle) {
    middle = before;
  }else {
    middle = after;
  }

  var s1 = protasi.substr(0, middle);
  var s2 = protasi.substr(middle + 1);  
  return s2;  
}
getTextWidth(text) {
  var spanText=document.getElementById("spanText");
  spanText.innerHTML=text;
  return spanText.clientWidth;
}
getTextWidth2(text) {
  var spanText=document.getElementById("spanText2");
  spanText.innerHTML=text;
  return spanText.getBoundingClientRect().width;
  ;
}
getLineHeight(text) {
  var spanText=document.getElementById("spanText");
  spanText.innerHTML=text;
  return spanText.clientHeight;
}

}
