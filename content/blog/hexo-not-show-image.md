---
title: hexo引用本地图片无法显示
date: 2021-04-06 16:42:55
description: 最近重新开始用起hexo，但是发现在文章中引用本地图片时总是显示不出来...
---
## 前言

最近重新开始用起hexo，但是发现在文章中引用本地图片时总是显示不出来。
无论使用官方文档给的

```html
{% asset_img example.jpg This is an example image %}
```

还是使用 [volantis主题文档](https://volantis.js.org/v3/tag-plugins/hexo/) 给的代码

```html
{% img [class names] /path/to/image [width] [height] '"title text" "alt text"' %}
```

同样无法正常使用，花费了许久时间才解决这个问题。
因此将一些解决经验整理出来，希望能帮助到大家。

## 解决步骤

1. 打开_config.yml文件，修改下述内容，目的是为了新建文章时自动帮我们建一个与文章名相同的文件夹用来从放图片文件

```yaml
post_asset_folder: true
```

2. 我们需要安装一个图片路径转换的插件，这个插件名字是hexo-asset-image

```shell
npm install hexo-asset-image --save
```

图片无法显示的问题就出在这个插件的代码之中.

3. 打开/node_modules/hexo-asset-image/index.js，将内容更换为下面的代码

``` javascript
'use strict';
var cheerio = require('cheerio');

// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
function getPosition(str, m, i) {
  return str.split(m, i).join(m).length;
}

var version = String(hexo.version).split('.');
hexo.extend.filter.register('after_post_render', function(data){
  var config = hexo.config;
  if(config.post_asset_folder){
    	var link = data.permalink;
	if(version.length > 0 && Number(version[0]) == 3)
	   var beginPos = getPosition(link, '/', 1) + 1;
	else
	   var beginPos = getPosition(link, '/', 3) + 1;
	// In hexo 3.1.1, the permalink of "about" page is like ".../about/index.html".
	var endPos = link.lastIndexOf('/') + 1;
    link = link.substring(beginPos, endPos);

    var toprocess = ['excerpt', 'more', 'content'];
    for(var i = 0; i < toprocess.length; i++){
      var key = toprocess[i];
 
      var $ = cheerio.load(data[key], {
        ignoreWhitespace: false,
        xmlMode: false,
        lowerCaseTags: false,
        decodeEntities: false
      });

      $('img').each(function(){
		if ($(this).attr('src')){
			// For windows style path, we replace '\' to '/'.
			var src = $(this).attr('src').replace('\\', '/');
			if(!/http[s]*.*|\/\/.*/.test(src) &&
			   !/^\s*\//.test(src)) {
			  // For "about" page, the first part of "src" can't be removed.
			  // In addition, to support multi-level local directory.
			  var linkArray = link.split('/').filter(function(elem){
				return elem != '';
			  });
			  var srcArray = src.split('/').filter(function(elem){
				return elem != '' && elem != '.';
			  });
			  if(srcArray.length > 1)
				srcArray.shift();
			  src = srcArray.join('/');
			  $(this).attr('src', config.root + link + src);
			  console.info&&console.info("update link as:-->"+config.root + link + src);
			}
		}else{
			console.info&&console.info("no src attr, skipped...");
			console.info&&console.info($(this));
		}
      });
      data[key] = $.html();
    }
  }
});
``` 

之后使用markdown语法插入图片就一切正常了。