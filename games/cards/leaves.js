if (navigator.appName == "Netscape") { 
 layerRef="document.layers";  
 styleSwitch=""; 
 brouz="n"; 
}
else { 
 layerRef="document.all"; 
 styleSwitch=".style"; 
 brouz="ie"; 
}

gameStat = 0; //0-����� ����, 1-�� ��������, 2-���� ��������, 3-����������, ��� ������� ����

btn0 = new Image(100, 30);
btn0.src = "img/get_0.gif";
btn1 = new Image(100, 30);
btn1.src = "img/get_1.gif";
btn2 = new Image(100, 30);
btn2.src = "img/vse_0.gif";
btn3 = new Image(100, 30);
btn3.src = "img/vse_1.gif";
btake = new Image(71, 18);
btake.src = "img/take.gif";

cardback = new Image(71, 96);
cardback.src = "img/back.gif";
var cards = new Array();
var kozyrs = new Array();

var computer = new Array();
var computerCnt = 0; //����� ���� �����
var human = new Array();
var humanCnt = 0; //����� ���� ��������
var coloda = new Array();
var lastCard = -1; //��������� �����
var kozyr = -1; //����� ������
var work = new Array(10);
var work2 = new Array(10);
var lastWork = 0; //��������� ����� �� ����
var winCount=0,drawCount=0,fallCount=0; //����
var firstTurn=0;
var clickCon=0;
var moveCard=-1;
var newGameStat=0;
var tab=new Array (5);

if (brouz == "n") { eval(layerRef+'["coloda"].document.images[0].src = cardback.src'); }
else { document.images.icoloda.src = cardback.src; }

for (var i = 0; i < 36; i++) {
 cards[i] = new Image(71, 96);
 cards[i].src = "img/" + i + ".gif";
}
for (var i = 0; i < 4; i++) {
 kozyrs[i] = new Image(39, 39);
 kozyrs[i].src = "img/k" + i + ".gif";
}

function cardToH(card) { //����� ��������
 if (card >= 0) human[humanCnt++] = card;
}

function cardToC(card) { //����� �����
 if (card >= 0) computer[computerCnt++] = card;
}

function showBtn(stat) { //����� ������
 if (gameStat == 1) {
  if (brouz == "n") {
   if (stat == 0) { document.layers.btn.document.images[0].src = btn0.src; }
   else { document.layers.btn.document.images[0].src = btn1.src; }
  } 
  else {
   if (stat == 0) { document.images.ibtn.src = btn0.src; }
   else { document.images.ibtn.src = btn1.src; }
  }
 }
 else if (gameStat == 2) {
  if (brouz == "n") {
   if (stat == 0) eval(layerRef+'["btn"].document.images[0].src = btn2.src');
   else eval(layerRef+'["btn"].document.images[0].src = btn3.src');
  } 
  else {
   if (stat == 0) document.images.ibtn.src = btn2.src;
   else document.images.ibtn.src = btn3.src;
  }
 }
}

function showCardUp(num) { //��������� ���� �� �����
 if (gameStat == 0) return;
 eval(layerRef+'["cardh" + num].top = 297');
}

function showCardDown(num) { //�������� ���� � �����
 eval(layerRef+'["cardh" + num].top = 307');
}

function showWorkCards() { //�������� ������� �����
 for (var i = 0; i < 10; i++) {
  if (work[i] > -1) {
   if (brouz == "n") { eval(layerRef+'["cardw" + i].document.images[0].src = cards[work[i]].src'); }
   else { document.images["icardw" + i].src = cards[work[i]].src; }
   eval(layerRef+'["cardw" + i]'+styleSwitch+'.visibility = "visible"');
  }
  else eval(layerRef+'["cardw" + i]'+styleSwitch+'.visibility = "hidden"');
 }
 if (work[0] < 0) eval(layerRef+'["btn"]'+styleSwitch+'.visibility = "hidden"');
 else {
  showBtn(0);
  eval(layerRef+'["btn"]'+styleSwitch+'.visibility = "visible"');
 }
}

function showWork2 () { //�������� �������� ����� ���� �����
 for (var i = 0; i < 10; i++) {
  if (work2[i] > -1) {
   if (brouz == "n") { eval(layerRef+'["cardw" + i].document.images[0].src = cards[work2[i]].src'); }
   else { document.images["icardw" + i].src = cards[work2[i]].src; }
   eval(layerRef+'["cardw" + i]'+styleSwitch+'.visibility = "visible"');
  }
  else eval(layerRef+'["cardw" + i]'+styleSwitch+'.visibility = "hidden"');
 }

 for (var i=0; i<5; i++) if ((work2[2*i]!=-1) && (work2[2*i+1]==-1)) eval(layerRef+'["take"+i]'+styleSwitch+'.visibility = "visible"');
}

function sortCompCards() { //����������� ����� �����
 var tc = 0;
 var i = 0;
 var i1 = 0;
 var c = 0;
 for (i = 0; i < 36; i++) {
  if (computer[i] >= 0) {
   if (i != tc) {
    computer[tc] = computer[i];
    computer[i] = -1;
   }
   tc++;
  }
 }
 tc--;
 for (i = tc; i > 0; i--) {
  for (i1 = 0; i1 < i; i1++) {
   if (convCard(computer[i1]) > convCard(computer[i1 + 1])) {
    c = computer[i1];
    computer[i1] = computer[i1 + 1];
    computer[i1 + 1] = c;
   }
  }
 }
}

function showCompCards() { //�������� ����� �����
 var i = 0;
 sortCompCards();
 for (i = 0; i < computerCnt; i++) {
  eval(layerRef+'["cardc" + i]'+styleSwitch+'.visibility = "visible"');
//!!! debug
// if (brouz == "n") { eval(layerRef+'["cardc" + i].document.images[0].src = //cards[computer[i]].src'); }
// else { document.images["icardc" + i].src = cards[computer[i]].src; }
//!!!
 }
 for (i; i < 36; i++) eval(layerRef+'["cardc" + i]'+styleSwitch+'.visibility = "hidden"');
}

function convCard(num) { //������������� ����� � ������ �������
 var mast = Math.floor(num / 9);
 if (mast == kozyr) return (num % 9) + 36;
 else return (mast + (num % 9) * 4);
}

function sortHumanCards() { //����������� ����� ��������
 var tc = 0;
 var i = 0;
 var i1 = 0;
 var c = 0;
 for (i = 0; i < 36; i++) {
  if (human[i] >= 0) {
   if (i != tc) {
    human[tc] = human[i];
    human[i] = -1;
   }
   tc++;
  }
 }
 tc--;
 for (i = tc; i > 0; i--) {
  for (i1 = 0; i1 < i; i1++) {
   if (convCard(human[i1]) > convCard(human[i1 + 1])) {
    c = human[i1];
    human[i1] = human[i1 + 1];
    human[i1 + 1] = c;
   }
  }
 }
}

function showHumanCards() { //�������� ����� ��������
 var i = 0;
 sortHumanCards();
 for (i = 35; i >= humanCnt; i--) eval(layerRef+'["cardh" + i]'+styleSwitch+'.visibility = "hidden"');
 for (i; i >= 0; i--) {
  if (brouz == "n") { eval(layerRef+'["cardh" + i].document.images[0].src = cards[human[i]].src'); }
  else { document.images["icardh" + i].src = cards[human[i]].src; }
  eval(layerRef+'["cardh" + i]'+styleSwitch+'.visibility = "visible"');
 }
}

function  showLastCard() { //��������, ������� ���� ��������
 var l=lastCard+1;
 if (l<0) l=0;
 document.Q.c4.value = '� ������: '+ l;
}

function showColoda() { //�������� ������
 if (lastCard < 0) {
  eval(layerRef+'["kozyr"]'+styleSwitch+'.visibility = "hidden"');
  eval(layerRef+'["coloda"]'+styleSwitch+'.visibility = "hidden"');
  if (brouz == "n") { eval(layerRef+'["zkozyr"].document.images[0].src = kozyrs[kozyr].src'); }
  else { document.images.izkozyr.src = kozyrs[kozyr].src; }
  eval(layerRef+'["zkozyr"]'+styleSwitch+'.visibility = "visible"');
 }
 else if (lastCard == 0) {
  eval(layerRef+'["zkozyr"]'+styleSwitch+'.visibility = "hidden"');
  eval(layerRef+'["coloda"]'+styleSwitch+'.visibility = "hidden"');
  if (brouz == "n") { eval(layerRef+'["kozyr"].document.images[0].src = cards[coloda[0]].src'); }
  else { document.images.ikozyr.src = cards[coloda[0]].src; }
  eval(layerRef+'["kozyr"]'+styleSwitch+'.visibility = "visible"');
 }
 else {
  eval(layerRef+'["zkozyr"]'+styleSwitch+'.visibility = "hidden"');
  if (brouz == "n") { eval(layerRef+'["kozyr"].document.images[0].src = cards[coloda[0]].src'); }
  else { document.images.ikozyr.src = cards[coloda[0]].src }
  eval(layerRef+'["kozyr"]'+styleSwitch+'.visibility = "visible"');
  eval(layerRef+'["coloda"]'+styleSwitch+'.visibility = "visible"');
 }
}

function sdatCards() { //����� ����� - ����� ������ ���, ��� ������� !!!
 if (gameStat == 1) {
  while ((computerCnt < 5) && (lastCard >= 0)) cardToC(coloda[lastCard--]);
  while ((humanCnt < 5) && (lastCard >= 0)) cardToH(coloda[lastCard--]);
 }
 else {
  while ((humanCnt < 5) && (lastCard >= 0)) cardToH(coloda[lastCard--]);
  while ((computerCnt < 5) && (lastCard >= 0)) cardToC(coloda[lastCard--]);
 }
 showLastCard();
}

function checkEnd() { //��������� �� ���������
 return (lastCard < 0) && (lastWork==0) && ((humanCnt == 0) || (computerCnt == 0));//!!!
}

function commonCount() { //������� ����
 document.Q.c1.value = '��������: ' + winCount;
 document.Q.c2.value = '�����: '+ drawCount;
 document.Q.c3.value = '���������: '+ fallCount;
}

function Rand (n) { //��������� ����� k, 0<=k<n 
 var d=new Date();
 return d.getTime()%n;
}

function drawAlert () {
 var msg = new Array (
  '�����... ������� ���?',
  '�� ���� ��� �����... ���������?',
  '������... ������� ��'
 );
 window.alert (msg[Rand(msg.length)]);
}

function winAlert () {
 var msg = new Array (
  '��� �, �� ���� ��� �� ��������... ��������?',
  '����������, �� �� ��������',
  '�� ��������... ������� ���?'
 );
 window.alert (msg[Rand(msg.length)]);
}

function fallAlert () {
 var msg = new Array (
  '�������, ��� ������, ����������',
  '���, � �������! ������� ���?',
  '������ �� �����������, ��� � ��������� �������!'
 );
 window.alert (msg[Rand(msg.length)]);
}

function clearCon () { //�������� ���
 for (var i = 0; i < 10; i++) work[i] = -1;
 lastWork = 0;
 showWorkCards();
}

function clearWork() { //����� ����
 clearCon(); 
 //��������� �����
 sdatCards();
 showColoda();
 showHumanCards();
 showCompCards();

 //��������� �� ���������
 if (checkEnd()) {
  gameStat = 0;
  showBtn(0);
  if ((humanCnt == 0) && (computerCnt == 0)) {
   drawAlert();
   drawCount++; commonCount();
   firstTurn=0;
   gameInit(0);
  }
  else if (humanCnt == 0) {
   for (i = 0; i < computerCnt; i++) {
    if (brouz == "n") { eval(layerRef+'["cardc" + i].document.images[0].src = cards[computer[i]].src'); }
    else { document.images["icardc" + i].src = cards[computer[i]].src; }
   }
   showCompCards();
   winAlert();
   winCount++; commonCount();
   firstTurn=2;
   gameInit(2);
  }
  else if (computerCnt == 0) {
   fallAlert();
   fallCount++; commonCount();
   firstTurn=1;
   gameInit(1);
  }
  return false;
 }
 return true;
}

function checkWork() {
 if (allBeat()) {
  gameStat = 3 - gameStat;
  if (gameStat == 1) compHod();
  return true;
 }
 return false;
}

function compMinCard(mast, mincard) { //����������� ����� �����
 var mc = 0;
 var i = 0;
 if (mast >= 0) {
  mc = -1;
  for (i = 0; i < computerCnt; i++) if ((Math.floor(computer[i] / 9) == mast) && ((computer[i] % 9) > mincard)) {
   mc = i;
   break;
  }
  if ((mc < 0) && (mast != kozyr)) mc = compMinCard(kozyr, -1);
 }
 return mc;
}

function allBeat() { //��� �� ���� ����?
 var r = true;
 for (var i = 0; i < lastWork; i++) if (work[i*2+1] < 0) { r = false; break; }
 return r;
}

function getHod() { //�������� ����� � ���� �����
 for (var i=0; i<lastWork; i++) {
  if (work[2*i]!=-1) {
   var take=true;
   if ( (work[2*i+1]!=-1) && (allSameBeated(work[2*i]))) take=false;
   if (take) {
    cardToC(work[2*i]);
    work[2*i]=-1;
    showWorkCards();
    showCompCards();
    if (work[2*i+1]!=-1) {
     cardToC(work[2*i+1]);
     work[2*i+1]=-1;
     showWorkCards();
     showCompCards();
    }
   }
  }
 }
 clearWork();
}

function allSameBeated(card) { //��, ���� �� ���� ���� ��� ����� ��� �� ��������
 var r=true;
 var v1=value(card);
 for (var i=0; i<lastWork; i++) if ((work[2*i]!=-1) && (value(work[2*i])==v1) && (work[2*i+1]==-1)) r=false;
 return r;
}

function compBeat () { //���� ������
 var v=new Array(5);
 var len=0;
 //��������� �� ��������
 if (lastWork==1) {
  len=1;
  v[0]=value(work[0]);
 }
 else if (lastWork==3) {
  len=3;
  for (var j=0; j<3; j++) v[j]=value(work[2*j]);
 }
 else if (lastWork==5) {
  len=5;
  for (var j=0; j<5; j++) v[j]=value(work[2*j]);
 }
 for (var i=0; i<len-1; i++) {
  for (var j=i+1; j<len; j++) {
   if (v[i]>v[j]) {
    var c=v[j]; v[j]=v[i]; v[i]=c;
    c=work[2*j]; work[2*j]=work[2*i]; work[2*i]=c;
   }
  }
 }
 showWorkCards();
 //��������� ����� ����� ��������
 var start=0;
 var end=1;
 while (end<=lastWork) {
  while ((end<lastWork) && (value(work[end*2])==value(work[start*2]))) end++;
  for (var i=start; i<end; i++) {
   if (mustTake(work[2*i])) {
    for (var j=start; j<i; j++) { //������� �����, �������� ���� ����� ���� �� �����
     if (work[2*j+1]!=-1) {
      cardToC(work[2*j+1]);
      work[2*j+1]=-1;
     }
    }
    showWorkCards();
    showCompCards();
    break;
   }
   else {
    for (var i1=0; i1<computerCnt; i1++) {
     if ( (canGo(computer[i1])) && (canBeat(computer[i1],work[2*i])) && (!missedCard(i,work[2*i])) ) { 
      work[2*i+1] = computer[i1];
      computer[i1] = -1;
      computerCnt--;    
      showWorkCards();
      showCompCards();
      break;
     }
     else {
     }
    } 
   }
  }
  start=end;
  if (end==lastWork) break;
 }
}

function missedCard (i,card) { //���� �� ��������� ����� �������� card �� ����� i
 var v=value(card);
 var r=false;
 for (var j=0; j<i; j++) if ( (value(work[2*j])==v) && (work[2*j+1]==-1) ) { r=true; break; }
 return r;
}

function clickBtn() { //������ �� ������
 if (gameStat == 1) { //�� �������� - ������ ����
  //����� ���, ����� ����, ��� ������ ����� ������� �������
  for (var i=0; i<lastWork; i++) {
   if (work[2*i]!=-1) {
    var take=true;
    if ( (work[2*i+1]!=-1) && (allSameBeated(work[2*i]))) take=false;
    if (take) {
     cardToH(work[2*i]);
     if (work[2*i+1]!=-1) cardToH(work[2*i+1]);
     showWorkCards();
     showHumanCards();
    }
   }
  }
  if (clearWork()) compHod();
 }
 else if (gameStat==2) { //���� �������� - ������ ���
  if ( (lastWork<=computerCnt) && (
       (lastWork==1) || (lastWork==3) && (is3(work[0],work[2],work[4])) ||
       (lastWork==5) && (is5(work[0],work[2],work[4],work[6],work[8])) ) ) {
   compBeat ();
   for (var i=0; i<lastWork*2; i++) {
    if ( (i%2==0) || 
         ((i%2==1) && (work[i-1]!=-1) && (work[i]!=-1) && (allSameBeated(work[i-1])))
       ) {
     work2[i]=work[i];
    }
    else work2[i]=-1;
   }
   for (var i=lastWork*2; i<10; i++) work2[i]=-1;
   if (!allBeat()) {
    getHod();
    newGameStat=2;
   }
   else newGameStat=1;
   eval(layerRef+'["btn"]'+styleSwitch+'.visibility = "visible"');
   showBtn(0);
   showWork2();
   gameStat=3;
  }
  else return;
 }
 else { //������ ��� �������� � ���� ����
  waitComp();
 }
}


function waitComp() {
 gameStat=newGameStat;
 hideTake ();
 if (clearWork()) {
  showBtn(0);
  if (gameStat==1) compHod();
 }
}

function hideTake () {
 for (var i=0; i<5; i++) eval(layerRef+'["take" + i]'+styleSwitch+'.visibility = "hidden"');
}

function gameInit(stat) { //������ ����
 var i = 0;
 var i1 = 0;
 var c = -1;
 for (i = 0; i < 36; i++) {
  computer[i] = -1;
  human[i] = -1;
  coloda[i] = -1;
  if (brouz == "n") {
   eval(layerRef+'["cardc" + i].document.images[0].src = cardback.src');
   eval(layerRef+'["cardh" + i].document.images[0].src = cardback.src');
  } 
  else {
   document.images["icardc" + i].src  = cardback.src
   document.images["icardh" + i].src  = cardback.src
  }
 }
 for (i=0; i<5; i++) {
  if (brouz == "n") eval(layerRef+'["take" + i].document.images[0].src = btake.src'); 
  else document.images["itake" + i].src  = btake.src;
 }
 hideTake();
 for (var i = 0; i < 10; i++) work2[i] = -1; //!!!
 clearCon ();
 clickCon=0;

 //������ �����
 for (i = 0; i < 36; i++) {
  c = -1;
  while (c < 0) {
   c = Math.floor(Math.random() * 36);
   for (i1 = 0; i1 < i; i1++) if (coloda[i1] == c) {
    c = -1;
    break;
   }
  }
  coloda[i] = c;
 }
 lastCard = 35;

 //�����
 computerCnt = 0;
 humanCnt = 0;
 for (i = 0; i < 5; i++) {
  cardToH(coloda[lastCard]);
  coloda[lastCard--] = -1;
  cardToC(coloda[lastCard]);
  coloda[lastCard--] = -1;
 }
 kozyr = Math.floor(coloda[0] / 9);
 showLastCard();

 //��� ���?
 if (stat == 0) { //� ���� ������� ������
  c = 36;
  for (i = 0; i < 5; i++) if ((Math.floor(human[i] / 9) == kozyr) && (human[i] < c)) c = human[i];
  i1 = 36;
  for (i = 0; i < 5; i++) if ((Math.floor(computer[i] / 9) == kozyr) && (computer[i] < i1)) i1 = computer[i];
  if (c > i1) gameStat = 1;
  else gameStat = 2;
  firstTurn=gameStat;
 }
 else gameStat = stat; //����� ���� ������

 //������:
 showColoda();
 showWorkCards();
 showCompCards();
 showHumanCards();
 showBtn(0);
 Save();
 if (gameStat == 1) compHod();
}

function value (card) {
 return (card%9);
}

function mast (card) {
 return (Math.floor(card/9));
}

function getcard (value,mast) {
 return (mast*9+value);
}

function is3 (card1,card2,card3) {
 var v=new Array(3);
 v[0]=value(card1);
 v[1]=value(card2);
 v[2]=value(card3);
 if ( (v[0]==v[1]) || (v[0]==v[2]) || (v[1]==v[2]) ) return true;
 return false;
}

function is5 (card1,card2,card3,card4,card5) {
 var v=new Array(5);
 v[0]=value(card1);
 v[1]=value(card2);
 v[2]=value(card3);
 v[3]=value(card4);
 v[4]=value(card5);
 for (var i=0; i<4; i++) {
  for (var j=i+1; j<5; j++) {
   if (v[i]>v[j]) {
    var c=v[j]; v[j]=v[i]; v[i]=c;
   }
  }
 }
 if ( (v[0]==v[1]) && (v[1]==v[2]) && (v[2]==v[3]) && (v[3]==v[4]) || //4-1
      (v[1]==v[2]) && (v[2]==v[3]) && (v[3]==v[4]) && (v[4]==v[5]) || //1-4
      (v[0]==v[1]) && (v[1]==v[2]) && (v[2]==v[3]) && (v[4]==v[5]) || //3-2
      (v[0]==v[1]) && (v[1]==v[2]) && (v[3]==v[4]) && (v[4]==v[5]) || //2-3
      (v[1]==v[2]) && (v[3]==v[4]) || //1-2-2
      (v[0]==v[1]) && (v[3]==v[4]) || //2-1-2
      (v[0]==v[1]) && (v[2]==v[3]) )  //2-2-1
  return true;
 return false;
}

function mustTake (card) { //������ �� ���� ����� �����? !!!
 if (lastCard>18) {
  if ((value(card)>6) || (mast(card)==kozyr)) return true;
 }
 else if (lastCard>8) {
  if (mast(card)==kozyr) return true;
 }
 return false;
}

function canGo () { //����������� ����� �� ��� ������� ������� !!!
 var length=canGo.arguments.length;
 var c=new Array(5);
 for (var i=0; i<length; i++) {
  c[i]=parseInt(canGo.arguments[i]);
 }
 if (gameStat==1) { //���� �����
  if (length==1) {
   return (!mustTake(c[0]));
  }
  else {
   var kk=0,vk;
   for (var i=0; i<length; i++) {
    if (mast(c[i])==kozyr) { kk++; vk=c[i]; }
   }
   if ((lastCard>2) && (kk>1)) return false;
   if (kk==1) {
    if (lastCard>23) return false;//!!!
    if ((lastCard>2) && (value(vk)>2)) return false;//!!! >4
   }
   var kb=0; //!!! ���-�� �������
   for (var i=0; i<length; i++) {
    if (value(c[i])>5) { kb++;}
   }
   if ( (kb>1) && (lastCard>18) ) return false;
   else return true;
  }
 }
 else { //���� ��������
  if (lastCard>18) {
   if (mast(c[0])==kozyr) {
    if ( (lastWork>1) || (value(c[0])>4)) return false;
   }
  }
  else if (lastCard>2) {
   if ( (mast(c[0])==kozyr) && (value(c[0])>4) ) return false;
  }
 }
 return true;
}

function compSelectCards () { //���� �������� ����� ��� ����
 for (var i1=0; i1<computerCnt-4; i1++)
 for (var i2=i1+1; i2<computerCnt-3; i2++)
 for (var i3=i2+1; i3<computerCnt-2; i3++)
 for (var i4=i3+1; i4<computerCnt-1; i4++)
 for (var i5=i4+1; i5<computerCnt; i5++) {
  if ((is5(computer[i1],computer[i2],computer[i3],computer[i4],computer[i5])) && (humanCnt>4)) {
   if (canGo(computer[i1],computer[i2],computer[i3],computer[i4],computer[i5])) {
    work[0] = computer[i1]; computer[i1] = -1;  
    work[2] = computer[i2]; computer[i2] = -1;
    work[4] = computer[i3]; computer[i3] = -1;
    work[6] = computer[i4]; computer[i4] = -1;
    work[8] = computer[i5]; computer[i5] = -1;
    computerCnt-=5;
    lastWork=5;
    return;
   }
  }
 }
 for (var i1=0; i1<computerCnt-2; i1++)
 for (var i2=i1+1; i2<computerCnt-1; i2++)
 for (var i3=i2+1; i3<computerCnt; i3++) {
  if ((is3(computer[i1],computer[i2],computer[i3])) && (humanCnt>3)) {
   if (canGo(computer[i1],computer[i2],computer[i3])) {
    work[0] = computer[i1]; computer[i1] = -1;
    work[2] = computer[i2]; computer[i2] = -1;
    work[4] = computer[i3]; computer[i3] = -1;
    computerCnt-=3;
    lastWork=3;
    return;
   }
  }
 }
 c = compMinCard(-1, 0);
 work[0] = computer[c];
 computer[c] = -1;
 lastWork=1;
 computerCnt--;
}

function maxHumanKozyr() { //�������� ����. ������ � ���.
 var maxValue=-1;
 for (var i=0; i<humanCnt; i++) {
  if ( (mast(human[i])==kozyr) && (value(human[i])>maxValue) ) maxValue=value(human[i]);
 }
 return maxValue;
}

function compHod() { //��� �����
 gameStat = 1;
 //�������� 2 ����� - �� ����� �������, ����� ������ ����� ��� ������ ������!!!
 if ( (lastCard<1) && (computerCnt==2) && (mast(computer[1])==kozyr) && (value(computer[1])<maxHumanKozyr()) ) {
  work[0]=computer[0];
  computer[0]=-1;
  lastWork=1;
  computerCnt--;
 }
 else if ( (lastCard<2) && ((computerCnt==2) || (computerCnt==3) && (!is3(computer[0],computer[1],computer[2])) ) ) {
  work[0] = computer[1]; //����� ������� ������ �� 3, ������� �� 2
  computer[1] = -1;
  lastWork=1;
  computerCnt--;
 }
 else compSelectCards();
 showWorkCards();
 showCompCards();
 return true;
}

function canBeat(card1,card2) { //����� �� ���� ������ card1 ����� card2
 var m1=mast(card1);
 var m2=mast(card2);
 var v1=value(card1);
 var v2=value(card2);
 if ( (m1==m2) && (v1>v2) || (m1==kozyr) && (m2!=kozyr) ) return true;
 return false;
}

function cardFromH (card) { //������� ����� � ��������
 for (var i=0; i<humanCnt; i++) if (human[i]==card) {
  human[i]=-1;
  humanCnt--;
  break;
 }
}

function absentOnCon(card) {//!!! ��, ���� card ��� �� ����
 for (var i=1; i<10; i+=2) if (card==work[i]) return false;
 return true;
}

function clickCon1 (n) { //������ �� ������� ����� �� ����
 if (gameStat==1) { //������� ������ - ���������� ��������� ����� �� ����� �����
  if (clickCon) {
   if ((work[2*n+1]==-1) && (canBeat(moveCard,work[2*n])) && (absentOnCon(moveCard)) ) {//!!!
    work[2*n+1]=moveCard;
    showWorkCards();
    cardFromH (moveCard);
    showHumanCards();
   }
  }
  clickCon=0;
 }
 else if (gameStat==2) { //������� ����� - ������ ����� � ����
  if (work[2*n]!=-1)  {
   var same=work[2*n];
   human[humanCnt++]=work[2*n];
   work[2*n]=-1;
   lastWork--;
   for (var i=0; i<4; i++) {
    if (work[2*i]==-1) {
     for (var j=i; j<5; j++) work[2*j]=work[2*(j+1)];
    }
   }
   showWorkCards();
   if (lastWork<1) showBtn(0);
   showHumanCards();
  }
 }
 else clickBtn();
}

function clickCon2 (n) { //������ �� ������ ����� �� ����
 if (gameStat==1) { //������� ������ - ������ ����� � ����
  clickCon=1;
  moveCard=work[2*n+1];
  cardToH (moveCard);
  work [2*n+1]=-1;
  showWorkCards();
  showHumanCards();
 }
 else if (gameStat==3) {
  clickBtn();
 }
}

function getCard (num) {
 human[num] = -1;
 humanCnt--;
 showHumanCards();
 showWorkCards();
}

function clickCard(num) { //������ �� �����
 var from=human[num];
 if (gameStat == 1) { //�� ��������
  for (var i=0; i<lastWork; i++) {
   var to = work[i*2];
   if ((to!=-1) && (work[i*2+1]==-1) && (canBeat(from,to))) {
    work[i*2+1] = from;
    getCard(num);
    break;
   }
  }
  if (checkEnd()) { clearWork(); return; }
  if (checkWork()) if (clearWork()) gameStat = 2;
 }
 else if (gameStat==2) { //�� �����
  if (lastWork==0) {
   work[0] = from;
   getCard(num);
   lastWork=1;
  }
  else if (lastWork==1) {
   work[2] = from;
   getCard(num);
   lastWork=2;
  }
  else if (lastWork==2) {
   if (is3(work[0],work[2],human[num])) {
    work[4] = from;
    getCard(num);
    lastWork=3;
   }
  }
  else if (lastWork==3) {
   work[6] = from;
   getCard(num);
   lastWork=4;
  }
  else if (lastWork==4) {
   if (is5(work[0],work[2],work[4],work[6],human[num])) {
    work[8] = from;
    getCard(num);
    lastWork=5;
    clickBtn();
   }
  }
  if (checkEnd()) clearWork();
  else checkWork();
 }
 else clickBtn();
}

//���� ����� ��� �������
var caution = false;

function setCookie(name, value, expires, path, domain, secure) {
 var curCookie = name + "=" + escape(value) +
  ((expires) ? "; expires=" + expires.toGMTString() : "") +
  ((path) ? "; path=" + path : "") +
  ((domain) ? "; domain=" + domain : "") +
  ((secure) ? "; secure" : "");
 if (!caution || (name + "=" + escape(value)).length <= 4000) document.cookie = curCookie;
 else if (confirm("���� � ����������� ����������� ��������� 4 �� � ����� �������!")) document.cookie = curCookie;
}

function getCookie(name) {
 var prefix = name + "=";
 var cookieStartIndex = document.cookie.indexOf(prefix);
 if (cookieStartIndex == -1) return null;
 var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
 if (cookieEndIndex == -1) cookieEndIndex = document.cookie.length;
 return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}

function fixDate(date) {
 var base = new Date(0);
 var skew = base.getTime();
 if (skew > 0) date.setTime(date.getTime() - skew);
}

function Save() {
 var now = new Date();
 fixDate(now);
 now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
 setCookie('w1', winCount, now);  
 setCookie('d1', drawCount, now);  
 setCookie('f1', fallCount, now);  
 setCookie('h1', firstTurn, now);  
 for (var i=0; i<5; i++) setCookie("t"+(i+1), tab[i], now);
}

function today () {
 var d=new Date();
 var day=d.getDate();
 if (day<10) day='0'+day;
 var mon=d.getMonth()+1
 if (mon<10) mon='0'+mon;
 var y=d.getYear();
 if (y<1900) y+=1900;
 return (''+day+'/'+mon+'/'+y);
}

function Load () {
 var win=getCookie ("w1");
 var draw=getCookie ("d1");
 var fall=getCookie ("f1");
 var first=getCookie ("h1");
 for (var i=0; i<5; i++) tab[i]=getCookie("t"+(i+1));
 if (!tab[0]) {
  var s=today();
  for (var i=0; i<5; i++) tab[i]='���: 0 (0/0/0), '+s;
 }
 if (!isNaN(parseInt (win))) {
  winCount=parseInt (win);
  drawCount=parseInt (draw);
  fallCount=parseInt (fall);
  firstTurn=parseInt (first);
 }
 commonCount();
}

function gameInit0 () {
 var t=false;
 if ((winCount==0) && (drawCount==0) && (fallCount==0)) t=true;
 else t=window.confirm("�� �������, ��� ������ ������ ��� ������? ���������� �� ����� ����� ��������!");
 if (t==true) {
  var balls=winCount-fallCount;
  checkBest (balls,winCount);
  winCount=drawCount=fallCount=0;
  firstTurn=0;
  commonCount();
  gameInit (0);
 }
}

function checkBest (b,w) {
 var n=-1;
 for (var i=0; i<5; i++) {
  var bt1=tab[i].indexOf(' ');
  var tab0=tab[i].substring(bt1+1,tab[i].length-bt1);
  bt1=parseInt(tab0.indexOf(' '));
  var balls1=parseInt(tab0.substring (0,bt1));
  var wins1=parseInt(tab0.substring (bt1+1,tab0.length-bt1));
  if ( (b>balls1) || ((b==balls1) && (w>=wins1))) { n=i; break; }
 }
 if (n>-1) {
  var name1='';
  while (name1=='') {
   name1=window.prompt ('�� ����� � ������� ������ ������� �� ���� ������!\r\n����������, ������� ���� ���:','');
   if ((name1=='') || (name1==null)) {
    name1='';
    window.alert ("��������� ��� �� ������ ���� ������. ������� OK ��� �������");
   }
   else if (name1.length > 20) {
    window.alert ("��������� ��� ������� ������� � ����� ��������!");
    name1=name1.substring (0,20);
   }
  }
  for (var i=0; i<name1.length; i++) if (name1.charAt(i)==' ') name1=name1.substring(0,i)+'_'+name1.substring(i+1,name1.length);
  for (var j=4; j>n; j--) tab[j]=tab[j-1];
  var s=today();
  tab[n]=''+name1+': '+b+' ('+winCount+'/'+drawCount+'/'+fallCount+'), '+s;
 }
}

function bestTable() {
 var s='������� ������ �����������:\r\n���: ���� (��������/�����/���������), ����\r\n';
 for (var i=0; i<5; i++) s+= tab[i] +'\r\n';
 window.alert (s);
}

//������� �/�
 Load();
 gameInit(firstTurn);