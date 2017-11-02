	// creted by zym
	//2017-10-23
(function(w,dom){
	var dom = dom,array = Array.from;
	//定义分页类
	var Paging = (function(){
		var  Paging = function (pagingContainer,list,options){
			return new Paging.fn.init(pagingContainer,list,options);
		}
		Paging.fn = Paging.prototype = {
			constructor:Paging,
			number:this.number?this.number:'',
			init:function(pagingContainer,list,options){
				this.pagingContainer = dom.querySelector(pagingContainer);
				this.list = dom.querySelector(list);
				//传入形参
				this.options = {
					pageNo:options.pageNo || 1,
					totalPage:options.totalPage,
					totalSize:options.totalSize,
					callback:options.callback
				}
				this.creatHtml();
				this.bindEvent();
				this.doPage(this.options.pageNo);
			},
			creatHtml:function(){
				var str = '',
					current = this.options.pageNo,
					total = this.options.totalPage,
					totalNum = this.options.totalSize;
				this.pagingContainer.innerHTML = ''; //置空
				str += '<span id="firstpage" class="first-page button">首页</span>'+
					'			<span id="prepage" class="pre-page button">上一页</span>';

				if(total > 6){
					if(current < 5){
						for(var i = 1; i <6; i++){
							if(current == i){
								str += '			<span class="page-no current button">'+i+'</span>'
							}else{
								str += '			<span class="page-no button">'+i+'</span>';
							}
						}
						str += '...'
						str += '<span class="page-no button">'+total+'</span>'
					}else{
						//判断页码在末尾
						if(current < total - 3){
							for(var i = current -2; i < current + 3; i++){
								if(current == i){
									str += '			<span class="page-no current button">'+i+'</span>'
								}else{
									str += '			<span class="page-no button">'+i+'</span>';
								}
							}
							str += '...'
							str += '<span class="page-no button">'+total+'</span>'
						}else{
							//页码在中间
							str += '<span class="page-no button">1</span>'
							str += '...';
							for(var i = total - 3; i < total +1 ; i++){
								if(current == i){
									str += '			<span class="page-no current button">'+i+'</span>'
								}else{
									str += '			<span class="page-no button">'+i+'</span>';
								}
							}
						}
					}
				}else{
					//页面总数小于6
					for(var i = 1; i < total + 1; i++) {
						if(current == i){
							str += '			<span class="page-no current button">'+i+'</span>'
						}else{
							str += '			<span class="page-no button">'+i+'</span>';
						}
					}
				}
				str += '			<span id="nextpage" class="next-page button">下一页</span>'+
					'			<span id="lastpage" class="last-page button">尾页</span>'+
					'			<span>'+
					'				<input class="get-page" id="getPage" type="text" value="'+this.number+'">'+
					'				<button id="gopage" class="button gopage">Go</button>'+
					'			</span>'+
					'			<span>'+
					'				共'+
					'				<i>'+total+'</i>页'+
					'			</span>'+
					'			<span>'+
					'				共'+
					'				<i>'+totalNum+'</i>条数据'+
					'			</span>';
				this.pagingContainer.insertAdjacentHTML("beforeend",str);

			},
			bindEvent:function(){
				//添加页面操作事件
				dom.querySelector("#getPage").addEventListener('input',this.onlyNumber,false);
				this.pagingContainer.addEventListener("click",function(ev){
					var ev = ev || dom.event;
					var target = ev.target || ev.srcElement;
					if(target && target.className.indexOf("button") != -1){
						var num = Number(target.innerHTML);
						var id = target.getAttribute("id");
						switch(id){
							case 'firstpage'://首页
								this.options.pageNo = 1;
								break;
							case 'prepage': //前一页
								if(this.options.pageNo == 1){
									this.options.pageNo = 1;
								}else{
									this.options.pageNo -= 1
								}
								break;
							case 'nextpage': //下一页
								if(this.options.pageNo == this.options.totalPage){
									this.options.pageNo = this.options.totalPage;
								}else{
									this.options.pageNo += 1
								}
								break;
							case 'lastpage':
								this.options.pageNo = this.options.totalPage;
								break;
							case null:
								this.options.pageNo = num;
								break;
							case 'gopage': //go to
								this.options.pageNo = Number(dom.querySelector("#getPage").value)>this.options.totalPage?this.options.totalPage:Number(dom.querySelector("#getPage").value);
								this.number = this.options.pageNo;
								break;
						}
						if(id != 'gopage'){
							this.creatHtml();
						}
						this.doPage(this.options.pageNo)
					}
				}.bind(this),false);
			},
			doPage:function(i){ //对列表进行分页
				var h = this.list.parentNode.offsetHeight;
				this.list.style.top = -(i-1)*h+'px';
			},
			onlyNumber:function(){
				var value = this.value;
				if(isNaN(Number(value))){
					this.value='';
				}
			}
		};
		Paging.fn.init.prototype = Paging.fn;
		return Paging;
	})()
	w.Paging = w.$ = Paging;
})(window,document);
