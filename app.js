$(function(){
    var count = 0;
    defineComponent('Pepper',{
        less: multiline(function(){/*
            padding:10px;margin:30px;box-shadow:0 0 10px rgba(0,0,0,.3);
            .close{float:right;}
            h1{color:red;}
            p{font-weight:bold;}
        */}),
        template: multiline(function(){/*
            <div>
                <a class="close" href="javascript:;">移除</a>
                <h1> ${title} </h1>
                <p> ${content} </p>
            </div>
        */}),
        data: {
            title: function(){
                return (count++) + ' Title';
            },
            content: '随便来一点内容咯'
        },
        main: function(){
            var _this = this;
            $(this).find('.close').on('click',function(){
                $(_this).remove();
            });
        }
    });

    defineComponent('DragElement',{
        less: multiline(function(){/*
            padding:10px;margin:30px;box-shadow:0 0 10px rgba(0,0,0,.3);position:relative;cursor:move;
            user-select: none;-webkit-user-select: none;width:150px;background:#fff;
        */}),
        template: multiline(function(){/*
            <div>
                快拽我快拽我
            </div>
        */}),
        main: function(){
            var start_screenX,start_screenY,drag,start_top,start_left;
            var _this = this;

            $(this).on('mousedown',function(event){
                drag = true;
                start_screenX = event.screenX;
                start_screenY = event.screenY;
                start_top = (parseInt($(this).css('top')) || 0);
                start_left = (parseInt($(this).css('left')) || 0);
            });

            $(window).on('mouseup',function(){
                drag = false;
            });

            $(window).on('mousemove',function(event){
                if(drag){
                    var diff_screenX = event.screenX - start_screenX;
                    var diff_screenY = event.screenY - start_screenY;
                    $(_this).css({
                        top: start_top + diff_screenY,
                        left: start_left + diff_screenX
                    });
                }
            });
        }
    });
});
