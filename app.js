$(function(){
    var count = 0;
    Pepper.defineComponent('Pepper',{
        less: multiline(function(){/*
            padding:10px;margin:30px;box-shadow:0 0 10px rgba(0,0,0,.3);background:url(pepper.jpg) center no-repeat;background-size:100%;
            .close{float:right;}
            h1{color:#555;}
            p{font-weight:bold;}
        */}),
        template: multiline(function(){/*
            <div>
                <a class="close" href="javascript:;">Remove</a>
                <h3> ${title} </h3>
                <h4>This is Pepper ${count}</h4>
            </div>
        */}),
        data: {
            title: 'Any title you like',
            count: function(){
                return ++count;
            }
        },
        main: function(){
            var _this = this;
            var this_dom = $(this).filter(':not(style)');
            $(this_dom).on('click','.close',function(){
                $(_this).remove();
            });
        }
    });

    Pepper.defineComponent('DragElement',{
        less: multiline(function(){/*
            padding:10px;margin:30px;box-shadow:0 0 10px rgba(0,0,0,.3);position:relative;background:#fff url(chili-pepper.jpg) center no-repeat;background-size:100%;
            user-select: none;-webkit-user-select: none;width:250px;
            &.mousedown{cursor:move;}
            a{float:right;text-shadow:0 0 10px #fff;}
        */}),
        template: multiline(function(){/*
            <div>
                <h2>Drag me please!</h2>
                <a class="close" href="javascript:;">Remove</a>
                <p>
                    Top: <span>${top}px</span> Left: <span>${left}px</span>
                </p>
            </div>
        */}),
        data: {
            top: 0,
            left: 0
        },
        main: function(){
            var start_screenX,start_screenY,drag,start_top,start_left;
            var _this = this;
            var this_dom = $(this).filter(':not(style)');

            $(this_dom).on('pepperDrag',function(event){
                var updated_data = event.position;
                Pepper.update(this_dom, updated_data);
            });

            $(this_dom).on('click','.close',function(){
                $(_this).remove();
            });

            $(this_dom).on('mousedown',function(event){
                drag = true;
                start_screenX = event.screenX;
                start_screenY = event.screenY;
                start_top = (parseInt($(this_dom).css('top')) || 0);
                start_left = (parseInt($(this_dom).css('left')) || 0);
                $(this_dom).addClass('mousedown');
            });

            $(window).on('mouseup',function(){
                drag = false;
                $(this_dom).removeClass('mousedown');
            });

            $(window).on('mousemove',function(event){
                if(drag){
                    var diff_screenX = event.screenX - start_screenX;
                    var diff_screenY = event.screenY - start_screenY;
                    var new_position = {
                        top: start_top + diff_screenY,
                        left: start_left + diff_screenX
                    };

                    $(this_dom).css(new_position);

                    $(this_dom).trigger({
                        type: 'pepperDrag',
                        position: new_position
                    });
                }
            });
        }
    });
});
