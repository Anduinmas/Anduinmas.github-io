/**
 * scripts/batch-create.js
 * 批量创建文章草稿
 *
 * 使用方法：
 *   1. 修改下面的 posts 数组，填入你想写的文章
 *   2. 运行：node scripts/batch-create.js
 *   3. 草稿会生成到 source/_posts/ 目录
 */

const fs = require('fs');
const path = require('path');

// ========== 📝 在这里填你的文章列表 ==========
const posts = [
  {
    title: "Git 常用命令速查手册",
    categories: "技术",
    tags: ["Git", "效率", "教程"],
    description: "整理工作中最常用的 Git 命令，附实战场景"
  },
  {
    title: "《认知觉醒》读书笔记",
    categories: "读书",
    tags: ["读书笔记", "认知", "成长"],
    description: "一本改变思维方式的书，记录最触动我的5个观点"
  },
  {
    title: "打工人的周末散步路线",
    categories: "生活",
    tags: ["日常", "散步", "治愈"],
    description: "分享3条适合周末放松的城市散步路线"
  }
];

// ========== 🚀 执行创建 ==========
const sourceDir = path.join(__dirname, '..', 'source', '_posts');

// 确保目录存在
if (!fs.existsSync(sourceDir)) {
  fs.mkdirSync(sourceDir, { recursive: true });
}

posts.forEach((post, index) => {
  const date = new Date();
  // 每篇文章错开 1 天
  date.setDate(date.getDate() + index);
  const dateStr = date.toISOString().split('T')[0];
  const datetimeStr = date.toISOString().replace('T', ' ').slice(0, 19);

  // 文件名：日期-标题.md
  const safeTitle = post.title.replace(/[\/\\:*?"<>|]/g, '-');
  const fileName = `${dateStr}-${safeTitle}.md`;
  const filePath = path.join(sourceDir, fileName);

  const tagsYaml = post.tags.map(t => `  - ${t}`).join('\n');

  const content = `---
title: ${post.title}
date: ${datetimeStr}
updated: ${datetimeStr}
tags:
${tagsYaml}
categories:
  - ${post.categories}
description: ${post.description}
cover: https://source.unsplash.com/random/800x400/?nature,minimal
top_img: https://source.unsplash.com/random/1920x1080/?nature,calm
keywords: ${post.tags.join(',')}
sticky: 0
---

<!-- more -->

> 📝 本文为草稿状态，待补充正文内容。

## 大纲

<!-- 在这里写大纲 -->

## 正文

<!-- 在这里写正文 -->
`;

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ 已创建: ${fileName}`);
});

console.log(`\n🎉 批量创建完成！共 ${posts.length} 篇文章草稿`);
console.log('📁 位置: source/_posts/');
console.log('\n💡 下一步:');
console.log('   1. 用 VS Code 打开 source/_posts/ 目录');
console.log('   2. 逐篇修改完善内容');
console.log('   3. 在终端运行: hexo server  预览效果');
console.log('   4. 满意后运行: hexo clean && hexo g && hexo d  部署上线');
