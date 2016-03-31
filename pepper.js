$(function(){
    window.defineComponent = defineComponent;

    function defineComponent(component_name,options){
        var opt = {};$.each(options,function(key,value){opt[key] = value;});
        opt.data = opt.data || {};

        var components = [];

        opt.component_name = component_name;
        $(component_name).each(function(){
            var tempDom = this;

            opt.component_id = randomId('pe-');

            fakeAsync_GetStyle(opt,function(css){
                var style = css ? $('<style>').html(css) : '';
                var dom = getTemplate(opt);

                var component = $(style).add(dom);
                component = wrapComponent(component,opt);
                opt.main && opt.main.call(component);

                component.each(function(){
                    components.push(this);
                });

                $(tempDom).replaceWith(component);
            });
        });

        return $(components);
    }

    function fakeAsync_GetStyle(opt,callback){
        var lessStr = '#${component_id}{' + opt.less + '}';
        lessStr = strCompile(lessStr,opt);
        less.render(lessStr,function(err,res){
            err ? callback('') : callback(res.css);
        });
    }

    function getTemplate(opt){
        var template = strCompile(opt.template,opt);

        //数据模板解析 ${} 解析成
        template = template.replace(/\$\{([^\}]*)?\}/g,function(str,data_key,start){
            return getData(opt.data, data_key.trim()) || '';
        });

        var dom = $(template).attr('id',opt.component_id);
        return dom;
    }

    function getData(data, data_key){
        var res = data[data_key];
        switch( $.type(res) ){
            case 'function':
                res = res();
                break;
            default:
                res = res ? res : ''
        }
        return res;
    }

    function wrapComponent(component,opt){
        var prefix = strCompile('<!-- * Pe: ${component_name}  start -->',opt);
        var suffix = strCompile('<!--   Pe: ${component_name}  end * -->',opt);

        return $(prefix).add( component ).add(suffix);
    }

    function strCompile(str,opt){
        return (str||'').replace(/\$\{component_id\}/g,opt.component_id)
                  .replace(/\$\{component_name\}/g,opt.component_name);
    }

    function randomId(prefix){
        return (prefix||'')+( new Date().valueOf().toString(36)+Math.random().toString(36) ).split('0.').join('_').substr(0,12);
    }
});
