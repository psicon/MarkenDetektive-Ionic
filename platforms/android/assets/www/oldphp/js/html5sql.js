var html5sql=(function(){var c=false,f=function(){},j=[],a=function(l){return l.replace(/^\s+/,"").replace(/\s+$/,"")},g=function(l){return Object.prototype.toString.call(l)==="[object Array]"},b=function(l){return l===void 0},h=new RegExp("^select\\s","i"),k=function(l){return h.test(l)},f=function(){},i=function(r,t,n,q){var u=0,p=null,s=null,m=function(){r.executeSql(t[u].sql,t[u].data,o,l)},o=function(z,x){var w,v,y=[];if(html5sql.logInfo){console.log("Success processing: "+t[u].sql)}if(html5sql.putSelectResultsInArray&&k(t[u].sql)){for(w=0,v=x.rows.length;w<v;w++){y[w]=x.rows.item(w)}}else{y=null}p=t[u].success(z,x,y);u++;if(p&&$.isArray(p)){t[u].data=p;p=null}else{p=null}if(t.length>u){m()}else{n(z,x,y)}},l=function(w,v){if(html5sql.logErrors){console.error("Error: "+v.message+" while processing statment "+(u+1)+": "+t[u].sql)}q(v,t[u].sql)};m()},e=function(l){var m;if(typeof l==="string"){a(l);l=l.split(";");for(m=1;m<l.length;m++){while(l[m].split(/["]/gm).length%2===0||l[m].split(/[']/gm).length%2===0||l[m].split(/[`]/gm).length%2===0){l.splice(m,2,l[m]+";"+l[m+1])}l[m]=a(l[m])+";";if(l[m]===";"){l.splice(m,1)}}}for(m=0;m<l.length;m++){if(typeof l[m]==="string"){l[m]={sql:l[m],data:[],success:f}}else{if(b(l[m].data)){l[m].data=[]}if(b(l[m].success)){l[m].success=f}if(typeof l[m]!=="object"||typeof l[m].sql!=="string"||typeof l[m].success!=="function"||!$.isArray(l[m].data)){throw new Error("Malformed sql object: "+l[m])}}}return l},d=function(m){var l=0;do{if(!k(m[l].sql)){return false}l++}while(l<m.length);return true};return{database:null,logInfo:false,logErrors:false,defaultFailureCallback:f,putSelectResultsInArray:true,openDatabase:function(l,n,m,o){html5sql.database=openDatabase(l,"",n,m);c=typeof html5sql.database.readTransaction==="function";if(o){o()}},process:function(l,n,o){if(html5sql.database){var m=e(l);if(b(n)){n=f}if(b(o)){o=html5sql.defaultFailureCallback}if(d(m)&&c){html5sql.database.readTransaction(function(p){i(p,m,n,o)})}else{html5sql.database.transaction(function(p){i(p,m,n,o)})}}else{if(html5sql.logErrors){console.error("Error: Database needs to be opened before sql can be processed.")}return false}},changeVersion:function(l,o,m,p,q){if(html5sql.database){if(html5sql.database.version===l){var n=e(m);if(b(p)){p=f}if(b(q)){q=html5sql.defaultFailureCallback}html5sql.database.changeVersion(l,o,function(r){i(r,n,p,q)})}}else{if(html5sql.logErrors){console.log("Error: Database needs to be opened before sql can be processed.")}return false}}}})();