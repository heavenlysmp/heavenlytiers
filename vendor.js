(() => {
	let e = new URLSearchParams(window.location.search).get("sgv");
	if (!e) return;
	function t(t) {
		try {
			if (!t) return t;
			let n = window.location.origin, r = new URL(String(t), n);
			return r.origin === n && r.searchParams.get("sgv") !== e ? (r.searchParams.set("sgv", e), r.href) : t;
		} catch {
			return t;
		}
	}
	let n = window.open;
	window.open = function(...e) {
		return e[0] &&= t(e[0]), n.apply(this, e);
	};
	let r = window.location.assign.bind(window.location);
	window.location.assign = function(e) {
		r(t(e));
	};
	let i = window.location.replace.bind(window.location);
	window.location.replace = function(e) {
		i(t(e));
	};
	let a = history.pushState;
	history.pushState = function(...e) {
		return e[2] &&= t(e[2]), a.apply(this, e);
	};
	let o = history.replaceState;
	history.replaceState = function(...e) {
		return e[2] &&= t(e[2]), o.apply(this, e);
	}, document.addEventListener("click", (e) => {
		let n = e.target?.closest("a");
		if (!n || !n.href || n.href.startsWith("mailto:") || n.href.startsWith("tel:") || n.href.startsWith("javascript:")) return;
		let r = t(n.href), i = typeof r == "string" ? r : String(r);
		n.href !== i && (n.href = i);
	}, !0), document.addEventListener("submit", (t) => {
		let n = t.target;
		if (!n) return;
		let r = n.querySelector("input[name=\"sgv\"]");
		r || (r = document.createElement("input"), r.type = "hidden", r.name = "sgv", n.appendChild(r)), r.value = e;
	});
	let s = () => {
		document.querySelectorAll("a").forEach((e) => {
			if (e.href && !e.href.startsWith("javascript")) {
				let n = t(e.href);
				e.href = typeof n == "string" ? n : String(n);
			}
		});
	};
	document.readyState === "complete" || document.readyState === "interactive" ? s() : document.addEventListener("DOMContentLoaded", s);
})();

  (function(){var e=`sg-preview`;function t(e){"@babel/helpers - typeof";return t=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},t(e)}function n(e,n){if(t(e)!=`object`||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var i=r.call(e,n||`default`);if(t(i)!=`object`)return i;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(n===`string`?String:Number)(e)}function r(e){var r=n(e,`string`);return t(r)==`symbol`?r:r+``}function i(e,t,n){return(t=r(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=class{constructor(e){if(i(this,`source`,void 0),i(this,`allowedOrigins`,void 0),i(this,`targetOrigin`,void 0),i(this,`debug`,void 0),i(this,`messageHandlers`,new Map),!e.allowedOrigins?.length)throw Error(`[EventCommunicator] allowedOrigins is required`);this.source=e.source,this.allowedOrigins=e.allowedOrigins,this.targetOrigin=e.targetOrigin||`*`,this.debug=e.debug||!1,e.messageHandlers&&this.registerMessageHandlers(e.messageHandlers),e.domEvents&&this.registerDOMEvents(e.domEvents),this.initMessageListener()}log(...e){this.debug&&console.log(`[EventCommunicator]`,...e)}formatEventType(t){return`${e}:${t}`}parseEventType(t){let n=`${e}:`;return t.startsWith(n)?t.slice(n.length):null}isOriginAllowed(e){return this.allowedOrigins.some(t=>t===`*`?!0:e===t||e.endsWith(t))}initMessageListener(){window.addEventListener(`message`,e=>{if(this.log(`Message received from:`,e.origin),!this.isOriginAllowed(e.origin)){console.warn(`[EventCommunicator] Wrong origin:`,e.origin);return}let t=e.data;if(!t?.type)return;let n=this.parseEventType(t.type);if(!n)return;this.log(`Parsed event type:`,n);let r=this.messageHandlers.get(n);r?r(t.payload):this.log(`No handler for:`,n)})}registerMessageHandlers(e){Object.entries(e).forEach(([e,t])=>{this.messageHandlers.set(e,t)})}registerDOMEvents(e){e.forEach(({event:e,handler:t,options:n})=>{window.addEventListener(e,t,n)})}getTargetWindow(){try{if(window.parent&&window.parent!==window)return window.parent;if(window.top&&window.top!==window)return window.top;if(window.opener)return window.opener}catch{if(window.parent&&window.parent!==window)return window.parent}return null}send(e,t){let n=this.getTargetWindow();if(!n)return;let r={type:this.formatEventType(e),source:this.source,payload:t??null,timestamp:new Date().toISOString()};n.postMessage(r,this.targetOrigin)}},o=`visual-editor`,s={ACTIVATE_INSPECTOR:`ACTIVATE_INSPECTOR`,DEACTIVATE_INSPECTOR:`DEACTIVATE_INSPECTOR`,MAKE_EDITABLE:`MAKE_EDITABLE`,APPLY_STYLE:`APPLY_STYLE`,CHANGE_TEXT_TYPE:`CHANGE_TEXT_TYPE`,ADD_LINK:`ADD_LINK`,INSERT_EMOJI:`INSERT_EMOJI`,CHANGE_IMAGE_SRC:`CHANGE_IMAGE_SRC`,SET_ALT_TEXT:`SET_ALT_TEXT`,SHOW_IMAGE_LOADING:`SHOW_IMAGE_LOADING`,HIDE_IMAGE_LOADING:`HIDE_IMAGE_LOADING`,TOGGLE_DEBUG:`TOGGLE_DEBUG`,CLEAR_SELECTION:`CLEAR_SELECTION`},c={ELEMENT_SELECTED:`ELEMENT_SELECTED`,ELEMENT_RECT_UPDATED:`ELEMENT_RECT_UPDATED`,SELECTION_CLEARED:`SELECTION_CLEARED`,CONTENT_CHANGED:`CONTENT_CHANGED`,STYLE_APPLIED:`STYLE_APPLIED`,TEXT_TYPE_CHANGE_REQUESTED:`TEXT_TYPE_CHANGE_REQUESTED`,LINK_CHANGE_REQUESTED:`LINK_CHANGE_REQUESTED`,EMOJI_INSERTED:`EMOJI_INSERTED`,IMAGE_SRC_CHANGED:`IMAGE_SRC_CHANGED`,ALT_TEXT_SET:`ALT_TEXT_SET`,EDITING_TEXT:`EDITING_TEXT`},l={LOC:`data-visual-edit-loc`,COMPONENT:`data-visual-edit-component`,EDITABLE:`data-visual-edit-editable`,OVERLAY:`data-visual-edit-overlay`,LABEL:`data-visual-edit-label`,LABEL_POSITION:`data-visual-edit-label-position`,DIMENSIONS:`data-visual-edit-dimensions`},u={BOLD:`bold`,ITALIC:`italic`,UNDERLINE:`underline`,LINE_THROUGH:`line-through`,COLOR:`color`,BACKGROUND_COLOR:`backgroundColor`,TEXT_ALIGN:`textAlign`,FONT_SIZE:`fontSize`},d={HOVER:`hover`,SELECTED:`selected`,LOADING:`loading`},ee=[`h1`,`h2`,`h3`,`h4`,`h5`,`h6`,`p`,`span`,`label`,`b`,`i`,`strong`,`em`,`small`,`mark`,`del`,`ins`,`sub`,`sup`,`div`,`li`,`dt`,`dd`],f=!1,p=`%c[Visual Editor]`,m=`color: #7c3aed; font-weight: bold;`,h={CONTENT_CHANGED:`✏️`,EMOJI_INSERTED:`😀`,STYLE_APPLIED:`🎨`,TEXT_TYPE_CHANGE_REQUESTED:`🔤`,LINK_CHANGE_REQUESTED:`🔗`,IMAGE_SRC_CHANGED:`🖼️`,ALT_TEXT_SET:`🏷️`},g={CONTENT_CHANGED:`#059669`,EMOJI_INSERTED:`#d97706`,STYLE_APPLIED:`#2563eb`,TEXT_TYPE_CHANGE_REQUESTED:`#7c3aed`,LINK_CHANGE_REQUESTED:`#0891b2`,IMAGE_SRC_CHANGED:`#be185d`,ALT_TEXT_SET:`#be185d`},_=(e,t)=>{switch(e){case`STYLE_APPLIED`:{let e=t.style||t.after,n=t.before,r=t.after;return e===`fontSize`||t.fontSize?`fontSize: ${n} → ${r} (preview: inline style)`:`${e}: ${n} → ${r}`}case`TEXT_TYPE_CHANGE_REQUESTED`:{let e=t[`tag before`],n=t[`tag after`],r=t.fontSize,i=`<${e}> → <${n}>`;return r?`${i} (preview: inline ${r})`:i}case`CONTENT_CHANGED`:return`"${String(t.after||``).slice(0,40)}"`;case`EMOJI_INSERTED`:return`${t.emoji} added`;default:return Object.entries(t).slice(0,2).map(([e,t])=>`${e}: ${t}`).join(`, `)}},v=()=>{f=!f,console.log(p+(f?` %c🟢 Debug mode ENABLED`:` %c🔴 Debug mode DISABLED`),m,`color: ${f?`#16a34a`:`#dc2626`}; font-weight: bold;`)},y=(e,t,n,r)=>{if(!f)return;let i=g[e]??`#6b7280`,a=h[e]??`📝`,o=n.tagName.toLowerCase(),s=_(e,r);console.groupCollapsed(`${p} %c${a} PREVIEW ${e}%c  <${o}>  %c${s}`,m,`color: ${i}; font-weight: bold;`,`color: #6b7280; font-weight: normal;`,`color: #0891b2; font-weight: normal;`),console.log(`%cLocation`,`font-weight: bold;`,t),console.log(`%cElement`,`font-weight: bold;`,`<${o}>`,n.className?`class="${n.className}"`:`(no class)`),console.log(`%cDetails`,`font-weight: bold;`,r),console.groupEnd()},b=e=>{let t=document.createElement(`div`);return t.innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" class="sg-icon-loader-circular" viewBox="25 25 50 50" style="width: ${e}px; height: ${e}px;">
      <circle class="sg-icon-loader-path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10"/>
    </svg>
  `,t},x=()=>`
  .sg-icon-loader-circular {
    animation: sg-preview-rotate 2s linear infinite;
    transform-origin: center center;
  }
  .sg-icon-loader-path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: sg-preview-dash 1.5s ease-in-out infinite, sg-preview-color 6s ease-in-out infinite;
    stroke-linecap: round;
  }
  @keyframes sg-preview-rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes sg-preview-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }
  @keyframes sg-preview-color {
    100%,
    0% {
      stroke: #ff7061;
    }
    40% {
      stroke: #21ab61;
    }
    66% {
      stroke: #4343F0;
    }
    80%,
    90% {
      stroke: #ff7061;
    }
  }
`,S=new Map,C=(e,t,n)=>{T(t);let r=e.getBoundingClientRect(),i=window.getComputedStyle(e),a=document.createElement(`div`),o={position:`fixed`,top:`${r.top}px`,left:`${r.left}px`,width:`${r.width}px`,height:`${r.height}px`,pointerEvents:`none`,boxSizing:`border-box`,zIndex:`999999`,borderRadius:i.borderRadius||`0px`};if(t===`loading`){Object.assign(a.style,{...o,zIndex:`2147483647`,backdropFilter:`blur(4px)`,background:`rgba(255, 255, 255, 0.5)`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,gap:`8px`});let e=0,t=`12px`,i=!1;if(r.width>=240&&r.height>=240?(e=80,t=`14px`,i=!0):r.width>=80&&r.height>=80?(e=52,t=`12px`,i=!0):r.width>=40&&r.height>=40?(e=24,i=!1):(e=0,i=!1),e>0){let t=b(e);a.appendChild(t)}if(i&&n?.text){let e=document.createElement(`div`);e.textContent=n.text,e.style.fontFamily=`Inter, sans-serif`,e.style.fontSize=t,e.style.fontWeight=`400`,e.style.color=`#212121`,a.appendChild(e)}}else Object.assign(a.style,{...o,boxShadow:`inset 0 0 0 1px #6164FF, 0 0 0 1px #4343F0`});if(a.setAttribute(l.OVERLAY,t),t===`hover`){let t=e.getAttribute(l.COMPONENT);if(t&&(a.setAttribute(l.LABEL,t),a.setAttribute(l.LABEL_POSITION,r.top<30?`bottom`:`top`)),e.tagName===`IMG`){let{width:e,height:t}=r;e>=100&&t>=100&&a.setAttribute(l.DIMENSIONS,`${Math.round(e)} x ${Math.round(t)} px`)}}document.body.appendChild(a),S.set(t,a)},w=(e,t)=>{let n=S.get(t);if(!n||!e)return;let r=e.getBoundingClientRect(),i=window.getComputedStyle(e);Object.assign(n.style,{top:`${r.top}px`,left:`${r.left}px`,width:`${r.width}px`,height:`${r.height}px`,borderRadius:i.borderRadius||`0px`})},T=e=>{let t=S.get(e);t?.parentNode?.removeChild(t),S.delete(e)},E=()=>{document.querySelectorAll(`[${l.OVERLAY}]`).forEach(e=>e.remove()),S.clear()},D=()=>{let e=document.createElement(`style`);e.textContent=`
    .sg-cursor-text * {
      cursor: text !important;
    }
    .sg-cursor-pointer * {
      cursor: pointer !important;
    }
    [contenteditable="true"] {
      outline: none !important;
    }
    [${l.OVERLAY}='hover']::before {
      content: attr(${l.LABEL});
      position: absolute;
      left: 0;
      background: #4343F0;
      border-radius: 4px;
      color: white;
      padding: 2px 4px;
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
    }
    [${l.OVERLAY}='hover'][${l.LABEL_POSITION}='top']::before {
      bottom: calc(100% + 4px);
    }
    [${l.OVERLAY}='hover'][${l.LABEL_POSITION}='bottom']::before {
      top: calc(100% + 4px);
    }
    [${l.OVERLAY}='hover'][${l.DIMENSIONS}]::after {
      content: attr(${l.DIMENSIONS});
      position: absolute;
      top: 4px;
      right: 4px;
      background: #4343F0;
      border-radius: 4px;
      color: white;
      padding: 2px 4px;
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
    }
    ${x()}
  `,document.head.appendChild(e)},O=()=>{},k=()=>{},A=(e,t)=>{O=e,k=t},j=e=>e?.closest(`[${l.LOC}]`),M=e=>document.querySelector(`[${l.LOC}="${e}"]`),N=e=>{let t=e.getBoundingClientRect();return{top:t.top,left:t.left,width:t.width,height:t.height}},P=e=>{let t=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(!t)return e;let n=parseInt(t[1],10),r=parseInt(t[2],10),i=parseInt(t[3],10);return`#${((1<<24)+(n<<16)+(r<<8)+i).toString(16).slice(1)}`},F=e=>{let t=e.tagName.toLowerCase(),n=t===`a`?e:e.closest(`a`),r=e.hasAttribute(`href`)||!!n,i=e.getAttribute(`href`)||n?.getAttribute(`href`)||void 0,a=e.getAttribute(`target`)||n?.getAttribute(`target`)||void 0,o=e.getAttribute(`rel`)||n?.getAttribute(`rel`)||void 0,s=e.hasAttribute(`onclick`)||e.getAttribute(`type`)===`submit`,c=t===`button`?e.getAttribute(`type`)||`button`:void 0,u=e.getAttribute(l.EDITABLE)===`true`,d=window.getComputedStyle(e),f=P(d.color),p=P(d.backgroundColor),m=d.fontSize,h=e.getAttribute(`class`)||``,g=t===`img`?e.getAttribute(`alt`)||``:void 0,_=ee.includes(t),v=e.outerHTML,y=v.indexOf(`>`);return{hasHref:r,href:i,target:a,rel:o,hasOnClick:s,buttonType:c,isEditable:u,isTextElement:_,computedColor:f,computedBackgroundColor:p,computedFontSize:m,classNames:h,openingTag:y>=0?v.slice(0,y+1):v,alt:g}},I=e=>{let{loc:t}=e,n=M(t);if(!n)return;let r=n.innerText.trim();if(Array.from(n.children).some(e=>e.tagName?.toLowerCase()!==`br`)){let e=null;for(let t of Array.from(n.childNodes))if(t.nodeType===Node.TEXT_NODE&&(t.textContent||``).trim()){e=t;break}if(!e){let t=document.createTextNode(``);n.appendChild(t),e=t}let i=e.textContent||``,a=document.createElement(`span`);a.textContent=i,a.contentEditable=`true`,a.style.cssText=`outline:none;display:inline;min-width:2px;caret-color:auto;`,e.parentNode?.replaceChild(a,e);let o=document.createRange();o.selectNodeContents(a);let s=window.getSelection();s?.removeAllRanges(),s?.addRange(o),a.focus();let l=[];a.addEventListener(`keydown`,e=>{if(e.key===` `&&n.tagName===`BUTTON`){e.preventDefault(),document.execCommand(`insertText`,!1,` `);return}if((e.ctrlKey||e.metaKey)&&e.key===`z`&&l.length>0){e.preventDefault(),l.pop()?.();return}if(e.key===`Backspace`){let t=window.getSelection();if(t?.isCollapsed&&t?.anchorOffset===0){e.preventDefault();let t=a.previousElementSibling;if(t){let e=t.parentNode,n=t.nextSibling;l.push(()=>{n?e?.insertBefore(t,n):e?.appendChild(t)}),t.remove()}}}}),a.addEventListener(`input`,()=>{let e=(a.textContent||``)!==i;O(c.EDITING_TEXT,{loc:t,isDirty:e}),k(n)}),a.addEventListener(`blur`,()=>{let e=Array.from(n.children).filter(e=>e!==a&&e.tagName?.toLowerCase()!==`br`).length,o=a.innerText.trim(),s=document.createTextNode(a.innerText.trim());a.parentNode?.replaceChild(s,a),o!==i&&(y(c.CONTENT_CHANGED,t,n,{before:r,after:o}),O(c.CONTENT_CHANGED,{loc:t,newContent:o,remainingIconCount:e})),O(c.EDITING_TEXT,{loc:t,isDirty:!1}),requestAnimationFrame(()=>k(n))},{once:!0});return}n.setAttribute(`contenteditable`,`true`),n.style.caretColor=`auto`,n.focus();let i=e=>{e.key===` `&&n.tagName===`BUTTON`&&(e.preventDefault(),document.execCommand(`insertText`,!1,` `))};n.addEventListener(`keydown`,i);let a=()=>{n.removeAttribute(`contenteditable`),n.style.caretColor=``,n.removeEventListener(`blur`,a),n.removeEventListener(`keydown`,i);let e=n.innerText.trim();e!==r&&(y(c.CONTENT_CHANGED,t,n,{before:r,after:e}),O(c.CONTENT_CHANGED,{loc:t,newContent:e})),O(c.EDITING_TEXT,{loc:t,isDirty:!1}),requestAnimationFrame(()=>k(n))};n.addEventListener(`blur`,a)},L=(e,t)=>{let n=document.createElement(t);for(let t of Array.from(e.attributes))n.setAttribute(t.name,t.value);return n.innerHTML=e.innerHTML,e.replaceWith(n),n},R=e=>{let{loc:t,tag:n,fontSize:r}=e,i=M(t);if(!i)return;let a=i.getAttribute(l.COMPONENT)||i.tagName.toLowerCase();i.setAttribute(l.COMPONENT,n);let o=L(i,n);r&&(o.style.fontSize=r),y(c.TEXT_TYPE_CHANGE_REQUESTED,t,o,{"tag before":a,"tag after":n,fontSize:r??`(unchanged)`}),O(c.TEXT_TYPE_CHANGE_REQUESTED,{loc:t,tag:n,fontSize:r,classNames:o.className}),k(o)},z=e=>{let{style:t,value:n,loc:r}=e,i=M(r);if(!i)return;let a=window.getComputedStyle(i),o=n,s;switch(t){case u.BOLD:{s=a.fontWeight;let e=parseInt(a.fontWeight,10)>=700?`normal`:`bold`;i.style.fontWeight=e,o=e;break}case u.ITALIC:{s=a.fontStyle;let e=a.fontStyle===`italic`?`normal`:`italic`;i.style.fontStyle=e,o=e;break}case u.UNDERLINE:{s=a.textDecoration;let e=a.textDecoration.includes(`underline`)?`none`:`underline`;i.style.textDecoration=e,o=e;break}case u.LINE_THROUGH:{s=a.textDecoration;let e=a.textDecoration.includes(`line-through`)?`none`:`line-through`;i.style.textDecoration=e,o=e;break}case u.COLOR:if(s=a.color,n){let e=[];Array.from(i.children).forEach(t=>{let n=t;n.style.color||e.push([n,window.getComputedStyle(n).color])}),i.style.color=n,e.forEach(([e,t])=>{e.style.color=t})}break;case u.BACKGROUND_COLOR:s=a.backgroundColor,n&&(i.style.backgroundColor=n);break;case u.TEXT_ALIGN:s=a.textAlign,n&&(i.style.textAlign=n);break;case u.FONT_SIZE:s=a.fontSize,n&&(i.style.fontSize=n);break}y(c.STYLE_APPLIED,r,i,{style:t,before:s??`(unknown)`,after:o??`(unchanged)`}),O(c.STYLE_APPLIED,{loc:r,style:t,value:o}),k(i)},te=e=>{let{loc:t,href:n,target:r,rel:i}=e,a=M(t);if(!a)return;let o=a.closest(`a`)||(a.tagName.toLowerCase()===`a`?a:null),s=o?o.href:`(none)`,l=o?.getAttribute(`target`)??`(none)`;if(o)o.href=n,r&&o.setAttribute(`target`,r),i&&o.setAttribute(`rel`,i);else{let e=document.createElement(`a`);e.href=n,r&&e.setAttribute(`target`,r),i&&e.setAttribute(`rel`,i),a.parentNode?.insertBefore(e,a),e.appendChild(a)}y(c.LINK_CHANGE_REQUESTED,t,a,{"href before":s,"href after":n,"target before":l,"target after":r??`(none)`,rel:i??`(none)`}),O(c.LINK_CHANGE_REQUESTED,{loc:t,href:n,target:r,rel:i})},B=e=>{let{loc:t,emoji:n}=e,r=M(t);if(!r)return;let i=r.innerText,a=r.querySelector(`[contenteditable="true"]`)||(r.isContentEditable?r:null);if(a){let e=window.getSelection();if(e&&e.rangeCount>0&&a.contains(e.anchorNode)){let t=e.getRangeAt(0);t.deleteContents();let r=document.createTextNode(n);t.insertNode(r),t.setStartAfter(r),t.collapse(!0),e.removeAllRanges(),e.addRange(t)}else a.appendChild(document.createTextNode(n));a.dispatchEvent(new Event(`input`,{bubbles:!0}))}else r.appendChild(document.createTextNode(n));let o=r.innerText;y(c.EMOJI_INSERTED,t,r,{emoji:n,before:i,after:o}),O(c.EMOJI_INSERTED,{loc:t,emoji:n,newContent:o}),k(r),I({loc:t})},V=e=>{let{loc:t,src:n}=e,r=M(t);if(!r)return;let i=r.tagName.toLowerCase()===`img`?r.src:`(not an img)`;r.tagName.toLowerCase()===`img`&&(r.src=n),y(c.IMAGE_SRC_CHANGED,t,r,{"src before":i,"src after":n}),O(c.IMAGE_SRC_CHANGED,{loc:t,src:n})},H=e=>{let{loc:t,alt:n}=e,r=M(t);if(!r)return;let i=r.tagName.toLowerCase()===`img`?r.alt:`(not an img)`;r.tagName.toLowerCase()===`img`&&(r.alt=n),y(c.ALT_TEXT_SET,t,r,{"alt before":i,"alt after":n}),O(c.ALT_TEXT_SET,{loc:t,alt:n})},U=!1,W=null,G=null,K=null,q=null,J=e=>{document.body.classList.remove(`sg-cursor-text`,`sg-cursor-pointer`),e&&document.body.classList.add(`sg-cursor-${e}`)},Y=(e,t)=>{q?.send(e,t)},X=e=>{if(e!==W)if(W&&!document.contains(W))W=e;else return;requestAnimationFrame(()=>{w(e,d.SELECTED),Y(c.ELEMENT_RECT_UPDATED,{rect:N(e)})})},Z=()=>{U=!0,J(`pointer`)},ne=()=>{U=!1,J(``),W=null,G=null,E()},re=e=>{W=e,T(d.HOVER),G=null,C(e,d.SELECTED);let t=F(e);q.send(c.ELEMENT_SELECTED,{sourceLocation:e.getAttribute(l.LOC)||``,componentName:e.getAttribute(l.COMPONENT)||``,elementType:e.tagName.toLowerCase(),textContent:(e.innerText||``).trim(),rect:N(e),...t});let n=t.isEditable&&e.children.length===0,r=t.isEditable&&e.children.length>0;if(n||r){let t=e.getAttribute(l.LOC)||``;t&&(I({loc:t}),requestAnimationFrame(()=>w(e,d.SELECTED)))}},ie=()=>{T(d.SELECTED),W=null,Y(c.SELECTION_CLEARED)},ae=e=>{let t=window.getComputedStyle(e);if(e.tagName===`IMG`){let e=t.filter||``,n=parseFloat(t.opacity);return e.includes(`blur`)||n<.5}let n=(e.innerText||``).trim()===``&&e.children.length===0,r=(t.backgroundImage||``).includes(`gradient`);return n&&r},Q=e=>{let t=document.elementsFromPoint(e.clientX,e.clientY),n=new Set;for(let e of t){let t=e.closest(`[${l.LOC}]`);if(!(!t||n.has(t))&&(n.add(t),!ae(t)))return t}return j(e.target)},oe=()=>{E(),W=null,G=null},se=e=>{if(!e){J(`pointer`);return}let{isEditable:t,isTextElement:n}=F(e);J(t&&n?`text`:`pointer`)},ce=e=>{if(!U)return;let t=Q(e);if(se(t),!t||t===W){T(d.HOVER),G=null;return}t!==G&&(G=t,C(t,d.HOVER))},le=e=>{U&&j(e.target)===G&&(T(d.HOVER),G=null,J(`pointer`))},ue=e=>{if(!U||!q)return;let t=e,n=Q(t);if(n){if(t.preventDefault(),t.stopPropagation(),n===W)return;re(n)}else W&&ie()},$=()=>{G&&w(G,d.HOVER),W&&(w(W,d.SELECTED),Y(c.ELEMENT_RECT_UPDATED,{rect:N(W)})),K&&w(K,d.LOADING)},de=e=>{if(W){K=W;let{text:t}=e||{};C(W,d.LOADING,{text:t||`Uploading...`})}},fe=()=>{K=null,T(d.LOADING)};function pe(e){q||(q=new a({source:o,allowedOrigins:e,messageHandlers:{[s.ACTIVATE_INSPECTOR]:Z,[s.DEACTIVATE_INSPECTOR]:ne,[s.MAKE_EDITABLE]:I,[s.APPLY_STYLE]:z,[s.CLEAR_SELECTION]:oe,[s.CHANGE_TEXT_TYPE]:R,[s.ADD_LINK]:te,[s.INSERT_EMOJI]:B,[s.CHANGE_IMAGE_SRC]:V,[s.SET_ALT_TEXT]:H,[s.SHOW_IMAGE_LOADING]:de,[s.HIDE_IMAGE_LOADING]:fe,[s.TOGGLE_DEBUG]:v},domEvents:[{event:`mouseover`,handler:ce,options:!0},{event:`mouseout`,handler:le,options:!0},{event:`click`,handler:ue,options:!0},{event:`scroll`,handler:$,options:!0},{event:`resize`,handler:$,options:!0},{event:`input`,handler:$,options:!0}]}),A(Y,X),D())}pe([`.siteground.ai`,`.sgdev.eu`])})();

  (function(){var e=`sg-preview`;function t(e){"@babel/helpers - typeof";return t=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},t(e)}function n(e,n){if(t(e)!=`object`||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var i=r.call(e,n||`default`);if(t(i)!=`object`)return i;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(n===`string`?String:Number)(e)}function r(e){var r=n(e,`string`);return t(r)==`symbol`?r:r+``}function i(e,t,n){return(t=r(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=class{constructor(e){if(i(this,`source`,void 0),i(this,`allowedOrigins`,void 0),i(this,`targetOrigin`,void 0),i(this,`debug`,void 0),i(this,`messageHandlers`,new Map),!e.allowedOrigins?.length)throw Error(`[EventCommunicator] allowedOrigins is required`);this.source=e.source,this.allowedOrigins=e.allowedOrigins,this.targetOrigin=e.targetOrigin||`*`,this.debug=e.debug||!1,e.messageHandlers&&this.registerMessageHandlers(e.messageHandlers),e.domEvents&&this.registerDOMEvents(e.domEvents),this.initMessageListener()}log(...e){this.debug&&console.log(`[EventCommunicator]`,...e)}formatEventType(t){return`${e}:${t}`}parseEventType(t){let n=`${e}:`;return t.startsWith(n)?t.slice(n.length):null}isOriginAllowed(e){return this.allowedOrigins.some(t=>t===`*`?!0:e===t||e.endsWith(t))}initMessageListener(){window.addEventListener(`message`,e=>{if(this.log(`Message received from:`,e.origin),!this.isOriginAllowed(e.origin)){console.warn(`[EventCommunicator] Wrong origin:`,e.origin);return}let t=e.data;if(!t?.type)return;let n=this.parseEventType(t.type);if(!n)return;this.log(`Parsed event type:`,n);let r=this.messageHandlers.get(n);r?r(t.payload):this.log(`No handler for:`,n)})}registerMessageHandlers(e){Object.entries(e).forEach(([e,t])=>{this.messageHandlers.set(e,t)})}registerDOMEvents(e){e.forEach(({event:e,handler:t,options:n})=>{window.addEventListener(e,t,n)})}getTargetWindow(){try{if(window.parent&&window.parent!==window)return window.parent;if(window.top&&window.top!==window)return window.top;if(window.opener)return window.opener}catch{if(window.parent&&window.parent!==window)return window.parent}return null}send(e,t){let n=this.getTargetWindow();if(!n)return;let r={type:this.formatEventType(e),source:this.source,payload:t??null,timestamp:new Date().toISOString()};n.postMessage(r,this.targetOrigin)}},o=null;function s(e,t,n){return e.includes(`Failed to fetch dynamically imported module`)?`module-load-error`:e===`Script error.`?`script-origin-error`:e.includes(`ResizeObserver loop limit exceeded`)?`resize-observer-error`:e.includes(`ReferenceError`)?`react-reference-error`:e.includes(`TypeError`)?`react-type-error`:e.includes(`is not defined`)?`react-reference-error`:e.includes(`Cannot read prop`)?`react-property-error`:e.includes(`Cannot access before initialization`)?`react-initialization-error`:e.includes(`is not a function`)?`react-function-error`:n&&n.includes(`ErrorBoundary`)?`react-boundary-error`:t&&t.includes(`renderWithHooks`)?`react-render-error`:t&&t.includes(`updateFunctionComponent`)?`react-component-error`:t&&t.includes(`@react-refresh`)?`react-hmr-error`:`react-runtime-error`}function c(e){if(!e)return{file:null,line:null,column:null};for(let t of[/at\s+.*?\s+\(([^:]+):(\d+):(\d+)\)/,/([^:@\s]+\.(?:tsx?|jsx?)):(\d+):(\d+)/,/\(([^:]+):(\d+):(\d+)\)/,/(\w+)?@([^:]+):(\d+):(\d+)/]){let n=e.match(t);if(n)return{file:n[1]||n[2],line:parseInt(n[2]||n[3],10),column:parseInt(n[3]||n[4],10)}}return{file:null,line:null,column:null}}function l(e){if(!o)return;let t=c(e.stack),n={type:s(e.message,e.stack,e.componentStack),message:e.message,file:t.file,line:t.line,column:t.column,stack:e.stack,componentStack:e.componentStack,environment:`development`,errorSource:e.source,userAgent:navigator.userAgent,url:window.location.href};o.send(`RUNTIME_ERROR`,n)}var u=e=>{try{let t=e.target;if(t&&t instanceof HTMLElement){let e=t.tagName.toUpperCase(),n=t.src||t.href||`unknown`;l({message:`Failed to load resource: `+e+` from `+n,source:`resource-loader`,stack:null,componentStack:null})}else{let t=e;l({message:t.message||`Runtime error`,source:`window-onerror`,stack:t.error?t.error.stack:null,componentStack:null})}}catch(e){console.error(`[SG Preview - Reporter] Internal error in onerror handler:`,e)}},d=e=>{try{let t=e.reason;l({message:t?.message||t||`Unhandled promise rejection`,source:`unhandled-rejection`,stack:t?.stack,componentStack:null})}catch(e){console.error(`[SG Preview - Reporter] Internal error in unhandledrejection handler:`,e)}},f=console.error;function p(e=[`*`]){o||(o=new a({source:`error-reporter`,allowedOrigins:e,domEvents:[{event:`error`,handler:u,options:!0},{event:`unhandledrejection`,handler:d}]}),console.error=function(...e){try{let t=e.join(` `);if(t.includes(`Error handled by React Router default ErrorBoundary`)||t.includes(`React will try to recreate this component tree`)||t.includes(`The above error occurred in the`)||t.includes(`React Router caught the following error during render`)||/Minified React error #\d+/.test(t)||t.includes(`ResizeObserver loop limit exceeded`)){let n=e.find(e=>e instanceof Error),r=e.find(e=>typeof e==`object`&&e&&`componentStack`in e);l({message:n?n.message:t,source:`console-error`,stack:n?n.stack:null,componentStack:r?.componentStack??null})}}catch(e){console.error(`[SG Preview - Reporter] Internal error in console.error wrapper:`,e)}f.apply(console,e)},console.log(`[SG Preview - Runtime Reporter] Initialized.`))}p([`*`])})();

  (function(){var e=(e,t,n)=>{let r=document.createElement(e);return t&&(r.className=t),n&&Object.assign(r,n),r},t=`sg-preview-banner`,n=`56px`,r=`<svg xmlns="http://www.w3.org/2000/svg" width="106" height="22" viewBox="0 0 106 22" fill="none"><path d="M22.9633 4.42238C21.5157 1.72721 18.2177 3.26215 18.9242 6.36882C19.8664 10.5614 24.4441 11.5718 26.1298 15.28C27.072 17.3388 26.4661 19.3616 25.0525 20.2582C23.6389 21.1548 21.1479 21.5295 19.6338 20.2956C18.8933 19.6593 18.9266 19.2103 18.5564 20.3706C18.4219 20.7446 18.2201 21.1568 17.7821 20.7446C17.344 20.3324 17.1428 18.1618 18.2535 17.3382C19.3641 16.5145 19.4314 17.1508 20.0712 17.8621C21.6533 19.3221 23.6728 18.8724 24.1775 17.6747C24.6823 16.477 24.1775 15.6908 23.5044 14.8645C22.8312 14.0381 21.0134 12.6183 19.7343 10.9716C18.4552 9.32494 16.8035 6.44376 17.647 4.04768C18.4904 1.65161 20.4384 0.0430697 22.896 1.42946C24.3436 2.25313 25.7572 4.08716 24.9489 5.95865C24.3769 7.22996 22.6603 7.6428 21.852 6.33269C21.0437 5.02257 23.3668 5.17111 22.9633 4.42238Z" fill="white"/><path d="M30.2483 8.55121C30.3288 10.6741 27.5792 10.535 27.5021 8.48168C27.4831 8.19619 27.5918 7.91554 27.8046 7.70061C28.0175 7.48567 28.3173 7.35377 28.6392 7.3335H28.8745C29.1931 7.37638 29.492 7.49672 29.738 7.68115C29.8824 7.78774 29.9992 7.9206 30.0805 8.07072C30.1618 8.22084 30.2058 8.38471 30.2094 8.55121H30.2483Z" fill="white"/><path d="M27.4238 14.1185L27.3129 14.1903C26.2067 14.8009 26.538 13.5797 27.1283 12.8612C27.7186 12.1426 28.2345 11.8554 28.6774 11.9272C28.8629 11.9456 29.0387 12.0167 29.183 12.1317C29.3272 12.2467 29.4336 12.4005 29.4888 12.574C29.7836 13.9749 28.1608 17.8912 29.8945 18.9331C30.0489 19.0348 30.2368 19.0764 30.4211 19.0498C30.6054 19.0232 30.7729 18.9304 30.8905 18.7896C31.2224 18.4306 31.259 17.8194 31.6653 17.712C32.0717 17.6047 31.9973 17.7482 32.071 18.2152C32.1819 19.6161 31.5544 21.6283 29.5631 20.9459C27.5719 20.2636 27.8667 16.8499 27.9032 15.0537C27.9032 14.9457 27.866 13.8682 27.4238 14.1198V14.1185Z" fill="white"/><path d="M40.2427 11.4169C40.1838 11.2397 40.0701 11.086 39.9181 10.9784C39.7661 10.8708 39.5839 10.8149 39.3981 10.8188L37.3421 10.9305L35.0291 11.0421L35.3958 7.696C35.7263 4.46152 35.7633 2.45385 35.4329 1.71086C35.1024 0.967862 34.7363 0.74656 34.3325 1.04495C33.5249 1.19382 33.3048 2.64325 33.2315 5.32015C33.2315 7.32783 33.3048 9.29829 33.4886 11.3053L32.3135 11.6376C31.9817 11.7224 31.6613 11.8472 31.3592 12.0091C31.2888 12.0482 31.2329 12.1091 31.1998 12.1828C31.1667 12.2564 31.1582 12.3389 31.1755 12.4178C31.1797 12.6765 31.2425 12.9308 31.3592 13.1615L32.8277 16.582L34.1858 19.7055C34.5896 20.6359 35.1037 21.1184 35.7646 21.0812C36.4255 21.044 36.7189 20.9695 36.6826 20.8579C36.6024 20.5535 36.5533 20.2418 36.5359 19.9275C35.9841 18.6805 35.5894 17.3691 35.3608 16.0238C35.257 14.9859 35.208 13.9433 35.2141 12.9003C37.2331 12.4171 38.5919 12.568 39.7662 12.231H39.8403C40.2811 11.9333 40.024 12.0822 40.207 11.9333C40.2435 11.902 40.2733 11.8637 40.2949 11.8207C40.3164 11.7776 40.3292 11.7307 40.3325 11.6827C40.3359 11.6346 40.3296 11.5863 40.3142 11.5407C40.2988 11.4951 40.2745 11.453 40.2427 11.4169ZM34.1851 17.737L34.1118 17.8115H34.0014L33.8547 17.4792C33.7443 17.2187 33.2672 15.5832 33.2672 15.5832C33.2672 15.5832 32.8634 14.0586 32.79 13.9104C32.7718 13.8694 32.7624 13.8251 32.7624 13.7802C32.7624 13.7353 32.7718 13.6909 32.79 13.6499C32.8257 13.5675 32.8754 13.492 32.9367 13.4266C33.0762 13.3156 33.2396 13.2391 33.4139 13.2033H33.5242L33.5976 13.315V13.6473L33.708 14.4281L34.0748 16.7329L34.1851 17.5882V17.737Z" fill="white"/><path d="M47.5447 18.4851C46.186 20.0604 44.2683 21.5235 42.1499 20.9604C40.9112 20.5479 40.1121 19.4223 39.7129 18.0347C39.3471 16.6838 39.3198 15.2717 39.633 13.9092C40.1128 11.8086 41.4709 10.0835 43.0296 10.0835C43.6874 10.1345 44.3203 10.3432 44.8675 10.6897C45.4148 11.0362 45.858 11.5088 46.1548 12.0622C46.4516 12.6156 46.5921 13.2313 46.5626 13.8503C46.5332 14.4693 46.3349 15.0708 45.9867 15.5972C45.1473 16.7978 43.3893 17.3973 42.5505 17.8099C41.7118 18.2224 41.9909 18.0347 42.0312 18.5979C42.1513 19.9854 44.6682 19.9854 46.2665 16.8727C46.4262 16.5729 47.4253 15.3724 48.0648 15.71C49.4221 16.498 47.7044 18.2974 47.5447 18.4851ZM41.3515 16.5722C43.1095 16.0469 44.5884 14.5844 44.7078 13.7965C44.9473 12.2961 42.5103 11.0207 41.6313 13.4589C41.3976 14.4685 41.3035 15.5022 41.3515 16.5344V16.5722Z" fill="white"/><path d="M57.8306 13.0743C57.7263 14.3057 59.4618 20.7617 58.2123 20.8738C56.9629 20.9859 56.9979 21.0232 56.8242 20.5749C56.6505 20.1267 57.3796 16.8433 56.7548 17.8506C56.6162 18.0747 56.6505 18.1121 56.4081 18.5223C54.3609 22.4781 51.5497 21.4328 49.9185 18.2235C48.8171 15.8966 48.3826 13.2747 48.6691 10.6855C49.1201 6.09533 50.9593 0.0496004 55.2624 1.0202C58.6634 1.80402 56.3032 6.69037 55.1237 5.42292C52.3124 -1.18116 46.7255 14.7894 52.9028 18.6311C54.7076 19.7504 56.2344 16.1309 55.8527 14.5259C55.471 12.9209 55.5404 13.3692 55.02 13.5186C54.4996 13.668 53.2501 14.9368 52.8335 14.5259C52.4168 14.1149 52.1044 12.1377 53.0415 12.1004C53.9786 12.063 54.8113 12.4339 56.1301 10.7195C57.4489 9.00513 58.3166 9.63752 58.108 11.3199C58.0037 12.0663 57.8306 12.4766 57.7613 13.0363L57.8306 13.0743Z" fill="white"/><path d="M67.029 10.2588C65.7967 9.49428 64.3063 9.11194 62.7959 9.17279C60.5545 9.38986 58.4379 10.6936 58.6867 12.758C58.7696 13.6269 58.8944 17.3927 59.268 18.9506C59.3067 19.2122 59.4281 19.4592 59.6187 19.6639C59.8092 19.8686 60.0614 20.0229 60.3468 20.1096C60.6396 20.1955 60.9584 20.1838 61.2419 20.0768C61.5253 19.9698 61.7534 19.7751 61.8821 19.5301C62.2557 18.7694 61.8403 18.0817 61.6333 17.4299C61.2599 16.0363 61.0101 14.6198 60.8862 13.1928C60.6374 10.8754 64.6629 10.5854 65.5759 11.9256C64.9117 12.831 65.8665 13.4105 67.1112 12.5774C68.3559 11.7444 67.7754 10.7672 66.9864 10.2236L67.029 10.2588Z" fill="white"/><path d="M71.8347 21.0021C76.4444 20.1136 78.1987 12.1206 72.488 9.37886C66.5377 7.2162 66.2621 22.3152 71.8347 21.0021ZM69.7361 14.5148C70.2866 8.22002 73.9674 11.155 74.4485 15.2482C74.9297 19.3413 68.9447 21.7744 69.7361 14.5148Z" fill="white"/><path d="M79.0587 12.7C78.2982 14.4863 78.5882 21.7098 82.0638 18.2931C82.8243 17.5555 82.9325 15.147 82.6431 13.0887C82.4885 12.3016 82.2951 11.5237 82.0638 10.7585C82.0322 10.4284 82.104 10.0965 82.2679 9.81515C82.4319 9.53381 82.6786 9.31911 82.969 9.20502C83.2333 9.13253 83.5129 9.16301 83.7582 9.29105C84.0034 9.41908 84.1984 9.63635 84.3083 9.90416C84.6706 10.8361 84.4171 12.3511 84.3806 12.972C84.2718 14.8359 83.9824 17.0885 84.5976 18.2924C84.8512 18.7972 85.2129 18.8748 85.2494 19.2244C85.2859 20.5835 83.7647 21.477 83.2219 20.6226C83.0772 20.3898 83.1854 20.0403 82.9683 19.8459C80.1086 22.6033 76.9589 20.4283 77.0312 16.5061C76.956 15.3373 77.0169 14.1631 77.2124 13.0104C77.5018 11.7674 77.5741 11.1465 78.0453 10.6417C78.1163 10.5596 78.2018 10.4934 78.2968 10.4469C78.3918 10.4004 78.4944 10.3746 78.5988 10.371C78.7032 10.3674 78.8072 10.3859 78.9048 10.4257C79.0024 10.4655 79.0917 10.5256 79.1675 10.6026C79.3846 10.7578 79.2764 12.0393 79.0587 12.7Z" fill="white"/><path d="M91.6528 19.0191C92.1615 17.2333 92.7788 14.3301 92.3793 13.2516C91.9798 12.1731 89.6187 11.0564 88.5653 12.6936C87.9115 13.6984 87.8755 17.3076 88.7105 19.4284C88.7498 19.575 88.7603 19.7282 88.7413 19.879C88.7223 20.0298 88.6742 20.1752 88.5999 20.3068C88.5255 20.4384 88.4264 20.5535 88.3082 20.6455C88.19 20.7374 88.0552 20.8044 87.9115 20.8425C85.5145 21.6611 87.3668 14.8519 85.9866 12.6561C85.6962 12.1724 85.3327 12.1349 85.2601 11.8C85.115 10.5346 86.5678 9.75352 87.2217 10.5346C87.4034 10.7577 87.2943 11.0926 87.5486 11.2413C90.2 8.71121 94.159 10.6089 94.414 14.2182C94.4494 16.0991 94.1287 17.9692 93.4699 19.7252C93.3233 20.1364 93.1014 20.5152 92.816 20.8412C92.6666 20.9899 92.4684 21.0761 92.2601 21.083C92.0519 21.09 91.8487 21.0171 91.6901 20.8787C91.254 20.5812 91.4724 19.5764 91.6535 19.0184L91.6528 19.0191Z" fill="white"/><path d="M102.644 10.5849C102.865 8.70656 102.052 3.17934 100.572 3.0347C100.165 2.99854 100.091 2.05905 100.35 1.48114C100.609 0.903237 101.275 0.72244 102.348 1.15829C104.05 1.84467 104.198 8.16675 104.235 10.0451C104.177 11.9866 104.251 13.9296 104.457 15.8616C104.543 16.4099 104.705 16.9446 104.937 17.4513C105.233 18.1377 105.566 18.6071 105.344 19.0049C105.123 19.4026 103.569 20.1968 103.125 19.7636C102.764 19.3657 102.578 18.8472 102.606 18.3185C100.053 22.2922 95.9461 19.1857 95.392 15.3199C94.8378 11.454 98.2779 7.30022 102.644 10.5152V10.5849ZM98.6109 17.9182C101.83 20.1943 102.865 14.3055 101.238 12.1017C99.6099 9.89788 94.2824 14.6309 98.6109 17.9182Z" fill="white"/><path d="M11.166 5.70174C13.1397 4.98185 13.8706 2.66966 13.7976 1.03941C6.37843 -2.59868 -1.0769 3.92032 0.129029 11.1978C0.332345 12.5304 0.871292 13.7847 1.69209 14.8356C2.51288 15.8864 3.58681 16.6971 4.80671 17.1868C4.62381 17.3766 4.29486 17.8687 4.1488 18.0585C6.52449 18.5893 8.24226 18.5133 9.74096 17.9446C10.9328 17.5003 11.9911 16.7425 12.8107 15.7463C13.4964 14.942 13.985 13.9802 14.2357 12.9413C14.2726 12.8274 14.0167 12.5624 14.4186 12.7515C14.8206 12.9406 14.3088 14.5329 14.1627 14.9119C13.9633 15.3904 13.7184 15.8474 13.4318 16.2764C12.6517 17.4469 11.6117 18.4085 10.3982 19.0814C8.53437 20.1429 5.31855 20.408 3.30801 19.3464C1.29746 18.2849 0.275083 20.105 2.17576 21.1285C12.591 25.5251 21.1062 12.1835 11.166 5.70174ZM12.7009 14.3058C10.5081 18.0205 6.15935 17.1868 3.74683 14.6448C1.3343 12.1028 1.59089 8.5047 3.38169 5.96814C4.3492 4.64161 5.6021 3.56433 7.04194 2.82098C8.48178 2.07763 10.0693 1.68846 11.6798 1.68405C11.7214 1.9211 11.7451 2.16109 11.7509 2.40191C11.7877 2.9309 11.7082 3.46164 11.5183 3.95458C11.3284 4.44752 11.033 4.88996 10.6541 5.24893L10.0693 5.7797C12.8838 7.59704 14.3456 11.5388 12.7009 14.3058Z" fill="#96CB4C"/><path d="M3.70832 9.93747C4.24964 4.44229 10.314 3.3507 12.5527 10.6903C14.7914 18.0298 2.87782 16.5622 3.70832 9.93747ZM8.65365 13.551C13.4547 13.7394 11.1445 8.62025 8.00381 7.4914C4.8631 6.36255 3.13061 13.551 8.65365 13.551Z" fill="white"/></svg>`,i=`<svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.166 5.70174C13.1397 4.98185 13.8706 2.66966 13.7976 1.03941C6.37843 -2.59868 -1.0769 3.92032 0.129029 11.1978C0.332345 12.5304 0.871292 13.7847 1.69209 14.8356C2.51288 15.8864 3.58681 16.6971 4.80671 17.1868C4.62381 17.3766 4.29486 17.8687 4.1488 18.0585C6.52449 18.5893 8.24226 18.5133 9.74096 17.9446C10.9328 17.5003 11.9911 16.7425 12.8107 15.7463C13.4964 14.942 13.985 13.9802 14.2357 12.9413C14.2726 12.8274 14.0167 12.5624 14.4186 12.7515C14.8206 12.9406 14.3088 14.5329 14.1627 14.9119C13.9633 15.3904 13.7184 15.8474 13.4318 16.2764C12.6517 17.4469 11.6117 18.4085 10.3982 19.0814C8.53437 20.1429 5.31855 20.408 3.30801 19.3464C1.29746 18.2849 0.275083 20.105 2.17576 21.1285C12.591 25.5251 21.1062 12.1835 11.166 5.70174ZM12.7009 14.3058C10.5081 18.0205 6.15935 17.1868 3.74683 14.6448C1.3343 12.1028 1.59089 8.5047 3.38169 5.96814C4.3492 4.64161 5.6021 3.56433 7.04194 2.82098C8.48178 2.07763 10.0693 1.68846 11.6798 1.68405C11.7214 1.9211 11.7451 2.16109 11.7509 2.40191C11.7877 2.9309 11.7082 3.46164 11.5183 3.95458C11.3284 4.44752 11.033 4.88996 10.6541 5.24893L10.0693 5.7797C12.8838 7.59705 14.3456 11.5388 12.7009 14.3058Z" fill="#96CB4C"/>
<path d="M3.70832 9.93747C4.24964 4.44229 10.314 3.3507 12.5527 10.6903C14.7914 18.0298 2.87782 16.5622 3.70832 9.93747ZM8.65365 13.551C13.4547 13.7394 11.1445 8.62025 8.00381 7.4914C4.8631 6.36255 3.13061 13.551 8.65365 13.551Z" fill="white"/>
</svg>
`,a=`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3.75 15.75C3.3375 15.75 2.98438 15.6031 2.69063 15.3094C2.39687 15.0156 2.25 14.6625 2.25 14.25V3.75C2.25 3.3375 2.39687 2.98438 2.69063 2.69063C2.98438 2.39687 3.3375 2.25 3.75 2.25H9V3.75H3.75V14.25H14.25V9H15.75V14.25C15.75 14.6625 15.6031 15.0156 15.3094 15.3094C15.0156 15.6031 14.6625 15.75 14.25 15.75H3.75ZM7.275 11.775L6.225 10.725L13.2 3.75H10.5V2.25H15.75V7.5H14.25V4.8L7.275 11.775Z" fill="white"/></svg>`,o=()=>{let r=e(`style`,void 0,{textContent:`
    #${t} {
      position: relative;
      width: 100%;
      height: ${n};
      flex-shrink: 0;
      background-color: var(--color-background-inverse, #363636);
      border-bottom: 1px solid #4b4b4b;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      box-sizing: border-box;
      z-index: 99999;
      font-family: var(--font-family-body, 'Inter', sans-serif);
      color: var(--color-primary-contrast, #FFFFFF);
    }
    #${t} .sg-preview--left-group {
      display: flex;
      align-items: center;
      gap: 16px;
      z-index: 2;
    }
    #${t} .sg-preview--separator-1, #${t} .sg-preview--separator-2 {
      width: 1px;
      height: 24px;
      background-color: #555555;
    }
    #${t} .sg-preview--logo {
      display: flex;
      align-items: center;
    }
    #${t} .sg-preview--logo-mobile {
      display: none;
    }
    #${t} .sg-preview--label {
      color: var(--color-primary-contrast, #FFFFFF);
      text-align: center;
      font-family: var(--font-family-body, 'Inter', sans-serif);
      font-size: var(--font-size-md, 14px);
      font-style: normal;
      font-weight: 400;
      line-height: var(--font-line-height-md, 22px);
      white-space: nowrap;
    }
    #${t} .sg-preview--link {
      color: #FFFFFF;
      text-decoration: none;
      font-size: 12px;
      max-width: 150px;
      opacity: 0.9;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }
    #${t} .sg-preview--link-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }
    #${t} .sg-preview--redirect-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }
    #${t} .sg-preview--link:hover {
      text-decoration: underline;
      opacity: 1;
    }
    #${t} .sg-preview--title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: var(--font-size-md, 14px);
      font-weight: 600;
      line-height: var(--font-line-height-md, 22px);
      white-space: nowrap;
      color: var(--color-primary-contrast, #FFFFFF);
    }
    #${t} .sg-preview--right-group  {
      display:none;
    }

    #${t} .sg-preview--right-group .sg-preview--redirect-icon {
      display: none;
    }

    @media (max-width: 950px) {
      #${t} {
        padding: 0 8px;
      }
      #${t} .sg-preview--left-group {
        gap: 8px;
      }

      #${t}   .sg-preview--left-group .sg-preview--link, #${t} .sg-preview--left-group .sg-preview--separator-2 {
        display: none;
      }

      #${t} .sg-preview--right-group  {
        display: block;
      }

      #${t} .sg-preview--right-group .sg-preview--redirect-icon {
      display: flex;
    }
    } 
      
    @media (max-width: 600px) {
      #${t} .sg-preview--separator-1 {
        display: none;
      }
        
      #${t} .sg-preview--label {
        display: none;
      }

      #${t} .sg-preview--right-group .sg-preview--link-text {
        display: none;
      }

      #${t} .sg-preview--right-group .sg-preview--redirect-icon {
        display: flex;
      }

      #${t} .sg-preview--logo-desktop {
        display: none;
      }
      #${t} .sg-preview--logo-mobile {
        display: block;
      }
    }
  `});document.head.appendChild(r)},s=n=>{let o=e(`div`,void 0,{id:t}),s=e(`div`,`sg-preview--left-group`),c=e(`div`,`logo`,{innerHTML:`<div class="sg-preview--logo-desktop">`+r+`</div><div class="sg-preview--logo-mobile">`+i+`</div>`});s.appendChild(c),s.appendChild(e(`div`,`sg-preview--separator-1`)),s.appendChild(e(`div`,`sg-preview--label`,{textContent:`CODERICK AI`}));let l;if(n){s.appendChild(e(`div`,`sg-preview--separator-2`));let t=e(`a`,`sg-preview--link`,{href:`https://${n}`,target:`_blank`,rel:`noopener noreferrer`}),r=e(`span`,`sg-preview--link-text`,{textContent:n,title:n});t.appendChild(r),s.appendChild(t);let i=e(`div`,`sg-preview--redirect-icon`,{title:`Live version`,innerHTML:a});t.appendChild(i),l=t.cloneNode(!0)}if(o.appendChild(s),l){let t=e(`div`,`sg-preview--right-group`);t.appendChild(l),o.appendChild(t)}return o.appendChild(e(`div`,`sg-preview--title`,{textContent:`Preview Mode`})),o},c=()=>{let t=new URLSearchParams(window.location.search).get(`d`);if(document.getElementById(`sg-preview-banner`))return;let n=document.head.querySelector(`title`),r=n?n.outerHTML:`<title>Preview Mode</title>`,i=Array.from(document.head.querySelectorAll(`link[rel*='icon'], meta[name='theme-color']`)).map(e=>e.outerHTML).join(`
`);document.documentElement.style.display=``,document.documentElement.style.height=`100%`,document.documentElement.style.width=`100%`,document.head&&(document.head.innerHTML=`<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      ${r}
      ${i}`),document.body&&(document.body.innerHTML=``,document.body.style.margin=`0`,document.body.style.padding=`0`,document.body.style.overflow=`hidden`,document.body.style.height=`100%`,document.body.style.width=`100%`,document.body.style.display=`flex`,document.body.style.flexDirection=`column`,document.body.style.backgroundColor=`var(--color-background-inverse, #363636)`),o(),document.body.appendChild(s(t));let a=e(`iframe`,void 0,{id:`sg-preview-iframe`,src:window.location.href});a.style.flex=`1`,a.style.border=`none`,a.style.width=`100%`,a.style.height=`100%`,a.style.backgroundColor=`#ffffff`,a.style.display=`block`,document.body.appendChild(a),window.addEventListener(`message`,e=>{if(e.origin===window.location.origin&&e.data?.type===`sg-preview-nav`&&e.data?.url){let t=new URLSearchParams(window.location.search),n=t.get(`p`),r=t.get(`d`),i=e.data.url;try{let e=new URL(i,window.location.origin);n&&e.searchParams.get(`p`)!==n&&e.searchParams.set(`p`,n),r&&e.searchParams.get(`d`)!==r&&e.searchParams.set(`d`,r),i=e.href.replace(e.origin,``)}catch{}window.location.pathname+window.location.search+window.location.hash!==i&&(e.data.action===`push`?window.history.pushState(null,``,i):window.history.replaceState(null,``,i))}}),window.addEventListener(`popstate`,()=>{a.contentWindow&&a.contentWindow.location.replace(window.location.href)})},l=()=>{function e(e){try{if(!e||typeof e!=`string`&&!(e instanceof URL))return e;let t=window.location.origin,n=new URL(String(e),t);if(n.origin===t){let e=new URLSearchParams(window.location.search),t=e.get(`p`),r=e.get(`d`);return t&&n.searchParams.get(`p`)!==t&&n.searchParams.set(`p`,t),r&&n.searchParams.get(`d`)!==r&&n.searchParams.set(`d`,r),n.href.replace(n.origin,``)}return e}catch{return e}}let t=(e=`replace`)=>{try{if(window.parent===window)return;let t=window.location.pathname+window.location.search+window.location.hash;window.parent.postMessage({type:`sg-preview-nav`,url:t,action:e},window.location.origin)}catch{}},n=window.open;window.open=function(...t){return t[0]&&(t[0]=e(t[0])),n.apply(this,t)};let r=history.pushState;history.pushState=function(...n){n[2]&&(n[2]=e(n[2]));let i=r.apply(this,n);return setTimeout(()=>t(`push`),10),i};let i=history.replaceState;history.replaceState=function(...n){n[2]&&(n[2]=e(n[2]));let r=i.apply(this,n);return setTimeout(()=>t(`replace`),10),r},document.addEventListener(`click`,t=>{let n=t.target?.closest(`a`);if(!n||!n.href||n.href.startsWith(`mailto:`)||n.href.startsWith(`tel:`)||n.href.startsWith(`javascript:`))return;let r=e(n.href),i=typeof r==`string`?r:String(r);n.href!==i&&(n.href=i)},!0),window.addEventListener(`popstate`,()=>{setTimeout(()=>t(`replace`),10)}),window.addEventListener(`hashchange`,()=>{setTimeout(()=>t(`replace`),10)}),t(`replace`)};new URLSearchParams(window.location.search).get(`p`)===`1`&&(window===window.top?(document.documentElement.style.display=`none`,document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,c):c()):document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,l):l())})();
