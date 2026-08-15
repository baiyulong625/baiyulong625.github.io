---
title: "理解 CSS Grid 的隐式与显式轨道"
date: "2026-04-18"
tag: "技术"
excerpt: "Grid 布局中容易混淆的概念梳理。一次搞懂 auto-fill 和 auto-fit 的区别。"
---

CSS Grid 里最容易被混淆的一组概念，就是"显式轨道"和"隐式轨道"。这篇笔记用一个例子把它们讲清楚。

## 显式轨道

你在 `grid-template-columns` 或 `grid-template-rows` 里明确写出的轨道，就是显式轨道：

```css
.grid {
  grid-template-columns: 1fr 1fr 1fr;
}
```

这里创建了三条明确的列。

## 隐式轨道

如果网格项多于显式轨道的数量，Grid 会自动创建新的轨道来容纳它们，这些自动生成的轨道就是隐式轨道，行为由 `grid-auto-rows` / `grid-auto-columns` 控制：

```css
.grid {
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(120px, auto);
}
```

当第四、第五个元素出现时，它们落入隐式轨道。

## auto-fill 与 auto-fit

两者都用于"根据容器宽度自动生成轨道数"，区别在容器宽裕时：

- `auto-fill` 会保留空轨道，轨道数固定
- `auto-fit` 会把空轨道折叠为 0，内容自动伸展

```css
.grid-a { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
.grid-b { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
```

在元素不足一行的场景下，`auto-fit` 通常是我们想要的——它能撑满整行，不留空洞。
