/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Table','./library'],function(q,T,a){"use strict";var b=T.extend("sap.ui.table.TreeTable",{metadata:{library:"sap.ui.table",properties:{expandFirstLevel:{type:"boolean",defaultValue:false},useGroupMode:{type:"boolean",group:"Appearance",defaultValue:false},groupHeaderProperty:{type:"string",group:"Data",defaultValue:null}},events:{toggleOpenState:{parameters:{rowIndex:{type:"int"},rowContext:{type:"object"},expanded:{type:"boolean"}}}}}});b.prototype.init=function(){T.prototype.init.apply(this,arguments);this._iLastFixedColIndex=0;if(sap.ui.getCore().getConfiguration().getTheme()==="sap_bluecrystal"||sap.ui.getCore().getConfiguration().getTheme()==="sap_hcb"){q.sap.require("sap.ui.core.IconPool");sap.ui.core.IconPool.insertFontFaceStyle()}};b.prototype.setFixedRowCount=function(r){q.sap.log.warning("TreeTable: the property \"fixedRowCount\" is not supported and will be ignored!");return this};b.prototype.onAfterRendering=function(){T.prototype.onAfterRendering.apply(this,arguments);this.$().find("[role=grid]").attr("role","treegrid")};b.prototype.isTreeBinding=function(n){n=n||"rows";if(n==="rows"){return true}return sap.ui.core.Element.prototype.isTreeBinding.apply(this,n)};b.prototype.getBinding=function(n){n=n||"rows";var B=sap.ui.core.Element.prototype.getBinding.call(this,n);if(B&&this.isTreeBinding(n)&&n==="rows"&&!B.getLength){var t=this;q.extend(B,{_init:function(e){this._bExpandFirstLevel=e;this.mContextInfo={};this._initContexts();if(e&&!this._bFirstLevelExpanded){this._expandFirstLevel()}},_initContexts:function(s){this.aContexts=this.getRootContexts();for(var i=0,l=this.aContexts.length;i<l;i++){var o=this._getContextInfo(this.aContexts[i]);this._setContextInfo({oContext:this.aContexts[i],iLevel:0,bExpanded:o?o.bExpanded:false})}if(this._bExpandFirstLevel&&!this._bFirstLevelExpanded){this._expandFirstLevel(s)}},_expandFirstLevel:function(s){var t=this;if(this.aContexts&&this.aContexts.length>0){q.each(this.aContexts.slice(),function(i,c){if(!s){t._loadChildContexts(c)}t._getContextInfo(c).bExpanded=true});this._bFirstLevelExpanded=true}},_fnFireFilter:B._fireFilter,_fireFilter:function(){this._fnFireFilter.apply(this,arguments);this._initContexts(true);this._restoreContexts(this.aContexts)},_fnFireChange:B._fireChange,_fireChange:function(){this._fnFireChange.apply(this,arguments);this._initContexts(true);this._restoreContexts(this.aContexts)},_restoreContexts:function(c){var t=this;var N=[];q.each(c.slice(),function(i,C){var o=t._getContextInfo(C);if(o&&o.bExpanded){N.push.apply(N,t._loadChildContexts(C))}});if(N.length>0){this._restoreContexts(N)}},_loadChildContexts:function(c){var C=this._getContextInfo(c);var I=q.inArray(c,this.aContexts);var N=this.getNodeContexts(c);for(var i=0,l=N.length;i<l;i++){this.aContexts.splice(I+i+1,0,N[i]);var o=this._getContextInfo(N[i]);this._setContextInfo({oParentContext:c,oContext:N[i],iLevel:C.iLevel+1,bExpanded:o?o.bExpanded:false})}return N},_getContextInfo:function(c){return c?this.mContextInfo[c.getPath()]:undefined},_setContextInfo:function(d){if(d&&d.oContext){this.mContextInfo[d.oContext.getPath()]=d}},getLength:function(){return this.aContexts?this.aContexts.length:0},getContexts:function(s,l){return this.aContexts.slice(s,s+l)},getLevel:function(c){var C=this._getContextInfo(c);return C?C.iLevel:-1},isExpanded:function(c){var C=this._getContextInfo(c);return C?C.bExpanded:false},expandContext:function(c){var C=this._getContextInfo(c);if(C&&!C.bExpanded){this.storeSelection();this._loadChildContexts(c);C.bExpanded=true;this._fireChange();this.restoreSelection()}},collapseContext:function(c){var C=this._getContextInfo(c);if(C&&C.bExpanded){this.storeSelection();for(var i=this.aContexts.length-1;i>0;i--){if(this._getContextInfo(this.aContexts[i]).oParentContext===c){this.aContexts.splice(i,1)}}C.bExpanded=false;this._fireChange();this.restoreSelection()}},toggleContext:function(c){var C=this._getContextInfo(c);if(C){if(C.bExpanded){this.collapseContext(c)}else{this.expandContext(c)}}},storeSelection:function(){var s=t.getSelectedIndices();var S=[];q.each(s,function(i,v){S.push(t.getContextByIndex(v))});this._aSelectedContexts=S},restoreSelection:function(){t.clearSelection();var _=this._aSelectedContexts;q.each(this.aContexts,function(i,c){if(q.inArray(c,_)>=0){t.addSelectionInterval(i,i)}});this._aSelectedContexts=undefined},attachSort:function(){},detachSort:function(){}});B._init(this.getExpandFirstLevel())}return B};b.prototype._updateTableContent=function(){T.prototype._updateTableContent.apply(this,arguments);if(!this.getUseGroupMode()){return}var B=this.getBinding("rows"),f=this.getFirstVisibleRow(),c=this.getVisibleRowCount();for(var r=0;r<c;r++){var C=this.getContextByIndex(f+r),$=this.getRows()[r].$(),d=this.$().find("div[data-sap-ui-rowindex='"+$.attr("data-sap-ui-rowindex")+"']");if(B.hasChildren&&B.hasChildren(C)){$.addClass("sapUiTableGroupHeader sapUiTableRowHidden");var s=B.isExpanded(C)?"sapUiTableGroupIconOpen":"sapUiTableGroupIconClosed";d.html("<div class=\"sapUiTableGroupIcon "+s+"\" tabindex=\"-1\">"+this.getModel().getProperty(this.getGroupHeaderProperty(),C)+"</div>");d.addClass("sapUiTableGroupHeader").removeAttr("title")}else{$.removeClass("sapUiTableGroupHeader");if(C){$.removeClass("sapUiTableRowHidden")}d.html("");d.removeClass("sapUiTableGroupHeader")}}};b.prototype._updateTableCell=function(c,C,t){var B=this.getBinding("rows");if(B){var l=B.getLevel?B.getLevel(C):0;var $;if(this.getFixedColumnCount()>0){$=c.getParent().$("fixed")}else{$=c.getParent().$()}var d=$.find(".sapUiTableTreeIcon");var s="sapUiTableTreeIconLeaf";if(!this.getUseGroupMode()){d.css("marginLeft",l*17)}if(B.hasChildren&&B.hasChildren(C)){s=B.isExpanded(C)?"sapUiTableTreeIconNodeOpen":"sapUiTableTreeIconNodeClosed";$.attr('aria-expanded',B.isExpanded(C));var n=B.isExpanded(C)?this._oResBundle.getText("TBL_COLLAPSE"):this._oResBundle.getText("TBL_EXPAND");d.attr('title',n)}else{$.attr('aria-expanded',false);d.attr('aria-label',this._oResBundle.getText("TBL_LEAF"))}d.removeClass("sapUiTableTreeIconLeaf sapUiTableTreeIconNodeOpen sapUiTableTreeIconNodeClosed").addClass(s);$.attr("data-sap-ui-level",l);$.attr('aria-level',l+1)}};b.prototype.onclick=function(e){if(q(e.target).hasClass("sapUiTableGroupIcon")){this._onGroupSelect(e)}else if(q(e.target).hasClass("sapUiTableTreeIcon")){this._onNodeSelect(e)}else{if(T.prototype.onclick){T.prototype.onclick.apply(this,arguments)}}};b.prototype.onsapselect=function(e){if(q(e.target).hasClass("sapUiTableTreeIcon")){this._onNodeSelect(e)}else{if(T.prototype.onsapselect){T.prototype.onsapselect.apply(this,arguments)}}};b.prototype.onkeydown=function(e){T.prototype.onkeydown.apply(this,arguments);var t=q(e.target),$=t.closest('td');if(e.keyCode==q.sap.KeyCodes.TAB&&this._bActionMode&&$.find('.sapUiTableTreeIcon').length>0){if(t.hasClass('sapUiTableTreeIcon')){if(!t.hasClass("sapUiTableTreeIconLeaf")){$.find(':sapFocusable:not(.sapUiTableTreeIcon)').first().focus()}}else{$.find('.sapUiTableTreeIcon:not(.sapUiTableTreeIconLeaf)').focus()}e.preventDefault()}};b.prototype._onNodeSelect=function(e){var $=q(e.target).parents("tr");if($.length>0){var r=this.getFirstVisibleRow()+parseInt($.attr("data-sap-ui-rowindex"),10);var c=this.getContextByIndex(r);this.fireToggleOpenState({rowIndex:r,rowContext:c,expanded:!this.getBinding().isExpanded(c)});this.getBinding("rows").toggleContext(c)}e.preventDefault();e.stopPropagation()};b.prototype._onGroupSelect=function(e){var $=q(e.target).parents("[data-sap-ui-rowindex]");if($.length>0){var r=this.getFirstVisibleRow()+parseInt($.attr("data-sap-ui-rowindex"),10);var c=this.getContextByIndex(r);if(this.getBinding().isExpanded(c)){q(e.target).removeClass("sapUiTableGroupIconOpen").addClass("sapUiTableGroupIconClosed")}else{q(e.target).removeClass("sapUiTableGroupIconClosed").addClass("sapUiTableGroupIconOpen")}this.fireToggleOpenState({rowIndex:r,rowContext:c,expanded:!this.getBinding().isExpanded(c)});this.getBinding("rows").toggleContext(c)}e.preventDefault();e.stopPropagation()};b.prototype.expand=function(r){var B=this.getBinding("rows");if(B){var c=this.getContextByIndex(r);B.expandContext(c)}};b.prototype.collapse=function(r){var B=this.getBinding("rows");if(B){var c=this.getContextByIndex(r);B.collapseContext(c)}};b.prototype.isExpanded=function(r){var B=this.getBinding("rows");if(B){var c=this.getContextByIndex(r);return B.isExpanded(c)}return false};b.prototype._enterActionMode=function(t){var $=t.eq(0);T.prototype._enterActionMode.apply(this,arguments);if(t.length>0&&$.hasClass("sapUiTableTreeIcon")&&!$.hasClass("sapUiTableTreeIconLeaf")){$.attr("tabindex",0).focus();this._bActionMode=true}};b.prototype._leaveActionMode=function(e){T.prototype._leaveActionMode.apply(this,arguments);this.$().find(".sapUiTableTreeIcon").attr("tabindex",-1)};return b},true);
