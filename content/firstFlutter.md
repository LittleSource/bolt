---
title: Flutter初体验
date: 2020-04-04 22:12:02
---
hexo的第一篇博客，处女之作哈哈哈。以前就想着写博客来着，因为个人文笔确实渣的一批再加上比较懒，一直没有真正开始写过~

***

最近Flutter貌似很火，我也忍不住下手学习啦。嗯，这个系列就记录一下学习Flutter遇到的坑吧，希望对也是新手的你有所帮助。*PS:我在此谦虚地认为大神是不会看这篇渣渣文章的*

以前在uni-app上做过一些关于安卓的东西，单纯的我认为Flutter也应该很容易上手，其实不然，我花了很长时间才将Android Studio、安卓模拟器和Flutter框架配置好，可能是技术太菜吧(╥╯^╰╥)。
[点击github仓库传送门](https://github.com/LittleSource/flutter_top)
来看看我这个菜鸟写的页面：

![这是代替图片的文字，随便写](/public/firstFlutter/20541433-0ba401306407b736.jpg)

附上代码：
```dart
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: '嗯哼哒',
      theme: new ThemeData(
        primaryColor: Colors.yellow,
      ),
      home: ConfessionList(),
    );
  }
}

class ConfessionList extends StatefulWidget {
  @override
  _ConfessionListState createState() => new _ConfessionListState();
}

class _ConfessionListState extends State<ConfessionList>
    with SingleTickerProviderStateMixin {
  TabController _tabController; //需要定义一个Controller
  List tabs = ["新闻", "历史", "图片"];
  @override
  void initState() {
    super.initState();
    // 创建Controller
    _tabController = TabController(length: tabs.length, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: Text('表白墙'),
            actions: <Widget>[
              IconButton(icon: new Icon(Icons.list), onPressed: () {})
            ],
            bottom: TabBar(
                controller: _tabController,
                isScrollable: true,
                tabs: tabs.map((e) => Tab(text: e)).toList()
            )
        ),
        body: TabBarView(
          controller: _tabController,
          children: tabs.map((e) {
            //创建3个Tab页
            return _buildCardList();
          }).toList(),
        ));
  }

  Widget _buildCardList() {
    //循环构建card List
    return ListView(
        children: List<Widget>.generate(10, (i) {
      return ConfessionCard();
    }));
  }
}

class ConfessionCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return IntrinsicHeight(
      child: Card(
        margin: EdgeInsets.fromLTRB(8.0, 4.0, 8.0, 4.0),
        child: new Column(
          children: [
            new CardHead(),
            new CardText(),
            new CardImg(),
            new CardFoot()
          ],
        ),
      ),
    );
  }
}

class CardHead extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Container(
          width: 50.0,
          height: 50.0,
          margin: EdgeInsets.fromLTRB(5.0, 5.0, 5.0, 0.0),
          child: new ClipOval(
            child: Image.network(
                "http://image.biaobaiju.com/uploads/20180803/20/1533300389-KFRyeJpPvX.jpg"),
          ),
        ),
        Column(crossAxisAlignment: CrossAxisAlignment.start, children: <Widget>[
          Text('小源源吆',
              style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16.0)),
          Text('十分钟前', style: TextStyle(fontSize: 13.0)),
        ]),
        Expanded(
            child: Align(
          child: IconButton(
              icon: Icon(Icons.new_releases),
              color: Colors.pink,
              onPressed: () {},
              alignment: Alignment.centerRight),
          alignment: Alignment.centerRight,
        ))
      ],
    );
  }
}

class CardText extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text('图片的宽度会缩放到显示空间的宽度，高度会按比例缩放，然后居中显示，图片不会变形，超出显示空间部分会被剪裁'),
      padding: EdgeInsets.fromLTRB(5.0, 0.0, 5.0, 0.0),
    );
  }
}

class CardImg extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
        padding: EdgeInsets.all(5.0),
        height: 176.0,
        child: GridView.count(
          physics: new NeverScrollableScrollPhysics(), //屏蔽GridView内部滚动
          crossAxisCount: 2,
          crossAxisSpacing: 2.5,
          mainAxisSpacing: 0.0,
          childAspectRatio: 1.0,
          children: <Widget>[
            Image.network(
              'https://i0.hdslb.com/bfs/archive/dadc476e1be7662d67083dbb2118e87f72cb20c1.png@1100w_484h_1c_100q.png',
              fit: BoxFit.cover,
              height: 175.0,
            ),
            Image.network(
              'https://i0.hdslb.com/bfs/archive/dadc476e1be7662d67083dbb2118e87f72cb20c1.png@1100w_484h_1c_100q.png',
              fit: BoxFit.cover,
              height: 175.0,
            ),
          ],
        ));
  }
}

class CardFoot extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        FlatButton.icon(
          icon: Icon(Icons.favorite_border, color: Colors.black54),
          label: Text("点赞", style: TextStyle(color: Colors.black54)),
          onPressed: null,
        ),
        FlatButton.icon(
          icon: Icon(Icons.comment, color: Colors.black54),
          label: Text("评论", style: TextStyle(color: Colors.black54)),
          onPressed: null,
        ),
      ],
    );
  }
}
```

渣渣代码写的有点长哈，毕竟刚开始学，用几个简单的Widget做了一个类似QQ空间说说的小卡片，这一坐就是整整一天，腰痛~~~~~~
***
说实话遇到了一个坑，就是在Column中嵌套GridView后GridView不显示，百度找到两个答案他们有四种解决方式，但是我没有成功，唉，我留下了无知的眼泪...

经过我的研究，我发现要在GridView外面套一层Container并设置高度才能正常显示

```dart
class CardImg extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
        padding: EdgeInsets.all(5.0),
        height: 176.0,
        child: GridView.count(
          physics: new NeverScrollableScrollPhysics(), //屏蔽GridView内部滚动
          crossAxisCount: 2,
          crossAxisSpacing: 2.5,
          mainAxisSpacing: 0.0,
          childAspectRatio: 1.0,
          children: <Widget>[
            Image.network(
              'https://i0.hdslb.com/bfs/archive/dadc476e1be7662d67083dbb2118e87f72cb20c1.png@1100w_484h_1c_100q.png',
              fit: BoxFit.cover,
              height: 175.0,
            ),
            Image.network(
              'https://i0.hdslb.com/bfs/archive/dadc476e1be7662d67083dbb2118e87f72cb20c1.png@1100w_484h_1c_100q.png',
              fit: BoxFit.cover,
              height: 175.0,
            ),
          ],
        ));
  }
}
```
