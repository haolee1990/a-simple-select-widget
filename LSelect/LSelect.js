;(function($){
	function Select(self,option){
		this.self=self;
		this.$self=$(self);
		this.option=option;
	}
	Select.prototype={
		selecthandler:null,
		init:function(){
			this.doDom();
			this.setCss();
			var _this=this;
			if(this.option.timeOut){
				setTimeout(function(){
					_this.removeSelect();
				},this.option.timeOut);
			}
		},
		doDom:function(){
			var htmlArr=[];
			var oli=[];
			var self=this.$self;
			var _this=this;
			for(var i=0;i<this.option.data.length;i++){
				var liClass=this.option.data[i]==self.text()?"active":'';
				oli.push('<li class="'+liClass+'">'+this.option.data[i]+'</li>');
			}
			htmlArr.push('<div id="lSelect" class="'+this.option.content+'">');
			htmlArr.push('<ul class="'+this.option.inner+'">'+oli.join('')+'</ul>');
			htmlArr.push('</div>');
			$("body").append(htmlArr.join(''));
			this.selecthandler=$("#lSelect");
			
			$("#lSelect li").on("click",function(){
				self.text($(this).text());
				_this.removeSelect();
				$(".select-active").removeClass("select-active");
			});
			
		},
		setCss:function(){
			var oTop=this.$self.offset().top;
			var oLeft=this.$self.offset().left;
			var oWidth=this.$self.width();
			var oHight=this.$self.height();

			switch(this.option.direction){
				case 'top':
				this.selecthandler.css({
					top:oTop-20,
					left:0
				});
				break;
				case 'right':
				this.selecthandler.css({
					top:oTop,
					left:oLeft+oWidth+10
				});
				case 'bottom':
				this.selecthandler.css({
					top:oTop+oHight,
					left:0
				});
			}
		},
		removeSelect:function(){
			this.selecthandler.remove();
		},
		hideSelect:function(){
			this.selecthandler.hide();
		}
	};
    $.fn.LSelect = function(options) {
        var defaults = {//默认参数
			data:['option-1','option-2'],
            timeOut : false,
			content:"select-content",
			inner:"select-inner",
			direction:"top"
        };
        var options = $.extend({},defaults,options);//合并参数
        //链接式调用
		return this.each(function(){
			var $this=$(this);
			
			$this.on("click",function(){
				if($this.hasClass("select-active")){
					$("#lSelect").remove();
					$(this).removeClass("select-active");
				}else{
					$(".select-active").removeClass("select-active");
					$this.addClass("select-active");
					var selectCont=$("#lSelect");
					if(selectCont.size() > 0){
						selectCont.remove();
					}
					var select=new Select(this,options);
					select.init();
				}
			});
			
		});
    }  
})(jQuery)