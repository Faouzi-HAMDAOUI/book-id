(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2086f8"],{a57e:function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("v-carousel",{attrs:{height:"700","hide-delimiters":""}},t._l(t.listBooks,(function(s,i){return e("v-carousel-item",{key:i},[e("v-row",[e("v-col",{staticClass:"mt-16 ml-16",attrs:{md:"4",sm:"4",xs:"4"}},[e("img",{staticClass:"mt-16 ml-16",attrs:{src:s.photo,height:"360px",alt:""}})]),e("v-col",{staticClass:"mt-12",attrs:{md:"7",sm:"4",xs:"4"}},[e("v-sheet",{staticClass:"black--text mr-12 mt-16",attrs:{color:"transparent"}},[e("v-row",[e("div",[e("h1",{staticClass:" mt-16"},[t._v(t._s(s.title))]),e("h3",{staticClass:" mt-2"},[t._v(t._s(s.auteur))]),s.genre[0]?e("v-chip",{staticClass:"ma-2  mt-1",attrs:{color:"deep-purple darken-1"}},[t._v(" "+t._s(s.genre[0])+" ")]):t._e(),s.genre[1]?e("v-chip",{staticClass:"ma-2  mt-1",attrs:{color:"purple darken-1"}},[t._v(" "+t._s(s.genre[1])+" ")]):t._e(),e("p",{staticClass:"mr-16  mt-12"},[t._v(" "+t._s(s.resume)+" ")]),e("p",{staticClass:"mt-6"},[e("v-icon",{staticClass:"black--text"},[t._v("mdi-map-marker")]),t._v(" "+t._s(s.ville)+" ")],1)],1)])],1)],1)],1),e("v-bottom-navigation",{staticClass:"text-center black--text transparent",attrs:{height:"110"}},[e("v-row",{staticClass:"justify-center"},[e("v-col",{attrs:{md:"2"}},[e("v-avatar",{staticClass:"mt-3 mr-10 ml-10",attrs:{size:"62",color:"orange"}},[e("v-icon",{attrs:{dark:""},on:{click:function(s){return t.deleteBook(i)}}},[t._v(" mdi-close ")])],1),e("p",[t._v("Ne m'intéresse pas")])],1),e("v-col",{attrs:{md:"2"}},[e("v-avatar",{staticClass:"mt-3",attrs:{size:"62",color:"orange"}},[e("v-icon",{attrs:{dark:""},on:{click:function(e){return t.sendMessage(s)}}},[t._v(" mdi-flag ")])],1),e("p",[t._v("Réserver")])],1),e("v-col",{attrs:{md:"2"}},[e("v-avatar",{staticClass:"mt-3 mr-10 ml-10",attrs:{size:"62",color:"orange"}},[s.links[0].idUser===t.user.uid||s.links[1]&&s.links[1].idUser===t.myId||s.links[2]&&s.links[2].idUser===t.myId||s.links[3]&&s.links[3].idUser===t.myId||s.links[4]&&s.links[4].idUser===t.myId||s.links[5]&&s.links[5].idUser===t.myId||s.links[6]&&s.links[6].idUser===t.myId||s.links[7]&&s.links[7].idUser===t.myId||s.links[8]&&s.links[8].idUser===t.myId?e("v-icon",{attrs:{dark:"",color:"red"},on:{click:function(e){return t.deleteLik(s.id,i)}}},[t._v(" mdi-cards-heart ")]):e("v-icon",{attrs:{dark:"",color:"black"},on:{click:function(e){return t.addLik(s.id,i)}}},[t._v(" mdi-cards-heart ")])],1),e("p",[t._v("Ajouter à mes favoris")])],1)],1)],1),e("v-row",{attrs:{justify:"center"}},[e("v-dialog",{attrs:{persistent:"","max-width":"500px"},model:{value:t.confMsg,callback:function(s){t.confMsg=s},expression:"confMsg"}},[e("v-card",{attrs:{"max-width":"500px"}},[e("v-toolbar",{attrs:{color:"light-green darken-1",dark:""}},[e("v-toolbar-title",[t._v("Confirmation")]),e("v-spacer"),e("v-btn",{attrs:{icon:""},on:{click:function(s){t.confMsg=!1}}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("div",{staticClass:"text-center"},[e("h2",[t._v(t._s(t.messageConf))])])],1)],1)],1)],1)})),1)},a=[],o=(e("4160"),e("a434"),e("b0c0"),e("159b"),e("2591")),r=e("56d7"),n={data:function(){return{myLik:[],lik:{},listBooks:[],myUser:[],value:4,allMessages:[],allfavoris:[],msgg:[],idmsg:"6JfI2xqVKYWnYkSMypaJ",messageConf:"",confMsg:!1,photo:"",avis:"",title:"",auteur:"",note:"",etats:"",resume:"",nameUser:"",idUser:"",ville:"",disponible:""}},created:function(){var t=this;o["a"].auth().onAuthStateChanged((function(s){s?(t.userAuth=s,t.myName=s.email,t.myId=s.uid):t.userAuth=null})),this.getUser(),this.getBook()},methods:{getBook:function(){var t=this;return r["db"].collection("books").get().then((function(s){s.forEach((function(s){var e=s.data();e.id=s.id,e.ville==t.myUser[0].ville&&t.listBooks.push(e)}))})),this.listBooks},getUser:function(){var t=this;return r["db"].collection("users").get().then((function(s){s.forEach((function(s){var e=s.data();e.id=s.id,e.idUser==t.myId&&t.myUser.push(e)}))})),this.myUser},deleteBook:function(t){var s=this;return this.listBooks.splice(t,1),this.messageConf="Le livre a été retiré de la liste",this.confMsg=!0,setTimeout((function(){return s.confMsg=!1}),4e3),this.listBooks},addLik:function(t,s){this.lik={idUser:this.myId},this.myLik=this.listBooks[s].links,this.myLik.push(this.lik),r["booksRef"].doc(t).update({links:this.myLik},{merge:!0}).then((function(){console.log("Document successfully updated!")})).catch((function(t){console.error("Error updating document: ",t)}))},deleteLik:function(t,s){this.myLik=this.listBooks[s].links;for(var e=0,i=this.myLik.length;e<i;e++)this.myLik[e].idUser==this.myId&&this.myLik.splice(e,1);r["booksRef"].doc(t).update({links:this.myLik},{merge:!0}).then((function(){console.log("Document successfully updated!")})).catch((function(t){console.error("Error updating document: ",t)}))},getallFavoris:function(){var t=this;return r["db"].collection("favoris").get().then((function(s){s.forEach((function(s){var e=s.data();e.id=s.id,t.allfavoris.push(e)}))})),this.allfavoris},showBook:function(t){var s=this;this.photo=t.photo,this.avis=t.avis,this.title=t.title,this.auteur=t.auteur,this.note=t.note,this.etats=t.etats,this.resume=t.resume,this.nameUser=t.nameUser,this.idUser=this.myId,this.ville=t.ville,this.disponible=t.disponible,setTimeout((function(){s.addFavoris()}),1e3)},addFavoris:function(){var t=this;this.getallFavoris();var s={photo:this.photo,avis:this.avis,title:this.title,auteur:this.auteur,note:this.note,etats:this.etats,resume:this.resume,nameUser:this.nameUser,idUser:this.myId,ville:this.ville,disponible:this.disponible};r["db"].collection("favoris").add(s).then((function(t){console.log(t)})).catch((function(t){console.log(t)})),this.messageConf="Le livre a été ajouté à vos favoris",this.confMsg=!0,setTimeout((function(){return t.confMsg=!1}),4e3)},getMyMessages:function(){var t=this;return r["db"].collection("messages").get().then((function(s){s.forEach((function(s){var e=s.data();e.id=s.id;var i=e.msg;t.allMessages.push(i)}))})),this.allMessages},sendMessage:function(t){var s=this;this.date=(new Date).toISOString().substr(0,19),this.newMsg={nameEmeteur:this.myUser[0].name,nameRecepteur:t.nameUser,idEmeteur:this.myUser[0].idUser,idRecepteur:t.idUser,msg:"Bonjour, je suis intéressé par votre livre, et j'aimerais savoir si je peux l'emprunter ?",created:this.date},this.getMyMessages(),setTimeout((function(){s.msgg=s.allMessages[0],s.msgg.push(s.newMsg),r["msgsRef"].doc(s.idmsg).update({msg:s.msgg},{merge:!0}).then((function(){console.log("Votre message a été envoyé avec succès!")})).catch((function(t){console.error("Error lors denvois de message: ",t)}))}),1e3),this.messageConf="Votre demande a bien été prise en compte, vous serez contacté prochainement par son propriétaire !",this.confMsg=!0,setTimeout((function(){return s.confMsg=!1}),4e3)}}},l=n,c=e("2877"),d=e("6544"),u=e.n(d),m=e("8212"),h=e("b81c"),v=e("8336"),f=e("b0af"),g=e("5e66"),k=e("3e35"),p=e("cc20"),y=e("62ad"),b=e("169a"),U=e("132d"),C=e("0fd9"),_=e("8dd9"),M=e("2fa4"),I=e("71d9"),V=e("2a7f"),w=Object(c["a"])(l,i,a,!1,null,null,null);s["default"]=w.exports;u()(w,{VAvatar:m["a"],VBottomNavigation:h["a"],VBtn:v["a"],VCard:f["a"],VCarousel:g["a"],VCarouselItem:k["a"],VChip:p["a"],VCol:y["a"],VDialog:b["a"],VIcon:U["a"],VRow:C["a"],VSheet:_["a"],VSpacer:M["a"],VToolbar:I["a"],VToolbarTitle:V["a"]})}}]);
//# sourceMappingURL=chunk-2d2086f8.8928bdee.js.map